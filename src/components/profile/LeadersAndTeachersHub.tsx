import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { TeachingCanonHeroHeader } from '../../ui/teaching-canon';
import { useI18n } from '../../context/I18nContext';
import './LeadersAndTeachersHub.css';

export function LeadersAndTeachersHub({ classPrefix }: { classPrefix: string }): JSX.Element {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className={`${classPrefix}__section leaders-teachers-hub`} aria-labelledby="leaders-hub-heading">
      <h2 id="leaders-hub-heading" className={`${classPrefix}__section-title visually-hidden`}>
        {t('app.profile.leadersAndTeachers.title')}
      </h2>
      <div className="leaders-teachers-hub__shell nm-guide-detail">
        <TeachingCanonHeroHeader
          categoryLabel={t('app.profile.leadersAndTeachers.category')}
          title={t('app.profile.leadersAndTeachers.title')}
          subtitle={t('app.profile.leadersAndTeachers.subtitle')}
          heroNote={t('app.profile.leadersAndTeachers.heroNote')}
        />
        <button
          type="button"
          className="leaders-teachers-hub__cta"
          onClick={() => navigate('/leaders')}
          aria-label={t('app.profile.leadersAndTeachers.ctaAria')}
        >
          <span>{t('app.profile.leadersAndTeachers.cta')}</span>
          <FaArrowRight aria-hidden />
        </button>
      </div>
    </section>
  );
}
