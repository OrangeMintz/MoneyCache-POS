// utils/activityUtils.ts
const SESSION_ACTIVITY_KEY = 'lastActivityTime';
const SESSION_LOCKED_KEY = 'systemLocked';

export function updateLastActivity(): void {
  sessionStorage.setItem(SESSION_ACTIVITY_KEY, Date.now().toString());
}

export function getLastActivityTime(): number {
  const stored = sessionStorage.getItem(SESSION_ACTIVITY_KEY);
  return stored ? parseInt(stored, 10) : Date.now();
}

export function getInactivityTime(): number {
  return Date.now() - getLastActivityTime();
}

export function isInactive(timeout: number = 15 * 60 * 1000): boolean {
  return getInactivityTime() > timeout;
}

export function setLockedState(locked: boolean): void {
  if (locked) {
    sessionStorage.setItem(SESSION_LOCKED_KEY, 'true');
  } else {
    sessionStorage.removeItem(SESSION_LOCKED_KEY);
  }
}

export function getLockedState(): boolean {
  return sessionStorage.getItem(SESSION_LOCKED_KEY) === 'true';
}

export function clearLockState(): void {
  sessionStorage.removeItem(SESSION_LOCKED_KEY);
  updateLastActivity();
}