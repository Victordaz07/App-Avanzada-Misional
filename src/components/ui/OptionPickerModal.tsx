import React, { useEffect, useId } from 'react';
import { FaXmark } from 'react-icons/fa6';
import './XtgOptionPickerModal.css';

export interface OptionPickerModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  cancelLabel?: string;
  closeAriaLabel?: string;
}

export function OptionPickerModal({
  open,
  onClose,
  title,
  children,
  cancelLabel,
  closeAriaLabel = 'Cerrar',
}: OptionPickerModalProps): JSX.Element | null {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="xtg-opmodal-backdrop" onClick={onClose} role="presentation">
      <div
        className="xtg-opmodal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="xtg-opmodal-header">
          <h3 id={titleId} className="xtg-opmodal-title">
            {title}
          </h3>
          <button
            type="button"
            className="xtg-opmodal-close"
            onClick={onClose}
            aria-label={closeAriaLabel}
          >
            <FaXmark />
          </button>
        </div>
        <div className="xtg-opmodal-body">{children}</div>
        {cancelLabel != null && cancelLabel !== '' && (
          <div className="xtg-opmodal-footer">
            <button type="button" className="xtg-opmodal-cancel" onClick={onClose}>
              {cancelLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
