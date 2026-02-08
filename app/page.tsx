'use client';

import StepCircleList from '@/components/StepCircleList';
import StepWorkList from '@/components/StepWorkList';
import BottomNav from '@/components/BottomNav';

import SobrietyCounter from '@/components/SobrietyCounter';

export default function Home() {
  // Hardcoded date for demo purposes - in production this would come from user settings
  const sobrietyDate = new Date('2024-01-01');

  return (
    <>
      <header className="nav-header">
        <div style={{ width: '40px' }}></div> {/* Spacer for centering */}
        <h1 className="nav-title">The Steps</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      <main className="page-content" style={{ paddingBottom: '80px' }}>
        <div style={{ marginBottom: '24px' }}>
          <SobrietyCounter sobrietyDate={sobrietyDate} />
        </div>
        <StepCircleList />
        <StepWorkList />
      </main>

      <BottomNav />
    </>
  );
}
