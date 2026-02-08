'use client';

interface FABProps {
    onClick: () => void;
}

export default function FAB({ onClick }: FABProps) {
    return (
        <button className="fab" onClick={onClick} aria-label="Add new entry">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}
