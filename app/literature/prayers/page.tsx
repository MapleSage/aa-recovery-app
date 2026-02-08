'use client';

import Navigation from '@/components/Navigation';
import { getAllPrayers } from '@/lib/prayersData';
import { useState } from 'react';

export default function PrayersPage() {
    const prayers = getAllPrayers();
    const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);

    return (
        <>
            <Navigation
                title="A.A. Prayers"
                backLabel="Literature"
                backHref="/literature"
            />

            <main className="page-content">
                <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Common prayers used in the Fellowship.
                    </p>
                </div>

                <div className="step-list">
                    {prayers.map((prayer) => (
                        <div
                            key={prayer.id}
                            className={`step-card ${selectedPrayer === prayer.id ? 'active' : ''}`}
                            onClick={() => setSelectedPrayer(selectedPrayer === prayer.id ? null : prayer.id)}
                            style={{
                                cursor: 'pointer',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: '20px'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between',
                                marginBottom: selectedPrayer === prayer.id ? '16px' : '0'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="step-icon" style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontSize: '16px',
                                        marginRight: '16px'
                                    }}>
                                        🙏
                                    </div>
                                    <div className="step-title" style={{ fontSize: '16px' }}>{prayer.title}</div>
                                </div>
                                <div className="step-arrow" style={{
                                    transform: selectedPrayer === prayer.id ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}>›</div>
                            </div>

                            {selectedPrayer === prayer.id && (
                                <div style={{
                                    marginTop: '8px',
                                    paddingTop: '16px',
                                    borderTop: '1px solid var(--border-color)',
                                    width: '100%',
                                    animation: 'fadeIn 0.3s ease'
                                }}>
                                    <div style={{
                                        lineHeight: '1.6',
                                        fontSize: '15px',
                                        color: 'var(--text-primary)',
                                        fontStyle: 'italic',
                                        whiteSpace: 'pre-line'
                                    }}>
                                        {prayer.content}
                                    </div>
                                    {prayer.attribution && (
                                        <div style={{
                                            marginTop: '12px',
                                            fontSize: '12px',
                                            color: 'var(--text-secondary)',
                                            textAlign: 'right'
                                        }}>
                                            — {prayer.attribution}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
