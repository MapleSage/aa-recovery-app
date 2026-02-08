'use client';

import Navigation from '@/components/Navigation';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

export default function ToolsPage() {
    return (
        <>
            <Navigation
                title="Tools"
                backLabel=""
                backHref=""
                hideBack={true}
            />

            <main className="page-content" style={{ paddingBottom: '80px', background: '#F8F9FA' }}>

                {/* Section 1: Your Headspace */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 className="section-title">YOUR HEADSPACE</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Link href="/app/tools/gratitude" className="tool-card">
                            <div className="tool-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>🙏</div>
                            <div className="tool-info">
                                <span className="tool-title">Gratitude Lists</span>
                                <span className="tool-desc">Daily gratitude practice</span>
                            </div>
                            <div className="tool-count">0</div>
                        </Link>

                        <div className="tool-card">
                            <div className="tool-icon" style={{ background: '#F3E8FF', color: '#9333EA' }}>📝</div>
                            <div className="tool-info">
                                <span className="tool-title">Personal Notes</span>
                                <span className="tool-desc">Private thoughts & reflections</span>
                            </div>
                            <div className="tool-count">0</div>
                        </div>

                        <div className="tool-card">
                            <div className="tool-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>🌅</div>
                            <div className="tool-info">
                                <span className="tool-title">On Awakening Journals</span>
                                <span className="tool-desc">Morning reflection & plan</span>
                            </div>
                            <div className="tool-count">0</div>
                        </div>
                    </div>
                </div>

                {/* Section 2: More Free Apps */}
                <div>
                    <h2 className="section-title">MORE FREE APPS</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="app-card">
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>AA</div>
                            <div className="tool-info">
                                <span className="tool-title">AA Big Book</span>
                                <span className="tool-desc">Read & listen to the big book</span>
                            </div>
                            <button className="get-btn">GET</button>
                        </div>

                        <div className="app-card">
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>ST</div>
                            <div className="tool-info">
                                <span className="tool-title">Speaker Tapes</span>
                                <span className="tool-desc">Recovery audio library</span>
                            </div>
                            <button className="get-btn">GET</button>
                        </div>
                    </div>
                </div>

            </main>

            {/* Inline styles for this component specifically */}
            <style jsx>{`
                .tool-card {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #fff;
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    text-decoration: none;
                    color: inherit;
                    gap: 16px;
                }
                .tool-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }
                .tool-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .tool-title {
                    font-weight: 600;
                    font-size: 16px;
                    color: var(--text-primary);
                }
                .tool-desc {
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .tool-count {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-muted);
                }
                .app-card {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    background: #fff;
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    gap: 16px;
                }
                .get-btn {
                    padding: 6px 16px;
                    background: var(--gray-100);
                    border: none;
                    border-radius: 20px;
                    color: var(--blue-primary);
                    font-weight: 600;
                    font-size: 12px;
                    cursor: pointer;
                }
            `}</style>

            <BottomNav />
        </>
    );
}
