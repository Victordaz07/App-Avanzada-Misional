import React from 'react';
import { FaCheck } from 'react-icons/fa6';

export interface OptionPickerRowProps {
  shortCode: string;
  label: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function OptionPickerRow({
  shortCode,
  label,
  selected,
  onClick,
}: OptionPickerRowProps): JSX.Element {
  return (
    <button
      type="button"
      className={`xtg-opmodal-row ${selected ? 'xtg-opmodal-row--selected' : ''}`}
      onClick={onClick}
    >
      <span className="xtg-opmodal-code">{shortCode}</span>
      <span className="xtg-opmodal-label">{label}</span>
      {selected ? (
        <FaCheck className="xtg-opmodal-check" aria-hidden />
      ) : (
        <span className="xtg-opmodal-check-slot" aria-hidden />
      )}
    </button>
  );
}
