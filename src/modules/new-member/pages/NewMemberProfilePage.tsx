import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChevronRight,
  FaGlobe,
  FaCircleQuestion,
  FaPalette,
} from 'react-icons/fa6';
import DataPrivacySection from '../../../components/DataPrivacySection';
import { SpiritualPathSection } from '../../../components/profile/SpiritualPathSection';
import { LeadersAndTeachersHub } from '../../../components/profile/LeadersAndTeachersHub';
import {
  ProfileRoleHero,
  PersonalProfileCard,
  AppearancePreferencesCard,
} from '../../../components/profile/unified';
import { useAuth } from '../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { useTheme } from '../../../context/ThemeContext';
import { LANGUAGE_OPTIONS, type Locale } from '../../../i18n/locales';
import { LanguageSelectModal } from '../../../components/ui/LanguageSelectModal';
import { ThemeSelectModal, type ThemeChoice } from '../../../components/ui/ThemeSelectModal';
import { patchUserPreferences } from '../../../services/firebase/userService';
import '../../../components/DataPrivacySection.css';
import './NewMemberProfilePage.css';

/**
 * New Member Profile Page — shell around shared profile blocks (hero, personal, appearance).
 */
export default function NewMemberProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const { user, refreshProfile } = useAuth();
  const [showLangModal, setShowLangModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const currentLanguage = LANGUAGE_OPTIONS.find((l) => l.code === locale);

  const handleLanguageSelect = async (code: Locale): Promise<void> => {
    await setLocale(code);
    if (user?.uid && (code === 'es' || code === 'en')) {
      try {
        await patchUserPreferences(user.uid, { preferredLocale: code });
        await refreshProfile();
      } catch (err) {
        console.warn('patchUserPreferences preferredLocale:', err);
      }
    }
    setShowLangModal(false);
  };

  const handleThemeSelect = (choice: ThemeChoice): void => {
    setTheme(choice);
    setShowThemeModal(false);
  };

  return (
    <div className="nm-profile">
      <ProfileRoleHero roleLabelKey="app.profile.member" />

      <PersonalProfileCard />

      <SpiritualPathSection classPrefix="nm-profile" />
      <LeadersAndTeachersHub classPrefix="nm-profile" />

      <AppearancePreferencesCard />

      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profileNewMember.myWardFamily')}</h2>
        <div className="nm-profile__ward-info">
          <p className="nm-profile__ward-text">{t('app.profileNewMember.wardInfo')}</p>
        </div>
      </section>

      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profileNewMember.settings')}</h2>
        <div className="nm-profile__settings">
          <button type="button" className="nm-profile__setting" onClick={() => setShowLangModal(true)}>
            <div className="nm-profile__setting-icon">
              <FaGlobe />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">{t('app.profile.language')}</h3>
              <p className="nm-profile__setting-desc">
                <span className="nm-profile__setting-code">{currentLanguage?.shortCode}</span>{' '}
                {currentLanguage?.label ?? locale.toUpperCase()}
              </p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>

          <button type="button" className="nm-profile__setting" onClick={() => setShowThemeModal(true)}>
            <div className="nm-profile__setting-icon">
              <FaPalette />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">{t('app.profile.appearance')}</h3>
              <p className="nm-profile__setting-desc">
                {t(`app.settings.theme${theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}`)}
              </p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>

          <button type="button" className="nm-profile__setting" onClick={() => navigate('/support')}>
            <div className="nm-profile__setting-icon">
              <FaCircleQuestion />
            </div>
            <div className="nm-profile__setting-content">
              <h3 className="nm-profile__setting-title">{t('app.profileNewMember.helpSupport')}</h3>
              <p className="nm-profile__setting-desc">{t('app.profileNewMember.getAssistance')}</p>
            </div>
            <FaChevronRight className="nm-profile__setting-arrow" />
          </button>
        </div>
      </section>

      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profile.dataPrivacy')}</h2>
        <DataPrivacySection classPrefix="nm-profile" />
      </section>

      <LanguageSelectModal
        open={showLangModal}
        onClose={() => setShowLangModal(false)}
        title={t('app.profile.language')}
        selectedLocale={locale}
        onSelect={handleLanguageSelect}
        cancelLabel={t('common.cancel')}
        closeAriaLabel={t('common.close')}
      />

      <ThemeSelectModal
        open={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        title={t('app.settings.theme')}
        selectedTheme={theme}
        onSelect={handleThemeSelect}
        cancelLabel={t('common.cancel')}
        closeAriaLabel={t('common.close')}
      />

      <footer className="nm-profile__version">
        <p className="nm-profile__version-label">{t('app.profile.version', { version: '1.0.0' })}</p>
      </footer>
    </div>
  );
}
