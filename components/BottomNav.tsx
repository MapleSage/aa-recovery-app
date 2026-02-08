'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/app') return pathname === '/app';
        return pathname?.startsWith(path);
    };

    return (
        <div className="bottom-nav">
            <Link href="/app" className={`nav-item ${isActive('/app') ? 'active' : ''}`}>
                <span className="nav-icon">📊</span>
                <span className="nav-label">The Steps</span>
            </Link>
            <Link href="/app/tools" className={`nav-item ${isActive('/app/tools') ? 'active' : ''}`}>
                <span className="nav-icon">🛠️</span>
                <span className="nav-label">Tools</span>
            </Link>
            <Link href="/app/sponsorship" className={`nav-item ${isActive('/app/sponsorship') ? 'active' : ''}`}>
                <span className="nav-icon">👥</span>
                <span className="nav-label">Sponsorship</span>
            </Link>
            <Link href="/app/literature" className={`nav-item ${isActive('/app/literature') ? 'active' : ''}`}>
                <span className="nav-icon">📚</span>
                <span className="nav-label">Literature</span>
            </Link>
            <Link href="/app/settings" className={`nav-item ${isActive('/app/settings') ? 'active' : ''}`}>
                <span className="nav-icon">⚙️</span>
                <span className="nav-label">Settings</span>
            </Link>
        </div>
    );
}
