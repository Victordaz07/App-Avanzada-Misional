import React from 'react';
import { FaSun, FaMoon, FaCircleHalfStroke } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { OptionPickerModal } from './OptionPickerModal';
import { OptionPickerRow } from './OptionPickerRow';

export type ThemeChoice = 'light' | 'dark' | 'system';

const THEME_ROWS: {
  value: ThemeChoice;
  shortCode: string;
  icon: React.ReactNode;
  labelKey: string;
}[] = [
  { value: 'light', shortCode: 'CL', icon: <FaSun />, labelKey: 'app.settings.themeLight' },
  { value: 'dark', shortCode: 'OS', icon: <FaMoon />, labelKey: 'app.settings.themeDark' },
  {
    value: 'system',
    shortCode: 'AU',
    icon: <FaCircleHalfStroke />,
    labelKey: 'app.settings.themeSystem',
  },
];

export interface ThemeSelectModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  selectedTheme: ThemeChoice;
  onSelect: (theme: ThemeChoice) => void;
  cancelLabel?: string;
  closeAriaLabel?: string;
}

export function ThemeSelectModal({
  open,
  onClose,
  title,
  selectedTheme,
  onSelect,
  cancelLabel,
  closeAriaLabel,
}: ThemeSelectModalProps): JSX.Element | null {
  const { t } = useI18n();

  return (
    <OptionPickerModal
      open={open}
      onClose={onClose}
      title={title}
      cancelLabel={cancelLabel}
      closeAriaLabel={closeAriaLabel}
    >
      {THEME_ROWS.map((opt) => (
        <OptionPickerRow
          key={opt.value}
          shortCode={opt.shortCode}
          label={
            <>
              <span className="xtg-opmodal-theme-icon" aria-hidden>
                {opt.icon}
              </span>
              {t(opt.labelKey)}
            </>
          }
          selected={selectedTheme === opt.value}
          onClick={() => onSelect(opt.value)}
        />
      ))}
    </OptionPickerModal>
  );
}
