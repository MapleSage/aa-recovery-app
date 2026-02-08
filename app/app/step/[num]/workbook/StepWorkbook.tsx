'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SobrietyCounter from '@/components/SobrietyCounter';
import EmptyState from '@/components/EmptyState';
import FAB from '@/components/FAB';
import { getStepByNumber } from '@/lib/stepsData';
import Link from 'next/link';

export default function StepWorkbook() {
    const params = useParams();
    const router = useRouter();
    const stepNum = parseInt(params.num as string);
    const stepData = getStepByNumber(stepNum);

    const [sobrietyDate, setSobrietyDate] = useState<Date | null>(null);
    const [stepDate, setStepDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [entries, setEntries] = useState<Array<{ id: string; content: string; createdAt: string }>>([]);
    const [inputValue, setInputValue] = useState('');

    // Load data from localStorage
    useEffect(() => {
        const savedSobrietyDate = localStorage.getItem('sobrietyDate');
        if (savedSobrietyDate) {
            setSobrietyDate(new Date(savedSobrietyDate));
        }

        const savedEntries = localStorage.getItem(`step${stepNum}Entries`);
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries));
        }

        const savedStepDate = localStorage.getItem(`step${stepNum}Date`);
        if (savedStepDate) {
            setStepDate(savedStepDate);
        }
    }, [stepNum]);

    const handleDateChange = (value: string) => {
        if (stepNum === 1) {
            const date = new Date(value);
            setSobrietyDate(date);
            localStorage.setItem('sobrietyDate', date.toISOString());
        } else {
            setStepDate(value);
            localStorage.setItem(`step${stepNum}Date`, value);
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newEntry = {
            id: Date.now().toString(),
            content: inputValue,
            createdAt: new Date().toISOString()
        };

        const newEntries = [...entries, newEntry];
        setEntries(newEntries);
        localStorage.setItem(`step${stepNum}Entries`, JSON.stringify(newEntries));
        setInputValue('');
    };

    if (!stepData) {
        return <div>Step not found</div>;
    }

    // Step 1 - Sobriety Tracker
    if (stepNum === 1) {
        return (
            <>
                <Navigation
                    title="Step - 1"
                    backHref="/"
                    backLabel="Home"
                    rightAction={
                        <button className="nav-action">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </button>
                    }
                />

                <main className="page-content" style={{ paddingBottom: '100px' }}>
                    <div className="form-group">
                        <label className="form-label">WHEN DID YOU STOP DRINKING?</label>
                        <div className="date-picker-row">
                            <span>📅</span>
                            <input
                                type="date"
                                className="date-value"
                                value={sobrietyDate ? sobrietyDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => handleDateChange(e.target.value)}
                            />
                            <input
                                type="time"
                                className="date-value"
                                defaultValue="07:41"
                            />
                        </div>
                    </div>

                    {sobrietyDate && <SobrietyCounter sobrietyDate={sobrietyDate} />}

                    <div style={{ marginTop: '20px' }}>
                        <Link href="/app/step/1/working" className="text-link">
                            Read Working Step 1 →
                        </Link>
                    </div>
                </main>

                <div className="message-bar">
                    <input
                        type="text"
                        className="message-input"
                        placeholder="Share your thoughts..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="message-send" onClick={handleSendMessage}>▶</button>
                    <button className="message-action">👍</button>
                </div>
            </>
        );
    }

    // Steps 3, 6 - Prayer steps with date
    if (stepNum === 3 || stepNum === 6) {
        const prayerText = stepNum === 3
            ? `God, I offer myself to Thee - To build with me and to do with me as Thou wilt.
Relieve me of the bondage of self, that I may better do Thy will.
Take away my difficulties, that victory over them may bear witnessesto those I would help of Thy Power, Thy Love, and Thy Way of life.
May I do Thy will always!`
            : `My Creator, I am now willing that You should have all of me, good and bad. I pray that You now remove from me every single defect of character which stands in the way of my usefulness to You and my fellows. Grant me strength, as I go out from here, to do Your bidding.`;

        const hint = stepNum === 3
            ? 'Hint: Finding a higher power is your choice. Ask your sponsor for their experience. Listen to what people share at meetings.'
            : 'Hint: Steps 6 & 7 are normally taken together.';

        return (
            <>
                <Navigation
                    title={`Step - ${stepNum}`}
                    backHref="/"
                    backLabel="Home"
                    rightAction={
                        <button className="nav-action">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </button>
                    }
                />

                <main className="page-content" style={{ paddingBottom: '100px' }}>
                    <div className="form-group">
                        <label className="form-label">DATE ON WHICH YOU TOOK THIS STEP</label>
                        <div className="date-picker-row">
                            <span>📅</span>
                            <input
                                type="date"
                                className="date-value"
                                value={stepDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        {hint}
                    </p>

                    <div style={{
                        background: 'var(--gray-50)',
                        padding: '16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        lineHeight: '1.6'
                    }}>
                        <p style={{ marginBottom: '8px' }}><strong>Prayer:</strong> {prayerText}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Big Book Page {stepNum === 3 ? 63 : 76}</p>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <Link href={`/app/step/${stepNum}/working`} className="text-link">
                            Read Working Step {stepNum} →
                        </Link>
                    </div>
                </main>

                <div className="message-bar">
                    <input
                        type="text"
                        className="message-input"
                        placeholder="Share your thoughts..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="message-send" onClick={handleSendMessage}>▶</button>
                    <button className="message-action">👍</button>
                </div>
            </>
        );
    }

    // Steps 4, 8, 10, 11 - Entry list steps
    if (stepNum === 4 || stepNum === 8 || stepNum === 10 || stepNum === 11) {
        const rightAction = stepNum === 10 ? (
            <button className="nav-action" style={{ fontSize: '14px' }}>Group</button>
        ) : undefined;

        return (
            <>
                <Navigation
                    title={`Step ${stepNum}`}
                    backHref="/"
                    backLabel="Home"
                    rightAction={rightAction}
                />

                <main className="page-content">
                    {entries.length === 0 ? (
                        <>
                            <EmptyState />
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Link href={`/app/step/${stepNum}/working`} className="text-link">
                                    Read Working Step {stepNum} →
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div>
                            {entries.map(entry => {
                                // Step 4: Structured entries
                                if (stepNum === 4) {
                                    const e = entry as any;
                                    const emojiMap: Record<string, string> = {
                                        resentment: '😡', fear: '😱', 'sex-conduct': '❤️', harms: '🤕'
                                    };
                                    return (
                                        <div key={entry.id} style={{
                                            padding: '16px',
                                            borderBottom: '1px solid var(--border-color)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}>
                                            <span style={{ fontSize: '24px' }}>{emojiMap[e.type] || '📝'}</span>
                                            <div>
                                                <p style={{ fontWeight: '600', margin: 0 }}>{e.cause || e.content || 'Untitled Entry'}</p>
                                                <small style={{ color: 'var(--text-muted)' }}>
                                                    {new Date(entry.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                        </div>
                                    );
                                }

                                // Step 8: Structured entries
                                if (stepNum === 8) {
                                    const e = entry as any;
                                    return (
                                        <div key={entry.id} style={{
                                            padding: '16px',
                                            borderBottom: '1px solid var(--border-color)'
                                        }}>
                                            <p style={{ fontWeight: '600', margin: 0 }}>{e.name || 'Unknown Person'}</p>
                                            <small style={{ color: 'var(--text-muted)' }}>
                                                {new Date(entry.createdAt).toLocaleDateString()}
                                            </small>
                                        </div>
                                    );
                                }

                                // Default (Step 10, 11)
                                return (
                                    <div key={entry.id} style={{
                                        padding: '16px',
                                        borderBottom: '1px solid var(--border-color)'
                                    }}>
                                        <p>{entry.content}</p>
                                        <small style={{ color: 'var(--text-muted)' }}>
                                            {new Date(entry.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>

                <FAB onClick={() => {
                    if (stepNum === 4) {
                        router.push('/app/step/4/workbook/selection');
                    } else if (stepNum === 8) {
                        router.push('/app/step/8/workbook/selection');
                    } else if (stepNum === 10) {
                        router.push('/app/step/10/workbook/selection');
                    } else {
                        // For step 11 - simple entry
                        const content = prompt('Enter your reflection:');
                        if (content) {
                            const newEntry = {
                                id: Date.now().toString(),
                                content,
                                createdAt: new Date().toISOString()
                            };
                            const newEntries = [...entries, newEntry];
                            setEntries(newEntries);
                            localStorage.setItem(`step${stepNum}Entries`, JSON.stringify(newEntries));
                        }
                    }
                }} />
            </>
        );
    }

    // Step 9 - View Step 8 records for amends
    if (stepNum === 9) {
        const step8Entries = typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem('step8Entries') || '[]')
            : [];

        return (
            <>
                <Navigation
                    title="Step 9"
                    backHref="/"
                    backLabel="Home"
                />

                <main className="page-content">
                    {step8Entries.length === 0 ? (
                        <EmptyState message="Nothing here yet. You cannot add records to this step directly. Step 8 records can be seen here for further action." />
                    ) : (
                        <div>
                            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                                Step 8 records for making amends:
                            </p>
                            {step8Entries.map((entry: { id: string; name: string; reason: string }) => (
                                <div key={entry.id} style={{
                                    padding: '16px',
                                    borderBottom: '1px solid var(--border-color)'
                                }}>
                                    <p><strong>{entry.name}</strong></p>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{entry.reason}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link href="/app/step/9/working" className="text-link">
                            Read Working Step 9 →
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    // Default - Working steps (2, 5, 7, 12)
    return (
        <>
            <Navigation
                title={`Working Step ${stepNum}`}
                backHref="/"
                backLabel="Home"
                rightAction={
                    <button className="nav-action" style={{ fontSize: '14px' }}>Aa</button>
                }
            />

            <main className="page-content">
                <div className="working-step-content">
                    <h2>Step {stepNum}</h2>
                    <p className="step-quote">{stepData.quote}</p>

                    {stepData.content && stepData.content.split('\n\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}

                    {stepData.closingStatement && (
                        <p className="step-closing">{stepData.closingStatement}</p>
                    )}
                </div>
            </main>
        </>
    );
}
