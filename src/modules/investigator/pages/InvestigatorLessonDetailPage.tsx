/**
 * Detalle de lección del Camino Misional — layout Teaching Canon (hero, audio, imagen, bloques, extras).
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { getChildLessonsByParentId, getLessonById } from '../data/lessons';
import { getLessonDetailScripture, getScriptureById } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { useI18n } from '../../../context/I18nContext';
import { AudioPlayer } from '../components/AudioPlayer';
import { ScriptureReferenceCard } from '../../../ui/components';
import type { GuideAudioPlaceholder, GuideImagePlaceholder } from '../../new-member/data/guideTopics.types';
import {
  TeachingCanonShell,
  TeachingCanonBackLink,
  TeachingCanonHeroHeader,
  TeachingCanonAudioCard,
  TeachingCanonImagePlaceholder,
  TeachingCanonAccordionSection,
  TeachingCanonFeaturedScripture,
  TeachingCanonExtra,
  TeachingCanonReflection,
  TeachingCanonFooter,
  TeachingCanonNotFound,
} from '../../../ui/teaching-canon';
import './InvestigatorLessonDetailPage.css';

function parseFinalMessageLines(text: string): string[] {
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function InvestigatorLessonDetailPage(): JSX.Element {
  const params = useParams();
  const location = useLocation();
  const { locale: i18nLocale, t } = useI18n();
  const contentLocale = i18nLocale;

  const lessonId: string =
    (params.lessonId as string | undefined) ??
    (params['*'] as string | undefined) ??
    (location.pathname.startsWith('/lessons/')
      ? location.pathname.replace(/^\/lessons\/?/, '').split('/')[0] || ''
      : '');
  const { setLastLessonId, addJournalEntry, setLessonStatus } = useInvestigatorStore();
  const { setLastLesson, markSavedToJournal } = useSpiritualMemoryStore();

  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [openExtraId, setOpenExtraId] = useState<'questions' | 'application' | null>(null);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const lesson = getLessonById(lessonId, contentLocale);
  const scripture =
    (lesson?.featuredScriptureId &&
      getScriptureById(lesson.featuredScriptureId, contentLocale)) ||
    getLessonDetailScripture(contentLocale);
  const nextLesson = lesson?.recommendedNext
    ? getLessonById(lesson.recommendedNext, contentLocale)
    : null;
  const childLessons = lesson ? getChildLessonsByParentId(lesson.id, contentLocale) : [];
  const faqItems = lesson?.faqItems ?? [];

  const sectionPrefix = useMemo(
    () => `inv-${lessonId.replace(/[^a-zA-Z0-9]+/g, '-')}`,
    [lessonId],
  );

  useEffect(() => {
    if (lesson) {
      setLastLessonId(lessonId);
      setLastLesson({ id: lessonId, title: lesson.title });
    }
  }, [lesson, lessonId, setLastLessonId, setLastLesson]);

  useEffect(() => {
    if (!lessonId) return;
    setLessonStatus(lessonId, 'exploring');
  }, [lessonId, setLessonStatus]);

  useEffect(() => {
    if (lesson?.sections.length) {
      setOpenSectionId(lesson.sections[0].id);
    }
  }, [lesson]);

  const audioPlaceholder: GuideAudioPlaceholder | null = useMemo(() => {
    if (!lesson) return null;
    const minutes = lesson.estimatedMinutes;
    return {
      eyebrow: t('app.training.lesson.audioEyebrow'),
      title: lesson.title,
      summary: t('app.training.lesson.audioSummaryPlaceholder'),
      scriptIntent: t('app.training.lesson.audioIntentPlaceholder'),
      status: 'pending',
      durationLabel:
        minutes > 0 ? t('app.training.lesson.durationApprox', { minutes }) : undefined,
    };
  }, [lesson, t]);

  const imagePlaceholder: GuideImagePlaceholder = useMemo(
    () => ({
      label: t('app.training.lesson.imageLabel'),
      title: t('app.training.lesson.imageTitlePlaceholder'),
      prompt: t('app.training.lesson.imagePromptPlaceholder'),
      aspectRatio: '16:9',
    }),
    [t],
  );

  const applicationItems = useMemo(
    () => (lesson?.finalMessage ? parseFinalMessageLines(lesson.finalMessage) : []),
    [lesson?.finalMessage],
  );

  const handleSaveReflection = (): void => {
    if (reflection.trim()) {
      addJournalEntry({
        type: 'text',
        content: reflection,
        lessonId,
      });
      markSavedToJournal();
      setReflection('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!lesson) {
    return (
      <TeachingCanonShell>
        <TeachingCanonBackLink to="/lessons">{t('app.lessons.backToExplore')}</TeachingCanonBackLink>
        <TeachingCanonNotFound
          title={t('app.lessons.notAvailableTitle')}
          message={t('app.lessons.notAvailableText')}
        />
      </TeachingCanonShell>
    );
  }

  const blockKicker = (n: number): string => `${t('app.lessons.guideSectionLabel')} ${n}`;

  return (
    <TeachingCanonShell>
      <TeachingCanonBackLink to="/lessons">{t('app.lessons.backToExplore')}</TeachingCanonBackLink>

      <div className="inv-lesson-detail__emoji" aria-hidden>
        {lesson.icon}
      </div>

      <TeachingCanonHeroHeader
        categoryLabel={t('app.lessons.investigatorPathEyebrow')}
        title={lesson.title}
        subtitle={lesson.subtitle}
        heroNote={t('app.lessons.guideLayeredNote')}
      />

      {audioPlaceholder ? (
        <TeachingCanonAudioCard
          audio={audioPlaceholder}
          audioStatusLabel={t('app.training.lesson.audioStatusPending')}
        />
      ) : null}

      <TeachingCanonImagePlaceholder image={imagePlaceholder} />

      {lesson.introParagraph ? (
        <section className="inv-lesson-detail__intro-canon">
          <div className="nm-guide-detail__section-content">
            {lesson.introParagraph.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
        </section>
      ) : null}

      <div className="nm-guide-detail__sections">
        {lesson.sections.map((section, index) => {
          const sid = `${sectionPrefix}-section-${section.id}`;
          const isOpen = openSectionId === section.id;
          return (
            <TeachingCanonAccordionSection
              key={section.id}
              sectionId={sid}
              isOpen={isOpen}
              onToggle={() =>
                setOpenSectionId((prev) => (prev === section.id ? null : section.id))
              }
              kicker={blockKicker(index + 1)}
              title={section.title}
            >
              <div className="nm-guide-detail__section-content">
                {section.content.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
              {section.hasAudio ? <AudioPlayer label={section.title} /> : null}
              {section.scriptureRef ? (
                <div className="inv-lesson-detail__section-ref">
                  <ScriptureReferenceCard reference={section.scriptureRef} />
                </div>
              ) : null}
            </TeachingCanonAccordionSection>
          );
        })}
      </div>

      {faqItems.length > 0 ? (
        <div className="inv-lesson-detail__faq">
          <h3 className="inv-lesson-detail__faq-title">{t('app.lessons.frequentDoubts')}</h3>
          <p className="inv-lesson-detail__faq-note">{t('app.lessons.frequentDoubtsNote')}</p>
          <div className="inv-lesson-detail__faq-list">
            {faqItems.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div key={item.id} className="inv-lesson-detail__faq-item">
                  <button
                    type="button"
                    className="inv-lesson-detail__faq-question"
                    onClick={() => setOpenFaqId((prev) => (prev === item.id ? null : item.id))}
                    aria-expanded={isOpen}
                  >
                    <span className="inv-lesson-detail__faq-question-text">{item.question}</span>
                    <FaChevronRight
                      className={
                        isOpen
                          ? 'inv-lesson-detail__faq-chevron inv-lesson-detail__faq-chevron--open'
                          : 'inv-lesson-detail__faq-chevron'
                      }
                    />
                  </button>
                  {isOpen ? (
                    <div className="inv-lesson-detail__faq-answer">
                      {item.answer.split(/\n\n+/).map((para, i) => (
                        <p key={i}>{para.trim()}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <TeachingCanonFeaturedScripture label={t('app.lessons.featuredScripture')} scripture={scripture} />

      {lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0 ? (
        <TeachingCanonExtra
          title={t('app.lessons.doctrinalQuestions')}
          isOpen={openExtraId === 'questions'}
          onToggle={() =>
            setOpenExtraId((prev) => (prev === 'questions' ? null : 'questions'))
          }
          note={t('app.lessons.doctrinalQuestionsNote')}
          items={lesson.reflectionQuestions}
        />
      ) : null}

      {applicationItems.length > 0 ? (
        <TeachingCanonExtra
          title={t('app.lessons.realLifeApplication')}
          isOpen={openExtraId === 'application'}
          onToggle={() =>
            setOpenExtraId((prev) => (prev === 'application' ? null : 'application'))
          }
          note={t('app.lessons.realLifeApplicationNote')}
          items={applicationItems}
        />
      ) : null}

      <TeachingCanonReflection
        reflectionLabel={t('app.lessons.personalReflection')}
        reflectionPrompt={lesson.reflectionPrompt}
        placeholder={t('app.lessons.reflectionPlaceholder')}
        value={reflection}
        onChange={setReflection}
        onSave={handleSaveReflection}
        saveLabel={t('app.lessons.saveToJournal')}
        savedLabel={t('app.lessons.savedToJournal')}
        savedMessage={t('app.lessons.savedMessage')}
        saved={saved}
      />
      <p className="inv-lesson-detail__reflection-note">{t('app.lessons.reflectionNote')}</p>
      <div className="inv-lesson-detail__mark-row">
        <button
          type="button"
          onClick={() => lessonId && setLessonStatus(lessonId, 'completed')}
          className="nm-guide-detail__btn nm-guide-detail__btn--secondary"
        >
          {t('app.lessons.markCompleted')}
        </button>
      </div>

      {childLessons.length > 0 ? (
        <div className="inv-lesson-detail__subtopics">
          <p className="inv-lesson-detail__subtopics-label">{t('app.lessons.subTopics')}</p>
          <div className="inv-lesson-detail__subtopics-list">
            {childLessons.map((child) => (
              <Link key={child.id} to={`/lessons/${child.id}`} className="inv-lesson-detail__nav-card">
                <span className="inv-lesson-detail__nav-icon" aria-hidden>
                  {child.icon}
                </span>
                <span className="inv-lesson-detail__nav-title">{child.title}</span>
                <FaChevronRight className="inv-lesson-detail__nav-arrow" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {nextLesson ? (
        <div className="inv-lesson-detail__next">
          <p className="inv-lesson-detail__next-label">{t('app.lessons.recommendedNext')}</p>
          <Link to={`/lessons/${nextLesson.id}`} className="inv-lesson-detail__nav-card">
            <span className="inv-lesson-detail__nav-icon" aria-hidden>
              {nextLesson.icon}
            </span>
            <span className="inv-lesson-detail__nav-title">{nextLesson.title}</span>
            <FaChevronRight className="inv-lesson-detail__nav-arrow" aria-hidden />
          </Link>
        </div>
      ) : null}

      <TeachingCanonFooter>{t('app.lessons.footerText')}</TeachingCanonFooter>
    </TeachingCanonShell>
  );
}
