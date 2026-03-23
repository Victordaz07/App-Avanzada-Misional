import React, { useId } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import './ProfileSettingsMenu.css';

export type ProfileSettingsMenuRow = {
  id: string;
  icon: React.ReactNode;
  title: string;
  /** Contenido secundario (puede incluir spans con `.up-settings__code`). */
  description: React.ReactNode;
  /** Texto plano para `aria-label` cuando la descripción no es solo texto. */
  detailAria?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type ProfileSettingsMenuProps = {
  sectionTitle: string;
  rows: ProfileSettingsMenuRow[];
  /** Por defecto se usa `sectionTitle`. */
  ariaLabel?: string;
};

/**
 * Lista de ajustes en tarjeta (perfil miembro / investigador): icono, título, valor, chevron.
 */
export function ProfileSettingsMenu({
  sectionTitle,
  rows,
  ariaLabel,
}: ProfileSettingsMenuProps): JSX.Element {
  const headingId = useId();
  const label = ariaLabel ?? sectionTitle;

  return (
    <section className="up-settings" aria-label={label}>
      <h2 id={headingId} className="up-settings__section-title">
        {sectionTitle}
      </h2>
      <ul className="up-settings__list" aria-labelledby={headingId}>
        {rows.map((row) => {
          const composedAria =
            row.detailAria != null && row.detailAria !== ''
              ? `${row.title}. ${row.detailAria}`
              : row.title;

          return (
            <li key={row.id} className="up-settings__item">
              <button
                type="button"
                className="up-settings__row"
                disabled={row.disabled}
                onClick={row.onClick}
                aria-label={composedAria}
              >
                <span className="up-settings__icon" aria-hidden>
                  {row.icon}
                </span>
                <span className="up-settings__body">
                  <span className="up-settings__title">{row.title}</span>
                  <span className="up-settings__desc">{row.description}</span>
                </span>
                <span className="up-settings__chevron-wrap" aria-hidden>
                  <FaChevronRight className="up-settings__chevron" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
