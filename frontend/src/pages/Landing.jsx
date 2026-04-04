import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScroll } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import ScrollCanvas from '../components/ScrollCanvas';
import useStore from '../store/useStore';

export default function Landing() {
  const { darkMode, toggleDarkMode } = useStore();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    layoutEffect: false
  });

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav className="custom-nav">
        <a href="https://zorvyn.io/" className="nav-logo">
          <img src="/zorvyn-logo.png" alt="Zorvyn Fintech" className="nav-logo-img" />
        </a>
        <ul className="nav-links">
          <li><a href="https://zorvyn.io/" target="_blank" rel="noreferrer">Home</a></li>
          <li><a href="https://zorvyn.io/solutions" target="_blank" rel="noreferrer">Solutions</a></li>
          <li><a href="https://zorvyn.io/#features" target="_blank" rel="noreferrer">Features</a></li>
          <li><a href="https://zorvyn.io/pricing" target="_blank" rel="noreferrer">Pricing</a></li>
          <li><a href="https://zorvyn.io/about" target="_blank" rel="noreferrer">Company</a></li>
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg transition-all duration-300"
            style={{ color: 'var(--text2)', background: 'var(--bg3)', border: '1px solid var(--border)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'var(--bg3)'; }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/app" className="nav-cta">
            Go to Dashboard →
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <div ref={containerRef} style={{ height: '400vh' }}>
        <section className="hero" id="home" style={{ position: 'sticky', top: 0, height: '100vh' }}>
          {/* We use ScrollCanvas entirely as a responsive background animation rather than the gradient */}
          <ScrollCanvas scrollProgress={scrollYProgress} />
          <div className="hero-grid"></div>

          <div className="hero-content">
            <div className="badge-row">
              <span className="custom-badge">SOC 2 Type II</span>
              <span className="custom-badge">ISO 27001</span>
              <span className="custom-badge">GDPR Compliant</span>
              <span className="custom-badge">PCI DSS</span>
            </div>

            <h1>Building <span className="accent">Secure, Compliant,</span> and Intelligent Financial Systems</h1>
            <p className="hero-sub">Enterprise grade financial infrastructure that scales with you. From startups to enterprises, we power the future of finance.</p>

            <div className="hero-btns">
              <Link to="/app" className="btn-primary">Enter Dashboard →</Link>
              <a href="https://zorvyn.io/#how-it-works" target="_blank" rel="noreferrer" className="btn-ghost">▶&nbsp; See How It Works</a>
            </div>

            <div className="hero-stats">
              <div className="hstat">
                <div className="hstat-val">$2.4<span>B+</span></div>
                <div className="hstat-lbl">Total Volume</div>
              </div>
              <div className="hstat">
                <div className="hstat-val">99.99<span>%</span></div>
                <div className="hstat-lbl">System Uptime</div>
              </div>
            </div>

            <div className="scroll-hint">
              <div className="scroll-dot"></div>
              Scroll to explore
            </div>
          </div>
        </section>
      </div>

      {/* ═══ TRUSTED ═══ */}
      <div className="trusted">
        <div className="trusted-label">Trusted by 600+ Companies Worldwide</div>
        <div className="trusted-logos">
          <span className="logo-chip">Acme Corp</span>
          <span className="logo-chip">Vanguard Fintech</span>
          <span className="logo-chip">Nexus Global</span>
          <span className="logo-chip">Apex Ventures</span>
          <span className="logo-chip">Equinox</span>
        </div>
      </div>

      {/* ═══ NUMBERS ═══ */}
      <section className="numbers" id="numbers">
        <div className="section-eyebrow">By The Numbers</div>
        <h2 className="section-title">Powering Financial Operations Globally</h2>
        <div className="numbers-grid">
          <div className="num-card"><div className="num-val">600+</div><div className="num-lbl">Clients Served</div></div>
          <div className="num-card"><div className="num-val">40K+</div><div className="num-lbl">Daily Transactions</div></div>
          <div className="num-card"><div className="num-val">25+</div><div className="num-lbl">Countries</div></div>
          <div className="num-card"><div className="num-val">99.9%</div><div className="num-lbl">Uptime</div></div>
        </div>
      </section>

      {/* ═══ SOLUTIONS ═══ */}
      <section className="solutions" id="solutions">
        <div className="solutions-header">
          <div className="section-eyebrow">Solutions</div>
          <h2 className="section-title">Built for Every Stage of Growth</h2>
          <p className="section-sub">Whether you're launching your first product or managing complex global operations, we have a solution tailored to your needs.</p>
          <a href="https://zorvyn.io/solutions" target="_blank" rel="noreferrer" className="view-all">View All Solutions →</a>
        </div>
        <div className="solutions-grid">
          <a href="https://zorvyn.io/solutions/startups" target="_blank" rel="noreferrer" className="sol-card">
            <div className="sol-icon">🚀</div>
            <h3>For Startups</h3>
            <p>Launch with enterprise grade infrastructure from day one.</p>
          </a>
          <a href="https://zorvyn.io/solutions/smes" target="_blank" rel="noreferrer" className="sol-card">
            <div className="sol-icon">📈</div>
            <h3>For SMEs</h3>
            <p>Scale operations with unified financial visibility.</p>
          </a>
          <a href="https://zorvyn.io/solutions/enterprises" target="_blank" rel="noreferrer" className="sol-card">
            <div className="sol-icon">🏢</div>
            <h3>For Enterprises</h3>
            <p>Custom solutions for complex global operations.</p>
          </a>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="features" id="features">
        <div className="features-header">
          <div className="section-eyebrow">Features</div>
          <h2 className="section-title">Why Choose Zorvyn</h2>
          <p className="section-sub">Enterprise grade financial infrastructure designed for modern businesses</p>
        </div>
        <div className="features-grid">
          <div className="feat-card">
            <div className="feat-spark">✨</div>
            <h3>Enterprise Security</h3>
            <p>Bank grade encryption and compliance controls protecting every transaction.</p>
          </div>
          <div className="feat-card">
            <div className="feat-spark">✨</div>
            <h3>Real Time Analytics</h3>
            <p>Live dashboards and intelligent insights for informed decision making.</p>
          </div>
          <div className="feat-card">
            <div className="feat-card">
              <div className="feat-spark">✨</div>
              <h3>Compliance First</h3>
              <p>Built in regulatory compliance for SOC 2, ISO 27001, and more.</p>
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-spark">✨</div>
            <h3>Lightning Fast</h3>
            <p>Process thousands of transactions per second with sub millisecond latency.</p>
          </div>
        </div>
        <a href="https://zorvyn.io/features" target="_blank" rel="noreferrer" className="explore-link">Explore All Features →</a>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="process" id="how-it-works">
        <div className="process-header">
          <div className="section-eyebrow">Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Get up and running in no time with our streamlined onboarding process</p>
        </div>
        <div className="steps-row">
          <div className="step">
            <div className="step-num">01</div>
            <h3>Connect</h3>
            <p>Integrate your existing systems with our secure APIs in minutes.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>Configure</h3>
            <p>Customize workflows, compliance rules, and reporting to match your needs.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>Automate</h3>
            <p>Let our platform handle reconciliation, monitoring, and compliance.</p>
          </div>
          <div className="step">
            <div className="step-num">04</div>
            <h3>Scale</h3>
            <p>Grow confidently with infrastructure that scales with your business.</p>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-header">
          <div className="section-eyebrow">Testimonials</div>
          <h2 className="section-title">Trusted by Industry Leaders</h2>
          <p className="section-sub">See what our clients have to say about their experience with Zorvyn</p>
        </div>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="testi-metric">70%</div>
            <div className="testi-metric-label">faster reconciliation</div>
            <p className="testi-quote">Zorvyn transformed how we handle financial operations. What used to take days now happens in real time.</p>
            <div className="testi-author">CFO</div>
            <div className="testi-company">Series B Fintech</div>
          </div>
          <div className="testi-card">
            <div className="testi-metric">90%</div>
            <div className="testi-metric-label">less manual work</div>
            <p className="testi-quote">The compliance automation alone saved us countless hours and reduced our audit preparation time significantly.</p>
            <div className="testi-author">Head of Finance</div>
            <div className="testi-company">E-commerce Platform</div>
          </div>
          <div className="testi-card">
            <div className="testi-metric">99.99%</div>
            <div className="testi-metric-label">uptime achieved</div>
            <p className="testi-quote">Finally, a platform that understands enterprise scale requirements without the complexity.</p>
            <div className="testi-author">VP Engineering</div>
            <div className="testi-company">SaaS Company</div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-text">
            <div className="section-eyebrow">About Zorvyn</div>
            <h2>Empowering Financial Innovation Since 2022</h2>
            <p>Zorvyn is a financial technology company dedicated to helping startups and small to medium sized enterprises (SMEs) build secure, compliant, and intelligent financial systems.</p>
            <p>We specialize in designing and implementing custom financial architectures that eliminate inefficiencies, reduce compliance risks, and provide clear visibility into every financial activity within an organization.</p>
            <ul className="about-checks">
              <li>Integrated AI enabled solutions</li>
              <li>Unified budgeting and payments</li>
              <li>Real time transaction monitoring</li>
              <li>Comprehensive compliance</li>
            </ul>
            <a href="https://zorvyn.io/about" target="_blank" rel="noreferrer" className="btn-primary" style={{ display:'inline-flex', width:'fit-content' }}>Learn More About Us →</a>
          </div>
          <div className="about-stats">
            <div className="ast"><div className="ast-val">600+</div><div className="ast-lbl">Total Clients</div></div>
            <div className="ast"><div className="ast-val">40,000+</div><div className="ast-lbl">Daily Transactions</div></div>
            <div className="ast"><div className="ast-val">25+</div><div className="ast-lbl">Regions Covered</div></div>
            <div className="ast"><div className="ast-val">99.9%</div><div className="ast-lbl">System Uptime</div></div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="cta-banner">
        <div className="section-eyebrow">Get Started</div>
        <h2>Ready to Transform Your Financial Infrastructure?</h2>
        <p>Join 600+ companies already building with Zorvyn. Get started with a personalized consultation today.</p>
        <div className="cta-btns">
          <a href="https://zorvyn.io/contact" target="_blank" rel="noreferrer" className="btn-primary">Contact Sales →</a>
          <a href="https://zorvyn.io/pricing" target="_blank" rel="noreferrer" className="btn-ghost">View Pricing</a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="custom-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo"><img src="/zorvyn-logo.png" alt="Zorvyn Fintech" className="footer-logo-img" /></div>
            <p className="footer-desc">Building secure, compliant, and intelligent financial systems that scale with you. Trusted by 600+ companies worldwide.</p>
            <a href="mailto:contact@zorvyn.io" className="footer-email">📧 contact@zorvyn.io</a>
            <br/>
            <a href="https://in.linkedin.com/company/zorvynfintech" target="_blank" rel="noreferrer" className="li-link">🔗 LinkedIn</a>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="https://zorvyn.io/products/ledger" target="_blank" rel="noreferrer">Zorvyn Ledger</a></li>
              <li><a href="https://zorvyn.io/products/comply" target="_blank" rel="noreferrer">Zorvyn Comply</a></li>
              <li><a href="https://zorvyn.io/products/insight" target="_blank" rel="noreferrer">Zorvyn Insight</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><a href="https://zorvyn.io/solutions/startups" target="_blank" rel="noreferrer">For Startups</a></li>
              <li><a href="https://zorvyn.io/solutions/smes" target="_blank" rel="noreferrer">For SMEs</a></li>
              <li><a href="https://zorvyn.io/solutions/enterprises" target="_blank" rel="noreferrer">For Enterprises</a></li>
            </ul>
            <br/>
            <h4>Company</h4>
            <ul>
              <li><a href="https://zorvyn.io/about" target="_blank" rel="noreferrer">About Us</a></li>
              <li><a href="https://zorvyn.io/contact" target="_blank" rel="noreferrer">Contact Us</a></li>
              <li><a href="https://career.zorvyn.io/" target="_blank" rel="noreferrer">Careers</a></li>
            </ul>
          </div>

          <div className="footer-col footer-subscribe">
            <h4>Subscribe to Updates</h4>
            <div className="subscribe-form">
              <input type="email" className="subscribe-input" placeholder="Enter your work email" />
              <button className="subscribe-btn" onClick={() => window.open('https://zorvyn.io/subscribe','_blank')}>Submit</button>
            </div>
            <br/>
            <h4>Resources</h4>
            <ul>
              <li><a href="https://zorvyn.io/security" target="_blank" rel="noreferrer">Security</a></li>
              <li><a href="https://zorvyn.io/faq" target="_blank" rel="noreferrer">FAQ</a></li>
              <li><a href="https://zorvyn.io/features" target="_blank" rel="noreferrer">Features</a></li>
              <li><a href="https://zorvyn.io/pricing" target="_blank" rel="noreferrer">Pricing</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Zorvyn FinTech Pvt. Ltd. All rights reserved.</span>
          <div className="footer-legal">
            <a href="https://zorvyn.io/terms" target="_blank" rel="noreferrer">Terms</a>
            <span style={{ color: 'var(--border2)' }}>•</span>
            <a href="https://zorvyn.io/privacy" target="_blank" rel="noreferrer">Privacy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
