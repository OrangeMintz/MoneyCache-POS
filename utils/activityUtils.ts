let lastActivityTime: number = Date.now();
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 15 minutes in milliseconds

export function updateLastActivity(): void {
  lastActivityTime = Date.now();
}

export function getInactivityTime(): number {
  return Date.now() - lastActivityTime;
}

export function isInactive(): boolean {
  return getInactivityTime() > INACTIVITY_TIMEOUT;
}