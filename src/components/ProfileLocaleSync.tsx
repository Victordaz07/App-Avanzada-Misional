import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { syncAccentPresetDataAttribute } from '../utils/accentPresetDom';

/**
 * Applies `preferredLocale` and accent preset from Firestore profile to the client.
 */
const ProfileLocaleSync: React.FC = () => {
  const { profile } = useAuth();
  const { setLocale } = useI18n();

  useEffect(() => {
    const loc = profile?.preferences?.preferredLocale;
    if (loc === 'es' || loc === 'en') {
      void setLocale(loc);
    }
  }, [profile?.preferences?.preferredLocale, setLocale]);

  useEffect(() => {
    syncAccentPresetDataAttribute(profile?.preferences?.colorThemePreset);
  }, [profile?.preferences?.colorThemePreset]);

  return null;
};

export default ProfileLocaleSync;
