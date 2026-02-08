'use client';

import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SelectionClient() {
    const params = useParams();
    const stepNum = parseInt(params.num as string);

    // Configuration for different steps
    const stepConfig: Record<number, { title: string, items: Array<{ id: string, label: string, icon: string, color: string }> }> = {
        4: {
            title: "Choose Inventory Type",
            items: [
                { id: 'resentment', label: 'Resentment', icon: '😡', color: 'var(--coral)' },
                { id: 'fear', label: 'Fear', icon: '😱', color: 'var(--blue)' },
                { id: 'sex-conduct', label: 'Sex Conduct', icon: '❤️', color: 'var(--green)' },
                { id: 'harms', label: 'Harms to Others', icon: '🤕', color: 'var(--yellow-dark)' }
            ]
        },
        8: {
            title: "Amends List",
            items: [
                { id: 'resentment', label: 'Resentment', icon: '😠', color: 'var(--coral)' },
                { id: 'financial', label: 'Financial', icon: '💰', color: 'var(--green)' },
                { id: 'emotional', label: 'Emotional', icon: '💔', color: 'var(--blue)' },
                { id: 'general', label: 'General Harm', icon: '🤕', color: 'var(--purple)' }
            ]
        },
        10: {
            title: "Daily Inventory",
            items: [
                { id: 'daily', label: 'Daily Review', icon: '📝', color: 'var(--blue)' },
                { id: 'spot-check', label: 'Spot Check', icon: '👀', color: 'var(--yellow)' }
            ]
        }
    };

    const config = stepConfig[stepNum];

    if (!config) {
        return (
            <>
                    <Navigation
                        title={`Step ${stepNum}`}
                        backLabel="Back"
                        backHref={`/app/step/${stepNum}/workbook`}
                    />
                <main className="page-content">
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p>No selection types available for this step.</p>
                        <Link href={`/app/step/${stepNum}/workbook`} className="text-link">Return to Workbook</Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navigation
                title={config.title}
                backLabel="Back"
                backHref={`/app/step/${stepNum}/workbook`}
            />

            <main className="page-content">
                <div className="grid-menu">
                    {config.items.map(item => (
                        <Link
                            key={item.id}
                            href={`/app/step/${stepNum}/workbook/${item.id}`}
                            className="menu-card"
                            style={{ borderLeft: `4px solid ${item.color}` }}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-label">{item.label}</span>
                            <span className="menu-arrow">›</span>
                        </Link>
                    ))}
                </div>
            </main>

            <style jsx>{`
                .grid-menu {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .menu-card {
                    background: white;
                    padding: 24px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: var(--text-primary);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    transition: transform 0.2s ease;
                }
                .menu-card:active {
                    transform: scale(0.98);
                }
                .menu-icon {
                    font-size: 24px;
                    margin-right: 16px;
                }
                .menu-label {
                    font-size: 18px;
                    font-weight: 600;
                    flex: 1;
                }
                .menu-arrow {
                    color: var(--text-muted);
                    font-size: 24px;
                }
            `}</style>
        </>
    );
}
