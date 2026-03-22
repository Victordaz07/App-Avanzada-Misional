import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { patchUserPreferences } from '../../../services/firebase/userService';
import {
  COLOR_THEME_PRESET_IDS,
  type ColorThemePresetId,
  type LearningIntensity,
} from '../../../types/user';
import { ACCENT_PRESET_SWATCHES } from '../../../utils/accentPresetSwatches';
import { syncAccentPresetDataAttribute } from '../../../utils/accentPresetDom';
import './unifiedProfileBlocks.css';

const LEARNING_ORDER: LearningIntensity[] = ['low', 'moderate', 'high'];

/** Accent colors + learning pace. Renders nothing if not signed in. */
export function AppearancePreferencesCard(): JSX.Element | null {
  const { t } = useI18n();
  const { user, profile, refreshProfile } = useAuth();
  const [prefError, setPrefError] = useState<string | null>(null);
  const [accentBusy, setAccentBusy] = useState(false);
  const [paceBusy, setPaceBusy] = useState(false);

  if (!user || !profile) {
    return null;
  }

  const selectedAccent: ColorThemePresetId =
    profile.preferences?.colorThemePreset &&
    COLOR_THEME_PRESET_IDS.includes(profile.preferences.colorThemePreset)
      ? profile.preferences.colorThemePreset
      : 'default';

  const selectedPace: LearningIntensity | null =
    profile.preferences?.learningIntensity &&
    LEARNING_ORDER.includes(profile.preferences.learningIntensity)
      ? profile.preferences.learningIntensity
      : null;

  const handleAccentPick = async (id: ColorThemePresetId): Promise<void> => {
    setPrefError(null);
    setAccentBusy(true);
    try {
      await patchUserPreferences(user.uid, { colorThemePreset: id });
      syncAccentPresetDataAttribute(id);
      await refreshProfile();
    } catch (err) {
      console.error(err);
      setPrefError(t('app.profileNewMember.errorGeneric'));
    } finally {
      setAccentBusy(false);
    }
  };

  const handlePacePick = async (pace: LearningIntensity): Promise<void> => {
    setPrefError(null);
    setPaceBusy(true);
    try {
      await patchUserPreferences(user.uid, { learningIntensity: pace });
      await refreshProfile();
    } catch (err) {
      console.error(err);
      setPrefError(t('app.profileNewMember.errorGeneric'));
    } finally {
      setPaceBusy(false);
    }
  };

  return (
    <section className="up-block" aria-labelledby="up-appearance-heading">
      <h2 id="up-appearance-heading" className="up-block__title">
        {t('app.profileNewMember.appearanceSectionTitle')}
      </h2>
      <p className="up-block__desc">{t('app.profileNewMember.appearanceSectionSubtitle')}</p>

      <div className="up-appearance">
        <p className="up-appearance__label">{t('app.profileNewMember.accentTitle')}</p>
        <div className="up-appearance__accent-grid" role="group" aria-label={t('app.profileNewMember.accentTitle')}>
          {COLOR_THEME_PRESET_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`up-appearance__accent-btn ${
                selectedAccent === id ? 'up-appearance__accent-btn--selected' : ''
              }`}
              disabled={accentBusy}
              aria-pressed={selectedAccent === id}
              onClick={() => void handleAccentPick(id)}
            >
              <span
                className="up-appearance__accent-swatch"
                style={{ background: ACCENT_PRESET_SWATCHES[id] }}
              />
              <span className="up-appearance__accent-name">{t(`app.onboarding.theme.presets.${id}`)}</span>
            </button>
          ))}
        </div>

        <p className="up-appearance__label up-appearance__label--spaced">
          {t('app.profileNewMember.learningPaceTitle')}
        </p>
        <div
          className="up-appearance__pace-row"
          role="group"
          aria-label={t('app.profileNewMember.learningPaceTitle')}
        >
          {LEARNING_ORDER.map((pace) => (
            <button
              key={pace}
              type="button"
              className={`up-appearance__pace-chip ${
                selectedPace === pace ? 'up-appearance__pace-chip--selected' : ''
              }`}
              disabled={paceBusy}
              aria-pressed={selectedPace === pace}
              onClick={() => void handlePacePick(pace)}
            >
              {t(`app.onboarding.intensity.options.${pace}.title`)}
            </button>
          ))}
        </div>

        {prefError ? (
          <p className="up-appearance__error" role="alert">
            {prefError}
          </p>
        ) : null}
      </div>
    </section>
  );
}
