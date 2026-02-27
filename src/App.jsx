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
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
          </div>
          <div className="nav-center">
            <span className="logo">Vessel</span>
          </div>
          <div className="nav-right">
            <button className="nav-cta magnetic-btn">
              Get Started
              <span className="cta-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
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
                <button ref={ctaRef} className="hero-cta magnetic-btn">
                  Get Started
                  <span className="cta-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
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
      </div>
    </div>
  );
}

export default App;
