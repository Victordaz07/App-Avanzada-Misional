/**
 * Role Selection Page
 * 
 * Allows the user to select their leadership calling/role.
 * This determines their permissions and what they can see in the app.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRoleStore } from '../../../state/user/useUserRoleStore';
import { getRolesGrouped, LeadershipRole, RoleDefinition } from '../../../config/roles';
import { useI18n, type Locale } from '../../../context/I18nContext';
import './RoleSelectionPage.css';

const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { role: currentRole, setRole } = useUserRoleStore();
  const [selectedRole, setSelectedRole] = useState<LeadershipRole | null>(currentRole);
  const { t, locale } = useI18n();

  const roleGroups = getRolesGrouped();

  const handleRoleSelect = (role: LeadershipRole) => {
    setSelectedRole(role);
  };

  const handleConfirm = () => {
    if (selectedRole) {
      setRole(selectedRole);
      navigate('/leaders/app', { replace: true });
    }
  };

  const handleSkip = () => {
    // Set a default role if skipping
    setRole('other_leader');
    navigate('/leaders/app', { replace: true });
  };

  return (
    <div className="role-selection-page leaders-mint-page leaders-mint-page--inset">
      <div className="role-selection-container">
        <div className="role-selection-header leaders-page-hero">
          <div className="role-selection-icon">👔</div>
          <h1 className="role-selection-title leaders-page-hero__title">
            {t('auth.roleSelection.title')}
          </h1>
          <p className="role-selection-subtitle leaders-page-hero__subtitle">
            {t('auth.roleSelection.subtitle')}
          </p>
        </div>

        <div className="role-selection-panel leaders-mint-panel">
          <div className="role-groups">
            {roleGroups.map((group) => (
              <div key={group.groupKey} className="role-group">
                <h2 className="role-group-title">
                  {t(`auth.roleSelection.groups.${group.groupKey}`)}
                </h2>
                <div className="role-list">
                  {group.roles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      locale={locale}
                      isSelected={selectedRole === role.id}
                      onClick={() => handleRoleSelect(role.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="role-selection-actions">
            <button
              type="button"
              className="role-confirm-button"
              onClick={handleConfirm}
              disabled={!selectedRole}
            >
              {t('auth.roleSelection.confirm')}
            </button>
            <button type="button" className="role-skip-button" onClick={handleSkip}>
              {t('auth.roleSelection.skip')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Role Card Component
interface RoleCardProps {
  role: RoleDefinition;
  locale: Locale;
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, locale, isSelected, onClick }) => {
  const displayLabel = locale === 'en' ? role.labelEn : role.label;
  return (
    <button
      className={`role-card ${isSelected ? 'role-card-selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="role-card-icon">{role.icon}</span>
      <span className="role-card-label">{displayLabel}</span>
    </button>
  );
};

export default RoleSelectionPage;
