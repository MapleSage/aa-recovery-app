import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AA Recovery - 12 Steps',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="app-container">{children}</div>;
}
