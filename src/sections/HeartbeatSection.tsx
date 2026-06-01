import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeartbeatSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const fechoRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Animações de entrada + pulso contínuo do coração
  useEffect(() => {
    if (!isVisible) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    // 1. Headline desliza de baixo
    if (headlineRef.current) {
      if (reduce) {
        gsap.set(headlineRef.current, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
        );
      }
    }

    // 2. Coração: aparece e começa a pulsar
    if (heartRef.current) {
      if (reduce) {
        gsap.set(heartRef.current, { opacity: 1, scale: 1 });
      } else {
        // Aparece
        gsap.fromTo(
          heartRef.current,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.3,
          }
        );

        // Pulso contínuo — batida cardíaca calma (~50bpm)
        const pulse = gsap.to(heartRef.current, {
          scale: 1.08,
          duration: 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.2,
        });
        tweens.push(pulse);
      }
    }

    // 3. Glow de fundo sincronizado com o pulso
    if (glowRef.current && !reduce) {
      gsap.set(glowRef.current, { opacity: 0 });
      const glow = gsap.to(glowRef.current, {
        opacity: 0.08,
        duration: 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
      tweens.push(glow);
    }

    // 4. Contador com stagger
    if (counterRef.current) {
      const lines = counterRef.current.querySelectorAll('.counter-line');
      if (reduce) {
        gsap.set(lines, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.4,
            ease: 'power3.out',
            delay: 0.6,
          }
        );
      }
    }

    // 5. Fecho
    if (fechoRef.current) {
      if (reduce) {
        gsap.set(fechoRef.current, { opacity: 1 });
      } else {
        gsap.fromTo(
          fechoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 2.2, ease: 'none' }
        );
      }
    }

    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center bg-[#c3505c] overflow-hidden"
    >
      {/* Textura sutil de papel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow pulsante sincronizado com o coração */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(248,222,226,0.35) 0%, transparent 60%)',
        }}
      />

      {/* Corações decorativos de fundo */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-10">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full text-[#f8dee2]">
          <path
            d="M40 10C40 10 50 30 70 35C70 35 50 40 40 60C40 60 30 40 10 35C10 35 30 30 40 10Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-16 h-16 opacity-10">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-[#f8dee2]">
          <path
            d="M32 8C32 8 40 24 56 28C56 28 40 32 32 48C32 48 24 32 8 28C8 28 24 24 32 8Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="text-center px-6 relative z-10 max-w-4xl mx-auto">
        {/* Coração central */}
        <div className="flex justify-center mb-8 md:mb-10">
          <svg
            ref={heartRef}
            viewBox="0 0 100 100"
            className="w-24 h-24 md:w-40 md:h-40 text-[#f8dee2]"
            style={{ opacity: 0 }}
          >
            <path
              d="M50 25C50 25 60 10 75 15C90 20 90 40 75 55C60 70 50 85 50 85C50 85 40 70 25 55C10 40 10 20 25 15C40 10 50 25 50 25Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="mb-10 md:mb-14"
          style={{ opacity: 0 }}
        >
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl text-[#f8dee3] leading-tight"
            style={{ fontWeight: 500 }}
          >
            celebrando mais um
            <br />
            momento nosso
          </h2>
        </div>

        {/* Contador de tempo */}
        <div ref={counterRef} className="relative inline-block">
          <p
            className="font-display text-4xl md:text-6xl lg:text-7xl text-[#f8dee3] leading-tight"
            style={{ fontWeight: 500 }}
          >
            <span className="counter-line block" style={{ opacity: 0 }}>
              4 anos,
            </span>
            <span className="counter-line block" style={{ opacity: 0 }}>
              5 meses,
            </span>
            <span className="counter-line block" style={{ opacity: 0 }}>
              5 dias ao seu lado
            </span>
          </p>
          {/* Decorative line */}
          <div className="mt-6 mx-auto w-24 h-[1px] bg-[#f8dee3]/40" />
        </div>

        {/* Subtitle / Fecho */}
        <p
          ref={fechoRef}
          className="mt-10 font-body text-sm md:text-base text-[#f8dee3]/80 tracking-wide"
          style={{ opacity: 0 }}
        >
          e eu sigo feliz por viver isso com você.
        </p>
      </div>
    </section>
  );
}
