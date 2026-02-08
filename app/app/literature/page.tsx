'use client';

import Navigation from '@/components/Navigation';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

export default function LiteraturePage() {
    return (
        <>
            <Navigation
                title="Literature"
                backLabel=""
                backHref=""
                hideBack={true}
            />

            <main className="page-content">
                <h2 className="section-header">LITERATURE</h2>

                <Link href="/app/literature/bigbook" className="tool-card">
                    <span className="tool-icon">📖</span>
                    <div className="tool-info">
                        <div className="tool-title">A.A. Big Book</div>
                        <div className="tool-description">Read the Big Book</div>
                    </div>
                </Link>

                <Link href="/app/literature/daily" className="tool-card">
                    <span className="tool-icon">🌅</span>
                    <div className="tool-info">
                        <div className="tool-title">Daily Readings</div>
                        <div className="tool-description">Thought & Reflection for Today</div>
                    </div>
                </Link>

                <Link href="/app/literature/prayers" className="tool-card">
                    <span className="tool-icon">🙏</span>
                    <div className="tool-info">
                        <div className="tool-title">A.A. Prayers</div>
                        <div className="tool-description">Common prayers for recovery</div>
                    </div>
                </Link>
            </main>

            <BottomNav />
        </>
    );
}
