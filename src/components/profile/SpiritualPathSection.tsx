import React, { useState } from 'react';
import { FaSeedling, FaChurch } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import { updateMemberStatus } from '../../services/firebase/userService';
import type { MemberStatus } from '../../types/user';
import { isMemberSpiritualPath } from '../../hooks/useMemberSpiritualPath';
import './SpiritualPathSection.css';

export function SpiritualPathSection({ classPrefix }: { classPrefix: string }): JSX.Element | null {
  const { t } = useI18n();
  const { user, profile, refreshProfile } = useAuth();
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!user || !profile) return null;

  const onBar = isMemberSpiritualPath(profile.memberStatus);

  const apply = async (next: MemberStatus) => {
    setErr(null);
    setPending(true);
    try {
      await updateMemberStatus(user.uid, next);
      await refreshProfile();
    } catch (e) {
      console.error(e);
      setErr(t('app.profile.spiritualPath.errorSave'));
    } finally {
      setPending(false);
    }
  };

  return (
    <section className={`${classPrefix}__section spiritual-path`} aria-labelledby="spiritual-path-heading">
      <h2 id="spiritual-path-heading" className={`${classPrefix}__section-title`}>
        {t('app.profile.spiritualPath.title')}
      </h2>
      <p className="spiritual-path__subtitle">{t('app.profile.spiritualPath.subtitle')}</p>
      <p className="spiritual-path__disclaimer">{t('app.profile.spiritualPath.disclaimer')}</p>

      <div className="spiritual-path__toggle" role="group" aria-label={t('app.profile.spiritualPath.title')}>
        <button
          type="button"
          className={`spiritual-path__option ${!onBar ? 'spiritual-path__option--active' : ''}`}
          onClick={() => apply('investigator')}
          disabled={pending || !onBar}
        >
          <FaSeedling className="spiritual-path__icon" aria-hidden />
          <span className="spiritual-path__label">{t('app.profile.spiritualPath.optionFriend')}</span>
        </button>
        <button
          type="button"
          className={`spiritual-path__option ${onBar ? 'spiritual-path__option--active' : ''}`}
          onClick={() => apply('active')}
          disabled={pending || onBar}
        >
          <FaChurch className="spiritual-path__icon" aria-hidden />
          <span className="spiritual-path__label">{t('app.profile.spiritualPath.optionMember')}</span>
        </button>
      </div>

      {err ? <p className="spiritual-path__error" role="alert">{err}</p> : null}
    </section>
  );
}
