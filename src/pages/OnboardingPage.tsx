import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { completeOnboarding } from '../services/firebase/userService';
import { getPostLoginDestination } from '../utils/authRedirect';
import {
  COLOR_THEME_PRESET_IDS,
  isProfileFullyOnboarded,
  type AgeBand,
  type ColorThemePresetId,
  type LearningIntensity,
  type OnboardingChurchRelationship,
  type ProfileGender,
} from '../types/user';
import { ACCENT_PRESET_SWATCHES } from '../utils/accentPresetSwatches';
import './OnboardingPage.css';

const STEP_COUNT = 6;

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, locale, setLocale } = useI18n();
  const { user, profile, refreshProfile } = useAuth();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [churchRelationship, setChurchRelationship] =
    useState<OnboardingChurchRelationship | null>(null);
  const [learningIntensity, setLearningIntensity] =
    useState<LearningIntensity | null>(null);
  const [ageBand, setAgeBand] = useState<AgeBand | null>(null);
  const [guardianConfirmed, setGuardianConfirmed] = useState(false);
  const [gender, setGender] = useState<ProfileGender | null>(null);
  const [preferredLocale, setPreferredLocaleState] = useState<'es' | 'en'>(locale);
  const [colorThemePreset, setColorThemePreset] =
    useState<ColorThemePresetId>('default');

  useEffect(() => {
    setPreferredLocaleState(locale);
  }, [locale]);

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent('/onboarding')}`, { replace: true });
      return;
    }
    if (profile && isProfileFullyOnboarded(profile)) {
      navigate(getPostLoginDestination(searchParams), { replace: true });
    }
  }, [user, profile, navigate, searchParams]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return churchRelationship !== null;
      case 1:
        return learningIntensity !== null;
      case 2:
        if (!ageBand) return false;
        if (ageBand === 'child_8_12') return guardianConfirmed;
        return true;
      case 3:
        return gender !== null;
      case 4:
        return preferredLocale === 'es' || preferredLocale === 'en';
      case 5:
        return COLOR_THEME_PRESET_IDS.includes(colorThemePreset);
      default:
        return false;
    }
  }, [
    step,
    churchRelationship,
    learningIntensity,
    ageBand,
    guardianConfirmed,
    gender,
    preferredLocale,
    colorThemePreset,
  ]);

  const goNext = useCallback(() => {
    setError(null);
    if (step < STEP_COUNT - 1) {
      setStep((s) => s + 1);
    }
  }, [step]);

  const goBack = useCallback(() => {
    setError(null);
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }, [step]);

  const handleFinish = async () => {
    if (!user || !churchRelationship || !learningIntensity || !ageBand || !gender) {
      setError(t('app.onboarding.errors.incomplete'));
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await completeOnboarding(user.uid, {
        churchRelationship,
        gender,
        learningIntensity,
        ageBand,
        preferredLocale,
        colorThemePreset,
        guardianSupervisionConfirmed:
          ageBand === 'child_8_12' ? guardianConfirmed : false,
      });
      await setLocale(preferredLocale);
      await refreshProfile();
      navigate(getPostLoginDestination(searchParams), { replace: true });
    } catch (e) {
      console.error(e);
      setError(t('app.onboarding.errors.saveFailed'));
    } finally {
      setLoading(false);
    }
  };

  const selectLocale = async (code: 'es' | 'en') => {
    setPreferredLocaleState(code);
    await setLocale(code);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h2 className="onb-title">{t('app.onboarding.church.title')}</h2>
            <p className="onb-subtitle">{t('app.onboarding.church.subtitle')}</p>
            <div className="onb-options" style={{ marginTop: 20 }}>
              {(
                [
                  'discovering',
                  'member',
                  'new_convert',
                ] as OnboardingChurchRelationship[]
              ).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`onb-option ${churchRelationship === key ? 'onb-option--selected' : ''}`}
                  onClick={() => setChurchRelationship(key)}
                >
                  <div>
                    <p className="onb-option-title">
                      {t(`app.onboarding.church.options.${key}.title`)}
                    </p>
                    <p className="onb-option-desc">
                      {t(`app.onboarding.church.options.${key}.desc`)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="onb-title">{t('app.onboarding.intensity.title')}</h2>
            <p className="onb-subtitle">{t('app.onboarding.intensity.subtitle')}</p>
            <div className="onb-options" style={{ marginTop: 20 }}>
              {(['low', 'moderate', 'high'] as LearningIntensity[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`onb-option ${learningIntensity === key ? 'onb-option--selected' : ''}`}
                  onClick={() => setLearningIntensity(key)}
                >
                  <div>
                    <p className="onb-option-title">
                      {t(`app.onboarding.intensity.options.${key}.title`)}
                    </p>
                    <p className="onb-option-desc">
                      {t(`app.onboarding.intensity.options.${key}.desc`)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="onb-title">{t('app.onboarding.age.title')}</h2>
            <p className="onb-subtitle">{t('app.onboarding.age.subtitle')}</p>
            <div className="onb-options" style={{ marginTop: 20 }}>
              {(['child_8_12', 'teen_13_17', 'adult_18_99'] as AgeBand[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`onb-option ${ageBand === key ? 'onb-option--selected' : ''}`}
                  onClick={() => {
                    setAgeBand(key);
                    if (key !== 'child_8_12') setGuardianConfirmed(false);
                  }}
                >
                  <div>
                    <p className="onb-option-title">
                      {t(`app.onboarding.age.options.${key}.title`)}
                    </p>
                    <p className="onb-option-desc">
                      {t(`app.onboarding.age.options.${key}.desc`)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {ageBand === 'child_8_12' && (
              <div className="onb-guardian">
                <label>
                  <input
                    type="checkbox"
                    checked={guardianConfirmed}
                    onChange={(e) => setGuardianConfirmed(e.target.checked)}
                  />
                  <span>{t('app.onboarding.age.guardianCheckbox')}</span>
                </label>
                <p className="onb-option-desc" style={{ marginTop: 10, marginBottom: 0 }}>
                  {t('app.onboarding.age.guardianNote')}
                </p>
              </div>
            )}
          </>
        );
      case 3:
        return (
          <>
            <h2 className="onb-title">{t('app.onboarding.gender.title')}</h2>
            <p className="onb-subtitle">{t('app.onboarding.gender.subtitle')}</p>
            <div className="onb-options" style={{ marginTop: 20 }}>
              {(['male', 'female', 'prefer_not_to_say'] as ProfileGender[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`onb-option ${gender === key ? 'onb-option--selected' : ''}`}
                  onClick={() => setGender(key)}
                >
                  <div style={{ width: '100%' }}>
                    <p className="onb-option-title">
                      {t(`app.onboarding.gender.options.${key}.title`)}
                    </p>
                    {key === 'prefer_not_to_say' && (
                      <p className="onb-pastoral">
                        {t('app.onboarding.gender.options.prefer_not_to_say.pastoralNote')}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="onb-title">{t('app.onboarding.locale.title')}</h2>
            <p className="onb-subtitle">{t('app.onboarding.locale.subtitle')}</p>
            <div className="onb-lang-row" style={{ marginTop: 20 }}>
              <button
                type="button"
                className={`onb-lang-btn ${preferredLocale === 'es' ? 'onb-lang-btn--selected' : ''}`}
                onClick={() => void selectLocale('es')}
              >
                {t('app.onboarding.locale.es')}
              </button>
              <button
                type="button"
                className={`onb-lang-btn ${preferredLocale === 'en' ? 'onb-lang-btn--selected' : ''}`}
                onClick={() => void selectLocale('en')}
              >
                {t('app.onboarding.locale.en')}
              </button>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="onb-title">{t('app.onboarding.theme.title')}</h2>
            <p className="onb-subtitle">{t('app.onboarding.theme.subtitle')}</p>
            <div className="onb-theme-grid" style={{ marginTop: 20 }}>
              {COLOR_THEME_PRESET_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`onb-theme-card ${colorThemePreset === id ? 'onb-theme-card--selected' : ''}`}
                  onClick={() => setColorThemePreset(id)}
                >
                  <div
                    className="onb-theme-swatch"
                    style={{ background: ACCENT_PRESET_SWATCHES[id] }}
                  />
                  <div className="onb-theme-name">{t(`app.onboarding.theme.presets.${id}`)}</div>
                </button>
              ))}
            </div>
            {profile?.xthegospelId && (
              <p className="onb-id-note">
                {t('app.onboarding.idReminder')}{' '}
                <strong>{profile.xthegospelId}</strong>
              </p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="onb-page">
      <div className="onb-container">
        <div className="onb-progress">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <div
              key={i}
              className={`onb-progress-dot ${i <= step ? 'onb-progress-dot--active' : ''}`}
            />
          ))}
        </div>

        <div className="onb-header">
          <p className="onb-subtitle" style={{ marginBottom: 8 }}>
            {t('app.onboarding.stepLabel', { current: step + 1, total: STEP_COUNT })}
          </p>
        </div>

        {renderStep()}

        {error && <div className="onb-error">{error}</div>}

        <div className="onb-nav">
          {step > 0 && (
            <button type="button" className="onb-btn onb-btn-secondary" onClick={goBack}>
              <FaArrowLeft style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {t('app.onboarding.back')}
            </button>
          )}
          {step < STEP_COUNT - 1 ? (
            <button
              type="button"
              className="onb-btn onb-btn-primary"
              disabled={!canProceed}
              onClick={goNext}
            >
              {t('app.onboarding.next')}
            </button>
          ) : (
            <button
              type="button"
              className="onb-btn onb-btn-primary"
              disabled={!canProceed || loading}
              onClick={() => void handleFinish()}
            >
              {loading ? (
                <>
                  <FaSpinner className="onb-spinner" style={{ marginRight: 8 }} />
                  {t('app.onboarding.saving')}
                </>
              ) : (
                t('app.onboarding.finish')
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
