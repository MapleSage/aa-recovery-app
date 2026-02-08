'use client';

import { useRouter } from 'next/navigation';

interface NavigationProps {
    title: string;
    backHref?: string;
    backLabel?: string;
    rightAction?: React.ReactNode;
    hideBack?: boolean;
}

export default function Navigation({
    title,
    backHref = '/app',
    backLabel = 'The Steps',
    rightAction,
    hideBack = false
}: NavigationProps) {
    const router = useRouter();

    const handleBack = () => {
        if (backHref) {
            router.push(backHref);
        } else {
            router.back();
        }
    };

    return (
        <header className="nav-header">
            {!hideBack && (
                <button className="nav-back" onClick={handleBack}>
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path d="M10 2L2 10L10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {backLabel}
                </button>
            )}
            <h1 className="nav-title">{title}</h1>
            <div style={{ minWidth: '80px', textAlign: 'right' }}>
                {rightAction}
            </div>
        </header>
    );
}
