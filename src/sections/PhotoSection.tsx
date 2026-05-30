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
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Main B&W Photo */}
      <div
        className={`relative transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        <img
          src="/images/couple-main.jpg"
          alt="Наше фото"
          className="w-full h-auto object-cover grayscale"
          style={{ maxHeight: '80vh' }}
        />

        {/* Torn paper bottom edge - SVG overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full h-12 md:h-16"
            fill="#f8dee2"
          >
            <path d="M0,30 Q30,5 60,25 T120,15 T180,28 T240,10 T300,22 T360,8 T420,26 T480,12 T540,24 T600,10 T660,20 T720,6 T780,25 T840,14 T900,22 T960,8 T1020,26 T1080,12 T1140,20 T1200,5 T1260,24 T1320,15 T1380,22 T1440,10 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
