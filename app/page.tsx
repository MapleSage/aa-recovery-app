import Link from 'next/link';

const features = [
  {
    title: 'Work The Steps With Structure',
    body: 'Guided workbook flows for each Step, with prompts that keep you moving forward.',
  },
  {
    title: 'Daily Tools That Stick',
    body: 'Gratitude, daily inventory, and quick reflections designed for real life.',
  },
  {
    title: 'Literature Built In',
    body: 'Big Book, prayers, and daily readings available when you need them.',
  },
  {
    title: 'Sponsor-Friendly',
    body: 'Keep your work organized so sharing with a sponsor is easy and consistent.',
  },
];

const faqs = [
  {
    q: 'Is this a replacement for a sponsor or meetings?',
    a: 'No. This is a toolkit to support your program. The best outcomes come from meetings, a sponsor, and consistent Step work.',
  },
  {
    q: 'Can I use it for free?',
    a: 'Yes. Start using the core toolkit and add sign-in when you want cloud sync and passkeys.',
  },
  {
    q: 'Is my data private?',
    a: 'Your content stays in your account. You control what you share. Configure providers and storage for your environment.',
  },
];

export default function MarketingHomePage() {
  return (
    <div className="marketing">
      <header className="marketing-nav">
        <Link href="/" className="marketing-brand">
          <span className="marketing-logo">12</span>
          <span className="marketing-brandtext">Step Toolkit</span>
        </Link>

        <nav className="marketing-actions">
          <Link className="marketing-link" href="/auth/login">
            Sign in
          </Link>
          <Link className="marketing-cta" href="/app">
            Open App
          </Link>
        </nav>
      </header>

      <main>
        <section className="marketing-hero">
          <div className="marketing-hero-copy">
            <p className="marketing-kicker">A recovery companion for daily practice</p>
            <h1 className="marketing-h1">Tools, Steps, and literature in one place.</h1>
            <p className="marketing-sub">
              A focused, modern AA toolkit for working the Steps with clarity, staying consistent, and keeping your progress organized.
            </p>

            <div className="marketing-hero-buttons">
              <Link className="marketing-primary" href="/app">
                Get Started
              </Link>
              <Link className="marketing-secondary" href="/auth/login">
                Sign in with Passkey
              </Link>
            </div>

            <div className="marketing-proof">
              <div className="marketing-proof-item">
                <div className="marketing-proof-value">12</div>
                <div className="marketing-proof-label">Step flows</div>
              </div>
              <div className="marketing-proof-item">
                <div className="marketing-proof-value">Daily</div>
                <div className="marketing-proof-label">Tools</div>
              </div>
              <div className="marketing-proof-item">
                <div className="marketing-proof-value">Built-in</div>
                <div className="marketing-proof-label">Literature</div>
              </div>
            </div>
          </div>

          <div className="marketing-hero-visual" aria-hidden="true">
            <div className="marketing-glass-card">
              <div className="marketing-glass-title">Today</div>
              <div className="marketing-glass-row">
                <span className="pill">Gratitude</span>
                <span className="pill">Inventory</span>
                <span className="pill">Prayer</span>
              </div>
              <div className="marketing-glass-body">
                Keep it simple. Keep it moving. One day at a time.
              </div>
              <div className="marketing-glass-footer">
                <span className="dot" /> <span className="dot" /> <span className="dot" />
              </div>
            </div>
          </div>
        </section>

        <section className="marketing-section">
          <h2 className="marketing-h2">What you get</h2>
          <div className="marketing-grid">
            {features.map((f) => (
              <article key={f.title} className="marketing-feature">
                <h3 className="marketing-h3">{f.title}</h3>
                <p className="marketing-p">{f.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marketing-section marketing-screens">
          <div className="marketing-screens-head">
            <h2 className="marketing-h2">Designed for momentum</h2>
            <p className="marketing-p">Fast navigation, simple prompts, and a calm interface you can actually use every day.</p>
          </div>

          <div className="marketing-screens-grid">
            <img className="marketing-shot" src="/Home_Page.jpeg" alt="Toolkit app home" />
            <img className="marketing-shot" src="/ToolKit_Tab_LP.jpeg" alt="Toolkit tab" />
            <img className="marketing-shot" src="/Step_4_WorkBook_LP.jpeg" alt="Step workbook" />
          </div>
        </section>

        <section className="marketing-section">
          <h2 className="marketing-h2">FAQ</h2>
          <div className="marketing-faq">
            {faqs.map((item) => (
              <details key={item.q} className="marketing-faq-item">
                <summary className="marketing-faq-q">{item.q}</summary>
                <p className="marketing-faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="marketing-section marketing-final">
          <div className="marketing-final-card">
            <h2 className="marketing-h2">Start where you are.</h2>
            <p className="marketing-p">Open the toolkit, pick today’s action, and keep going.</p>
            <div className="marketing-hero-buttons">
              <Link className="marketing-primary" href="/app">
                Open the App
              </Link>
              <Link className="marketing-secondary" href="/auth/login">
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="marketing-footer">
        <div className="marketing-footer-inner">
          <span>© {new Date().getFullYear()} Step Toolkit</span>
          <span className="marketing-footer-links">
            <Link href="/auth/login">Account</Link>
            <Link href="/app">App</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
