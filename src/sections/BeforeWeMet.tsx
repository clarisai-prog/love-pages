import { useEffect, useRef, useState } from 'react';

export default function BeforeWeMet() {
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
      className="relative bg-[#f8dee2] py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#b00d1e]"
            style={{ fontWeight: 500 }}
          >
            antes de nos conhecermos
          </h2>
        </div>

        {/* Childhood photos and text */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo with vintage frame */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Vintage photo frame effect */}
              <div className="bg-white p-4 shadow-xl rotate-[-2deg]">
                <div className="relative overflow-hidden bg-[#f5f0e8]">
                  <img
                    src="/images/childhood/childhood.jpg"
                    alt="Наше детство"
                    className="w-full h-auto object-cover sepia-[0.3]"
                  />
                </div>
                {/* Handwritten caption */}
                <p className="mt-3 text-center font-body text-xs text-[#8b7355] italic">
                  Quando éramos apenas crianças...
                </p>
              </div>

              {/* Decorative tape */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 opacity-80 rotate-[5deg]"
                style={{
                  background: 'repeating-linear-gradient(45deg, #f4a6b5 0px, #f4a6b5 4px, #e8889a 4px, #e8889a 5px)',
                }}
              />

              {/* Shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/10 blur-xl rounded-full -z-10" />
            </div>
          </div>

          {/* Text content */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <p className="font-body text-base md:text-lg text-[#b00d1e]/80 leading-relaxed">
              Éramos apenas crianças, sem saber que um dia seríamos o mais importante "nós"
              na vida um do outro
            </p>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#b00d1e]/30" />
              <svg className="w-4 h-4 text-[#b00d1e]/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="w-8 h-[1px] bg-[#b00d1e]/30" />
            </div>

            {/* Quote */}
            <blockquote className="mt-8 font-display text-xl md:text-2xl text-[#b00d1e]/60 italic leading-relaxed">
              "Toda história de amor é linda, mas a nossa é a minha favorita"
            </blockquote>
          </div>
        </div>
      </div>

      {/* Decorative floating hearts */}
      <div className="absolute top-20 right-10 w-6 h-6 opacity-20 animate-pulse">
        <svg viewBox="0 0 24 24" fill="#c3505c">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </section>
  );
}
