/**
 * App Bridge - Cross-App Communication
 * 
 * Utilities for sharing data between xTheGospel apps:
 * - QR Code generation
 * - Deep links
 * - Clipboard sharing
 * - URL-based data transfer
 */

import { UniversalUserProfile, ShareableProfile } from '../types/user';

// ============================================
// APP URLS (configurable per environment)
// ============================================

export const APP_URLS = {
  member: import.meta.env.VITE_APP_URL_MEMBER || 'https://app.xthegospel.com',
  leader: import.meta.env.VITE_APP_URL_LEADER || 'https://leader.xthegospel.com',
} as const;

// ============================================
// QR CODE DATA
// ============================================

/**
 * QR payload: deep link en la misma app para añadir amigo por xTheGospel ID.
 * Mantiene compatibilidad con URLs antiguas codificadas en base64 (app de líderes).
 */
export function generateProfileQRData(profile: UniversalUserProfile | ShareableProfile): string {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : APP_URLS.member.replace(/\/$/, '');
  return `${origin}/friends?xtgInvite=${encodeURIComponent(profile.xthegospelId)}`;
}

/**
 * Parse QR code data from a scanned URL
 */
export function parseProfileQRData(url: string): { 
  xthegospelId: string; 
  displayName?: string 
} | null {
  try {
    const urlObj = new URL(url);
    const invite = urlObj.searchParams.get('xtgInvite');
    if (invite && /^XTG-\d{4}-[A-Z0-9]{6}$/i.test(invite)) {
      return { xthegospelId: invite.toUpperCase() };
    }

    const dataParam = urlObj.searchParams.get('data');
    
    if (!dataParam) {
      // Try direct ID in path: /lookup/XTG-2026-ABC123
      const pathMatch = urlObj.pathname.match(/\/lookup\/?(XTG-\d{4}-[A-Z0-9]{6})/i);
      if (pathMatch) {
        return { xthegospelId: pathMatch[1].toUpperCase() };
      }
      return null;
    }
    
    const data = JSON.parse(atob(dataParam));
    
    if (data.type === 'xtg-profile' && data.id) {
      return {
        xthegospelId: data.id,
        displayName: data.name,
      };
    }
    
    return null;
  } catch {
    return null;
  }
}

// ============================================
// DEEP LINKS
// ============================================

/**
 * Generate a deep link to open the leader app with a specific profile
 */
export function generateLeaderDeepLink(xthegospelId: string): string {
  return `${APP_URLS.leader}/lookup/${xthegospelId}`;
}

/**
 * Generate a deep link to open the member app profile
 */
export function generateMemberDeepLink(xthegospelId: string): string {
  return `${APP_URLS.member}/profile/${xthegospelId}`;
}

/**
 * Open an app via deep link (web version)
 */
export function openApp(app: keyof typeof APP_URLS, path: string = '/'): void {
  const url = `${APP_URLS[app]}${path}`;
  window.open(url, '_blank');
}

// ============================================
// OPEN LEADERS APP (Member → Leaders PWA bridge)
// ============================================

export type OpenLeadersOptions = {
  target?: '_blank' | '_self';
  path?: string;
  returnTo?: string;
  context?: Record<string, string | number | boolean | null | undefined>;
};

/**
 * Open Leaders app with optional returnUrl and context.
 * Use from Member app Training teaser card.
 */
export function openLeadersApp(opts: OpenLeadersOptions = {}): void {
  const base = (APP_URLS.leader || '').replace(/\/$/, '');
  if (!base) {
    console.warn('APP_URLS.leader not configured. Set VITE_APP_URL_LEADER.');
    return;
  }

  const target = opts.target ?? '_blank';
  const path = opts.path ?? '/training';
  const url = new URL(base + path);

  const returnUrl =
    opts.returnTo ??
    (typeof window !== 'undefined' ? window.location.href : '');
  if (returnUrl) url.searchParams.set('returnUrl', returnUrl);

  if (opts.context) {
    for (const [k, v] of Object.entries(opts.context)) {
      if (v === undefined) continue;
      url.searchParams.set(k, String(v ?? ''));
    }
  }

  window.open(url.toString(), target);
}

// ============================================
// CLIPBOARD SHARING
// ============================================

/**
 * Copy xTheGospel ID to clipboard with optional message
 */
export type XtgShareCopyOptions = {
  lineNameAndId?: string;
  hint?: string;
};

export async function copyXtgIdToClipboard(
  profile: UniversalUserProfile | ShareableProfile,
  includeMessage: boolean = true,
  copyLines?: XtgShareCopyOptions
): Promise<boolean> {
  try {
    let text = profile.xthegospelId;

    if (includeMessage) {
      const body =
        copyLines?.lineNameAndId ??
        `${profile.displayName}\nxTheGospel ID: ${profile.xthegospelId}`;
      const hint =
        copyLines?.hint ??
        'You can use this ID to connect with me on xTheGospel (friends, study, or ward).';
      text = `${body}\n\n${hint}`;
    }

    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// ============================================
// NATIVE SHARE API
// ============================================

export type ShareProfileOptions = {
  title?: string;
  text?: string;
  url?: string;
  clipboardHint?: string;
};

/**
 * Share profile using native share (mobile/desktop)
 */
export async function shareProfile(
  profile: UniversalUserProfile | ShareableProfile,
  options?: ShareProfileOptions
): Promise<boolean> {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : APP_URLS.member.replace(/\/$/, '');
  const defaultUrl = `${origin}/friends?xtgInvite=${encodeURIComponent(profile.xthegospelId)}`;

  const shareData = {
    title: options?.title ?? 'xTheGospel ID',
    text:
      options?.text ??
      `${profile.displayName}\nxTheGospel ID: ${profile.xthegospelId}`,
    url: options?.url ?? defaultUrl,
  };

  // Check if native share is available
  if (navigator.share && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      // User cancelled or error
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error);
      }
      return false;
    }
  }

  // Fallback to clipboard
  return copyXtgIdToClipboard(profile, true, {
    lineNameAndId: shareData.text,
    hint: options?.clipboardHint,
  });
}

// ============================================
// URL PARAMETER EXTRACTION
// ============================================

/**
 * Check if current URL has xTheGospel ID parameter
 * Useful for handling incoming links
 */
export function getXtgIdFromUrl(): string | null {
  // Check URL params
  const params = new URLSearchParams(window.location.search);
  const idParam =
    params.get('xtgInvite') ||
    params.get('xtgId') ||
    params.get('id');

  if (idParam && /^XTG-\d{4}-[A-Z0-9]{6}$/i.test(idParam)) {
    return idParam.toUpperCase();
  }
  
  // Check URL path: /profile/XTG-2026-ABC123 or /lookup/XTG-2026-ABC123
  const pathMatch = window.location.pathname.match(
    /\/(profile|lookup)\/(XTG-\d{4}-[A-Z0-9]{6})/i
  );
  
  if (pathMatch) {
    return pathMatch[2].toUpperCase();
  }
  
  return null;
}

// ============================================
// BROADCAST CHANNEL (Same Origin Communication)
// ============================================

type BroadcastEventType = 
  | 'profile-updated'
  | 'profile-verified'
  | 'logout';

interface BroadcastMessage {
  type: BroadcastEventType;
  payload: any;
  timestamp: number;
}

let broadcastChannel: BroadcastChannel | null = null;

/**
 * Initialize broadcast channel for cross-tab communication
 */
export function initBroadcastChannel(
  onMessage?: (message: BroadcastMessage) => void
): void {
  if (typeof BroadcastChannel === 'undefined') return;
  
  try {
    broadcastChannel = new BroadcastChannel('xthegospel-sync');
    
    if (onMessage) {
      broadcastChannel.onmessage = (event) => {
        onMessage(event.data as BroadcastMessage);
      };
    }
  } catch (error) {
    console.warn('BroadcastChannel not supported:', error);
  }
}

/**
 * Send message to other tabs/windows of the same app
 */
export function broadcastMessage(type: BroadcastEventType, payload: any): void {
  if (!broadcastChannel) return;
  
  const message: BroadcastMessage = {
    type,
    payload,
    timestamp: Date.now(),
  };
  
  broadcastChannel.postMessage(message);
}

/**
 * Close broadcast channel
 */
export function closeBroadcastChannel(): void {
  broadcastChannel?.close();
  broadcastChannel = null;
}
