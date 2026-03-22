import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa6';
import { useAuth } from '../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { updateFirebaseAuthProfile } from '../../../services/firebase/authService';
import { uploadUserProfilePhoto } from '../../../services/firebase/profilePhotoUploadService';
import { updateProfile } from '../../../services/firebase/userService';
import { splitDisplayName } from '../../../utils/profileFirstName';
import './unifiedProfileBlocks.css';

const DISPLAY_NAME_MIN = 2;
const DISPLAY_NAME_MAX = 100;

/**
 * Name + photo editor (Firestore + optional Storage). Renders nothing if not signed in.
 */
export function PersonalProfileCard(): JSX.Element | null {
  const { t } = useI18n();
  const { user, profile, refreshProfile } = useAuth();
  const displayNameFieldId = useId();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [displayNameDraft, setDisplayNameDraft] = useState('');
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSavedFlash, setProfileSavedFlash] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.displayName) {
      setDisplayNameDraft(profile.displayName);
    }
  }, [profile?.displayName]);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
    };
  }, [photoPreviewUrl]);

  const mapPhotoError = useCallback(
    (code: string): string => {
      if (code === 'invalidType') return t('app.profileNewMember.photoErrorInvalidType');
      if (code === 'tooLarge') return t('app.profileNewMember.photoErrorTooLarge');
      return t('app.profileNewMember.photoErrorUpload');
    },
    [t],
  );

  const openPhotoPicker = (): void => {
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileError(null);
    setPendingPhoto(file);
    setPhotoPreviewUrl((prev) => {
      if (prev?.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
      return URL.createObjectURL(file);
    });
    e.target.value = '';
  };

  const handleProfileSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!user?.uid) {
      setProfileError(t('app.profileNewMember.errorOffline'));
      return;
    }

    const trimmed = displayNameDraft.trim().replace(/\s+/g, ' ');
    if (trimmed.length < DISPLAY_NAME_MIN || trimmed.length > DISPLAY_NAME_MAX) {
      setProfileError(t('app.profileNewMember.displayNameInvalid'));
      return;
    }

    setProfileSaving(true);
    setProfileError(null);
    setProfileSavedFlash(false);

    try {
      let photoURL: string | undefined;
      if (pendingPhoto) {
        try {
          photoURL = await uploadUserProfilePhoto(user.uid, pendingPhoto);
        } catch (uploadErr: unknown) {
          const msg = uploadErr instanceof Error ? uploadErr.message : '';
          if (msg === 'invalidType' || msg === 'tooLarge') {
            setProfileError(mapPhotoError(msg));
          } else {
            setProfileError(mapPhotoError('upload'));
          }
          setProfileSaving(false);
          return;
        }
      }

      const { firstName, lastName } = splitDisplayName(trimmed);
      await updateProfile(user.uid, {
        displayName: trimmed,
        firstName,
        lastName,
        ...(photoURL !== undefined ? { photoURL } : {}),
      });

      try {
        await updateFirebaseAuthProfile({
          displayName: trimmed,
          ...(photoURL !== undefined ? { photoURL } : {}),
        });
      } catch (authSyncErr) {
        console.warn('updateFirebaseAuthProfile:', authSyncErr);
      }

      setPendingPhoto(null);
      if (photoPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
      setPhotoPreviewUrl(null);

      await refreshProfile();
      setProfileSavedFlash(true);
      window.setTimeout(() => setProfileSavedFlash(false), 2800);
    } catch (err) {
      console.error(err);
      setProfileError(t('app.profileNewMember.errorGeneric'));
    } finally {
      setProfileSaving(false);
    }
  };

  if (!user || !profile) {
    return null;
  }

  const avatarSrc = photoPreviewUrl ?? profile.photoURL ?? null;

  return (
    <section className="up-block" aria-labelledby="up-personal-heading">
      <h2 id="up-personal-heading" className="up-block__title">
        {t('app.profileNewMember.profileCardTitle')}
      </h2>
      <p className="up-block__desc">{t('app.profileNewMember.profileCardSubtitle')}</p>

      <form className="up-personal" onSubmit={handleProfileSubmit}>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="up-personal__photo-input"
          aria-label={t('app.profileNewMember.changePhoto')}
          onChange={handlePhotoChange}
        />

        <div className="up-personal__row">
          <button
            type="button"
            className="up-personal__photo-thumb"
            onClick={openPhotoPicker}
            aria-label={t('app.profileNewMember.changePhoto')}
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt="" className="up-personal__photo-thumb-img" />
            ) : (
              <FaUser className="up-personal__photo-thumb-placeholder" aria-hidden />
            )}
            <span className="up-personal__photo-thumb-badge">
              <FaCamera aria-hidden />
            </span>
          </button>

          <div className="up-personal__fields">
            <label className="up-personal__label" htmlFor={displayNameFieldId}>
              {t('app.profileNewMember.displayNameLabel')}
            </label>
            <input
              id={displayNameFieldId}
              type="text"
              className="up-personal__input"
              autoComplete="name"
              maxLength={DISPLAY_NAME_MAX}
              placeholder={t('app.profileNewMember.displayNamePlaceholder')}
              value={displayNameDraft}
              onChange={(ev) => setDisplayNameDraft(ev.target.value)}
            />
            <p className="up-personal__hint">{t('app.profileNewMember.photoHint')}</p>
            <p className="up-personal__minor-hint">{t('app.profileNewMember.photoMinorNotice')}</p>
          </div>
        </div>

        {profileError ? (
          <p className="up-personal__error" role="alert">
            {profileError}
          </p>
        ) : null}
        {profileSavedFlash ? (
          <p className="up-personal__success" role="status">
            {t('app.profileNewMember.saved')}
          </p>
        ) : null}

        <button type="submit" className="up-personal__primary" disabled={profileSaving}>
          {profileSaving ? t('app.profileNewMember.saving') : t('app.profileNewMember.saveProfile')}
        </button>
      </form>
    </section>
  );
}
