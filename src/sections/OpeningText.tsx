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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-[#c3505c] overflow-hidden"
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

      {/* Left Polaroid */}
      <div
        className={`absolute left-[3%] md:left-[8%] top-[10%] md:top-[15%] transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transform: `rotate(-8deg) ${isVisible ? '' : 'translateY(30px)'}` }}
      >
        <div className="bg-white p-3 pb-10 shadow-lg">
          <div className="w-32 h-40 md:w-44 md:h-56 bg-gray-200 overflow-hidden">
            <img
              src="/images/popup/polaroid-left.jpg"
              alt="Lembrança do casal"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
        {/* Washi tape */}
        <img
          src="/images/popup/washi-tape.png"
          alt="Fita decorativa"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 md:w-20 h-5 md:h-6 opacity-80 rotate-[-15deg] object-cover pointer-events-none"
        />
      </div>

      {/* Right Polaroid */}
      <div
        className={`absolute right-[3%] md:right-[8%] bottom-[10%] md:bottom-[15%] transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transform: `rotate(6deg) ${isVisible ? '' : 'translateY(30px)'}` }}
      >
        <div className="bg-white p-3 pb-10 shadow-lg">
          <div className="w-32 h-40 md:w-44 md:h-56 bg-gray-200 overflow-hidden">
            <img
              src="/images/popup/polaroid-right.jpg"
              alt="Lembrança do casal"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
        {/* Washi tape */}
        <img
          src="/images/popup/washi-tape.png"
          alt="Fita decorativa"
          className="absolute -bottom-2 right-1/4 w-16 md:w-20 h-5 md:h-6 opacity-80 rotate-[20deg] object-cover pointer-events-none"
        />
      </div>

      {/* Central Text */}
      <div className="text-center px-6 max-w-2xl mx-auto z-10">
        <p
          className={`font-display text-2xl md:text-3xl lg:text-4xl text-[#f8dee3] leading-relaxed tracking-wide transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontWeight: 400 }}
        >
          Esse site é um pequeno lembrete
          <br />
          de como eu te amo muito
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
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
