/**
 * Session Create Page
 *
 * Crear sesión en draft bajo users/{uid}/teachingSessions (sin barrio).
 */

import { leadersAppUrl } from '../../../leadersPaths';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMemberSpiritualPath } from '../../../../hooks/useMemberSpiritualPath';
import { useI18n } from '../../../context/I18nContext';
import { useTrainingStore } from '../../../../modules/training/store/useTrainingStore';
import { isTeachingSaviorsWayComplete } from '../../../../modules/training/utils/trainingPrerequisites';
import { createDraftSession } from '../services/teachingSessionsService';
import type { CallingType, TeachingSessionPart } from '../types';
import { CLASS_WITHIN_ORG_OPTIONS } from '../config/classWithinOrganizationOptions';
import {
  PageShell,
  Card,
  Button,
  SectionTitle,
  TeachingCanonShell,
  TeachingCanonHeroHeader,
} from '../../../ui';

const CALLING_ORDER: CallingType[] = [
  'sunday_school',
  'seminary',
  'quorum',
  'relief_society',
  'primary',
  'other',
];

function generatePartId(): string {
  return `part_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

const SessionCreatePage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trainingUnlockStage } = useMemberSpiritualPath();
  const completedLessons = useTrainingStore((s) => s.completedLessons);
  const tswComplete = isTeachingSaviorsWayComplete(completedLessons);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [callingType, setCallingType] = useState<CallingType>('sunday_school');
  const [classWithinOrg, setClassWithinOrg] = useState<string>(
    () => CLASS_WITHIN_ORG_OPTIONS.sunday_school[0]
  );
  const [parts, setParts] = useState<TeachingSessionPart[]>([
    { id: generatePartId(), title: '', order: 0, estimatedMinutes: 10 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const opts = CLASS_WITHIN_ORG_OPTIONS[callingType];
    if (opts.length > 0) {
      setClassWithinOrg((prev) => (opts.includes(prev) ? prev : opts[0]));
    } else {
      setClassWithinOrg('');
    }
  }, [callingType]);

  const addPart = () => {
    setParts((prev) => [
      ...prev,
      {
        id: generatePartId(),
        title: '',
        order: prev.length,
        estimatedMinutes: 10,
      },
    ]);
  };

  const updatePart = (id: string, patch: Partial<TeachingSessionPart>) => {
    setParts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const removePart = (id: string) => {
    setParts((prev) => prev.filter((p) => p.id !== id));
  };

  const movePart = (id: string, direction: 'up' | 'down') => {
    setParts((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr.map((p, i) => ({ ...p, order: i }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !title.trim()) return;

    const desc = description.trim();
    if (!desc) {
      setError(t('leadership.canon.sessionCreateDescriptionRequired'));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const orderedParts = parts
        .map((p, i) => ({ ...p, order: i }))
        .filter((p) => p.title.trim());
      const classOpts = CLASS_WITHIN_ORG_OPTIONS[callingType];
      const classPayload =
        callingType === 'other'
          ? classWithinOrg.trim() || undefined
          : classOpts.length > 0
            ? classWithinOrg
            : undefined;

      const sessionId = await createDraftSession(
        user.uid,
        user.displayName ?? user.email ?? 'Maestro',
        {
          title: title.trim(),
          callingType,
          description: desc,
          classWithinOrganization: classPayload,
          parts: orderedParts.length ? orderedParts : [{ id: generatePartId(), title: 'Parte 1', order: 0, estimatedMinutes: 10 }],
        }
      );
      navigate(leadersAppUrl(`teaching/${sessionId}`));
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Error al crear sesión');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--am-radius-sm, 10px)',
    border: '1px solid var(--am-color-border, #e2e8f0)',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: 'white',
    boxSizing: 'border-box',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: 100,
    resize: 'vertical' as const,
    lineHeight: 1.45,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--am-color-text-main, #0f172a)',
    marginBottom: '8px',
  };

  if (!user?.uid) {
    return (
      <PageShell onBack={() => navigate(-1)} variant="gradient">
        <TeachingCanonShell>
          <p style={{ color: 'var(--am-color-text-muted)' }}>Inicia sesión para crear una sesión.</p>
        </TeachingCanonShell>
      </PageShell>
    );
  }

  if (trainingUnlockStage === 'seeking') {
    return (
      <PageShell onBack={() => navigate(-1)} variant="gradient">
        <TeachingCanonShell>
          <Card variant="default" padding="lg">
            <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>
              {t('leadership.canon.trainingGateSeekingTeacherTitle')}
            </h2>
            <p style={{ lineHeight: 1.55, color: 'var(--am-color-text-main, #0f172a)' }}>
              {t('leadership.canon.trainingGateSeekingTeacherBody')}
            </p>
            <div style={{ marginTop: 20 }}>
              <Button variant="primary" fullWidth onClick={() => navigate('/profile')}>
                {t('leadership.canon.trainingGateProfileCta')}
              </Button>
            </div>
          </Card>
        </TeachingCanonShell>
      </PageShell>
    );
  }

  if (!tswComplete) {
    return (
      <PageShell onBack={() => navigate(-1)} variant="gradient">
        <TeachingCanonShell>
          <Card variant="default" padding="lg">
            <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>
              {t('leadership.canon.trainingGateTswTitle')}
            </h2>
            <p style={{ lineHeight: 1.55, color: 'var(--am-color-text-main, #0f172a)' }}>
              {t('leadership.canon.trainingGateTswBody')}
            </p>
            <div style={{ marginTop: 20 }}>
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/training/teaching-saviors-way')}
              >
                {t('leadership.canon.trainingGateTswCta')}
              </Button>
            </div>
          </Card>
        </TeachingCanonShell>
      </PageShell>
    );
  }

  return (
    <PageShell onBack={() => navigate(-1)} variant="gradient">
      <TeachingCanonShell>
        <TeachingCanonHeroHeader
          categoryLabel={t('leadership.canon.teachingEyebrow')}
          title={t('leadership.canon.sessionCreatePageTitle')}
          subtitle={t('leadership.canon.sessionCreateSubtitle')}
          heroNote={t('leadership.canon.sessionCreateHeroNote')}
        />
        <form onSubmit={handleSubmit}>
        <Card variant="default" padding="lg" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label htmlFor="title" style={labelStyle}>Título *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Lección 5 - La fe"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="callingType" style={labelStyle}>
                {t('leadership.canon.sessionOrganizationLabel')}
              </label>
              <select
                id="callingType"
                value={callingType}
                onChange={(e) => setCallingType(e.target.value as CallingType)}
                required
                style={inputStyle}
              >
                {CALLING_ORDER.map((value) => (
                  <option key={value} value={value}>
                    {t(`leadership.canon.callingType.${value}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" style={labelStyle}>
                {t('leadership.canon.sessionWhatYouTeachLabel')} *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('leadership.canon.sessionWhatYouTeachPlaceholder')}
                required
                style={textareaStyle}
              />
            </div>
            <div>
              <label htmlFor="classWithinOrg" style={labelStyle}>
                {callingType === 'other'
                  ? t('leadership.canon.sessionClassWithinOrgFreeLabel')
                  : t('leadership.canon.sessionClassWithinOrgLabel')}
                {callingType !== 'other' ? ' *' : ''}
              </label>
              {CLASS_WITHIN_ORG_OPTIONS[callingType].length > 0 ? (
                <select
                  id="classWithinOrg"
                  value={classWithinOrg}
                  onChange={(e) => setClassWithinOrg(e.target.value)}
                  required
                  style={inputStyle}
                >
                  {CLASS_WITHIN_ORG_OPTIONS[callingType].map((value) => (
                    <option key={value} value={value}>
                      {t(`leadership.canon.sessionClassOption.${value}`)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="classWithinOrg"
                  type="text"
                  value={classWithinOrg}
                  onChange={(e) => setClassWithinOrg(e.target.value)}
                  placeholder={t('leadership.canon.sessionClassWithinOrgFreeLabel')}
                  style={inputStyle}
                />
              )}
            </div>
          </div>
        </Card>

        <SectionTitle>{t('leadership.canon.sessionPartsSectionTitle')}</SectionTitle>
        <Card variant="default" padding="lg" style={{ marginBottom: 24 }}>
          {parts.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                marginBottom: i < parts.length - 1 ? 12 : 0,
              }}
            >
              <input
                type="text"
                value={p.title}
                onChange={(e) => updatePart(p.id, { title: e.target.value })}
                placeholder={`Parte ${i + 1}`}
                style={{ ...inputStyle, flex: 1 }}
              />
              <input
                type="number"
                min={1}
                max={120}
                value={p.estimatedMinutes ?? 10}
                onChange={(e) =>
                  updatePart(p.id, { estimatedMinutes: parseInt(e.target.value, 10) || 10 })
                }
                style={{ ...inputStyle, width: 70 }}
                title="Minutos"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => movePart(p.id, 'up')}
                disabled={i === 0}
              >
                ↑
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => movePart(p.id, 'down')}
                disabled={i === parts.length - 1}
              >
                ↓
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePart(p.id)}
                disabled={parts.length <= 1}
              >
                ✕
              </Button>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <Button type="button" variant="secondary" onClick={addPart}>
              {t('leadership.canon.sessionAddPart')}
            </Button>
          </div>
        </Card>

        {error && (
          <p style={{ color: 'var(--am-color-error, #dc2626)', marginBottom: 16 }}>{error}</p>
        )}
        <Button type="submit" variant="primary" fullWidth loading={loading}>
          {t('leadership.canon.sessionCreateSubmit')}
        </Button>
        </form>
      </TeachingCanonShell>
    </PageShell>
  );
};

export default SessionCreatePage;
