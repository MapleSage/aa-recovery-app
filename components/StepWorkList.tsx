'use client';

import Link from 'next/link';
import { getStepByNumber } from '@/lib/stepsData';

const steps = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const data = getStepByNumber(num);
    return {
        number: num,
        title: data?.title || `Step ${num}`,
        // Using the quote as the description since it contains the step text
        description: data?.quote || 'Recovery Step',
        color: [
            '#2563EB', '#0EA5E9', '#22C55E', '#EAB308',
            '#F97316', '#EF4444', '#A855F7', '#6366F1',
            '#EC4899', '#14B8A6', '#8B5CF6', '#10B981'
        ][i]
    };
});

export default function StepWorkList() {
    return (
        <div className="step-work-list-container">
            <h2 className="section-title">THE ACTUAL STEP WORK</h2>
            <div className="step-work-list">
                {steps.map((step) => (
                    <Link
                        key={step.number}
                        href={`/step/${step.number}/workbook`}
                        className="step-work-card"
                    >
                        <div className="step-work-icon-container">
                            <div className="step-work-icon" style={{ backgroundColor: step.color }}>
                                <span className="step-work-num">{step.number.toString().padStart(2, '0')}</span>
                                {/* Tiny workbook icon representation */}
                                <div className="mini-workbook-icon"></div>
                            </div>
                        </div>

                        <div className="step-work-content">
                            <h3 className="step-work-title">{step.title}</h3>
                            <p className="step-work-desc">{step.description}</p>
                        </div>

                        <div className="step-work-status">
                            {step.number === 1 ? (
                                <div className="status-bubble date">April 25th, 2025</div>
                            ) : (
                                <div className="status-bubble count">0</div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
