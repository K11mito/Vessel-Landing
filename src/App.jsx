import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ColorBends from './components/ColorBends';
import BentoGrid from './components/BentoGrid';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const navRef = useRef(null);
  const heroTextRef = useRef(null);
  const vesselRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const containerRef = useRef(null);
  const statementRef = useRef(null);
  const downloadRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Navbar slides down
      tl.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
      });

      // Nav links stagger in
      tl.from('.nav-link', {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
      }, '-=0.5');

      // Nav CTA button
      tl.from('.nav-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
      }, '-=0.3');

      // "Enter the Future." text
      tl.from(heroTextRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.2');

      // "Vessel" large text - letter by letter
      tl.from('.vessel-letter', {
        y: 200,
        opacity: 0,
        rotateX: 90,
        stagger: 0.06,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.6');

      // Description text
      tl.from(descRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');

      // CTA button
      tl.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');

      // Statement section scroll animation
      if (statementRef.current) {
        gsap.from(statementRef.current, {
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: 'power3.out',
        });
      }

      // Download section scroll animation
      if (downloadRef.current) {
        gsap.from('.download-title', {
          scrollTrigger: {
            trigger: downloadRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });

        gsap.from('.download-subtitle', {
          scrollTrigger: {
            trigger: downloadRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        });

        gsap.from('.download-btn', {
          scrollTrigger: {
            trigger: downloadRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const buttons = document.querySelectorAll('.magnetic-btn');

    const handleMouseMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (e) => {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const vesselLetters = 'Vessel'.split('');

  return (
    <div ref={containerRef} className="page">
      {/* Background */}
      <div className="bg-layer">
        <ColorBends
          colors={[]}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent={false}
          autoRotate={0}
          rotation={45}
        />
      </div>

      {/* Content */}
      <div className="content-layer">
        {/* Navbar */}
        <nav ref={navRef} className="navbar">
          <div className="nav-left">
            <a href="#" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-center">
            <span className="logo">Vessel</span>
          </div>
          <div className="nav-right">
            <a href="#download" className="nav-cta magnetic-btn">
              Get Started
              <span className="cta-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero-section">
          <div className="hero">
            <div className="hero-right">
              <p ref={heroTextRef} className="hero-tagline">Enter the Future.</p>
            </div>

            <div className="hero-bottom">
              <h1 ref={vesselRef} className="vessel-title">
                {vesselLetters.map((letter, i) => (
                  <span key={i} className="vessel-letter">{letter}</span>
                ))}
              </h1>

              <div className="hero-info">
                <p ref={descRef} className="hero-desc">
                  Vessel is a multi-agent management system that helps you manage and create your agents in one place seamlessly using hero-mode or grid-view.
                </p>
                <a ref={ctaRef} href="#download" className="hero-cta magnetic-btn">
                  Get Started
                  <span className="cta-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Statement */}
        <section ref={statementRef} className="statement-section">
          <p className="statement-text">
            Because dealing with a gazillion terminals <span className="statement-highlight">FUCKING</span> sucks.
          </p>
        </section>

        {/* Feature Showcase */}
        <BentoGrid />

        {/* Download Section */}
        <section id="download" ref={downloadRef} className="download-section">
          <h2 className="download-title">Download Vessel</h2>
          <p className="download-subtitle">Get rid of those boring terminals now.</p>
          <div className="download-buttons">
            <a href="#" className="download-btn magnetic-btn">
              <svg className="download-btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="download-btn-text">
                <span className="download-btn-label">Download for</span>
                <span className="download-btn-platform">macOS</span>
              </div>
            </a>
            <a href="#" className="download-btn magnetic-btn">
              <svg className="download-btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
              </svg>
              <div className="download-btn-text">
                <span className="download-btn-label">Download for</span>
                <span className="download-btn-platform">Windows</span>
              </div>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="footer">
          <span className="footer-brand">Vessel</span>
          <span className="footer-made">Made with &lt;3, Hope you enjoy using it</span>
          <div className="footer-credits">
            <div className="footer-person">
              <span className="footer-name">Aryendra B Shrestha</span>
              <div className="footer-links">
                <a href="https://github.com/K11mito" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/aryendra-shrestha-199913303/" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
            <div className="footer-person">
              <span className="footer-name">Arya Shrestha</span>
              <div className="footer-links">
                <a href="https://github.com/AryaShrestha05" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a href="https://linkedin.com/in/arya" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
