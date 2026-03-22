import React, { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import type { Locale } from '../context/I18nContext';
import { LANGUAGE_OPTIONS } from '../i18n/locales';
import { LanguageSelectModal } from './ui/LanguageSelectModal';
import './LanguagePicker.css';

interface LanguagePickerProps {
  compact?: boolean;
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({ compact = false }) => {
  const { locale, setLocale, t } = useI18n();
  const [modalVisible, setModalVisible] = useState(false);

  const currentLanguage = LANGUAGE_OPTIONS.find((opt) => opt.code === locale);

  const handleLanguageSelect = async (code: Locale) => {
    await setLocale(code);
    setModalVisible(false);
  };

  const modal = (
    <LanguageSelectModal
      open={modalVisible}
      onClose={() => setModalVisible(false)}
      title={t('profile.language')}
      selectedLocale={locale}
      onSelect={handleLanguageSelect}
      cancelLabel={t('common.cancel')}
      closeAriaLabel={t('common.close')}
    />
  );

  if (compact) {
    return (
      <>
        <button type="button" className="language-picker-compact" onClick={() => setModalVisible(true)}>
          <span className="language-picker-code">{currentLanguage?.shortCode}</span>{' '}
          {currentLanguage?.label}
        </button>
        {modal}
      </>
    );
  }

  return (
    <div className="language-picker">
      <button type="button" className="language-picker-button" onClick={() => setModalVisible(true)}>
        {t('profile.language')}: <span className="language-picker-code">{currentLanguage?.shortCode}</span>{' '}
        {currentLanguage?.label}
      </button>
      {modal}
    </div>
  );
};
