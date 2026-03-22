import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { useAuth } from '../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { firstWelcomeName, initialsFromDisplayName } from '../../../utils/profileFirstName';
import './unifiedProfileBlocks.css';

export type ProfileRoleHeroProps = {
  /** i18n key for the role line under the greeting, e.g. `app.profile.member` or `app.profile.friend` */
  roleLabelKey: string;
  /** When set, shown instead of `t(roleLabelKey)` (e.g. dynamic calling name in Leaders) */
  roleLabelText?: string;
};

export function ProfileRoleHero({ roleLabelKey, roleLabelText }: ProfileRoleHeroProps): JSX.Element {
  const { t } = useI18n();
  const { profile } = useAuth();

  const avatarSrc = profile?.photoURL ?? null;
  const first = firstWelcomeName(profile);
  const roleHeadingName = profile?.displayName?.trim()
    ? profile.displayName.trim().split(/\s+/)[0]
    : null;
  const hasNameForInitials = Boolean(profile?.displayName?.trim());

  return (
    <div className="up-hero">
      <div className="up-hero__avatar" aria-hidden={!!avatarSrc}>
        {avatarSrc ? (
          <img src={avatarSrc} alt="" className="up-hero__avatar-img" />
        ) : hasNameForInitials ? (
          <span className="up-hero__avatar-initials">
            {initialsFromDisplayName(profile?.displayName ?? '')}
          </span>
        ) : (
          <FaUser className="up-hero__avatar-fallback" aria-hidden />
        )}
      </div>
      <h1 className="up-hero__title">
        {first || roleHeadingName
          ? t('app.profileNewMember.greetingNamed', {
              name: first ?? roleHeadingName ?? '',
            })
          : t('app.profileNewMember.welcomeFriend')}
      </h1>
      <p className="up-hero__role-label">{roleLabelText ?? t(roleLabelKey)}</p>
    </div>
  );
}
