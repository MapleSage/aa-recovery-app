'use client';

import Link from 'next/link';

interface StepCardProps {
    number: number;
    title: string;
    subtitle: string;
    href: string;
}

export default function StepCard({ number, title, subtitle, href }: StepCardProps) {
    return (
        <Link href={href} className="step-card">
            <div className="step-number">{number}</div>
            <div className="step-info">
                <div className="step-title">{title}</div>
                <div className="step-subtitle">{subtitle}</div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{ color: 'var(--gray-400)' }}>
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Link>
    );
}
