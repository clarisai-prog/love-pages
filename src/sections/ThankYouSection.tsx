import { useEffect, useRef, useState } from 'react';

export default function ThankYouSection() {
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
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#f8dee2] overflow-hidden"
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Top left flower-like decoration */}
        <div className="absolute top-10 left-10 w-24 h-24 opacity-20">
          <svg viewBox="0 0 96 96" fill="none" className="w-full h-full text-[#c3505c] slow-rotate">
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
        <div className="absolute bottom-20 right-10 w-20 h-20 opacity-15">
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full text-[#c3505c] sway">
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

      {/* Main content */}
      <div className="text-center px-6 max-w-3xl mx-auto relative z-10">
        {/* Main message */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#f8dee3] leading-relaxed"
            style={{
              fontWeight: 500,
              textShadow: '0 2px 20px rgba(195, 80, 92, 0.3)',
              color: '#c3505c',
            }}
          >
            Obrigada pelo nosso "agora"
            <br />
            <span className="text-[#b00d1e]">e por tudo que nos espera pela frente</span>
          </h2>
        </div>

        {/* Signature */}
        <div
          className={`mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-body text-sm text-[#b00d1e]/60 tracking-wide">
            Com amor,
          </p>
          <p
            className="font-display text-2xl md:text-3xl text-[#b00d1e] mt-2"
            style={{ fontWeight: 500 }}
          >
            Sua amada
          </p>
        </div>

        {/* Final heart */}
        <div
          className={`mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <svg
            className="w-12 h-12 mx-auto text-[#c3505c] heartbeat"
            viewBox="0 0 48 48"
            fill="currentColor"
          >
            <path d="M24 42.5l-2.9-2.6C14.4 30.8 8 25.6 8 19c0-5 3.8-8.5 8.5-8.5 3 0 5.8 1.4 7.5 3.6 1.7-2.2 4.5-3.6 7.5-3.6C36.2 10.5 40 14 40 19c0 6.6-6.4 11.8-13.1 20.9L24 42.5z" />
          </svg>
        </div>

        {/* Year */}
        <div
          className={`mt-8 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-display text-lg text-[#b00d1e]/40 tracking-[0.3em]">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#c3505c]/10 to-transparent pointer-events-none" />
    </section>
  );
}
