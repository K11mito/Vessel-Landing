import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Perception-Driven Environments',
    desc: 'Digital spaces that adapt in real-time to user behavior, context, and intent \u2014 environments that feel alive and responsive to every interaction.',
    className: 'bento-card--large',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: 'AI-Native Architecture',
    desc: 'Intelligence woven into every layer. Not bolted on, but built in from the ground up.',
    className: 'bento-card--wide',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'System Design',
    desc: 'Robust, scalable systems engineered for the demands of tomorrow.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Intuitive Interfaces',
    desc: 'Experiences that feel natural, reducing friction between human intent and digital response.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export default function BentoGrid() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animations
      gsap.from('.bento-section-title', {
        scrollTrigger: {
          trigger: '.bento-section-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.bento-section-subtitle', {
        scrollTrigger: {
          trigger: '.bento-section-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Card staggered entrance — each card triggers independently
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bento-section">
      <div className="bento-section-header">
        <h2 className="bento-section-title">What We Build</h2>
        <p className="bento-section-subtitle">
          The building blocks of perception-driven technology.
        </p>
      </div>
      <div className="bento-grid">
        {features.map((feat, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`bento-card ${feat.className || ''}`}
          >
            <div className="bento-card-icon">{feat.icon}</div>
            <div className="bento-card-content">
              <h3 className="bento-card-title">{feat.title}</h3>
              <p className="bento-card-desc">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
