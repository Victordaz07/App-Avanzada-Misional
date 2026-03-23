import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGlobe, FaCircleQuestion, FaPalette } from 'react-icons/fa6';
import DataPrivacySection from '../../../components/DataPrivacySection';
import { SpiritualPathSection } from '../../../components/profile/SpiritualPathSection';
import { LeadersAndTeachersHub } from '../../../components/profile/LeadersAndTeachersHub';
import {
  ProfileRoleHero,
  PersonalProfileCard,
  AppearancePreferencesCard,
  ProfileSettingsMenu,
} from '../../../components/profile/unified';
import { useAuth } from '../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { useTheme } from '../../../context/ThemeContext';
import { LANGUAGE_OPTIONS, type Locale } from '../../../i18n/locales';
import { LanguageSelectModal } from '../../../components/ui/LanguageSelectModal';
import { ThemeSelectModal, type ThemeChoice } from '../../../components/ui/ThemeSelectModal';
import { patchUserPreferences } from '../../../services/firebase/userService';
import { themeModeLabelKey } from '../../../utils/themeModeLabelKey';
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

  const currentLanguage =
    LANGUAGE_OPTIONS.find((l) => l.code === locale) ?? LANGUAGE_OPTIONS[0];

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

      <ProfileSettingsMenu
        sectionTitle={t('app.profileNewMember.settings')}
        rows={[
          {
            id: 'language',
            icon: <FaGlobe />,
            title: t('app.profile.language'),
            description: (
              <>
                <span className="up-settings__code">{currentLanguage.shortCode}</span>{' '}
                {currentLanguage.label}
              </>
            ),
            detailAria: `${currentLanguage.shortCode} ${currentLanguage.label}`,
            onClick: () => setShowLangModal(true),
          },
          {
            id: 'theme',
            icon: <FaPalette />,
            title: t('app.profile.appearance'),
            description: t(themeModeLabelKey(theme)),
            onClick: () => setShowThemeModal(true),
          },
          {
            id: 'help',
            icon: <FaCircleQuestion />,
            title: t('app.profileNewMember.helpSupport'),
            description: t('app.profileNewMember.getAssistance'),
            onClick: () => navigate('/support'),
          },
        ]}
      />

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
        cancelLabel={t('app.common.cancel')}
        closeAriaLabel={t('app.common.close')}
      />

      <ThemeSelectModal
        open={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        title={t('app.settings.theme')}
        selectedTheme={theme}
        onSelect={handleThemeSelect}
        cancelLabel={t('app.common.cancel')}
        closeAriaLabel={t('app.common.close')}
      />

      <footer className="nm-profile__version">
        <p className="nm-profile__version-label">{t('app.profile.version', { version: '1.0.0' })}</p>
      </footer>
    </div>
  );
}
