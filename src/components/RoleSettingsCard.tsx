import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { UserRoleKey } from '../config/roles';
import { LEADERS_ROOT } from '../leaders/leadersPaths';
import './RoleSettingsCard.css';

export type { UserRoleKey };
export type MemberMode = 'regular' | 'leader';

interface RoleSettingsCardProps {
  currentRole: UserRoleKey;
  onRoleChanged?: (newRole: UserRoleKey) => void;
}

/**
 * Legacy layout card: points users to the unified profile and leaders area.
 */
export const RoleSettingsCard: React.FC<RoleSettingsCardProps> = ({ currentRole }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="role-settings-card">
      <div className="role-settings-header">
        <h3 className="role-settings-title">{t('app.roleSettings.unified.title')}</h3>
        <p className="role-settings-description">{t('app.roleSettings.unified.description')}</p>
      </div>
      <div className="role-settings-section">
        <button
          type="button"
          className="role-settings-link-btn"
          onClick={() => navigate('/profile')}
        >
          {t('app.roleSettings.unified.openProfile')}
        </button>
        <button
          type="button"
          className="role-settings-link-btn role-settings-link-btn--secondary"
          onClick={() => navigate(`${LEADERS_ROOT}/login`)}
        >
          {t('app.roleSettings.unified.openLeaders')}
        </button>
      </div>
      <p className="role-settings-footnote">
        {t('app.roleSettings.unified.currentExperience', {
          role: t(currentRole === 'investigator' ? 'app.profile.friend' : 'app.profile.member'),
        })}
      </p>
    </div>
  );
};
