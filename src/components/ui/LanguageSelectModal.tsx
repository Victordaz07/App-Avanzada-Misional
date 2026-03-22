import React from 'react';
import type { Locale } from '../../context/I18nContext';
import { LANGUAGE_OPTIONS } from '../../i18n/locales';
import { OptionPickerModal } from './OptionPickerModal';
import { OptionPickerRow } from './OptionPickerRow';

export interface LanguageSelectModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  selectedLocale: Locale;
  onSelect: (code: Locale) => void | Promise<void>;
  cancelLabel?: string;
  closeAriaLabel?: string;
}

export function LanguageSelectModal({
  open,
  onClose,
  title,
  selectedLocale,
  onSelect,
  cancelLabel,
  closeAriaLabel,
}: LanguageSelectModalProps): JSX.Element | null {
  return (
    <OptionPickerModal
      open={open}
      onClose={onClose}
      title={title}
      cancelLabel={cancelLabel}
      closeAriaLabel={closeAriaLabel}
    >
      {LANGUAGE_OPTIONS.map((opt) => (
        <OptionPickerRow
          key={opt.code}
          shortCode={opt.shortCode}
          label={opt.label}
          selected={selectedLocale === opt.code}
          onClick={() => {
            void onSelect(opt.code);
          }}
        />
      ))}
    </OptionPickerModal>
  );
}
