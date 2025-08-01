'use client';

export function getSessionId(): string {
    if (typeof window === 'undefined') return '';

    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
}