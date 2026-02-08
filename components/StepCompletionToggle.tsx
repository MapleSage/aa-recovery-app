'use client';

import { useState, useEffect } from 'react';
import { isStepComplete, toggleStepCompletion } from '@/lib/stepProgress';

export default function StepCompletionToggle({ stepNum }: { stepNum: number }) {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setIsComplete(isStepComplete(stepNum));

        // Listen for external updates (e.g. from cleared data)
        const handleUpdate = () => setIsComplete(isStepComplete(stepNum));
        window.addEventListener('step-progress-updated', handleUpdate);
        return () => window.removeEventListener('step-progress-updated', handleUpdate);
    }, [stepNum]);

    const handleToggle = () => {
        const newState = toggleStepCompletion(stepNum);
        setIsComplete(newState);
    };

    return (
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #eee', textAlign: 'center' }}>
            <button
                onClick={handleToggle}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    margin: '0 auto',
                    padding: '12px 24px',
                    borderRadius: '50px',
                    border: 'none',
                    background: isComplete ? '#DCFCE7' : '#F3F4F6',
                    color: isComplete ? '#166534' : '#4B5563',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isComplete ? '0 2px 8px rgba(34, 197, 94, 0.2)' : 'none'
                }}
            >
                <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isComplete ? '#22C55E' : '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px'
                }}>
                    {isComplete ? '✓' : ''}
                </div>
                {isComplete ? 'Step Completed' : 'Mark as Complete'}
            </button>

            {isComplete && (
                <p style={{ marginTop: '12px', fontSize: '14px', color: '#166534' }}>
                    Great job! You're making progress.
                </p>
            )}
        </div>
    );
}
