'use client';

import { useState, useEffect } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

interface SobrietyCounterProps {
    sobrietyDate: Date;
}

export default function SobrietyCounter({ sobrietyDate }: SobrietyCounterProps) {
    const [now, setNow] = useState<Date | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setNow(new Date());
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!isClient || now === null) {
        return <div className="sobriety-counter loading">Loading...</div>;
    }

    // Precise calculations
    const years = differenceInYears(now, sobrietyDate);
    const months = differenceInMonths(now, sobrietyDate) % 12;
    const days = differenceInDays(now, sobrietyDate) % 30; // Approximation for display
    const hours = differenceInHours(now, sobrietyDate) % 24;
    const minutes = differenceInMinutes(now, sobrietyDate) % 60;
    const seconds = differenceInSeconds(now, sobrietyDate) % 60;

    const totalDays = differenceInDays(now, sobrietyDate);

    // Get milestone token color
    const getBadgeColor = () => {
        if (years >= 1) return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'; // Gold
        if (months >= 9) return 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)'; // Purple
        if (months >= 6) return 'linear-gradient(135deg, #2980B9 0%, #3498DB 100%)'; // Blue
        if (months >= 3) return 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)'; // Green
        if (months >= 1) return 'linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)'; // Red
        return 'linear-gradient(135deg, #7F8C8D 0%, #BDC3C7 100%)'; // Silver
    };

    return (
        <div className="sobriety-counter">
            <div className="counter-main">
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                    {years > 0 && <span className="counter-years">{years} <span className="label">Years</span></span>}
                    <span className="counter-months">{months} <span className="label">Months</span></span>
                    <span className="counter-days">{days} <span className="label">Days</span></span>
                </div>

                <div className="counter-time">
                    {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
            </div>

            <div className="counter-badge" style={{ background: getBadgeColor(), boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                <div className="badge-inner">
                    <span className="badge-icon">🦄</span>
                    <span className="badge-text">
                        {years > 0 ? `${years} Year${years > 1 ? 's' : ''}` :
                            months > 0 ? `${months} Month${months > 1 ? 's' : ''}` :
                                `${totalDays} Days`}
                    </span>
                    <span className="badge-label">SOBER</span>
                </div>
            </div>

            <div className="counter-stats">
                <div className="counter-stat">
                    <div className="counter-stat-value">{totalDays.toLocaleString()}</div>
                    <div className="counter-stat-label">Total Days</div>
                </div>
                <div className="counter-stat">
                    <div className="counter-stat-value">{differenceInHours(now, sobrietyDate).toLocaleString()}</div>
                    <div className="counter-stat-label">Hours</div>
                </div>
                <div className="counter-stat">
                    <div className="counter-stat-value">{differenceInMinutes(now, sobrietyDate).toLocaleString()}</div>
                    <div className="counter-stat-label">Minutes</div>
                </div>
            </div>

            <style jsx>{`
                .sobriety-counter {
                    background: white;
                    border-radius: 20px;
                    padding: 24px;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    margin: 16px;
                    position: relative;
                    overflow: hidden;
                }
                .counter-main {
                    margin-bottom: 24px;
                }
                .counter-years, .counter-months, .counter-days {
                    font-size: 28px;
                    font-weight: 800;
                    color: #2D3748;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    line-height: 1;
                }
                .label {
                    font-size: 12px;
                    font-weight: 500;
                    color: #718096;
                    text-transform: uppercase;
                    margin-top: 4px;
                }
                .counter-time {
                    font-family: 'Courier New', monospace;
                    font-size: 20px;
                    color: #4A5568;
                    margin-top: 12px;
                    font-weight: 600;
                    letter-spacing: 2px;
                }
                .counter-badge {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    margin: 0 auto 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    position: relative;
                }
                .badge-inner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 4px solid rgba(255,255,255,0.3);
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                }
                .badge-icon {
                    font-size: 24px;
                    margin-bottom: 4px;
                }
                .badge-text {
                    font-size: 18px;
                    font-weight: 800;
                    line-height: 1.2;
                }
                .badge-label {
                    font-size: 10px;
                    opacity: 0.9;
                    letter-spacing: 1px;
                }
                .counter-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 12px;
                    border-top: 1px solid #E2E8F0;
                    padding-top: 20px;
                }
                .counter-stat-value {
                    font-size: 16px;
                    font-weight: 700;
                    color: #2D3748;
                }
                .counter-stat-label {
                    font-size: 11px;
                    color: #A0AEC0;
                    text-transform: uppercase;
                }
            `}</style>
        </div>
    );
}
