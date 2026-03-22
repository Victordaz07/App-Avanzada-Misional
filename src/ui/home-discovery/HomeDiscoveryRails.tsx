import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import './HomeDiscoveryRails.css';

export interface HomeDiscoveryItem {
  href: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: ReactNode;
}

export interface HomeDiscoveryRailsProps {
  title: string;
  hint: string;
  seeAllHref: string;
  seeAllLabel: string;
  items: HomeDiscoveryItem[];
  /** e.g. aria-label on section */
  sectionAriaLabel?: string;
  className?: string;
}

/**
 * Lista vertical de descubrimiento (guía, lecciones, enlaces de liderazgo).
 * Presentacional: los datos los arma cada pantalla.
 */
export default function HomeDiscoveryRails({
  title,
  hint,
  seeAllHref,
  seeAllLabel,
  items,
  sectionAriaLabel,
  className = '',
}: HomeDiscoveryRailsProps): JSX.Element | null {
  if (items.length === 0) return null;

  return (
    <section
      className={`home-discovery ${className}`.trim()}
      aria-label={sectionAriaLabel ?? title}
    >
      <div className="home-discovery__header">
        <div>
          <h2 className="home-discovery__title">{title}</h2>
          <p className="home-discovery__hint">{hint}</p>
        </div>
        <Link to={seeAllHref} className="home-discovery__see-all">
          {seeAllLabel}
        </Link>
      </div>
      <div className="home-discovery__list" role="list">
        {items.map((item, index) => (
          <Link
            key={`${item.href}-${index}`}
            to={item.href}
            className={`home-discovery__card home-discovery__card--tone-${index % 4}`}
            role="listitem"
          >
            <div className="home-discovery__card-icon" aria-hidden>
              {item.icon}
            </div>
            <div className="home-discovery__card-body">
              {item.badge ? (
                <span className="home-discovery__card-badge">{item.badge}</span>
              ) : null}
              <h3 className="home-discovery__card-title">{item.title}</h3>
              <p className="home-discovery__card-subtitle">{item.subtitle}</p>
            </div>
            <span className="home-discovery__card-arrow-wrap" aria-hidden>
              <FaChevronRight className="home-discovery__card-arrow" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
