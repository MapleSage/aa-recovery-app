'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname?.startsWith(path);
    };

    return (
        <div className="bottom-nav">
            <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                <span className="nav-icon">📊</span>
                <span className="nav-label">The Steps</span>
            </Link>
            <Link href="/tools" className={`nav-item ${isActive('/tools') ? 'active' : ''}`}>
                <span className="nav-icon">🛠️</span>
                <span className="nav-label">Tools</span>
            </Link>
            <Link href="/sponsorship" className={`nav-item ${isActive('/sponsorship') ? 'active' : ''}`}>
                <span className="nav-icon">👥</span>
                <span className="nav-label">Sponsorship</span>
            </Link>
            <Link href="/literature" className={`nav-item ${isActive('/literature') ? 'active' : ''}`}>
                <span className="nav-icon">📚</span>
                <span className="nav-label">Literature</span>
            </Link>
            <Link href="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
                <span className="nav-icon">⚙️</span>
                <span className="nav-label">Settings</span>
            </Link>
        </div>
    );
}
