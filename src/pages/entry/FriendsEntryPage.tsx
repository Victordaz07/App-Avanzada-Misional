import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import { getInvestigatorCoreLessons } from '../../modules/investigator/data/lessons';
import type { PublicUserCard } from '../../services/firebase/publicUserCardService';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getSharedStudy,
  listAcceptedFriends,
  listPendingIncoming,
  listPendingOutgoing,
  rejectFriendRequest,
  sendFriendRequest,
  setSharedStudyLesson,
  sendFriendMessage,
  subscribeFriendMessages,
  type FriendMessageDoc,
} from '../../services/firebase/friendsService';
import './FriendsEntryPage.css';

export default function FriendsEntryPage(): JSX.Element {
  const { user } = useAuth();
  const { t, locale } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const uid = user?.uid;

  const [xtgInput, setXtgInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const [incoming, setIncoming] = useState<Awaited<ReturnType<typeof listPendingIncoming>>>([]);
  const [outgoing, setOutgoing] = useState<Awaited<ReturnType<typeof listPendingOutgoing>>>([]);
  const [friends, setFriends] = useState<PublicUserCard[]>([]);
  const [selected, setSelected] = useState<PublicUserCard | null>(null);

  const [lessonId, setLessonId] = useState<string>('');
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState<FriendMessageDoc[]>([]);

  const coreLessons = useMemo(() => getInvestigatorCoreLessons(locale), [locale]);

  const reloadLists = useCallback(async () => {
    if (!uid) return;
    const [inc, out, fr] = await Promise.all([
      listPendingIncoming(uid),
      listPendingOutgoing(uid),
      listAcceptedFriends(uid),
    ]);
    setIncoming(inc);
    setOutgoing(out);
    setFriends(fr);
  }, [uid]);

  useEffect(() => {
    const invite = searchParams.get('xtgInvite');
    if (invite) {
      setXtgInput(invite.trim().toUpperCase());
    }
  }, [searchParams]);

  useEffect(() => {
    void reloadLists();
  }, [reloadLists]);

  useEffect(() => {
    if (!uid || !selected) {
      setMessages([]);
      return;
    }
    const unsub = subscribeFriendMessages(uid, selected.uid, setMessages, 80);
    return () => unsub();
  }, [uid, selected]);

  useEffect(() => {
    if (!uid || !selected) {
      setLessonId('');
      return;
    }
    void (async () => {
      const doc = await getSharedStudy(uid, selected.uid);
      setLessonId(doc?.activeLessonId ?? '');
    })();
  }, [uid, selected]);

  const showBanner = (type: 'ok' | 'err', text: string) => {
    setBanner({ type, text });
    window.setTimeout(() => setBanner(null), 5000);
  };

  const handleSendRequest = async () => {
    if (!uid) return;
    const raw = xtgInput.trim().toUpperCase();
    if (!/^XTG-\d{4}-[A-Z0-9]{6}$/.test(raw)) {
      showBanner('err', t('app.friends.lookupError'));
      return;
    }
    setBusy(true);
    try {
      const res = await sendFriendRequest(uid, raw);
      if (!res.ok) {
        if (res.reason === 'not_found') showBanner('err', t('app.friends.lookupError'));
        else if (res.reason === 'self') showBanner('err', t('app.friends.selfError'));
        else if (res.reason === 'duplicate') showBanner('err', t('app.friends.errorDuplicate'));
        else if (res.reason === 'already_friends') showBanner('err', t('app.friends.errorAlreadyFriends'));
        else showBanner('err', t('app.friends.errorGeneric'));
        return;
      }
      showBanner('ok', t('app.friends.requestSent'));
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete('xtgInvite');
        return next;
      });
      await reloadLists();
    } finally {
      setBusy(false);
    }
  };

  const handleSaveStudy = async () => {
    if (!uid || !selected) return;
    setBusy(true);
    try {
      await setSharedStudyLesson(uid, selected.uid, lessonId || null);
      showBanner('ok', t('app.friends.studySaved'));
    } catch {
      showBanner('err', t('app.friends.errorGeneric'));
    } finally {
      setBusy(false);
    }
  };

  const handleSendChat = async () => {
    if (!uid || !selected || !chatText.trim()) return;
    setBusy(true);
    try {
      await sendFriendMessage(uid, selected.uid, chatText);
      setChatText('');
    } catch {
      showBanner('err', t('app.friends.errorGeneric'));
    } finally {
      setBusy(false);
    }
  };

  if (!uid) {
    return (
      <div className="friends-entry">
        <p className="friends-entry__muted">{t('app.friends.loginRequired')}</p>
      </div>
    );
  }

  return (
    <div className="friends-entry anim-fade-up">
      <header className="friends-entry__header">
        <h1 className="friends-entry__title">{t('app.friends.title')}</h1>
        <p className="friends-entry__subtitle">{t('app.friends.subtitle')}</p>
        <p className="friends-entry__notice">{t('app.friends.minorNotice')}</p>
      </header>

      {banner ? (
        <div className={`friends-entry__banner friends-entry__banner--${banner.type}`} role="status">
          {banner.text}
        </div>
      ) : null}

      <section className="friends-entry__card" aria-labelledby="friends-add-heading">
        <h2 id="friends-add-heading" className="friends-entry__h2">
          {t('app.friends.addById')}
        </h2>
        <div className="friends-entry__row">
          <input
            className="friends-entry__input"
            value={xtgInput}
            onChange={(e) => setXtgInput(e.target.value)}
            placeholder={t('app.friends.xtgPlaceholder')}
            autoCapitalize="characters"
            spellCheck={false}
          />
          <button
            type="button"
            className="friends-entry__btn friends-entry__btn--primary"
            disabled={busy}
            onClick={() => void handleSendRequest()}
          >
            {t('app.friends.sendRequest')}
          </button>
        </div>
      </section>

      {incoming.length > 0 ? (
        <section className="friends-entry__card" aria-labelledby="friends-in-heading">
          <h2 id="friends-in-heading" className="friends-entry__h2">
            {t('app.friends.pendingIncoming')}
          </h2>
          <ul className="friends-entry__list">
            {incoming.map((row) => (
              <li key={row.id} className="friends-entry__list-item">
                <span className="friends-entry__name">
                  {row.fromCard?.displayName ?? row.data.fromUid}
                </span>
                <span className="friends-entry__id">{row.fromCard?.xthegospelId}</span>
                <div className="friends-entry__actions">
                  <button
                    type="button"
                    className="friends-entry__btn friends-entry__btn--primary"
                    disabled={busy}
                    onClick={() => {
                      void (async () => {
                        setBusy(true);
                        try {
                          await acceptFriendRequest(row.id);
                          await reloadLists();
                        } finally {
                          setBusy(false);
                        }
                      })();
                    }}
                  >
                    {t('app.friends.accept')}
                  </button>
                  <button
                    type="button"
                    className="friends-entry__btn friends-entry__btn--ghost"
                    disabled={busy}
                    onClick={() => {
                      void (async () => {
                        setBusy(true);
                        try {
                          await rejectFriendRequest(row.id);
                          await reloadLists();
                        } finally {
                          setBusy(false);
                        }
                      })();
                    }}
                  >
                    {t('app.friends.reject')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {outgoing.length > 0 ? (
        <section className="friends-entry__card" aria-labelledby="friends-out-heading">
          <h2 id="friends-out-heading" className="friends-entry__h2">
            {t('app.friends.pendingOutgoing')}
          </h2>
          <ul className="friends-entry__list">
            {outgoing.map((row) => (
              <li key={row.id} className="friends-entry__list-item">
                <span className="friends-entry__name">
                  {row.toCard?.displayName ?? row.data.toUid}
                </span>
                <button
                  type="button"
                  className="friends-entry__btn friends-entry__btn--ghost"
                  disabled={busy}
                  onClick={() => {
                    void (async () => {
                      setBusy(true);
                      try {
                        await cancelFriendRequest(row.id);
                        await reloadLists();
                      } finally {
                        setBusy(false);
                      }
                    })();
                  }}
                >
                  {t('app.friends.cancel')}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="friends-entry__card" aria-labelledby="friends-list-heading">
        <h2 id="friends-list-heading" className="friends-entry__h2">
          {t('app.friends.listTitle')}
        </h2>
        {friends.length === 0 ? (
          <p className="friends-entry__muted">{t('app.friends.noFriends')}</p>
        ) : (
          <ul className="friends-entry__friends">
            {friends.map((f) => (
              <li key={f.uid}>
                <button
                  type="button"
                  className={`friends-entry__friend-pill ${selected?.uid === f.uid ? 'friends-entry__friend-pill--active' : ''}`}
                  onClick={() => setSelected(f)}
                >
                  {f.displayName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selected ? (
        <section className="friends-entry__detail">
          <button type="button" className="friends-entry__back" onClick={() => setSelected(null)}>
            {t('app.friends.back')}
          </button>
          <h2 className="friends-entry__h2">
            {t('app.friends.studyWith', { name: selected.displayName })}
          </h2>

          <div className="friends-entry__card">
            <h3 className="friends-entry__h3">{t('app.friends.studyTitle')}</h3>
            <p className="friends-entry__muted">{t('app.friends.studySubtitle')}</p>
            <label className="friends-entry__label" htmlFor="shared-lesson">
              {t('app.friends.studySelectLesson')}
            </label>
            <select
              id="shared-lesson"
              className="friends-entry__select"
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
            >
              <option value="">—</option>
              {coreLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="friends-entry__btn friends-entry__btn--primary"
              disabled={busy}
              onClick={() => void handleSaveStudy()}
            >
              {t('app.friends.studySave')}
            </button>
          </div>

          <div className="friends-entry__card">
            <h3 className="friends-entry__h3">{t('app.friends.chatTitle')}</h3>
            <div className="friends-entry__chat-log" aria-live="polite">
              {messages.length === 0 ? (
                <p className="friends-entry__muted">{t('app.friends.chatEmpty')}</p>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={`${m.senderUid}-${i}-${String(m.createdAt)}`}
                    className={`friends-entry__msg ${m.senderUid === uid ? 'friends-entry__msg--me' : ''}`}
                  >
                    <span className="friends-entry__msg-text">{m.text}</span>
                  </div>
                ))
              )}
            </div>
            <div className="friends-entry__row friends-entry__row--chat">
              <input
                className="friends-entry__input"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder={t('app.friends.chatPlaceholder')}
                maxLength={2000}
              />
              <button
                type="button"
                className="friends-entry__btn friends-entry__btn--primary"
                disabled={busy || !chatText.trim()}
                onClick={() => void handleSendChat()}
              >
                {t('app.friends.chatSend')}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
