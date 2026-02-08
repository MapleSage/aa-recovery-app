import EntryFormClient from './EntryFormClient';

export async function generateStaticParams() {
    // Generate params for all steps and potential types
    // Since we can't know all types dynamically without a predefined list, we'll generate for steps
    // and rely on client-side handling or specific known types.
    // For static export, we ideally need to list all [num]/[type] combinations.

    const paths = [];
    const types = ['resentment', 'fear', 'sex-conduct', 'harms', 'financial', 'emotional', 'general', 'daily', 'spot-check'];

    for (let i = 1; i <= 12; i++) {
        for (const type of types) {
            paths.push({ num: i.toString(), type });
        }
    }

    return paths;
}

export default function EntryPage() {
    return <EntryFormClient />;
}
