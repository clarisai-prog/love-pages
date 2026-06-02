import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   PhotoSection — Capítulo 2: O Começo
   Polaroid central com foto que ganha cor no scroll.
   Reveal do container e grayscale da foto ambos via
   GSAP ScrollTrigger para consistência com o resto do site.
   ═══════════════════════════════════════════════════════════ */

export default function PhotoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const polaroid = polaroidRef.current;
    const photo = photoRef.current;
    if (!section || !polaroid || !photo) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const triggers: ScrollTrigger[] = [];

    /* Reduced-motion: tudo visível, foto colorida */
    if (reduce) {
      gsap.set(polaroid, { opacity: 1, y: 0 });
      gsap.set(photo, { filter: 'grayscale(0)' });
      return;
    }

    /* Reveal do polaroid: sobe e aparece */
    gsap.set(polaroid, { opacity: 0, y: 50 });
    const reveal = gsap.to(polaroid, {
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
      },
    });
    if (reveal.scrollTrigger) triggers.push(reveal.scrollTrigger);

    /* Foto ganha cor no scroll (mobile + desktop) */
    gsap.set(photo, { filter: 'grayscale(1)' });
    const color = gsap.to(photo, {
      filter: 'grayscale(0)',
      ease: 'none',
      scrollTrigger: {
        trigger: photo,
        start: 'top 80%',
        end: 'top 35%',
        scrub: true,
      },
    });
    if (color.scrollTrigger) triggers.push(color.scrollTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#faf5f0' }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Polaroid frame */}
        <div ref={polaroidRef} className="relative">
          {/* Washi tape — top center */}
          <img
            src="images/popup/washi-tape.png"
            alt=""
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 md:w-36 h-8 md:h-10 opacity-80 rotate-[-6deg] object-cover pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* White polaroid frame */}
          <div className="bg-white p-4 md:p-6 pb-16 md:pb-24 shadow-xl">
            {/* Photo */}
            <div className="overflow-hidden bg-gray-100">
              <img
                ref={photoRef}
                src="images/hero/couple-main.jpg"
                alt="Nossa foto — a foto que eu olho quando bate saudade de você"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '60vh', filter: 'grayscale(1)' }}
              />
            </div>

            {/* Handwritten caption */}
            <p
              className="mt-6 md:mt-8 text-center font-display text-lg md:text-xl italic tracking-wide"
              style={{ color: '#c3505c', fontWeight: 400 }}
            >
              A foto que eu olho quando bate saudade de você
            </p>
          </div>

          {/* Shadow under polaroid */}
          <div className="absolute -bottom-6 left-8 right-8 h-8 bg-black/10 blur-xl rounded-full -z-10" />
        </div>
      </div>

      {/* ── Borda rasgada SVG → creme do ingresso ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-16"
          fill="#faf5f0"
        >
          <path d="M0,30 Q30,5 60,25 T120,15 T180,28 T240,10 T300,22 T360,8 T420,26 T480,12 T540,24 T600,10 T660,20 T720,6 T780,25 T840,14 T900,22 T960,8 T1020,26 T1080,12 T1140,20 T1200,5 T1260,24 T1320,15 T1380,22 T1440,10 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
