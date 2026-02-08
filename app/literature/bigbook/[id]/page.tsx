import Navigation from '@/components/Navigation';
import { getChapterById, getAllChapters } from '@/lib/bigBookData';
import Link from 'next/link';

export async function generateStaticParams() {
    const chapters = getAllChapters();
    return chapters.map((chapter) => ({ id: chapter.id }));
}

export default async function BigBookChapterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const chapter = getChapterById(id);

    if (!chapter) {
        return <div>Chapter not found</div>;
    }

    // Parse content to handle bold text
    const formatContent = (content: string) => {
        return content
            .split('\n\n')
            .map((paragraph, idx) => {
                const formattedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                return (
                    <p
                        key={idx}
                        style={{ marginBottom: '16px', lineHeight: '1.7' }}
                        dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                    />
                );
            });
    };

    return (
        <>
            <Navigation
                title={chapter.title}
                backLabel="Big Book"
                backHref="/literature/bigbook"
            />

            <main className="page-content">
                <div style={{ marginBottom: '24px' }}>
                    {chapter.number && (
                        <div style={{
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                            marginBottom: '8px'
                        }}>
                            Chapter {chapter.number}
                        </div>
                    )}
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {chapter.title}
                    </h1>
                    {chapter.page && (
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            Page {chapter.page}
                        </div>
                    )}
                </div>

                <div style={{
                    fontSize: '16px',
                    color: 'var(--text-primary)',
                    lineHeight: '1.7'
                }}>
                    {formatContent(chapter.content)}
                </div>

                <div style={{
                    marginTop: '40px',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--border-color)'
                }}>
                    <Link
                        href="/literature/bigbook"
                        className="text-link"
                        style={{ fontSize: '14px' }}
                    >
                        ← Back to Table of Contents
                    </Link>
                </div>
            </main>
        </>
    );
}
