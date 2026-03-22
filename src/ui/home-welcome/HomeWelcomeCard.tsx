import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaPenToSquare, FaSun, FaCloudSun, FaMoon } from 'react-icons/fa6';
import './HomeWelcomeCard.css';

export type HomeWelcomeTone = 'default' | 'soft';

function WelcomeMoodIcon({ hour, className }: { hour: number; className: string }): JSX.Element {
  if (hour < 12) return <FaSun className={className} />;
  if (hour < 18) return <FaCloudSun className={className} />;
  return <FaMoon className={className} />;
}

export type HomeWelcomeCardProps = {
  ariaLabel: string;
  greetingLine: string;
  dateLine: string;
  hour: number;
  tone?: HomeWelcomeTone;
  mode?: 'declarative' | 'question';
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  questionText?: string;
  titleSize?: 'normal' | 'large';
  subtitleSize?: 'normal' | 'large';
  showQuickLinks?: boolean;
  journalHref?: string;
  exploreHref?: string;
  exploreLabel?: string;
  journalLabel?: string;
  quickNavAriaLabel?: string;
  className?: string;
};

/**
 * Shared pastoral welcome hero (greeting, date, mood, body, optional pills).
 */
export function HomeWelcomeCard({
  ariaLabel,
  greetingLine,
  dateLine,
  hour,
  tone = 'default',
  mode = 'declarative',
  title,
  subtitle,
  questionText,
  titleSize = 'normal',
  subtitleSize = 'normal',
  showQuickLinks = false,
  journalHref = '/journal',
  exploreHref = '/lessons',
  exploreLabel,
  journalLabel,
  quickNavAriaLabel,
  className = '',
}: HomeWelcomeCardProps): JSX.Element {
  const rootClass = [
    'hw-card',
    tone === 'soft' ? 'hw-card--soft' : '',
    mode === 'question' ? 'hw-card--question' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={rootClass} aria-label={ariaLabel}>
      <div className="hw-card__top">
        <div className="hw-card__top-text">
          <p className="hw-card__greeting">{greetingLine}</p>
          <p className="hw-card__date">{dateLine}</p>
        </div>
        <span className="hw-card__mood" aria-hidden>
          <WelcomeMoodIcon hour={hour} className="hw-card__mood-icon" />
        </span>
      </div>

      {mode === 'question' && questionText != null ? (
        <p className="hw-card__question">{questionText}</p>
      ) : (
        <>
          {title != null ? (
            <h1
              className={`hw-card__title${titleSize === 'large' ? ' hw-card__title--large' : ''}`}
            >
              {title}
            </h1>
          ) : null}
          {subtitle != null ? (
            <p
              className={`hw-card__subtitle${
                subtitleSize === 'large' ? ' hw-card__subtitle--large' : ''
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </>
      )}

      {showQuickLinks && exploreLabel && journalLabel && quickNavAriaLabel ? (
        <nav className="hw-card__actions" aria-label={quickNavAriaLabel}>
          <Link to={journalHref} className="hw-card__pill">
            <FaPenToSquare className="hw-card__pill-icon" aria-hidden />
            {journalLabel}
          </Link>
          <Link to={exploreHref} className="hw-card__pill">
            <FaBookOpen className="hw-card__pill-icon" aria-hidden />
            {exploreLabel}
          </Link>
        </nav>
      ) : null}
    </section>
  );
}
