import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TravelSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
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

  // Grayscale reveal scroll-driven (mobile-friendly, no hover dependency)
  useEffect(() => {
    if (!imgRef.current || !sectionRef.current) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(imgRef.current, { filter: 'grayscale(0)' });
      return;
    }

    gsap.set(imgRef.current, { filter: 'grayscale(1)' });
    const tween = gsap.to(imgRef.current, {
      filter: 'grayscale(0)',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#c3505c] py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main photo */}
              <div className="relative overflow-hidden rounded-sm shadow-2xl">
                <img
                  ref={imgRef}
                  src="images/travel/travel.jpg"
                  alt="Viagens juntos"
                  className="w-full h-auto object-cover"
                  style={{ filter: 'grayscale(1)' }}
                />
              </div>

              {/* Decorative washi tape */}
              <img
                src="images/popup/washi-tape.png"
                alt=""
                className="absolute -top-3 left-8 w-24 h-7 opacity-80 rotate-[-8deg] object-cover pointer-events-none"
              />

              {/* Shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full -z-10" />
            </div>
          </div>

          {/* Text content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-[#f8dde2] leading-tight mb-6"
              style={{ fontWeight: 500 }}
            >
              Descobrindo novos lugares
            </h2>

            <p className="font-body text-sm md:text-base text-[#f8dde2]/80 leading-relaxed max-w-md">
              Eu amo viajar com você de carro, porque você sempre está pronto para ir
              a qualquer lugar que eu queira
            </p>

            {/* Decorative elements */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#f8dde2]/40" />
              <svg
                className="w-5 h-5 text-[#f8dde2]/40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="w-12 h-[1px] bg-[#f8dde2]/40" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
