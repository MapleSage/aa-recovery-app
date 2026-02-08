'use client';

import Navigation from '@/components/Navigation';
import { getTodaysReading } from '@/lib/dailyReadings';
import { useState, useEffect } from 'react';

export default function DailyReadingPage() {
    const [reading, setReading] = useState(getTodaysReading());
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setReading(getTodaysReading());
        setDate(new Date());
    }, []);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <>
            <Navigation
                title="Daily Reflection"
                backLabel="Literature"
                backHref="/literature"
            />

            <main className="page-content">
                <div style={{
                    textAlign: 'center',
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: '2px solid var(--border-color)'
                }}>
                    <div style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px'
                    }}>
                        {monthNames[date.getMonth()]} {date.getDate()}
                    </div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        {reading.title}
                    </h1>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: 'var(--text-secondary)',
                        marginBottom: '12px',
                        letterSpacing: '0.5px'
                    }}>
                        THOUGHT FOR THE DAY
                    </h3>
                    <p style={{
                        fontSize: '18px',
                        fontStyle: 'italic',
                        lineHeight: '1.6',
                        color: 'var(--text-primary)'
                    }}>
                        "{reading.thought}"
                    </p>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: 'var(--text-secondary)',
                        marginBottom: '12px',
                        letterSpacing: '0.5px'
                    }}>
                        REFLECTION
                    </h3>
                    <div style={{
                        fontSize: '16px',
                        lineHeight: '1.7',
                        color: 'var(--text-primary)'
                    }}>
                        {reading.reflection.split('\n\n').map((para, idx) => (
                            <p key={idx} style={{ marginBottom: '16px' }}>{para}</p>
                        ))}
                    </div>
                </div>

                {reading.prayer && (
                    <div style={{
                        padding: '20px',
                        background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #667eea'
                    }}>
                        <h3 style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: 'var(--text-secondary)',
                            marginBottom: '12px',
                            letterSpacing: '0.5px'
                        }}>
                            PRAYER
                        </h3>
                        <p style={{
                            fontSize: '16px',
                            fontStyle: 'italic',
                            lineHeight: '1.6',
                            color: 'var(--text-primary)'
                        }}>
                            {reading.prayer}
                        </p>
                    </div>
                )}
            </main>
        </>
    );
}
