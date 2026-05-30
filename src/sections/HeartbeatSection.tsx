import { useEffect, useRef, useState } from 'react';

export default function HeartbeatSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-[#c3505c] overflow-hidden"
    >
      {/* Decorative elements */}
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

      <div className="text-center px-6 relative z-10">
        {/* Title */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl text-[#f8dee3] leading-tight mb-4"
            style={{ fontWeight: 500 }}
          >
            celebrando mais um
            <br />
            momento nosso
          </h2>
        </div>

        {/* Time counter */}
        <div
          className={`mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="relative inline-block">
            <p
              className="font-display text-4xl md:text-6xl lg:text-7xl text-[#f8dee3] leading-tight"
              style={{ fontWeight: 500 }}
            >
              4 anos, 5 meses,
              <br />
              5 dias ao seu lado
            </p>
            {/* Decorative line */}
            <div className="mt-4 mx-auto w-24 h-[1px] bg-[#f8dee3]/40" />
          </div>
        </div>

        {/* Subtitle */}
        <p
          className={`mt-8 font-body text-sm md:text-base text-[#f8dee3]/80 tracking-wide transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          e eu sigo feliz por viver isso com você.
        </p>
      </div>
    </section>
  );
}
