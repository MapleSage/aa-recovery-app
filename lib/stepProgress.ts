'use client';

// Key for storing completed steps in localStorage
const STORAGE_KEY = 'aa_app_completed_steps';

export interface StepCompletionData {
    [stepNum: number]: string; // ISO Date string of completion
}

export function getCompletedSteps(): StepCompletionData {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        console.error('Failed to parse completed steps', e);
        return {};
    }
}

export function isStepComplete(stepNum: number): boolean {
    const data = getCompletedSteps();
    return !!data[stepNum];
}

export function toggleStepCompletion(stepNum: number): boolean {
    const data = getCompletedSteps();
    const isComplete = !!data[stepNum];

    if (isComplete) {
        delete data[stepNum];
    } else {
        data[stepNum] = new Date().toISOString();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Dispatch a custom event so components can react immediately
    window.dispatchEvent(new Event('step-progress-updated'));

    return !isComplete;
}
