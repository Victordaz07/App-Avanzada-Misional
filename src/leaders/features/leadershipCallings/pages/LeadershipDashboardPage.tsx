/**
 * Leadership Dashboard Page
 *
 * Main dashboard for ward/stake leadership.
 * Shows callings summary with SOFT alerts (no urgency).
 * NO KPIs, NO metrics, NO surveillance.
 */

import { leadersAppUrl } from '../../../leadersPaths';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserCheck,
  FaUsers,
  FaChalkboardUser,
  FaCalendarDays,
  FaListCheck,
  FaNoteSticky,
  FaPlus,
  FaChartSimple,
} from 'react-icons/fa6';
import { useI18n } from '../../../context/I18nContext';
import { useCallingsStore } from '../state';
import { useUserRoleStore } from '../../../state/user/useUserRoleStore';
import { STATUS_LABELS, ORGANIZATION_LABELS } from '../types';
import { PageShell, SectionTitle, Card, Button, EmptyState } from '../../../ui';
import { TeachingCanonShell, TeachingCanonHeroHeader } from '../../../ui/teaching-canon';
import HomeDiscoveryRails from '../../../../ui/home-discovery/HomeDiscoveryRails';
import {
  getLocalDayIndex,
  leaderDiscoveryHref,
  selectLeaderDiscoverySlots,
  type LeaderDiscoverySlotId,
} from '../../../data/leaderDiscovery';
import './LeadershipPages.css';

function LeaderDiscoverySlotIcon({ id }: { id: LeaderDiscoverySlotId }): JSX.Element {
  const p = { 'aria-hidden': true as const };
  switch (id) {
    case 'callings':
      return <FaUserCheck {...p} />;
    case 'members':
      return <FaUsers {...p} />;
    case 'teaching':
      return <FaChalkboardUser {...p} />;
    case 'calendar':
      return <FaCalendarDays {...p} />;
    case 'responsibilities':
      return <FaListCheck {...p} />;
    case 'notes':
      return <FaNoteSticky {...p} />;
  }
}

const LeadershipDashboardPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const callings = useCallingsStore(s => s.callings);
  const isBishopric = useUserRoleStore((s) => s.isBishopric);

  const dayIndex = useMemo(() => getLocalDayIndex(), []);
  const discoverySlots = useMemo(
    () => selectLeaderDiscoverySlots(dayIndex, 3),
    [dayIndex]
  );
  const discoveryItems = useMemo(
    () =>
      discoverySlots.map((id) => ({
        href: leaderDiscoveryHref(id),
        title: t(`leadership.dashboard.discovery.slots.${id}.title`),
        subtitle: t(`leadership.dashboard.discovery.slots.${id}.subtitle`),
        badge: t('leadership.dashboard.discovery.badge'),
        icon: <LeaderDiscoverySlotIcon id={id} />,
      })),
    [discoverySlots, t]
  );

  const teachingStripItems = useMemo(() => {
    const badge = t('leadership.dashboard.teachingStrip.badge');
    const sessions = {
      href: leadersAppUrl('teaching'),
      title: t('leadership.dashboard.teachingStrip.sessions.title'),
      subtitle: t('leadership.dashboard.teachingStrip.sessions.subtitle'),
      badge,
      icon: <FaChalkboardUser aria-hidden />,
    };
    const newSession = {
      href: leadersAppUrl('teaching/new'),
      title: t('leadership.dashboard.teachingStrip.newSession.title'),
      subtitle: t('leadership.dashboard.teachingStrip.newSession.subtitle'),
      badge,
      icon: <FaPlus aria-hidden />,
    };
    const third = isBishopric()
      ? {
          href: leadersAppUrl('bishop/teaching'),
          title: t('leadership.dashboard.teachingStrip.bishop.title'),
          subtitle: t('leadership.dashboard.teachingStrip.bishop.subtitle'),
          badge,
          icon: <FaChartSimple aria-hidden />,
        }
      : {
          href: leadersAppUrl('calendar'),
          title: t('leadership.dashboard.teachingStrip.calendarFallback.title'),
          subtitle: t('leadership.dashboard.teachingStrip.calendarFallback.subtitle'),
          badge,
          icon: <FaCalendarDays aria-hidden />,
        };
    return [sessions, newSession, third];
  }, [isBishopric, t]);

  // Simple counts (not metrics)
  const activeCallings = callings.filter(
    c => c.status === 'active' || c.status === 'set_apart',
  );
  const inTraining = callings.filter(
    c => c.status === 'sustained' || c.status === 'called',
  );
  const pending = callings.filter(c => c.status === 'proposed');

  // Soft reminders (not alerts)
  const callingsWithoutRecentFollowup = activeCallings.slice(0, 2); // Mock for now

  return (
    <PageShell variant="gradient">
      <TeachingCanonShell>
        <TeachingCanonHeroHeader
          categoryLabel={t('leadership.canon.leadershipEyebrow')}
          title={t('leadership.canon.dashboardTitle')}
          subtitle={t('leadership.canon.dashboardSubtitle')}
          heroNote={t('leadership.canon.dashboardHeroNote')}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-6)',
          }}
        >
        <HomeDiscoveryRails
          className="home-discovery--slate"
          title={t('leadership.dashboard.discovery.title')}
          hint={t('leadership.dashboard.discovery.hint')}
          seeAllHref={leaderDiscoveryHref('callings')}
          seeAllLabel={t('leadership.dashboard.discovery.seeAll')}
          items={discoveryItems}
          sectionAriaLabel={t('leadership.dashboard.discovery.title')}
        />
        <HomeDiscoveryRails
          className="home-discovery--slate"
          title={t('leadership.dashboard.teachingStrip.title')}
          hint={t('leadership.dashboard.teachingStrip.hint')}
          seeAllHref={leadersAppUrl('teaching')}
          seeAllLabel={t('leadership.dashboard.teachingStrip.seeAll')}
          items={teachingStripItems}
          sectionAriaLabel={t('leadership.dashboard.teachingStrip.title')}
        />

        {/* Summary Cards - grid responsive via LeadershipPages.css .dashboard-summary */}
        <div className="dashboard-summary">
          <Card
            variant="default"
            padding="md"
            onClick={() =>
              navigate('/callings?status=active')
            }
            className="summary-card-clickable summary-card"
          >
            <div style={{ textAlign: 'center' }}>
              <span className="summary-value">{activeCallings.length}</span>
              <span className="summary-label">Activos</span>
            </div>
          </Card>
          <Card
            variant="default"
            padding="md"
            onClick={() =>
              navigate('/callings?status=training')
            }
            className="summary-card-clickable summary-card"
          >
            <div style={{ textAlign: 'center' }}>
              <span className="summary-value">{inTraining.length}</span>
              <span className="summary-label">En capacitación</span>
            </div>
          </Card>
          <Card
            variant="default"
            padding="md"
            onClick={() =>
              navigate('/callings?status=proposed')
            }
            className="summary-card-clickable summary-card"
          >
            <div style={{ textAlign: 'center' }}>
              <span className="summary-value">{pending.length}</span>
              <span className="summary-label">Pendientes</span>
            </div>
          </Card>
        </div>

        {/* Soft Reminders */}
        {callingsWithoutRecentFollowup.length > 0 && (
          <Card variant="default" padding="md">
            <SectionTitle>💡 Recordatorios</SectionTitle>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--am-color-text-main, #0f172a)',
                margin: '0 0 8px 0',
              }}
            >
              {callingsWithoutRecentFollowup.length} llamamiento(s) sin
              seguimiento reciente.
            </p>
            <span
              style={{
                fontSize: '12px',
                color: 'var(--am-color-text-muted, #64748b)',
              }}
            >
              No urgente — solo un recordatorio amable.
            </span>
          </Card>
        )}

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SectionTitle>Acciones rápidas</SectionTitle>
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/callings/new')}
          >
            ➕ Nuevo llamamiento
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/callings')}
          >
            📋 Ver todos los llamamientos
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/teaching')}
          >
            📖 Enseñando — preparar clases
          </Button>
          {isBishopric() && (
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/bishop/teaching')}
            >
              📊 Clases del barrio (obispado)
            </Button>
          )}
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/members')}
          >
            👥 Ver miembros
          </Button>
        </div>

        {/* Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SectionTitle>Llamamientos recientes</SectionTitle>
          {callings.length === 0 ? (
            <EmptyState
              title="Aún no hay llamamientos"
              description="Puedes crear uno desde Acciones rápidas arriba."
            />
          ) : (
            callings.slice(0, 3).map(calling => (
              <Card
                key={calling.id}
                variant="default"
                padding="md"
                onClick={() =>
                  navigate(`/leaders/app/callings/${calling.id}`)
                }
                className="calling-preview-card-clickable"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--am-color-text-main, #0f172a)',
                    }}
                  >
                    {calling.memberName}
                  </span>
                  <span
                    className={`status-badge status-${calling.status}`}
                    style={{
                      fontSize: '11px',
                      padding: '4px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    {STATUS_LABELS[calling.status]}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    fontSize: '13px',
                    color: 'var(--am-color-text-muted, #64748b)',
                  }}
                >
                  <span>{calling.position}</span>
                  <span>•</span>
                  <span>{ORGANIZATION_LABELS[calling.organization]}</span>
                </div>
              </Card>
            ))
          )}
        </div>
        </div>
      </TeachingCanonShell>
    </PageShell>
  );
};

export default LeadershipDashboardPage;
