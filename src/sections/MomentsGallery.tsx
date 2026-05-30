import { useEffect, useRef, useState } from 'react';

const moments = [
  {
    id: 1,
    image: '/images/moment-1.jpg',
    caption: 'Пикник в парке',
    rotation: -6,
  },
  {
    id: 2,
    image: '/images/moment-2.jpg',
    caption: 'Закат на пляже',
    rotation: 4,
  },
  {
    id: 3,
    image: '/images/moment-3.jpg',
    caption: 'Совместный ужин',
    rotation: -3,
  },
  {
    id: 4,
    image: '/images/moment-4.jpg',
    caption: 'Кафе в Европе',
    rotation: 5,
  },
];

export default function MomentsGallery() {
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
      { threshold: 0.15 }
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
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div
          className={`text-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#b00d1e]"
            style={{ fontWeight: 500 }}
          >
            Наши моменты
          </h2>
        </div>

        {/* Subtitle */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-body text-sm md:text-base text-[#b00d1e]/80 max-w-lg mx-auto leading-relaxed">
            И ещё сотни мгновений, которые я бы хотела пережить с тобой снова и снова…
          </p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {moments.map((moment, index) => (
            <div
              key={moment.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${400 + index * 150}ms`,
                transform: isVisible
                  ? `rotate(${moment.rotation}deg)`
                  : `rotate(${moment.rotation}deg) translateY(30px)`,
              }}
            >
              <div className="bg-white p-3 pb-12 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 hover:rotate-0 transition-transform">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={moment.image}
                    alt={moment.caption}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="mt-3 text-center font-body text-xs text-[#b00d1e]/70">
                  {moment.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-8 h-8 opacity-20">
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-[#c3505c]">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-12 h-12 opacity-15">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-[#c3505c]">
            <path
              d="M24 4L28 20H44L31 30L35 46L24 36L13 46L17 30L4 20H20L24 4Z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
