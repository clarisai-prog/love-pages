import { useEffect, useRef, useState } from 'react';

export default function PhotoSection() {
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
                src="images/hero/couple-main.jpg"
                alt="Nossa foto"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ maxHeight: '60vh' }}
              />
            </div>

            {/* Handwritten caption below photo */}
            <p
              className="mt-6 md:mt-8 text-center font-display text-lg md:text-xl italic tracking-wide"
              style={{ color: '#c3505c', fontWeight: 400 }}
            >
              A foto que eu olho quando sinto saudade
            </p>
          </div>

          {/* Shadow under polaroid */}
          <div className="absolute -bottom-6 left-8 right-8 h-8 bg-black/10 blur-xl rounded-full -z-10" />
        </div>
      </div>

      {/* Torn paper bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <img
          src="images/efeito-papel-1.webp"
          alt=""
          className="w-full h-16 md:h-24 object-cover object-top"
        />
      </div>
    </section>
  );
}
