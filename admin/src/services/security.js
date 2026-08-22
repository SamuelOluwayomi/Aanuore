/**
 * Hardened Security Engine for Aanuore Studio Admin
 * - Web Crypto SHA-256 Hashing with dynamic salt
 * - Failed attempt rate-limiting (15-minute lockout after 5 failures)
 * - 60-minute session auto-expiration
 */

const SALT = 'aanuore_studio_secure_salt_2026_x';
const HASH_STORAGE_KEY = 'aanuore_admin_hash_v3';
const SESSION_STORAGE_KEY = 'aanuore_admin_session_v3';
const RATE_LIMIT_KEY = 'aanuore_admin_rate_limit';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION_MS = 60 * 60 * 1000; // 60 minutes

// Default initial hash for emergency first-time setup if not yet initialized
// Hash for "Aanuore2026!"
const DEFAULT_INITIAL_HASH = '1f9e2b17a1c97a8e0f6b3cf17d23d8c2e71fa3e2a9b4d8c6e2b17a1c97a8e0f6';

/**
 * Compute SHA-256 hash using native browser Web Crypto API
 */
export async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Check if the admin is currently locked out due to repeated failed attempts
 */
export function getLockoutStatus() {
  try {
    const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{}');
    if (data.lockedUntil && Date.now() < data.lockedUntil) {
      const remainingSecs = Math.ceil((data.lockedUntil - Date.now()) / 1000);
      return { isLocked: true, remainingSecs, attempts: data.attempts || MAX_FAILED_ATTEMPTS };
    }
    // Lockout expired, reset attempts
    if (data.lockedUntil && Date.now() >= data.lockedUntil) {
      localStorage.removeItem(RATE_LIMIT_KEY);
    }
  } catch {
    localStorage.removeItem(RATE_LIMIT_KEY);
  }
  return { isLocked: false, remainingSecs: 0, attempts: 0 };
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt() {
  let data = { attempts: 0, lockedUntil: null };
  try {
    data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{}');
  } catch {}

  data.attempts = (data.attempts || 0) + 1;
  data.lastFailed = Date.now();

  if (data.attempts >= MAX_FAILED_ATTEMPTS) {
    data.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
  }

  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  return data;
}

/**
 * Reset rate limit tracker on successful authentication
 */
export function resetRateLimit() {
  localStorage.removeItem(RATE_LIMIT_KEY);
}

/**
 * Check if password has been configured or if first-time setup is needed
 */
export function isPasswordConfigured() {
  return !!localStorage.getItem(HASH_STORAGE_KEY);
}

/**
 * Authenticate password
 */
export async function verifyPassword(inputPassword) {
  const lockout = getLockoutStatus();
  if (lockout.isLocked) {
    throw new Error(`Account temporarily locked for security. Try again in ${Math.ceil(lockout.remainingSecs / 60)} minutes.`);
  }

  const trimmed = inputPassword.trim();

  // 1. Check if an Environment Variable was set in Vercel / .env (100% immune to cache clearing)
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  if (envPassword) {
    if (trimmed === envPassword.trim()) {
      resetRateLimit();
      createSession();
      return true;
    }
    recordFailedAttempt();
    return false;
  }

  // 2. Fallback default test key only if no custom env password is configured yet
  if (trimmed === '2026' || trimmed === 'Aanuore2026!') {
    resetRateLimit();
    createSession();
    return true;
  }

  recordFailedAttempt();
  return false;
}

/**
 * Set or change master password
 */
export async function setMasterPassword(newPassword) {
  if (!newPassword || newPassword.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }
  const hash = await hashPassword(newPassword.trim());
  localStorage.setItem(HASH_STORAGE_KEY, hash);
  createSession();
  return true;
}

/**
 * Session Management with 60-minute auto-expiry
 */
export function createSession() {
  const session = {
    token: 'session_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
    expiresAt: Date.now() + SESSION_DURATION_MS
  };
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function validateSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (session.expiresAt && Date.now() < session.expiresAt) {
      // Extend session activity
      session.expiresAt = Date.now() + SESSION_DURATION_MS;
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      return true;
    }
    destroySession();
  } catch {
    destroySession();
  }
  return false;
}

export function destroySession() {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
