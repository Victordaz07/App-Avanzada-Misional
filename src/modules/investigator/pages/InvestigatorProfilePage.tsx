import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBell,
  FaGlobe,
  FaPalette,
  FaCircleQuestion,
  FaSpinner,
  FaRightFromBracket,
  FaIdCard,
  FaQrcode,
} from 'react-icons/fa6';
import DataPrivacySection from '../../../components/DataPrivacySection';
import { SpiritualPathSection } from '../../../components/profile/SpiritualPathSection';
import { LeadersAndTeachersHub } from '../../../components/profile/LeadersAndTeachersHub';
import {
  ProfileRoleHero,
  PersonalProfileCard,
  AppearancePreferencesCard,
  ProfileSettingsMenu,
} from '../../../components/profile/unified';
import { XtgProfileCard } from '../../../components/profile/XtgProfileCard';
import { ProfileQRCode } from '../../../components/profile/ProfileQRCode';
import { useAuth } from '../../../context/AuthContext';
import { useI18n, type Locale } from '../../../context/I18nContext';
import { useTheme } from '../../../context/ThemeContext';
import { LANGUAGE_OPTIONS } from '../../../i18n/locales';
import { LanguageSelectModal } from '../../../components/ui/LanguageSelectModal';
import { ThemeSelectModal, type ThemeChoice } from '../../../components/ui/ThemeSelectModal';
import { patchUserPreferences } from '../../../services/firebase/userService';
import { themeModeLabelKey } from '../../../utils/themeModeLabelKey';
import '../../../components/DataPrivacySection.css';
import '../../new-member/pages/NewMemberProfilePage.css';
import './InvestigatorProfilePage.css';

type IdTab = 'card' | 'qr';

export default function InvestigatorProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const { user, profile, refreshProfile, isLoading: authLoading } = useAuth();
  const { logout } = useAuth();
  const { locale, setLocale, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [idTab, setIdTab] = useState<IdTab>('card');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/register', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLanguageSelect = async (langCode: Locale) => {
    await setLocale(langCode);
    if (user?.uid && (langCode === 'es' || langCode === 'en')) {
      try {
        await patchUserPreferences(user.uid, { preferredLocale: langCode });
        await refreshProfile();
      } catch (err) {
        console.warn('patchUserPreferences preferredLocale:', err);
      }
    }
    setShowLanguageModal(false);
  };

  const handleThemeSelect = (newTheme: ThemeChoice) => {
    setTheme(newTheme);
    setShowThemeModal(false);
  };

  const currentLanguage = LANGUAGE_OPTIONS.find((l) => l.code === locale) || LANGUAGE_OPTIONS[0];

  if (authLoading) {
    return (
      <div className="nm-profile">
        <div className="inv-profile__loading">
          <FaSpinner className="inv-profile__spinner" />
          <span>{t('app.common.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="nm-profile">
      <ProfileRoleHero roleLabelKey="app.profile.friend" />

      <PersonalProfileCard />
      <AppearancePreferencesCard />

      {profile ? (
        <div className="inv-profile__id-section">
          <div className="inv-profile__id-tabs">
            <button
              type="button"
              className={`inv-profile__id-tab ${idTab === 'card' ? 'inv-profile__id-tab--active' : ''}`}
              onClick={() => setIdTab('card')}
            >
              <FaIdCard />
              <span>{t('app.profile.myId')}</span>
            </button>
            <button
              type="button"
              className={`inv-profile__id-tab ${idTab === 'qr' ? 'inv-profile__id-tab--active' : ''}`}
              onClick={() => setIdTab('qr')}
            >
              <FaQrcode />
              <span>{t('app.profile.myQr')}</span>
            </button>
          </div>

          <div className="inv-profile__id-content">
            {idTab === 'card' ? (
              <XtgProfileCard profile={profile} compact />
            ) : (
              <ProfileQRCode profile={profile} compact />
            )}
          </div>
        </div>
      ) : null}

      <SpiritualPathSection classPrefix="nm-profile" />
      <LeadersAndTeachersHub classPrefix="nm-profile" />

      <ProfileSettingsMenu
        sectionTitle={t('app.profile.preferences')}
        rows={[
          {
            id: 'notifications',
            icon: <FaBell />,
            title: t('app.profile.notifications'),
            description: t('app.profile.notificationsDesc'),
            detailAria: t('app.profile.notificationsDesc'),
            disabled: true,
          },
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
            onClick: () => setShowLanguageModal(true),
          },
          {
            id: 'theme',
            icon: <FaPalette />,
            title: t('app.profile.appearance'),
            description: t(themeModeLabelKey(theme)),
            detailAria: t(themeModeLabelKey(theme)),
            onClick: () => setShowThemeModal(true),
          },
        ]}
      />

      <section className="nm-profile__section">
        <h2 className="nm-profile__section-title">{t('app.profile.dataPrivacy')}</h2>
        <DataPrivacySection classPrefix="nm-profile" />
      </section>

      <ProfileSettingsMenu
        sectionTitle={t('app.profile.support')}
        rows={[
          {
            id: 'help',
            icon: <FaCircleQuestion />,
            title: t('app.profile.help'),
            description: t('app.profileNewMember.getAssistance'),
            onClick: () => navigate('/support'),
          },
        ]}
      />

      <section className="nm-profile__section">
        <button type="button" className="inv-profile__logout-btn" onClick={handleLogout}>
          <FaRightFromBracket />
          {t('app.profile.logout')}
        </button>
      </section>

      <div className="nm-profile__version">
        <p className="nm-profile__version-label">{t('app.profile.version', { version: '1.0.0' })}</p>
      </div>

      <LanguageSelectModal
        open={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
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
    </div>
  );
}
