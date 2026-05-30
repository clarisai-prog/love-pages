import { useEffect, useRef, useState } from 'react';

export default function OpeningText() {
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
      className="relative min-h-screen flex items-center justify-center bg-[#c3505c]"
    >
      {/* Decorative corner element */}
      <div className="absolute top-8 right-8 w-16 h-16 opacity-60">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-[#f8dee2]">
          <path
            d="M32 4C32 4 36 20 52 24C52 24 36 28 32 44C32 44 28 28 12 24C12 24 28 20 32 4Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="text-center px-6 max-w-2xl mx-auto">
        <p
          className={`font-display text-2xl md:text-3xl lg:text-4xl text-[#f8dee3] leading-relaxed tracking-wide transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontWeight: 400 }}
        >
          Тёма, этот сайт — маленькое напоминание о том,
          <br />
          как сильно я тебя люблю
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#f8dee3] opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
