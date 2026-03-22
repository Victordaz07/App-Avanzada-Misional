/**
 * Ward Setup Page
 * 
 * Page for setting up ward membership:
 * - Bishopric: Create new ward
 * - Other leaders: Join existing ward with code
 */

import { LEADERS_APP } from '../../../leadersPaths';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useUserRoleStore } from '../../../state/user/useUserRoleStore';
import { useWardStore } from '../../../state/ward/useWardStore';
import { useI18n } from '../../../context/I18nContext';
import { CreateWardRequest } from '../../../types/ward';
import './WardSetupPage.css';

type SetupMode = 'choose' | 'create' | 'join';

const WardSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user } = useAuth();
  const { isBishopric, getRoleLabel } = useUserRoleStore();
  const { createNewWard, joinWard, isLoading, error, clearError } = useWardStore();
  
  const [mode, setMode] = useState<SetupMode>('choose');
  
  // Create form state
  const [wardName, setWardName] = useState('');
  const [wardType, setWardType] = useState<'ward' | 'branch'>('ward');
  const [stakeName, setStakeName] = useState('');
  const [stakeType, setStakeType] = useState<'stake' | 'district'>('stake');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  
  // Join form state
  const [joinCode, setJoinCode] = useState('');

  const canCreate = isBishopric();

  const handleCreateWard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !wardName.trim()) return;

    const request: CreateWardRequest = {
      name: wardName.trim(),
      type: wardType,
      stakeName: stakeName.trim() || undefined,
      stakeType: stakeType,
      city: city.trim() || undefined,
      country: country.trim() || undefined,
    };

    try {
      await createNewWard(request, user.uid);
      navigate(LEADERS_APP, { replace: true });
    } catch (err) {
      // Error handled in store
    }
  };

  const handleJoinWard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !joinCode.trim()) return;

    const result = await joinWard(joinCode.trim(), user.uid);
    if (result.success) {
      navigate(LEADERS_APP, { replace: true });
    }
  };

  // Format code input
  const handleCodeChange = (value: string) => {
    // Allow only alphanumeric and format as XXX-XXX
    const clean = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (clean.length <= 6) {
      if (clean.length > 3) {
        setJoinCode(`${clean.slice(0, 3)}-${clean.slice(3)}`);
      } else {
        setJoinCode(clean);
      }
    }
  };

  // Choose mode screen
  if (mode === 'choose') {
    return (
      <div className="ward-setup-page leaders-mint-page leaders-mint-page--inset">
        <div className="ward-setup-container">
          <div className="ward-setup-header leaders-page-hero">
            <div className="ward-setup-icon">🏛️</div>
            <h1 className="ward-setup-title leaders-page-hero__title">
              {t('ward.setup.choose.title')}
            </h1>
            <p className="ward-setup-subtitle leaders-page-hero__subtitle">
              {t('ward.setup.choose.subtitle', { role: getRoleLabel() })}
            </p>
          </div>

          <div className="ward-setup-panel leaders-mint-panel">
            <div className="ward-setup-options">
              {canCreate && (
                <button
                  type="button"
                  className="ward-option-card ward-option-create"
                  onClick={() => setMode('create')}
                >
                  <span className="option-icon">➕</span>
                  <span className="option-title">{t('ward.setup.choose.createTitle')}</span>
                  <span className="option-desc">{t('ward.setup.choose.createDesc')}</span>
                </button>
              )}

              <button
                type="button"
                className="ward-option-card ward-option-join"
                onClick={() => setMode('join')}
              >
                <span className="option-icon">🔗</span>
                <span className="option-title">{t('ward.setup.choose.joinTitle')}</span>
                <span className="option-desc">{t('ward.setup.choose.joinDesc')}</span>
              </button>
            </div>

            {!canCreate && (
              <div className="ward-setup-note">
                <p>💡 {t('ward.setup.choose.noteNonBishopric')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Create ward form
  if (mode === 'create') {
    return (
      <div className="ward-setup-page leaders-mint-page leaders-mint-page--inset">
        <div className="ward-setup-container">
          <button
            type="button"
            className="ward-back-button"
            onClick={() => {
              setMode('choose');
              clearError();
            }}
          >
            ← {t('ward.setup.create.back')}
          </button>

          <div className="ward-setup-header leaders-page-hero">
            <div className="ward-setup-icon">➕</div>
            <h1 className="ward-setup-title leaders-page-hero__title">{t('ward.setup.create.title')}</h1>
            <p className="ward-setup-subtitle leaders-page-hero__subtitle">
              {t('ward.setup.create.subtitle')}
            </p>
          </div>

          <div className="ward-setup-panel leaders-mint-panel">
          <form className="ward-form" onSubmit={handleCreateWard}>
            {/* Ward Name */}
            <div className="form-group">
              <label htmlFor="wardName">{t('ward.setup.create.wardNameLabel')}</label>
              <input
                id="wardName"
                type="text"
                value={wardName}
                onChange={(e) => setWardName(e.target.value)}
                placeholder={t('ward.setup.create.wardNamePlaceholder')}
                required
              />
            </div>

            {/* Ward Type */}
            <div className="form-group">
              <label>{t('ward.setup.create.unitTypeLabel')}</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="wardType"
                    value="ward"
                    checked={wardType === 'ward'}
                    onChange={() => setWardType('ward')}
                  />
                  <span>{t('ward.setup.create.unitWard')}</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="wardType"
                    value="branch"
                    checked={wardType === 'branch'}
                    onChange={() => setWardType('branch')}
                  />
                  <span>{t('ward.setup.create.unitBranch')}</span>
                </label>
              </div>
            </div>

            {/* Stake Name */}
            <div className="form-group">
              <label htmlFor="stakeName">{t('ward.setup.create.stakeNameLabel')}</label>
              <input
                id="stakeName"
                type="text"
                value={stakeName}
                onChange={(e) => setStakeName(e.target.value)}
                placeholder={t('ward.setup.create.stakeNamePlaceholder')}
              />
            </div>

            {/* Stake Type */}
            <div className="form-group">
              <label>{t('ward.setup.create.stakeTypeLabel')}</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="stakeType"
                    value="stake"
                    checked={stakeType === 'stake'}
                    onChange={() => setStakeType('stake')}
                  />
                  <span>{t('ward.setup.create.stakeTypeStake')}</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="stakeType"
                    value="district"
                    checked={stakeType === 'district'}
                    onChange={() => setStakeType('district')}
                  />
                  <span>{t('ward.setup.create.stakeTypeDistrict')}</span>
                </label>
              </div>
            </div>

            {/* Location */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">{t('ward.setup.create.cityLabel')}</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t('ward.setup.create.cityPlaceholder')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">{t('ward.setup.create.countryLabel')}</label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={t('ward.setup.create.countryPlaceholder')}
                />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
              type="submit"
              className="ward-submit-button"
              disabled={isLoading || !wardName.trim()}
            >
              {isLoading ? `⏳ ${t('ward.setup.create.submitting')}` : `✓ ${t('ward.setup.create.submit')}`}
            </button>
          </form>
          </div>
        </div>
      </div>
    );
  }

  // Join ward form
  return (
    <div className="ward-setup-page leaders-mint-page leaders-mint-page--inset">
      <div className="ward-setup-container">
        <button
          type="button"
          className="ward-back-button"
          onClick={() => {
            setMode('choose');
            clearError();
          }}
        >
          ← {t('ward.setup.join.back')}
        </button>

        <div className="ward-setup-header leaders-page-hero">
          <div className="ward-setup-icon">🔗</div>
          <h1 className="ward-setup-title leaders-page-hero__title">{t('ward.setup.join.title')}</h1>
          <p className="ward-setup-subtitle leaders-page-hero__subtitle">
            {t('ward.setup.join.subtitle')}
          </p>
        </div>

        <div className="ward-setup-panel leaders-mint-panel">
        <form className="ward-form" onSubmit={handleJoinWard}>
          <div className="form-group">
            <label htmlFor="joinCode">{t('ward.setup.join.codeLabel')}</label>
            <input
              id="joinCode"
              type="text"
              value={joinCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="XXX-XXX"
              className="code-input"
              maxLength={7}
              autoComplete="off"
              autoCapitalize="characters"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button
            type="submit"
            className="ward-submit-button"
            disabled={isLoading || joinCode.replace('-', '').length !== 6}
          >
            {isLoading ? `⏳ ${t('ward.setup.join.submitting')}` : `✓ ${t('ward.setup.join.submit')}`}
          </button>
        </form>

        <div className="ward-setup-help">
          <p>{t('ward.setup.join.helpTitle')}</p>
          <p className="help-text">{t('ward.setup.join.helpBody')}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default WardSetupPage;
