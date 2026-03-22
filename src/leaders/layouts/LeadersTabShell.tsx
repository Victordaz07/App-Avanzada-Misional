/**
 * Shell con barra inferior para rutas de líder con rol:
 * envuelve ward-setup y /leaders/app/* para que las tabs sean siempre visibles.
 * El contenido de /leaders/app no exige barrio (modo exploración).
 */

import React, { Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import {
  FaHouse,
  FaUser,
  FaUserCheck,
  FaChalkboardUser,
  FaUsers,
} from 'react-icons/fa6';
import LeadershipSyncBridge from '../features/leadershipCallings/components/LeadershipSyncBridge';
import { BottomNav, type BottomNavItem } from '../ui/components';
import { useI18n } from '../context/I18nContext';
import { LEADERS_APP, leadersIsEmbeddedPath, leadersTabPath } from '../leadersPaths';
import { useAuth } from '../../context/AuthContext';
import './LeadersTabShell.css';
import './LeadershipCallingsLayout.css';

export function pathnameToLeadersTabId(pathname: string): string {
  if (pathname.includes('/ward-setup')) return 'home';

  const tail =
    leadersIsEmbeddedPath(pathname) && pathname.startsWith(LEADERS_APP)
      ? pathname.slice(LEADERS_APP.length).replace(/^\//, '')
      : pathname.replace(/^\//, '');

  if (tail.startsWith('profile')) return 'profile';
  if (tail.startsWith('callings')) return 'callings';
  if (tail.startsWith('bishop/teaching')) return 'teaching';
  if (tail.startsWith('teaching')) return 'teaching';
  if (tail.startsWith('members')) return 'members';
  if (
    tail.startsWith('calendar') ||
    tail.startsWith('notes') ||
    tail.startsWith('responsibilities')
  ) {
    return 'home';
  }
  return 'home';
}

export default function LeadersTabShell(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useI18n();

  const activeId = pathnameToLeadersTabId(location.pathname);

  const navItems: BottomNavItem[] = [
    { id: 'home', label: t('nav.home'), icon: <FaHouse /> },
    { id: 'callings', label: t('nav.callings'), icon: <FaUserCheck /> },
    { id: 'teaching', label: t('nav.teaching'), icon: <FaChalkboardUser /> },
    { id: 'members', label: t('nav.members'), icon: <FaUsers /> },
    { id: 'profile', label: t('nav.profile'), icon: <FaUser /> },
  ];

  const handleSelect = (id: string) => {
    const tab = id as 'home' | 'callings' | 'teaching' | 'members' | 'profile';
    navigate(leadersTabPath(tab, location.pathname));
  };

  return (
    <div className="leaders-tab-shell">
      {user ? <LeadershipSyncBridge /> : null}
      <div className="leaders-tab-shell__outlet">
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </div>
      <BottomNav items={navItems} activeId={activeId} onSelect={handleSelect} />
    </div>
  );
}
