import React from 'react';
import './sanctuary.css';

/**
 * Sanctuary Canon — reusable pieces for editorial lesson pages.
 * Light palette derived from the santa-cena-teoria.html reference.
 * All class names use the `sc-` prefix; never reuse inside legacy pages.
 */

type AccentColor = 'gold' | 'blue' | 'green' | 'purple' | 'red';

/* ── Shell ───────────────────────────────────────────────────────────────── */

export function SanctuaryRoot({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="sc-root">{children}</div>;
}

export function SanctuaryContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="sc-container">{children}</div>;
}

/* ── Header ──────────────────────────────────────────────────────────────── */

type BadgeTone = 'gold' | 'blue' | 'green';

export interface SanctuaryBadge {
  label: string;
  tone?: BadgeTone;
}

export function SanctuaryHeader({
  eyebrow,
  title,
  subtitle,
  badges,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  badges?: SanctuaryBadge[];
}): JSX.Element {
  return (
    <header className="sc-header">
      <div className="sc-header__eyebrow">{eyebrow}</div>
      <h1 className="sc-header__title">{title}</h1>
      {subtitle ? <p className="sc-header__sub">{subtitle}</p> : null}
      {badges && badges.length > 0 ? (
        <div className="sc-header__badges">
          {badges.map((b, i) => (
            <span key={i} className={`sc-badge sc-badge--${b.tone ?? 'gold'}`}>
              {b.label}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

/* ── Section divider ─────────────────────────────────────────────────────── */

export function SanctuarySection({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}): JSX.Element {
  return (
    <div className="sc-section-intro">
      <div className="sc-section-intro__eyebrow">{eyebrow}</div>
      <div className="sc-section-intro__title">{title}</div>
    </div>
  );
}

/* ── Topic card (accordion) ──────────────────────────────────────────────── */

export function SanctuaryTopic({
  id,
  number,
  name,
  quick,
  icon,
  iconTone = 'gold',
  isOpen,
  onToggle,
  expandLabel = 'Detalle',
  children,
}: {
  id: string;
  number: string;
  name: string;
  quick: React.ReactNode;
  icon: React.ReactNode;
  iconTone?: AccentColor;
  isOpen: boolean;
  onToggle: () => void;
  expandLabel?: string;
  children: React.ReactNode;
}): JSX.Element {
  const panelId = `${id}-panel`;
  return (
    <article
      className={`sc-topic${isOpen ? ' is-open' : ''}`}
      id={id}
      aria-expanded={isOpen}
    >
      <button
        type="button"
        className="sc-topic__summary"
        onClick={onToggle}
        aria-controls={panelId}
        aria-expanded={isOpen}
      >
        <span className={`sc-topic__icon sc-topic__icon--${iconTone}`} aria-hidden>
          {icon}
        </span>
        <span className="sc-topic__meta">
          <span className="sc-topic__number">{number}</span>
          <span className="sc-topic__name">{name}</span>
          <span className="sc-topic__quick">{quick}</span>
        </span>
        <span className="sc-topic__expand" aria-hidden>
          <span className="sc-topic__expand-icon">▼</span>
          <span className="sc-topic__expand-label">{expandLabel}</span>
        </span>
      </button>
      <div className="sc-topic__detail" id={panelId} role="region">
        <div className="sc-topic__detail-inner">{children}</div>
      </div>
    </article>
  );
}

export function SanctuaryParagraph({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <p className="sc-topic__p">{children}</p>;
}

/* ── Scripture callout ───────────────────────────────────────────────────── */

export function SanctuaryScripture({
  text,
  reference,
  tone = 'gold',
}: {
  text: React.ReactNode;
  reference: string;
  tone?: 'gold' | 'blue' | 'green';
}): JSX.Element {
  const cls = tone === 'gold' ? 'sc-scripture' : `sc-scripture sc-scripture--${tone}`;
  return (
    <blockquote className={cls}>
      <p className="sc-scripture__text">{text}</p>
      <cite className="sc-scripture__ref">{reference}</cite>
    </blockquote>
  );
}

/* ── Leader quote ────────────────────────────────────────────────────────── */

export function SanctuaryLeaderQuote({
  text,
  attribution,
}: {
  text: React.ReactNode;
  attribution: string;
}): JSX.Element {
  return (
    <blockquote className="sc-leader-quote">
      <p className="sc-leader-quote__text">{text}</p>
      <cite className="sc-leader-quote__attr">{attribution}</cite>
    </blockquote>
  );
}

/* ── Key points ──────────────────────────────────────────────────────────── */

export interface SanctuaryKeyPoint {
  tone?: AccentColor;
  text: React.ReactNode;
}

export function SanctuaryKeyPoints({
  items,
}: {
  items: SanctuaryKeyPoint[];
}): JSX.Element {
  return (
    <ul className="sc-key-points">
      {items.map((item, i) => (
        <li key={i} className="sc-key-point">
          <span
            className={`sc-key-point__dot sc-key-point__dot--${item.tone ?? 'gold'}`}
            aria-hidden
          />
          <span className="sc-key-point__text">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Manual ref chip ─────────────────────────────────────────────────────── */

export function SanctuaryManualRef({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="sc-manual-ref">{children}</div>;
}

/* ── Who-can table ───────────────────────────────────────────────────────── */

export interface SanctuaryTableRow {
  label: React.ReactNode;
  cells: Array<boolean | React.ReactNode>;
}

export function SanctuaryWhoTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: SanctuaryTableRow[];
}): JSX.Element {
  return (
    <div className="sc-who-table-wrapper">
      <table className="sc-who-table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              <td>{row.label}</td>
              {row.cells.map((cell, ci) => {
                if (typeof cell === 'boolean') {
                  return (
                    <td key={ci}>
                      <span
                        className={cell ? 'sc-check' : 'sc-cross'}
                        aria-label={cell ? 'Sí' : 'No'}
                      >
                        {cell ? '✓' : '✗'}
                      </span>
                    </td>
                  );
                }
                return <td key={ci}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Prayer block ────────────────────────────────────────────────────────── */

export function SanctuaryPrayer({
  label,
  source,
  children,
  annotations,
}: {
  label: string;
  source: string;
  children: React.ReactNode;
  annotations?: Array<{
    key: string;
    tone?: 'gold' | 'blue';
    text: React.ReactNode;
  }>;
}): JSX.Element {
  return (
    <section className="sc-prayer" aria-labelledby={undefined}>
      <div className="sc-prayer__label">{label}</div>
      <div className="sc-prayer__text">{children}</div>
      <span className="sc-prayer__source">{source}</span>
      {annotations && annotations.length > 0 ? (
        <div className="sc-prayer__annotation">
          {annotations.map((a, i) => (
            <div key={i} className="sc-annotation-item">
              <span
                className={`sc-annotation-item__key${
                  a.tone === 'blue' ? ' sc-annotation-item__key--blue' : ''
                }`}
              >
                {a.key}
              </span>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function PrayerHighlight({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <span className="sc-hl">{children}</span>;
}

export function PrayerHighlightBlue({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <span className="sc-hl-blue">{children}</span>;
}

/* ── Practice CTA ────────────────────────────────────────────────────────── */

export function SanctuaryPractice({
  label,
  title,
  description,
  icon,
  standalone,
}: {
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  standalone?: boolean;
}): JSX.Element {
  return (
    <div className={`sc-practice${standalone ? ' sc-practice--standalone' : ''}`}>
      <span className="sc-practice__icon" aria-hidden>
        {icon}
      </span>
      <div className="sc-practice__body">
        <div className="sc-practice__label">{label}</div>
        <div className="sc-practice__title">{title}</div>
        <p className="sc-practice__desc">{description}</p>
      </div>
    </div>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */

export function SanctuaryFooter({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <footer className="sc-footer">{children}</footer>;
}
