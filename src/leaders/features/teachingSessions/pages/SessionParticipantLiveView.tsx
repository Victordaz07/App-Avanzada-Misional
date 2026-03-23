/**
 * Session Participant Live View
 *
 * Vista mínima para participantes (no maestros).
 * Ruta: /session/:wardId/:sessionId/live  (primer segmento = uid maestro o id barrio legado)
 */

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { findSessionStorageByScopeId, subscribeToSession } from '../services/teachingSessionsService';
import type { SessionStorageParent } from '../services/sessionStoragePaths';
import {
  touchLastSeen,
  subscribeToParticipants,
  hasCompletedPart,
  markPartCompleted,
} from '../services/participantsService';
import { submitFeedback } from '../services/feedbackService';
import FeedbackModal from '../components/FeedbackModal';
import type { TeachingSession, SessionParticipant } from '../types';
import { Card, Button } from '../../../ui';

const FEEDBACK_STORAGE_KEY = (sessionId: string) => `teaching:feedback:${sessionId}:submitted`;

const TOUCH_INTERVAL_MS = 45_000;

const SessionParticipantLiveView: React.FC = () => {
  const { wardId, sessionId } = useParams<{ wardId: string; sessionId: string }>();
  const { user } = useAuth();
  const [session, setSession] = useState<TeachingSession | null>(null);
  const [participants, setParticipants] = useState<SessionParticipant[]>([]);
  const [marking, setMarking] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackShown, setFeedbackShown] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [storage, setStorage] = useState<{
    parent: SessionStorageParent;
    parentId: string;
  } | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!wardId || !sessionId) return;
    let cancelled = false;
    findSessionStorageByScopeId(wardId, sessionId)
      .then((loc) => {
        if (cancelled) return;
        setStorage(loc);
        setResolved(true);
      })
      .catch(() => {
        if (!cancelled) {
          setStorage(null);
          setResolved(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [wardId, sessionId]);

  useEffect(() => {
    if (!storage || !sessionId || !user?.uid) return;

    const unsub = subscribeToSession(storage.parent, storage.parentId, sessionId, setSession);
    return () => unsub();
  }, [storage, sessionId, user?.uid]);

  useEffect(() => {
    if (!storage || !sessionId) return;
    const unsub = subscribeToParticipants(storage.parent, storage.parentId, sessionId, setParticipants);
    return () => unsub();
  }, [storage, sessionId]);

  useEffect(() => {
    if (!sessionId || !session || !user?.uid) return;
    if (session.status !== 'completed') return;
    const key = FEEDBACK_STORAGE_KEY(sessionId);
    if (typeof localStorage !== 'undefined' && localStorage.getItem(key) === 'true') return;
    if (feedbackShown) return;
    setShowFeedbackModal(true);
    setFeedbackShown(true);
  }, [sessionId, session?.status, user?.uid, feedbackShown]);

  useEffect(() => {
    if (!storage || !sessionId || !user?.uid) return;

    const touch = () => {
      touchLastSeen(storage.parent, storage.parentId, sessionId, user.uid).catch(console.error);
    };

    touch();
    intervalRef.current = setInterval(touch, TOUCH_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [storage, sessionId, user?.uid]);

  if (!wardId || !sessionId) {
    return (
      <div style={{ padding: 24 }}>
        <p>Parámetros inválidos.</p>
      </div>
    );
  }

  if (!resolved || !storage) {
    return (
      <div style={{ padding: 24 }}>
        <p>{resolved ? 'Sesión no encontrada.' : 'Cargando sesión...'}</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ padding: 24 }}>
        <p>Cargando sesión...</p>
      </div>
    );
  }

  const currentPart = session.parts.find((p) => p.id === session.currentPartId);
  const currentPartId = session.currentPartId;
  const me = participants.find((p) => p.uid === user?.uid);
  const hasCompletedCurrentPart = hasCompletedPart(me, currentPartId);

  const handleFeedbackSubmit = async (rating: number, comment?: string) => {
    if (!storage || !sessionId || !user?.uid) return;
    await submitFeedback(storage.parent, storage.parentId, sessionId, user.uid, { rating, comment });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(FEEDBACK_STORAGE_KEY(sessionId), 'true');
    }
  };

  const handleMarkCompleted = async () => {
    if (!storage || !sessionId || !user?.uid || !currentPartId || hasCompletedCurrentPart) return;
    setMarking(true);
    try {
      await markPartCompleted(storage.parent, storage.parentId, sessionId, user.uid, currentPartId);
    } catch (err) {
      console.error('markPartCompleted:', err);
    } finally {
      setMarking(false);
    }
  };

  return (
    <>
      <FeedbackModal
        open={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
      />
      <div style={{ minHeight: '100vh', padding: 24, background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Card variant="default" padding="lg">
        <h2 style={{ margin: '0 0 8px 0', fontSize: 18 }}>{session.title}</h2>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--am-color-text-muted)' }}>
          Estás en la sesión
        </p>
        {currentPart && (
          <div style={{ marginTop: 16, padding: 12, background: 'var(--am-color-bg-subtle, #f1f5f9)', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--am-color-text-muted)' }}>Parte actual</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{currentPart.title}</div>
            {hasCompletedCurrentPart ? (
              <p style={{ marginTop: 12, color: 'var(--am-color-success, #22c55e)', fontWeight: 600 }}>✓ Parte completada</p>
            ) : (
              <div style={{ marginTop: 12 }}>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleMarkCompleted}
                  disabled={marking}
                  loading={marking}
                >
                  Completé esta parte
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
    </>
  );
};

export default SessionParticipantLiveView;
