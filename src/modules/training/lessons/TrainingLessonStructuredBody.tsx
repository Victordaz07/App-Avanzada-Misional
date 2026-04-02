/**
 * Cuerpo de lección Training con bloques doctrina → acción (`layout: structured`).
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CanonicalScriptureExcerpt, ScriptureReferenceCard } from '../../../ui/components';
import {
  TeachingCanonHeroHeader,
  TeachingCanonAudioCard,
  TeachingCanonImagePlaceholder,
  TeachingCanonAccordionSection,
  TeachingCanonExtra,
} from '../../../ui/teaching-canon';
import type { GuideAudioPlaceholder, GuideImagePlaceholder } from '../../new-member/data/guideTopics.types';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { useI18n } from '../../../context/I18nContext';
import {
  lessonsById,
  getTrainingLessonCategoryLabel,
  trainingLessonTitle,
} from '../data/trainingPaths';
import type { TrainingLessonStructuredContent } from './content/trainingLessonContent.types';
import { getLessonStorage, setLessonStorage } from './lessonStorage';
import './TrainingLessonCanon.css';

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export interface TrainingLessonStructuredBodyProps {
  lessonId: string;
  content: TrainingLessonStructuredContent;
  onPracticeProgress?: (checked: number, total: number) => void;
}

function loadStructuredPractice(
  lessonId: string,
  sectionIds: readonly string[],
): Record<string, boolean> {
  const storageKey = `training:lesson:${lessonId}:practice`;
  const parsed = getLessonStorage<Record<string, boolean>>(storageKey, {});
  const next: Record<string, boolean> = {};
  for (const id of sectionIds) {
    next[id] = Boolean(parsed[id]);
  }
  return next;
}

export function TrainingLessonStructuredBody({
  lessonId,
  content: c,
  onPracticeProgress,
}: TrainingLessonStructuredBodyProps): JSX.Element {
  const { t, locale } = useI18n();
  const storagePracticeKey = `training:lesson:${lessonId}:practice`;

  const lesson = lessonsById[lessonId];
  const categoryLabel = getTrainingLessonCategoryLabel(lessonId, locale);
  const sectionPrefix = useMemo(
    () => `training-${lessonId.replace(/[^a-zA-Z0-9]+/g, '-')}`,
    [lessonId],
  );

  const sectionIdsKey = useMemo(() => c.sections.map((s) => s.id).join('|'), [c.sections]);

  const [checkedBySection, setCheckedBySection] = useState<Record<string, boolean>>(() =>
    loadStructuredPractice(
      lessonId,
      c.sections.map((s) => s.id),
    ),
  );

  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [openExtraId, setOpenExtraId] = useState<'modes' | null>(null);

  useEffect(() => {
    setCheckedBySection(
      loadStructuredPractice(
        lessonId,
        c.sections.map((s) => s.id),
      ),
    );
  }, [lessonId, sectionIdsKey, c.sections]);

  useEffect(() => {
    if (c.sections.length > 0) {
      setOpenSectionId(`${sectionPrefix}-structured-${c.sections[0].id}`);
    }
  }, [sectionPrefix, c.sections]);

  const totalPractice = c.sections.length;
  const checkedCount = c.sections.filter((s) => checkedBySection[s.id]).length;

  useEffect(() => {
    setLessonStorage(storagePracticeKey, checkedBySection);
    onPracticeProgress?.(checkedCount, totalPractice);
  }, [checkedBySection, checkedCount, totalPractice, onPracticeProgress, storagePracticeKey]);

  const toggleSectionCheck = useCallback((id: string) => {
    setCheckedBySection((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const displayTitle = lesson ? trainingLessonTitle(lesson, locale) : '';

  const audioPlaceholder: GuideAudioPlaceholder = useMemo(() => {
    const title = displayTitle;
    const minutes = lesson?.estimatedMinutes;
    return {
      eyebrow: t('app.training.lesson.audioEyebrow'),
      title,
      summary: t('app.training.lesson.audioSummaryPlaceholder'),
      scriptIntent: t('app.training.lesson.audioIntentPlaceholder'),
      status: 'pending',
      durationLabel:
        minutes !== undefined && minutes > 0
          ? t('app.training.lesson.durationApprox', { minutes })
          : undefined,
    };
  }, [displayTitle, lesson, t]);

  const imagePlaceholder: GuideImagePlaceholder = useMemo(
    () => ({
      label: t('app.training.lesson.imageLabel'),
      title: t('app.training.lesson.imageTitlePlaceholder'),
      prompt: t('app.training.lesson.imagePromptPlaceholder'),
      aspectRatio: '16:9',
    }),
    [t],
  );

  const blockKicker = (n: number): string => `${t('app.lessons.guideSectionLabel')} ${n}`;

  const practiceDone = t('app.training.lesson.structured.practiceDone');
  const practicePending = t('app.training.lesson.structured.practicePending');
  const practiceHeading = t('app.training.lesson.structured.practiceHeading');
  const practiceHintDefault = t('app.training.lesson.structured.practiceHint');
  const practiceHintPrimary = t('app.training.lesson.structured.practiceHintPrimary');
  const practiceHintLeadership = t('app.training.lesson.structured.practiceHintLeadership');
  const isPrimaryVariant = c.promptVariant === 'primary';
  const isLeadershipVariant = c.promptVariant === 'leadership';
  const practiceHint = isPrimaryVariant
    ? practiceHintPrimary
    : isLeadershipVariant
      ? practiceHintLeadership
      : practiceHintDefault;

  const modeItems = useMemo(
    () =>
      isPrimaryVariant
        ? [
            t('app.training.lesson.structured.modesPrimary.home'),
            t('app.training.lesson.structured.modesPrimary.christ'),
            t('app.training.lesson.structured.modesPrimary.simple'),
          ]
        : [
            t('app.training.lesson.structured.modes.council'),
            t('app.training.lesson.structured.modes.ministering'),
            t('app.training.lesson.structured.modes.home'),
          ],
    [isPrimaryVariant, t],
  );

  if (!lesson) {
    return <></>;
  }

  const hasScriptures = Boolean(c.scriptures && c.scriptures.length > 0);
  const n = c.sections.length;
  const scripturesBlockNum = n + 1;
  const practiceBlockNum = n + (hasScriptures ? 2 : 1);

  const promptHomeLabel = isPrimaryVariant
    ? t('app.training.lesson.structured.promptsPrimary.home')
    : t('app.training.lesson.structured.prompts.home');
  const promptServiceLabel = isPrimaryVariant
    ? t('app.training.lesson.structured.promptsPrimary.service')
    : t('app.training.lesson.structured.prompts.service');

  const structuredInner = (
    <>
      <TeachingCanonHeroHeader
        categoryLabel={categoryLabel}
        title={displayTitle}
        subtitle={c.intro}
        heroNote={t('app.training.lesson.heroNote')}
      />

      {c.officialLinks && c.officialLinks.length > 0 ? (
        <div className="tr-canon__official-links">
          <p className="tr-canon__hint">{t('app.training.lesson.officialResourcesHeading')}</p>
          <ul className="tr-canon__official-links-list">
            {c.officialLinks.map((link) => (
              <li key={`${link.url}-${link.label}`}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {c.overview ? (
        <div className="tr-canon__overview" role="region" aria-label={t('app.training.lesson.structured.overviewAria')}>
          {splitParagraphs(c.overview).map((para, idx) => (
            <p key={idx} className="tr-canon__overview-paragraph">
              {para}
            </p>
          ))}
        </div>
      ) : null}

      <TeachingCanonAudioCard
        audio={audioPlaceholder}
        audioStatusLabel={t('app.training.lesson.audioStatusPending')}
      />

      <TeachingCanonImagePlaceholder image={imagePlaceholder} />

      <div className="tr-canon__sections nm-guide-detail__sections">
        {c.sections.map((section, i) => {
          const bi = i + 1;
          const sid = `${sectionPrefix}-structured-${section.id}`;
          return (
            <TeachingCanonAccordionSection
              key={section.id}
              sectionId={sid}
              isOpen={openSectionId === sid}
              onToggle={() => setOpenSectionId((prev) => (prev === sid ? null : sid))}
              kicker={blockKicker(bi)}
              title={section.title}
            >
              <div className="tr-canon__structured-block">
                {section.handbookRef ? (
                  <p className="tr-canon__handbook-ref">{section.handbookRef}</p>
                ) : null}

                <p className="tr-canon__structured-label">{t('app.training.lesson.structured.doctrine')}</p>
                <p className="tr-canon__doctrine">{section.doctrine}</p>

                {section.scriptures && section.scriptures.length > 0 ? (
                  <>
                    <p className="tr-canon__structured-label">{t('app.training.lesson.structured.sectionScriptures')}</p>
                    <p className="nm-guide-detail__section-scripture-note">{t('app.lessons.openScriptureNote')}</p>
                    {section.scriptures.map((s) => (
                      <div key={`${section.id}-${s.ref}`} className="tr-canon__scripture-block tr-canon__scripture-block--nested">
                        <CanonicalScriptureExcerpt reference={s.ref} className="tr-canon__scripture-excerpt" />
                        <ScriptureReferenceCard reference={s.ref} className="nm-guide-detail__scripture-ref" />
                      </div>
                    ))}
                  </>
                ) : null}

                <p className="tr-canon__structured-label">{t('app.training.lesson.structured.explanation')}</p>
                <div className="tr-canon__section-content nm-guide-detail__section-content">
                  <p>{section.explanation}</p>
                </div>

                {section.deepen ? (
                  <>
                    <p className="tr-canon__structured-label">{t('app.training.lesson.structured.deepen')}</p>
                    <div className="tr-canon__section-content nm-guide-detail__section-content">
                      {splitParagraphs(section.deepen).map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </>
                ) : null}

                {section.keyPoints && section.keyPoints.length > 0 ? (
                  <>
                    <p className="tr-canon__structured-label">{t('app.training.lesson.structured.keyPoints')}</p>
                    <ul className="tr-canon__list tr-canon__list--key-points">
                      {section.keyPoints.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                <p className="tr-canon__structured-label">{t('app.training.lesson.structured.example')}</p>
                <div className="tr-canon__example-card">
                  <p className="tr-canon__example-text">{section.example}</p>
                </div>

                <p className="tr-canon__structured-label">{t('app.training.lesson.structured.application')}</p>
                <ul className="tr-canon__list">
                  {section.application.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>

                <p className="tr-canon__structured-label">{t('app.training.lesson.structured.action')}</p>
                <div className="tr-canon__action-card tr-canon__action-card--in-section">
                  <p className="tr-canon__action-text">{section.action}</p>
                </div>

                {section.prompts ? (
                  <div className="tr-canon__prompts">
                    <p className="tr-canon__structured-label">{t('app.training.lesson.structured.promptsTitle')}</p>
                    {section.prompts.home ? (
                      <details className="tr-canon__prompt-item">
                        <summary className="tr-canon__prompt-summary">{promptHomeLabel}</summary>
                        <p className="tr-canon__prompt-text">{section.prompts.home}</p>
                      </details>
                    ) : null}
                    {section.prompts.service ? (
                      <details className="tr-canon__prompt-item">
                        <summary className="tr-canon__prompt-summary">{promptServiceLabel}</summary>
                        <p className="tr-canon__prompt-text">{section.prompts.service}</p>
                      </details>
                    ) : null}
                    {section.prompts.leadersOrParents ? (
                      <details className="tr-canon__prompt-item">
                        <summary className="tr-canon__prompt-summary">
                          {t('app.training.lesson.structured.promptsPrimary.leaders')}
                        </summary>
                        <p className="tr-canon__prompt-text">{section.prompts.leadersOrParents}</p>
                      </details>
                    ) : null}
                    {!section.prompts.leadersOrParents && section.prompts.council ? (
                      <details className="tr-canon__prompt-item">
                        <summary className="tr-canon__prompt-summary">
                          {t('app.training.lesson.structured.prompts.council')}
                        </summary>
                        <p className="tr-canon__prompt-text">{section.prompts.council}</p>
                      </details>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </TeachingCanonAccordionSection>
          );
        })}

        {hasScriptures ? (
          <TeachingCanonAccordionSection
            sectionId={`${sectionPrefix}-structured-scriptures`}
            isOpen={openSectionId === `${sectionPrefix}-structured-scriptures`}
            onToggle={() =>
              setOpenSectionId((prev) =>
                prev === `${sectionPrefix}-structured-scriptures`
                  ? null
                  : `${sectionPrefix}-structured-scriptures`,
              )
            }
            kicker={blockKicker(scripturesBlockNum)}
            title={t('app.training.lesson.structured.scripturesHeading')}
          >
            <p className="nm-guide-detail__section-scripture-note">{t('app.lessons.openScriptureNote')}</p>
            {c.scriptures!.map((s) => (
              <div key={s.ref} className="tr-canon__scripture-block">
                <CanonicalScriptureExcerpt reference={s.ref} className="tr-canon__scripture-excerpt" />
                <ScriptureReferenceCard reference={s.ref} className="nm-guide-detail__scripture-ref" />
              </div>
            ))}
          </TeachingCanonAccordionSection>
        ) : null}

        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-structured-practice`}
          isOpen={openSectionId === `${sectionPrefix}-structured-practice`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-structured-practice` ? null : `${sectionPrefix}-structured-practice`,
            )
          }
          kicker={blockKicker(practiceBlockNum)}
          title={practiceHeading}
        >
          <p className="tr-canon__hint">{practiceHint}</p>
          <ul className="tr-canon__checklist" role="group" aria-label={practiceHeading}>
            {c.sections.map((section) => {
              const done = checkedBySection[section.id] ?? false;
              return (
                <li key={section.id} className="tr-canon__checklist-item-wrapper">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done}
                    aria-label={`${section.title}. ${section.action}. ${done ? practiceDone : practicePending}`}
                    className={`tr-canon__checklist-item ${done ? 'tr-canon__checklist-item--done' : ''}`}
                    onClick={() => toggleSectionCheck(section.id)}
                  >
                    <span className="tr-canon__checklist-icon" aria-hidden>
                      {done ? <FaCheck /> : <FaCircle />}
                    </span>
                    <span>
                      <span className="tr-canon__checklist-section-title">{section.title}</span>
                      <span className="tr-canon__checklist-action">{section.action}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </TeachingCanonAccordionSection>
      </div>

      <TeachingCanonExtra
        title={
          isPrimaryVariant
            ? t('app.training.lesson.structured.modesTitlePrimary')
            : t('app.training.lesson.structured.modesTitle')
        }
        isOpen={openExtraId === 'modes'}
        onToggle={() => setOpenExtraId((prev) => (prev === 'modes' ? null : 'modes'))}
        note={
          isPrimaryVariant
            ? t('app.training.lesson.structured.modesNotePrimary')
            : t('app.training.lesson.structured.modesNote')
        }
        items={modeItems}
      />
    </>
  );

  if (isPrimaryVariant) {
    return <div className="tr-canon--primary-lesson">{structuredInner}</div>;
  }
  if (isLeadershipVariant) {
    return <div className="tr-canon--leadership-lesson">{structuredInner}</div>;
  }
  return structuredInner;
}
