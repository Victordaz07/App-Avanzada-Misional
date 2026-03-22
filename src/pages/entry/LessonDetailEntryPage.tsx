import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { useMemberSpiritualPath } from '../../hooks/useMemberSpiritualPath';
import { getGuideTopicById } from '../../modules/new-member/data/guideTopics';
import { getLessonById, isLessonInInvestigatorMissionaryPath } from '../../modules/investigator/data/lessons';
import InvestigatorLessonDetailPage from '../../modules/investigator/pages/InvestigatorLessonDetailPage';
import NewMemberGuideDetailPage from '../../modules/new-member/pages/NewMemberGuideDetailPage';

function lessonIdFromPath(pathname: string): string {
  if (!pathname.startsWith('/lessons/')) return '';
  return pathname.replace(/^\/lessons\/?/, '').split('/')[0] || '';
}

/**
 * Lesson Detail Entry Page
 *
 * - Investigador: solo Camino Misional y sub-temas; «Tu guía» y biblioteca redirigen a /lessons.
 * - Miembro: temas de «Tu guía» → NewMemberGuideDetailPage; resto → InvestigatorLessonDetailPage.
 */
export default function LessonDetailEntryPage(): JSX.Element {
  const { locale } = useI18n();
  const { isBaptizedMemberPath } = useMemberSpiritualPath();
  const location = useLocation();
  const id = lessonIdFromPath(location.pathname);
  const guideTopic = id ? getGuideTopicById(id, locale) : undefined;

  if (!isBaptizedMemberPath) {
    if (guideTopic) {
      return <Navigate to="/lessons" replace />;
    }
    const lesson = id ? getLessonById(id, locale) : undefined;
    if (lesson && !isLessonInInvestigatorMissionaryPath(lesson)) {
      return <Navigate to="/lessons" replace />;
    }
  }

  if (guideTopic) {
    return <NewMemberGuideDetailPage />;
  }

  return <InvestigatorLessonDetailPage />;
}
