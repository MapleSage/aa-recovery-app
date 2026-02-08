import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { getAllChapters } from '@/lib/bigBookData';

export default function BigBookPage() {
    const chapters = getAllChapters();

    return (
        <>
            <Navigation
                title="A.A. Big Book"
                backLabel="Literature"
                backHref="/literature"
            />

            <main className="page-content">
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                        Alcoholics Anonymous
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        The Big Book - First 164 Pages
                    </p>
                </div>

                <div className="step-list">
                    {chapters.map((chapter) => (
                        <Link
                            key={chapter.id}
                            href={`/literature/bigbook/${chapter.id}`}
                            className="step-card"
                        >
                            <div className="step-icon" style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}>
                                {chapter.number || '📖'}
                            </div>
                            <div className="step-info">
                                <div className="step-title">{chapter.title}</div>
                                {chapter.page && (
                                    <div className="step-subtitle">Page {chapter.page}</div>
                                )}
                            </div>
                            <div className="step-arrow">›</div>
                        </Link>
                    ))}
                </div>

                <div style={{
                    marginTop: '32px',
                    padding: '16px',
                    background: 'var(--gray-50)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)'
                }}>
                    <p><strong>Note:</strong> This content includes the first 164 pages of the Big Book, which are in the public domain. The personal stories (Part II and III) are not included.</p>
                </div>
            </main>
        </>
    );
}
