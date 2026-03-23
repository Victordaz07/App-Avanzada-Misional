import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaGraduationCap, FaChevronRight } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { HomeWelcomeCard } from '../../ui/home-welcome/HomeWelcomeCard';
import '../../ui/home-discovery/HomeDiscoveryRails.css';
import './StudyEntryPage.css';

/**
 * Hub para miembros: un solo punto de entrada a Lecciones y Capacitación.
 * Estética alineada con inicio (hw-card) + raíles de descubrimiento (home-discovery).
 */
export default function StudyEntryPage(): JSX.Element {
  const { t } = useI18n();

  return (
    <div className="study-hub anim-fade-up">
      <div className="study-hub__hero-wrap">
        <HomeWelcomeCard
          layout="hub"
          tone="soft"
          ariaLabel={t('app.studyHub.title')}
          title={t('app.studyHub.title')}
          subtitle={t('app.studyHub.subtitle')}
        />
      </div>

      <section className="home-discovery study-hub__discovery" aria-label={t('app.studyHub.navAria')}>
        <div className="home-discovery__list" role="list">
          <Link
            to="/lessons"
            className="home-discovery__card home-discovery__card--tone-0"
            role="listitem"
          >
            <div className="home-discovery__card-icon" aria-hidden>
              <FaBookOpen />
            </div>
            <div className="home-discovery__card-body">
              <h2 className="home-discovery__card-title">{t('app.studyHub.lessonsTitle')}</h2>
              <p className="home-discovery__card-subtitle">{t('app.studyHub.lessonsDesc')}</p>
            </div>
            <span className="home-discovery__card-arrow-wrap" aria-hidden>
              <FaChevronRight className="home-discovery__card-arrow" />
            </span>
          </Link>

          <Link
            to="/training"
            className="home-discovery__card home-discovery__card--tone-1"
            role="listitem"
          >
            <div className="home-discovery__card-icon" aria-hidden>
              <FaGraduationCap />
            </div>
            <div className="home-discovery__card-body">
              <h2 className="home-discovery__card-title">{t('app.studyHub.trainingTitle')}</h2>
              <p className="home-discovery__card-subtitle">{t('app.studyHub.trainingDesc')}</p>
            </div>
            <span className="home-discovery__card-arrow-wrap" aria-hidden>
              <FaChevronRight className="home-discovery__card-arrow" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
