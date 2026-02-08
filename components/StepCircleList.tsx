'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isStepComplete } from '@/lib/stepProgress';

const steps = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    color: [
        '#2563EB', // 1 - Blue
        '#0EA5E9', // 2 - Light Blue
        '#22C55E', // 3 - Green
        '#EAB308', // 4 - Yellow
        '#F97316', // 5 - Orange
        '#EF4444', // 6 - Red
        '#A855F7', // 7 - Purple
        '#6366F1', // 8 - Indigo
        '#EC4899', // 9 - Pink
        '#14B8A6', // 10 - Teal
        '#8B5CF6', // 11 - Violet
        '#10B981', // 12 - Emerald
    ][i]
}));

export default function StepCircleList() {
    const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const updateState = () => {
            const newState: Record<number, boolean> = {};
            steps.forEach(s => {
                newState[s.number] = isStepComplete(s.number);
            });
            setCompletedSteps(newState);
        };

        updateState();
        window.addEventListener('step-progress-updated', updateState);
        return () => window.removeEventListener('step-progress-updated', updateState);
    }, []);

    return (
        <div className="step-circle-container">
            <h2 className="section-title">HOW TO WORK THE STEPS</h2>
            <div className="step-circles-scroll">
                {steps.map((step) => {
                    const isComplete = completedSteps[step.number];
                    return (
                        <Link
                            key={step.number}
                            href={`/app/step/${step.number}`}
                            className="step-circle-link"
                        >
                            <div
                                className="step-circle"
                                style={{
                                    borderColor: step.color,
                                    backgroundColor: isComplete ? step.color : 'transparent',
                                    color: isComplete ? 'white' : step.color,
                                    position: 'relative'
                                }}
                            >
                                {isComplete ? (
                                    <span style={{ fontSize: '20px' }}>✓</span>
                                ) : (
                                    `Step ${step.number}`
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
