/**
 * Data & Privacy Section
 * Sprint 10 - Data Ownership & Export
 * 
 * "Everything you write here belongs to you.
 *  You can take it with you, anytime."
 */
import React, { useState, useEffect } from 'react';
import { FaDownload, FaTrashCan, FaShieldHalved, FaCheck } from 'react-icons/fa6';
import { useI18n } from '../context/I18nContext';
import {
  exportLocalData,
  clearAllLocalData,
  getDataInfo,
  DataInfo,
} from '../core/export/exportLocalData';
import './DataPrivacySection.css';

interface DataPrivacySectionProps {
  /** CSS class prefix for theming (e.g., 'inv-profile' or 'nm-profile') */
  classPrefix?: string;
}

export default function DataPrivacySection({
  classPrefix = 'data-privacy',
}: DataPrivacySectionProps): JSX.Element {
  const { t } = useI18n();
  const [dataInfo, setDataInfo] = useState<DataInfo | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  useEffect(() => {
    // Load data info on mount
    setDataInfo(getDataInfo());
  }, []);

  const handleExport = () => {
    try {
      exportLocalData();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      alert(t('app.dataPrivacy.exportFailed'));
    }
  };

  const handleClearRequest = () => {
    setShowClearConfirm(true);
  };

  const handleClearConfirm = () => {
    clearAllLocalData();
    // Page will reload after clear
  };

  const handleClearCancel = () => {
    setShowClearConfirm(false);
  };

  return (
    <div className={`${classPrefix}__data-privacy`}>
      {/* Trust Message */}
      <div className={`${classPrefix}__privacy-intro`}>
        <FaShieldHalved className={`${classPrefix}__privacy-icon`} />
        <p className={`${classPrefix}__privacy-message`}>
          {t('app.dataPrivacy.introLine1')}
          <br />
          <span className={`${classPrefix}__privacy-emphasis`}>
            {t('app.dataPrivacy.introLine2')}
          </span>
        </p>
      </div>

      {/* What Exists */}
      <div className={`${classPrefix}__data-summary`}>
        <h4 className={`${classPrefix}__data-summary-title`}>{t('app.dataPrivacy.summaryTitle')}</h4>
        <ul className={`${classPrefix}__data-list`}>
          <li className={dataInfo?.hasBaptismPrepData ? '' : `${classPrefix}__data-empty`}>
            <span>{t('app.dataPrivacy.localBaptismPrep')}</span>
            <span>{dataInfo?.hasBaptismPrepData ? '✓' : '—'}</span>
          </li>
          <li className={dataInfo?.hasJournalEntries ? '' : `${classPrefix}__data-empty`}>
            <span>{t('app.dataPrivacy.journalEntries')}</span>
            <span>
              {dataInfo?.hasJournalEntries
                ? (dataInfo.journalEntryCount === 1
                    ? t('app.dataPrivacy.journalEntriesOne')
                    : t('app.dataPrivacy.journalEntriesMany', { count: dataInfo.journalEntryCount }))
                : '—'}
            </span>
          </li>
          <li className={dataInfo?.hasSpiritualMemory ? '' : `${classPrefix}__data-empty`}>
            <span>{t('app.dataPrivacy.continuityMemory')}</span>
            <span>{dataInfo?.hasSpiritualMemory ? '✓' : '—'}</span>
          </li>
          <li className={dataInfo?.hasLeadershipData ? '' : `${classPrefix}__data-empty`}>
            <span>{t('app.dataPrivacy.wardLeadershipLocal')}</span>
            <span>{dataInfo?.hasLeadershipData ? '✓' : '—'}</span>
          </li>
        </ul>
      </div>

      {/* What Does NOT Exist */}
      <div className={`${classPrefix}__no-tracking`}>
        <p className={`${classPrefix}__no-tracking-text`}>
          <strong>{t('app.dataPrivacy.noTrackingLead')}</strong>{' '}
          {t('app.dataPrivacy.noTrackingRest')}
        </p>
      </div>

      {/* Actions */}
      <div className={`${classPrefix}__data-actions`}>
        <button
          className={`${classPrefix}__data-btn ${classPrefix}__data-btn--export`}
          onClick={handleExport}
          disabled={exportSuccess}
        >
          {exportSuccess ? (
            <>
              <FaCheck /> {t('app.dataPrivacy.exportedSuccess')}
            </>
          ) : (
            <>
              <FaDownload /> {t('app.dataPrivacy.exportButton')}
            </>
          )}
        </button>

        <button
          className={`${classPrefix}__data-btn ${classPrefix}__data-btn--clear`}
          onClick={handleClearRequest}
        >
          <FaTrashCan /> {t('app.dataPrivacy.clearButton')}
        </button>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className={`${classPrefix}__confirm-overlay`}>
          <div className={`${classPrefix}__confirm-modal`}>
            <h3 className={`${classPrefix}__confirm-title`}>{t('app.dataPrivacy.confirmTitle')}</h3>
            <p className={`${classPrefix}__confirm-text`}>
              {t('app.dataPrivacy.confirmIntro')}
              <br />
              <br />
              • {t('app.dataPrivacy.bulletBaptismPrep')}
              <br />
              • {t('app.dataPrivacy.bulletJournal')}
              <br />
              • {t('app.dataPrivacy.bulletLeadership')}
              <br />
              • {t('app.dataPrivacy.bulletPrefs')}
              <br />
              <br />
              <strong>{t('app.dataPrivacy.recommendExport')}</strong>
              <br />
              {t('app.dataPrivacy.startFresh')}
            </p>
            <div className={`${classPrefix}__confirm-actions`}>
              <button
                className={`${classPrefix}__confirm-btn ${classPrefix}__confirm-btn--cancel`}
                onClick={handleClearCancel}
              >
                {t('app.dataPrivacy.keepData')}
              </button>
              <button
                className={`${classPrefix}__confirm-btn ${classPrefix}__confirm-btn--confirm`}
                onClick={handleClearConfirm}
              >
                {t('app.dataPrivacy.clearEverything')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
