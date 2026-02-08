'use client';

import Navigation from '@/components/Navigation';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EntryFormClient() {
    const params = useParams();
    const router = useRouter();
    const stepNum = parseInt(params.num as string);
    const type = params.type as string;

    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleSave = () => {
        const newEntry = {
            id: Date.now().toString(),
            type,
            ...formData,
            createdAt: new Date().toISOString()
        };

        const storageKey = `step${stepNum}Entries`;
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        localStorage.setItem(storageKey, JSON.stringify([...existing, newEntry]));

        router.back();
    };

    // Form configurations
    const getFormFields = () => {
        switch (stepNum) {
            case 4:
                return (
                    <>
                        <div className="form-group">
                            <label className="form-label">I'M RESENTFUL AT:</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Person, institution, or principle"
                                value={formData.cause || ''}
                                onChange={e => setFormData({ ...formData, cause: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">THE CAUSE:</label>
                            <textarea
                                className="form-textarea"
                                placeholder="What happened?"
                                value={formData.reason || ''}
                                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">AFFECTS MY:</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Self-esteem, security, ambitions..."
                                value={formData.affects || ''}
                                onChange={e => setFormData({ ...formData, affects: e.target.value })}
                            />
                        </div>
                    </>
                );
            case 8:
                return (
                    <>
                        <div className="form-group">
                            <label className="form-label">NAME:</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Who did you harm?"
                                value={formData.name || ''}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">HARM DONE:</label>
                            <textarea
                                className="form-textarea"
                                placeholder="What was the harm?"
                                value={formData.reason || ''}
                                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                            />
                        </div>
                    </>
                );
            case 10:
                return (
                    <>
                        <div className="form-group">
                            <label className="form-label">INVENTORY:</label>
                            <textarea
                                className="form-textarea"
                                placeholder="What is on your mind?"
                                style={{ height: '200px' }}
                                value={formData.content || ''}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                    </>
                );
            default:
                return (
                    <div className="form-group">
                        <label className="form-label">ENTRY:</label>
                        <textarea
                            className="form-textarea"
                            value={formData.content || ''}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>
                );
        }
    };

    const navTitleMap: Record<string, string> = {
        resentment: 'Resentment',
        fear: 'Fear',
        'sex-conduct': 'Sex Conduct',
        harms: 'Harms',
        financial: 'Financial',
        emotional: 'Emotional',
        general: 'General',
        daily: 'Daily Inventory',
        'spot-check': 'Spot Check'
    };

    return (
        <>
            <Navigation
                title={navTitleMap[type] || 'New Entry'}
                backLabel="Back"
                backHref={`/step/${stepNum}/workbook/selection`}
                rightAction={
                    <button className="nav-action" onClick={handleSave} style={{ fontWeight: 600, color: 'var(--primary)' }}>
                        Save
                    </button>
                }
            />

            <main className="page-content">
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    {getFormFields()}
                </div>
            </main>
        </>
    );
}
