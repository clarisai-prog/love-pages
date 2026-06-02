import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   MoonPhaseSection — Lua cheia da noite em que tudo começou
   Fundo escuro contínuo (#0d0d0f), lua SVG com crateras,
   glow suave e frase final poética.
   ═══════════════════════════════════════════════════════════ */

export default function MoonPhaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const moon = moonRef.current;
    const text = textRef.current;
    if (!section || !moon || !text) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const triggers: ScrollTrigger[] = [];

    if (reduce) {
      gsap.set(moon, { opacity: 1, scale: 1 });
      gsap.set(text.children, { opacity: 1, y: 0 });
      return;
    }

    /* Lua emerge e pulsa suavemente */
    gsap.set(moon, { opacity: 0, scale: 0.85 });
    const moonReveal = gsap.to(moon, {
      opacity: 1,
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 30%',
        scrub: true,
      },
    });
    if (moonReveal.scrollTrigger) triggers.push(moonReveal.scrollTrigger);

    /* Pulso sutil contínuo da lua (glow respirando) */
    const moonPulse = gsap.to(moon, {
      scale: 1.03,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    /* Texto revela em stagger */
    gsap.set(text.children, { opacity: 0, y: 20 });
    const textReveal = gsap.to(text.children, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 55%',
        end: 'top 25%',
        scrub: true,
      },
    });
    if (textReveal.scrollTrigger) triggers.push(textReveal.scrollTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
      moonPulse.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0d0d0f' }}
    >
      {/* ── Lua cheia com crateras ── */}
      <svg
        ref={moonRef}
        viewBox="0 0 200 200"
        className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 relative z-10"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(248,222,226,0.25)) drop-shadow(0 0 80px rgba(195,80,92,0.15))',
        }}
        aria-label="Lua cheia com crateras"
        role="img"
      >
        <defs>
          <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fdf6f0" />
            <stop offset="50%" stopColor="#e8ddd4" />
            <stop offset="90%" stopColor="#b8aea6" />
            <stop offset="100%" stopColor="#9e958e" />
          </radialGradient>
        </defs>

        {/* Disco lunar */}
        <circle cx="100" cy="100" r="96" fill="url(#moonGrad)" />

        {/* Crateras — círculos escuros semi-transparentes */}
        <g fill="#8a827b" opacity="0.35">
          <circle cx="70" cy="75" r="14" />
          <circle cx="125" cy="95" r="10" />
          <circle cx="95" cy="130" r="18" />
          <circle cx="55" cy="110" r="8" />
          <circle cx="140" cy="65" r="7" />
          <circle cx="150" cy="120" r="12" />
          <circle cx="80" cy="55" r="6" />
          <circle cx="115" cy="145" r="9" />
          <circle cx="60" cy="145" r="5" />
          <circle cx="135" cy="50" r="4" />
        </g>

        {/* Sombra sutil de fase (limiar direito levemente escuro
           para dar sensação de esfera, não disco chapado) */}
        <path
          d="M100,4 A96,96 0 0,1 100,196 A78,96 0 0,0 100,4 Z"
          fill="#000"
          opacity="0.08"
        />
      </svg>

      {/* ── Texto ── */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6 mt-10 md:mt-14 max-w-lg mx-auto"
      >
        {/* Título */}
        <h3
          className="font-script text-2xl md:text-3xl lg:text-4xl leading-relaxed"
          style={{ color: '#f8dee2', fontWeight: 500 }}
        >
          A lua era assim cheia naquela noite
        </h3>

        {/* Frase romântica final */}
        <p
          className="mt-6 font-display text-sm md:text-base italic leading-relaxed"
          style={{ color: 'rgba(248,222,226,0.45)', fontWeight: 400 }}
        >
          E quando eu olho pra ela hoje, ainda vejo o reflexo dos seus olhos
        </p>
      </div>

      {/* ── Transição suave escuro → rosa do ThankYouSection ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="moonFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d0d0f" />
              <stop offset="50%" stopColor="#0d0d0f" />
              <stop offset="85%" stopColor="#c3505c" />
              <stop offset="100%" stopColor="#f8dee2" />
            </linearGradient>
          </defs>
          <rect width="1440" height="96" fill="url(#moonFade)" />
        </svg>
      </div>

      {/* ── Borda inferior rasgada → rosa do ThankYouSection ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-16"
          fill="#f8dee2"
        >
          <path d="M0,30 Q30,5 60,25 T120,15 T180,28 T240,10 T300,22 T360,8 T420,26 T480,12 T540,24 T600,10 T660,20 T720,6 T780,25 T840,14 T900,22 T960,8 T1020,26 T1080,12 T1140,20 T1200,5 T1260,24 T1320,15 T1380,22 T1440,10 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
