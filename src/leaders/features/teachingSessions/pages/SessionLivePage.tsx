/**
 * Session Live Page
 *
 * Vista en tiempo real: parte actual, controles, lista de participantes (vacía en Fase 1).
 * subscribeToSession → onSnapshot.
 * Guard: Si status !== 'active' → mostrar "Activa la sesión para iniciar el modo en vivo".
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { useWardStore } from '../../../state/ward/useWardStore';
import {
  findSessionForTeacher,
  subscribeToSession,
  setCurrentPart,
  completeSession,
} from '../services/teachingSessionsService';
import type { SessionStorageParent } from '../services/sessionStoragePaths';
import { subscribeToParticipants, hasCompletedPart } from '../services/participantsService';
import type { TeachingSession, SessionParticipant } from '../types';
import {
  PageShell,
  Card,
  Button,
  SectionTitle,
  TeachingCanonShell,
  TeachingCanonHeroHeader,
} from '../../../ui';

const SessionLivePage: React.FC = () => {
  const { t } = useI18n();
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { membership } = useWardStore();
  const [session, setSession] = useState<TeachingSession | null>(null);
  const [participants, setParticipants] = useState<SessionParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storage, setStorage] = useState<{
    parent: SessionStorageParent;
    parentId: string;
  } | null>(null);

  const wardId = membership?.wardId;

  useEffect(() => {
    if (!sessionId || !user?.uid) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    findSessionForTeacher(user.uid, wardId, sessionId)
      .then((r) => {
        if (cancelled) return;
        if (!r) {
          setStorage(null);
          setSession(null);
          setLoading(false);
          return;
        }
        setStorage({ parent: r.parent, parentId: r.parentId });
      })
      .catch(() => {
        if (!cancelled) {
          setStorage(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [sessionId, user?.uid, wardId]);

  useEffect(() => {
    if (!storage || !sessionId) return;
    const unsub = subscribeToSession(storage.parent, storage.parentId, sessionId, (s) => {
      setSession(s);
      setLoading(false);
    });
    return () => unsub();
  }, [storage, sessionId]);

  useEffect(() => {
    if (!storage || !sessionId) return;
    const unsub = subscribeToParticipants(storage.parent, storage.parentId, sessionId, setParticipants);
    return () => unsub();
  }, [storage, sessionId]);

  const currentPartId = session?.currentPartId ?? null;
  const currentPart = session?.parts.find((p) => p.id === currentPartId);
  const currentIndex = session?.parts.findIndex((p) => p.id === currentPartId) ?? -1;
  const completedCount = participants.filter((p) => hasCompletedPart(p, currentPartId)).length;
  const totalParticipants = participants.length;
  const prevPart = currentIndex > 0 ? session?.parts[currentIndex - 1] : null;
  const nextPart = currentIndex >= 0 && currentIndex < (session?.parts.length ?? 0) - 1
    ? session?.parts[currentIndex + 1]
    : null;

  const handlePrev = async () => {
    if (!storage || !sessionId || !prevPart || session?.teacherUid !== user?.uid) return;
    setUpdating(true);
    try {
      await setCurrentPart(storage.parent, storage.parentId, sessionId, prevPart.id);
    } catch (err) {
      setError((err as Error)?.message ?? 'Error');
    } finally {
      setUpdating(false);
    }
  };

  const handleNext = async () => {
    if (!storage || !sessionId || !nextPart || session?.teacherUid !== user?.uid) return;
    setUpdating(true);
    try {
      await setCurrentPart(storage.parent, storage.parentId, sessionId, nextPart.id);
    } catch (err) {
      setError((err as Error)?.message ?? 'Error');
    } finally {
      setUpdating(false);
    }
  };

  const handleComplete = async () => {
    if (!storage || !sessionId || session?.teacherUid !== user?.uid) return;
    setUpdating(true);
    try {
      await completeSession(storage.parent, storage.parentId, sessionId);
      navigate(`/leaders/app/teaching/${sessionId}/report`, { replace: true });
    } catch (err) {
      setError((err as Error)?.message ?? 'Error');
    } finally {
      setUpdating(false);
    }
  };

  if (!sessionId) {
    return (
      <PageShell title="En vivo" onBack={() => navigate(-1)} variant="gradient">
        <p>Parámetros inválidos.</p>
      </PageShell>
    );
  }

  if (loading && !session) {
    return (
      <PageShell title="En vivo" onBack={() => navigate(-1)} variant="gradient">
        <p>Cargando...</p>
      </PageShell>
    );
  }

  if (!session) {
    return (
      <PageShell title="En vivo" onBack={() => navigate(-1)} variant="gradient">
        <p>Sesión no encontrada.</p>
      </PageShell>
    );
  }

  if (session.status !== 'active') {
    return (
      <PageShell title="En vivo" onBack={() => navigate(-1)} variant="gradient">
        <Card variant="default" padding="lg">
          <p style={{ margin: 0 }}>
            Activa la sesión para iniciar el modo en vivo.
          </p>
          <div style={{ marginTop: 16 }}>
            <Button
              variant="primary"
              onClick={() => navigate(`/leaders/app/teaching/${sessionId}`)}
            >
              Volver a la sesión
            </Button>
          </div>
        </Card>
      </PageShell>
    );
  }

  if (session.teacherUid !== user?.uid) {
    return (
      <PageShell title="En vivo" onBack={() => navigate(-1)} variant="gradient">
        <p>No tienes permiso para ver esta sesión en vivo.</p>
      </PageShell>
    );
  }

  const liveSubtitle = t('leadership.canon.sessionLiveSubtitle', {
    calling: t(`leadership.canon.callingType.${session.callingType}`),
  });

  return (
    <PageShell onBack={() => navigate(`/leaders/app/teaching/${sessionId}`)} variant="gradient">
      <TeachingCanonShell>
        <TeachingCanonHeroHeader
          categoryLabel={t('leadership.canon.sessionLiveEyebrow')}
          title={session.title}
          subtitle={liveSubtitle}
          heroNote={t('leadership.canon.sessionLiveHeroNote')}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        {/* Parte actual */}
        <Card variant="default" padding="lg">
          <SectionTitle>Parte actual</SectionTitle>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              marginTop: 8,
              minHeight: 40,
            }}
          >
            {currentPart?.title ?? '—'}
          </div>
          {currentPart?.estimatedMinutes && (
            <span style={{ fontSize: 14, color: 'var(--am-color-text-muted)' }}>
              ~{currentPart.estimatedMinutes} min
            </span>
          )}
        </Card>

        {/* Controles */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={!prevPart || updating}
          >
            ← Anterior
          </Button>
          <Button
            variant="secondary"
            onClick={handleNext}
            disabled={!nextPart || updating}
          >
            Siguiente →
          </Button>
          <Button
            variant="destructive"
            onClick={handleComplete}
            disabled={updating}
          >
            Finalizar sesión
          </Button>
        </div>

        {error && (
          <p style={{ color: 'var(--am-color-error, #dc2626)', fontSize: 14 }}>{error}</p>
        )}

        {/* Participantes en tiempo real */}
        <Card variant="default" padding="lg">
          <SectionTitle>Participantes ({totalParticipants})</SectionTitle>
          {currentPartId && totalParticipants > 0 && (
            <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px 0', color: 'var(--am-color-text)' }}>
              Completaron esta parte: {completedCount} / {totalParticipants}
            </p>
          )}
          {participants.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--am-color-text-muted)', margin: 0 }}>
              Aún no hay participantes. Comparte el código para que se unan.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {participants.map((p) => {
                const completed = hasCompletedPart(p, currentPartId);
                return (
                  <li
                    key={p.uid}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--am-color-border, #e2e8f0)',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 600 }}>{p.displayName}</span>
                      {p.xtgId && (
                        <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--am-color-text-muted)' }}>
                          {p.xtgId}
                        </span>
                      )}
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {currentPartId && (
                        <span
                          style={{
                            fontSize: 14,
                            color: completed ? 'var(--am-color-success, #22c55e)' : 'var(--am-color-text-muted)',
                          }}
                        >
                          {completed ? '✓' : '⏳'}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 11,
                          color: p.presence === 'present' ? 'var(--am-color-success, #22c55e)' : 'var(--am-color-text-muted)',
                        }}
                      >
                        {p.presence === 'present' ? '●' : '○'}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
        </div>
      </TeachingCanonShell>
    </PageShell>
  );
};

export default SessionLivePage;
