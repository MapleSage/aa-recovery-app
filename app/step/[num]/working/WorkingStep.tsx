'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { getStepByNumber } from '@/lib/stepsData';

export default function WorkingStep() {
    const params = useParams();
    const stepNum = parseInt(params.num as string);
    const stepData = getStepByNumber(stepNum);

    if (!stepData) {
        return <div>Step not found</div>;
    }

    // Parse content to add formatting
    const formatContent = (content: string) => {
        return content
            .split('\n\n')
            .map((paragraph, idx) => {
                // Handle bold text
                const formattedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                if (paragraph.startsWith('God, I offer') || paragraph.includes('Relieve me of')) {
                    return (
                        <p
                            key={idx}
                            style={{ fontStyle: 'italic', marginLeft: '20px' }}
                            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                        />
                    );
                }

                return (
                    <p
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                    />
                );
            });
    };

    return (
        <>
            <Navigation
                title={`Working Step ${stepNum}`}
                backHref={`/step/${stepNum}`}
                backLabel="The Steps"
                rightAction={
                    <button className="nav-action" style={{ fontSize: '14px' }}>Aa</button>
                }
            />

            <main className="page-content">
                <div className="working-step-content">
                    <h2>Step {stepNum}</h2>
                    <p className="step-quote">{stepData.quote}</p>

                    {stepData.content && formatContent(stepData.content)}

                    {stepData.closingStatement && (
                        <p className="step-closing">{stepData.closingStatement}</p>
                    )}
                </div>
            </main>
        </>
    );
}
