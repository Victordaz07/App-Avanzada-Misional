import React from 'react';

interface XtgCardProps {
  title?: string;
  className?: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

export const XtgCard: React.FC<XtgCardProps> = ({ 
  title, 
  className = '', 
  actionLabel,
  onAction,
  children 
}) => {
  return (
    <section className={`xtg-doc-card xtg-stack-md ${className}`}>
      {(title || actionLabel) && (
        <div className="xtg-doc-card-header">
          {title && <h2 className="xtg-doc-card-title">{title}</h2>}
          {actionLabel && onAction && (
            <button 
              type="button"
              className="xtg-doc-card-action"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

