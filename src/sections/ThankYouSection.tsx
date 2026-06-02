import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   ThankYouSection — Capítulo 5: O Futuro
   Fechamento emocional da história. Fundo rosa #f8dee2,
   texto central emergindo em stagger, coração pulsando GSAP,
   decorações respeitando prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════ */

export default function ThankYouSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const heart = heartRef.current;
    const decor = decorRef.current;
    if (!section || !content || !heart || !decor) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const triggers: ScrollTrigger[] = [];

    /* Reduced-motion: tudo visível imediatamente, sem animações */
    if (reduce) {
      gsap.set(content.children, { opacity: 1, y: 0, scale: 1 });
      gsap.set(heart, { scale: 1 });
      return;
    }

    /* Reveal scroll-driven: cada elemento emerge em stagger */
    const children = content.children;
    gsap.set(children, { opacity: 0, y: 30 });
    const reveal = gsap.to(children, {
      opacity: 1,
      y: 0,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 30%',
        scrub: true,
      },
    });
    if (reveal.scrollTrigger) triggers.push(reveal.scrollTrigger);

    /* Coração pulsa com GSAP (não CSS animation) */
    gsap.set(heart, { scale: 1 });
    const pulse = gsap.to(heart, {
      scale: 1.08,
      duration: 0.15,
      yoyo: true,
      repeat: -1,
      ease: 'power2.out',
    });
    const pulseLoop = gsap.to(pulse, {
      delay: 1.2,
      duration: 1.2,
      repeat: -1,
    });

    return () => {
      triggers.forEach((t) => t.kill());
      pulse.kill();
      pulseLoop.kill();
    };
  }, []);

  /* Classes condicionais para decorações: sem animação em reduce */
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#f8dee2' }}
    >
      {/* ── Decorativos (sem animação em reduced-motion) ── */}
      <div
        ref={decorRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {/* Top left flower */}
        <div
          className={`absolute top-10 left-10 w-24 h-24 opacity-20 ${
            reduce ? '' : 'slow-rotate'
          }`}
        >
          <svg
            viewBox="0 0 96 96"
            fill="none"
            className="w-full h-full text-[#c3505c]"
          >
            <path
              d="M48 8C48 8 52 32 72 40C72 40 52 48 48 72C48 72 44 48 24 40C24 40 44 32 48 8Z"
              fill="currentColor"
              opacity="0.4"
            />
            <path
              d="M48 20C48 20 50 36 64 42C64 42 50 48 48 64C48 64 46 48 32 42C32 42 46 36 48 20Z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Bottom right decoration */}
        <div
          className={`absolute bottom-20 right-10 w-20 h-20 opacity-15 ${
            reduce ? '' : 'sway'
          }`}
        >
          <svg
            viewBox="0 0 80 80"
            fill="none"
            className="w-full h-full text-[#c3505c]"
          >
            <path
              d="M40 8C40 8 44 28 60 32C60 32 44 36 40 56C40 56 36 36 20 32C20 32 36 28 40 8Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Small scattered hearts */}
        <div className="absolute top-1/4 right-20 w-4 h-4 opacity-20">
          <svg viewBox="0 0 16 16" fill="#c3505c">
            <path d="M8 14.5l-1-1C3.5 10.5 1 8.5 1 6c0-2 1.5-3.5 3.5-3.5 1.2 0 2.2.5 3 1.3.8-.8 1.8-1.3 3-1.3C12.5 2.5 14 4 14 6c0 2.5-2.5 4.5-6 7.5l-1 1z" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 left-16 w-5 h-5 opacity-15">
          <svg viewBox="0 0 20 20" fill="#c3505c">
            <path d="M10 18l-1.2-1C4.8 13.5 2 11.2 2 8.5 2 6.3 3.7 4.5 6 4.5c1.3 0 2.5.6 3.3 1.5.8-.9 2-1.5 3.3-1.5C14.3 4.5 16 6.3 16 8.5c0 2.7-2.8 5-6.8 8.5L10 18z" />
          </svg>
        </div>
      </div>

      {/* ── Main content ── */}
      <div
        ref={contentRef}
        className="text-center px-6 max-w-3xl mx-auto relative z-10"
      >
        {/* Main message */}
        <div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#c3505c] leading-relaxed"
            style={{
              fontWeight: 500,
              textShadow: '0 2px 20px rgba(195, 80, 92, 0.3)',
            }}
          >
            Obrigada pelo nosso "agora"
            <br />
            <span className="text-[#b00d1e]">
              e por tudo que nos espera pela frente
            </span>
          </h2>
        </div>

        {/* Signature */}
        <div className="mt-16">
          <p
            className="font-body text-sm text-[#b00d1e]/60 tracking-wide"
          >
            Com amor,
          </p>
          <p
            className="font-display text-2xl md:text-3xl text-[#b00d1e] mt-2"
            style={{ fontWeight: 500 }}
          >
            Sua amada
          </p>
        </div>

        {/* Final heart — pulso via GSAP (não CSS) */}
        <div className="mt-12">
          <svg
            ref={heartRef}
            className="w-12 h-12 mx-auto text-[#c3505c]"
            viewBox="0 0 48 48"
            fill="currentColor"
            aria-label="Coração"
            role="img"
          >
            <path d="M24 42.5l-2.9-2.6C14.4 30.8 8 25.6 8 19c0-5 3.8-8.5 8.5-8.5 3 0 5.8 1.4 7.5 3.6 1.7-2.2 4.5-3.6 7.5-3.6C36.2 10.5 40 14 40 19c0 6.6-6.4 11.8-13.1 20.9L24 42.5z" />
          </svg>
        </div>

        {/* Year */}
        <div className="mt-8">
          <p className="font-display text-lg text-[#b00d1e]/40 tracking-[0.3em]">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* ── Bottom gradient ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#c3505c]/10 to-transparent pointer-events-none" />
    </section>
  );
}
