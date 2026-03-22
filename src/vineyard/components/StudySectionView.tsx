import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getMemberStudyModulesForLocale } from '../data/memberStudyModules';
import { useMemberProgressStore } from '../state/memberProgressStore';
import { buildSectionProgressId } from '../utils/progressIds';
import { useI18n } from '../../context/I18nContext';
import './StudySectionView.css';

export const StudySectionView: React.FC = () => {
  const { moduleId, sectionId } = useParams<{ moduleId: string; sectionId?: string }>();
  const navigate = useNavigate();
  const { t, locale } = useI18n();
  const contentRef = useRef<HTMLElement>(null);

  const studyModules = useMemo(
    () => getMemberStudyModulesForLocale(locale),
    [locale],
  );

  const module = useMemo(() => {
    return studyModules.find((item) => item.id === moduleId);
  }, [studyModules, moduleId]);

  const firstSectionId = useMemo(() => module?.sections[0]?.id, [module?.id]);

  // Redirect to first section if no sectionId is provided
  useEffect(() => {
    if (module && !sectionId && firstSectionId) {
      navigate(`/member/study/${module.id}/${firstSectionId}`, { replace: true });
    }
  }, [module?.id, sectionId, firstSectionId, navigate]);

  const section = useMemo(() => {
    if (!module) return undefined;
    if (sectionId) {
      return module.sections.find((item) => item.id === sectionId);
    }
    return module.sections[0];
  }, [module, sectionId]);

  // Scroll to content when section or module changes
  useEffect(() => {
    if (contentRef.current && section) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [module?.id, sectionId, section]);

  // Use separate selectors to avoid creating new objects on each render
  const completedStudySectionIds = useMemberProgressStore((state) => state.completedStudySectionIds);
  const markSectionStudied = useMemberProgressStore((state) => state.markSectionStudied);

  if (!module || !section) {
    return (
      <div className="study-section-error">
        <div className="study-section-error-card">
          {t('memberStudy.error.notFound')}
        </div>
      </div>
    );
  }

  const sectionKey = buildSectionProgressId(module.id, section.id);
  const isCompleted = completedStudySectionIds.includes(sectionKey);

  const handleMarkStudied = () => {
    markSectionStudied(sectionKey);
  };

  const handleSectionClick = (itemId: string) => {
    if (itemId !== sectionId) {
      navigate(`/member/study/${module.id}/${itemId}`);
    }
  };

  const getReferenceTypeLabel = (type: string): string => {
    switch (type) {
      case 'scripture':
        return t('memberStudy.referenceType.scripture');
      case 'talk':
        return t('memberStudy.referenceType.talk');
      case 'manual':
        return t('memberStudy.referenceType.manual');
      default:
        return type;
    }
  };

  return (
    <div className="study-section-container">
      {/* Module Header */}
      <header className="study-section-header-card">
        <p className="study-section-module-label">{t('memberStudy.labels.module')}</p>
        <h1 className="study-section-title">{module.title}</h1>
        <p className="study-section-subtitle">{module.subtitle}</p>
        <div className="study-section-header-meta">
          <span className="study-section-time-badge">
            {t('memberStudy.labels.minutes', { minutes: String(section.estimatedMinutes) })}
          </span>
        </div>
      </header>

      {/* Sections List - Always on top */}
      <aside className="study-section-sidebar" key={`module-sidebar-${module.id}`}>
        <p className="study-section-sidebar-title">{t('memberStudy.labels.sectionsSidebar')}</p>
        <ol className="study-section-list">
          {module.sections.map((item, index) => {
            const key = buildSectionProgressId(module.id, item.id);
            const active = item.id === section.id;
            const completed = completedStudySectionIds.includes(key);
            return (
              <li key={item.id} className="study-section-item">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSectionClick(item.id);
                  }}
                  className={`study-section-button ${active ? 'active' : 'inactive'}`}
                  aria-pressed={active}
                >
                  <div className="study-section-button-header">
                    <span className="study-section-number">#{index + 1}</span>
                    {completed && (
                      <span className="study-section-completed">{t('memberStudy.labels.studiedBadge')}</span>
                    )}
                  </div>
                  <p className="study-section-button-title">{item.title}</p>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Section Content - Always below sections */}
      <article ref={contentRef} className="study-section-content" key={`section-content-${module.id}-${section.id}`}>
        <div className="study-section-description">
          {module.description}
        </div>

        <div className="study-section-markdown">
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </div>

        {section.references && section.references.length > 0 && (
          <section className="study-section-references">
            <p className="study-section-references-title">{t('memberStudy.labels.referencesTitle')}</p>
            <div className="study-section-references-list">
              {section.references.map((reference) => (
                <div
                  key={`${reference.source}-${reference.type}`}
                  className="study-section-reference"
                >
                  <strong className="study-section-reference-type">{getReferenceTypeLabel(reference.type)}</strong>
                  <span className="study-section-reference-source">{reference.source}</span>
                  {reference.title && <span className="study-section-reference-title">{reference.title}</span>}
                  {reference.quote && <span className="study-section-reference-quote">{reference.quote}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="study-section-actions">
          <button
            type="button"
            onClick={handleMarkStudied}
            className={`study-section-button-primary ${isCompleted ? 'completed' : ''}`}
            disabled={isCompleted}
          >
            {isCompleted ? t('memberStudy.actions.studyRecorded') : t('memberStudy.actions.markStudied')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/member/study')}
            className="study-section-button-secondary"
          >
            {t('memberStudy.actions.backToList')}
          </button>
        </div>
      </article>
    </div>
  );
};

