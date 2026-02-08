import Navigation from '@/components/Navigation';
import { getStepByNumber } from '@/lib/stepsData';
import Link from 'next/link';
import StepCompletionToggle from '@/components/StepCompletionToggle';

// Generate static params for all 12 steps
export async function generateStaticParams() {
    return Array.from({ length: 12 }, (_, i) => ({ num: (i + 1).toString() }));
}

export default async function StepPage({ params }: { params: Promise<{ num: string }> }) {
    const { num } = await params;
    const stepNum = parseInt(num);
    const stepData = getStepByNumber(stepNum);

    if (!stepData) return <div>Step not found</div>;

    const hasWorkbook = stepNum === 4 || stepNum === 8;

    return (
        <>
            <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
                <Navigation
                    title={`Step ${stepNum}`}
                    backLabel="The Steps"
                    backHref="/"
                />

                <main className="page-content" style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', minHeight: 'calc(100vh - 60px)' }}>
                    <div className="working-step-content">
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#111' }}>
                            {stepData.title}
                        </h2>

                        <p className="step-quote" style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            color: '#333',
                            fontStyle: 'normal',
                            marginBottom: '32px',
                            fontWeight: '500'
                        }}>
                            {stepData.quote}
                        </p>

                        <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#444' }}>
                            {stepData.content && stepData.content.split('\n\n').map((para, idx) => (
                                <p key={idx} style={{ marginBottom: '20px' }}>{para}</p>
                            ))}
                        </div>

                        {stepData.closingStatement && (
                            <p className="step-closing" style={{
                                marginTop: '40px',
                                fontStyle: 'italic',
                                textAlign: 'center',
                                color: '#666'
                            }}>
                                {stepData.closingStatement}
                            </p>
                        )}

                        {hasWorkbook && (
                            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                <Link
                                    href={`/app/step/${stepNum}/workbook`}
                                    className="nav-action"
                                    style={{
                                        display: 'inline-block',
                                        padding: '12px 24px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: '600'
                                    }}
                                >
                                    Open Workbook
                                </Link>
                            </div>
                        )}
                        <StepCompletionToggle stepNum={stepNum} />
                    </div>
                </main>
            </div>
        </>
    );
}
