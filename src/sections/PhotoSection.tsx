import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhotoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // A foto ganha cor conforme entra na viewport (funciona no mobile, sem hover)
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.filter = 'grayscale(0)';
      return;
    }
    const tween = gsap.fromTo(
      el,
      { filter: 'grayscale(1)' },
      {
        filter: 'grayscale(0)',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 35%',
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
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
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Washi tape — top center */}
          <img
            src="images/popup/washi-tape.png"
            alt=""
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 md:w-36 h-8 md:h-10 opacity-80 rotate-[-6deg] object-cover pointer-events-none z-10"
          />

          {/* White polaroid frame */}
          <div className="bg-white p-4 md:p-6 pb-16 md:pb-24 shadow-xl">
            {/* Photo */}
            <div className="overflow-hidden bg-gray-100">
              <img
                ref={photoRef}
                src="images/hero/couple-main.jpg"
                alt="Nossa foto"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '60vh', filter: 'grayscale(1)' }}
              />
            </div>

            {/* Handwritten caption below photo */}
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

      {/* Borda rasgada SVG → creme do ingresso */}
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
