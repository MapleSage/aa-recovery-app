'use client';

import Navigation from '@/components/Navigation';
import BottomNav from '@/components/BottomNav';

export default function SettingsPage() {
    return (
        <>
            <Navigation
                title="Settings"
                backLabel=""
                backHref=""
                hideBack={true}
            />

            <main className="page-content" style={{ paddingBottom: '80px', background: '#F8F9FA' }}>

                {/* My Profile */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 className="section-title">MY PROFILE</h2>
                    <div className="settings-card">
                        <div className="settings-row">
                            <span>Nickname</span>
                            <span className="text-secondary">Guest</span>
                        </div>
                        <div className="settings-row">
                            <span>Email</span>
                            <span className="text-secondary">Not verified</span>
                        </div>
                        <div className="settings-row" style={{ color: 'var(--coral)', borderBottom: 'none' }}>
                            <span>Complete Profile for Online Sponsoring</span>
                            <span>⚠️</span>
                        </div>
                    </div>
                </div>

                {/* Account */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 className="section-title">ACCOUNT</h2>
                    <div className="settings-card">
                        <div className="settings-row">
                            <span>Subscription</span>
                            <span className="badge-free">Free Plan</span>
                        </div>
                        <div className="settings-row">
                            <span>PIN / Biometric Lock</span>
                            <div className="toggle-switch turned-off"></div>
                        </div>
                        <div className="settings-row">
                            <span>Change Password</span>
                            <span>›</span>
                        </div>
                        <div className="settings-row" style={{ borderBottom: 'none' }}>
                            <span>Restore Purchases</span>
                            <span>›</span>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 className="section-title">NOTIFICATIONS</h2>
                    <div className="settings-card">
                        <div className="settings-row">
                            <span>Hourly Consciousness</span>
                            <div className="toggle-switch active"></div>
                        </div>
                        <div className="settings-row">
                            <span>On Awakening</span>
                            <div className="toggle-switch active"></div>
                        </div>
                        <div className="settings-row">
                            <span>Night Time Inventory</span>
                            <div className="toggle-switch turned-off"></div>
                        </div>
                        <div className="settings-row" style={{ borderBottom: 'none' }}>
                            <span>Sobriety Birthday</span>
                            <div className="toggle-switch active"></div>
                        </div>
                    </div>
                </div>

            </main>

            <style jsx>{`
                .settings-card {
                    background: #fff;
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                }
                .settings-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px;
                    border-bottom: 1px solid var(--border-color);
                    font-size: 16px;
                }
                .text-secondary { color: var(--text-secondary); }
                .badge-free {
                    background: var(--gray-100);
                    color: var(--text-secondary);
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 600;
                }
                .toggle-switch.turned-off {
                    background: var(--gray-300);
                }
                .toggle-switch.turned-off::after {
                    transform: translateX(0);
                }
            `}</style>

            <BottomNav />
        </>
    );
}
