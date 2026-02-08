import StepWorkbook from './StepWorkbook';

export async function generateStaticParams() {
    return Array.from({ length: 12 }, (_, i) => ({ num: (i + 1).toString() }));
}

export default function StepWorkbookPage() {
    return <StepWorkbook />;
}
