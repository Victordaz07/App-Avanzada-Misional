import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaHouse,
  FaBookOpen,
  FaBookBookmark,
  FaChartLine,
  FaUser,
  FaUserGroup,
} from 'react-icons/fa6';
import { useMemberSpiritualPath } from '../hooks/useMemberSpiritualPath';
import { useI18n } from '../context/I18nContext';
import { BottomNav, type BottomNavItem } from '../ui/components';
import './UnifiedLayout.css';

function pathnameToActiveId(pathname: string, isMemberWithTraining: boolean): string {
  if (pathname.startsWith('/friends')) return 'friends';
  if (pathname.startsWith('/journal')) return 'journal';
  if (pathname.startsWith('/progress')) return 'progress';
  if (pathname.startsWith('/profile')) return 'profile';
  if (pathname.startsWith('/home') || pathname === '/') return 'home';

  if (isMemberWithTraining) {
    if (
      pathname.startsWith('/study') ||
      pathname.startsWith('/lessons') ||
      pathname.startsWith('/training')
    ) {
      return 'study';
    }
  } else if (pathname.startsWith('/lessons')) {
    return 'lessons';
  }

  return 'home';
}

interface UnifiedLayoutProps {
  children: React.ReactNode;
}

export default function UnifiedLayout({
  children,
}: UnifiedLayoutProps): JSX.Element {
  const { t } = useI18n();
  const { trainingUnlockStage: stage } = useMemberSpiritualPath();
  const location = useLocation();
  const navigate = useNavigate();
  const isMemberWithTraining = stage === 'covenanted';
  const activeId = pathnameToActiveId(location.pathname, isMemberWithTraining);

  // Miembro: una pestaña «Estudio» (hub en /study). Investigador: solo «Lecciones».
  const baseNavItems: BottomNavItem[] = [
    { id: 'home', label: t('app.nav.home'), icon: <FaHouse /> },
    ...(isMemberWithTraining
      ? [{ id: 'study', label: t('app.nav.studyLearning'), icon: <FaBookOpen /> }]
      : [{ id: 'lessons', label: t('app.nav.lessons'), icon: <FaBookOpen /> }]),
    { id: 'journal', label: t('app.nav.journal'), icon: <FaBookBookmark /> },
    { id: 'progress', label: t('app.nav.progress'), icon: <FaChartLine /> },
    { id: 'friends', label: t('app.friends.nav'), icon: <FaUserGroup /> },
    { id: 'profile', label: t('app.nav.profile'), icon: <FaUser /> },
  ];

  const handleSelect = (id: string) => {
    if (id === 'home') navigate('/home');
    else if (id === 'study') navigate('/study');
    else navigate(`/${id}`);
  };

  return (
    <div className={`unified-layout unified-layout--${stage}`}>
      <div className="unified-layout-shell">
        <div className="unified-layout-deco unified-layout-deco-top" />
        <div className="unified-layout-deco unified-layout-deco-bottom" />

        <main className="unified-layout-content">{children}</main>

        <BottomNav
          items={baseNavItems}
          activeId={activeId}
          onSelect={handleSelect}
          className="unified-layout__bottom-nav"
        />
      </div>
    </div>
  );
}
