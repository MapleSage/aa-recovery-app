'use client';

import Navigation from '@/components/Navigation';
import BottomNav from '@/components/BottomNav';

export default function SponsorshipPage() {
    return (
        <>
            <Navigation
                title="Sponsorship"
                backLabel=""
                backHref=""
                hideBack={true}
            />

            <main className="page-content" style={{ paddingBottom: '80px', background: '#F8F9FA' }}>

                {/* User Card */}
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        👤
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '600' }}>Guest User</div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Unique Code: <span style={{ fontWeight: 'bold', color: '#000' }}>vpLOM42Q</span></div>
                    </div>
                </div>

                {/* My Sponsor */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h2 className="section-title">MY SPONSOR</h2>
                    </div>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center', color: '#666' }}>
                        NO SPONSOR<br />
                        <span style={{ fontSize: '12px', color: '#999' }}>TAP TO ADD A SPONSOR</span>
                    </div>
                </div>

                {/* My Sponsees */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h2 className="section-title">MY SPONSEES</h2>
                        <button style={{ background: 'var(--green)', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>+ Add New</button>
                    </div>
                    <div style={{ background: '#fff', padding: '40px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center', color: '#999' }}>
                        No sponsees yet
                    </div>
                </div>

                {/* Info Card */}
                <div style={{ background: '#E0F2FE', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', color: '#0284C7' }}>
                    <p style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                        <strong>Why Sponsorship?</strong><br />
                        Helping others is the foundation of our recovery. Connect with a sponsor to guide you through the steps.
                    </p>
                    <a href="#" style={{ textDecoration: 'underline', fontWeight: '600' }}>Learn how it works</a>
                </div>

                {/* Status Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: '#38BDF8', color: '#fff', padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>
                        VERIFY PHONE # FOR ONLINE SPONSORING
                    </div>
                    <div style={{ background: '#0F172A', color: '#fff', padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>
                        15978 ONLINE SPONSORS AVAILABLE
                    </div>
                </div>

            </main>

            <BottomNav />
        </>
    );
}
