'use client';

import Navigation from '@/components/Navigation';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GratitudePage() {
    const router = useRouter();
    const currentDateTime = format(new Date(), 'MMMM d, yyyy hh:mm a EEEE');
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (!content.trim()) {
            alert('Please enter something you are grateful for');
            return;
        }

        const newEntry = {
            id: Date.now().toString(),
            content,
            createdAt: new Date().toISOString()
        };

        try {
            const existingEntries = JSON.parse(localStorage.getItem('gratitudeEntries') || '[]');
            const updatedEntries = [...existingEntries, newEntry];
            localStorage.setItem('gratitudeEntries', JSON.stringify(updatedEntries));

            // Show success and clear or redirect (for now just alert as there is no list view for gratitude yet)
            alert('Gratitude list saved!');
            router.push('/app/tools');
        } catch (error) {
            console.error('Error saving entry:', error);
            alert('Failed to save entry.');
        }
    };

    return (
        <>
            <Navigation
                title="New Gratitude List"
                backLabel="Tools"
                backHref="/tools"
                rightAction={
                    <button className="nav-action" onClick={(e) => {
                        console.log('Save clicked');
                        e.stopPropagation(); // Prevent bubbling issues
                        handleSave();
                    }} style={{ cursor: 'pointer', zIndex: 1000, position: 'relative' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                    </button>
                }
            />

            <main className="page-content">
                <div style={{ textAlign: 'center', margin: '16px 0', color: '#666', fontSize: '14px', fontWeight: '500' }}>
                    {currentDateTime}
                </div>

                <div className="gratitude-input-container">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ marginTop: '8px', fontSize: '20px', color: '#CBD5E1' }}>•</span>
                            <textarea
                                className="form-textarea"
                                placeholder="I am grateful for..."
                                style={{
                                    border: 'none',
                                    boxShadow: 'none',
                                    background: 'transparent',
                                    fontSize: '18px',
                                    padding: '8px 0',
                                    minHeight: '200px',
                                    resize: 'none'
                                }}
                                autoFocus
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
}
