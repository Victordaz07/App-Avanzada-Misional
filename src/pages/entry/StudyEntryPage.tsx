import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaGraduationCap, FaChevronRight } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import './StudyEntryPage.css';

/**
 * Hub para miembros: un solo punto de entrada a Lecciones y Capacitación.
 */
export default function StudyEntryPage(): JSX.Element {
  const { t } = useI18n();

  return (
    <div className="study-hub anim-fade-up">
      <header className="study-hub__header">
        <h1 className="study-hub__title">{t('app.studyHub.title')}</h1>
        <p className="study-hub__subtitle">{t('app.studyHub.subtitle')}</p>
      </header>

      <nav className="study-hub__cards" aria-label={t('app.studyHub.title')}>
        <Link to="/lessons" className="study-hub__card">
          <span className="study-hub__card-icon study-hub__card-icon--lessons" aria-hidden>
            <FaBookOpen />
          </span>
          <div className="study-hub__card-body">
            <h2 className="study-hub__card-title">{t('app.studyHub.lessonsTitle')}</h2>
            <p className="study-hub__card-desc">{t('app.studyHub.lessonsDesc')}</p>
          </div>
          <FaChevronRight className="study-hub__card-arrow" aria-hidden />
        </Link>

        <Link to="/training" className="study-hub__card">
          <span className="study-hub__card-icon study-hub__card-icon--training" aria-hidden>
            <FaGraduationCap />
          </span>
          <div className="study-hub__card-body">
            <h2 className="study-hub__card-title">{t('app.studyHub.trainingTitle')}</h2>
            <p className="study-hub__card-desc">{t('app.studyHub.trainingDesc')}</p>
          </div>
          <FaChevronRight className="study-hub__card-arrow" aria-hidden />
        </Link>
      </nav>
    </div>
  );
}
