import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

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
            assim bate meu coração,
            <br />
            quando você está por perto
          </h2>
        </div>

        {/* Heart with beat animation */}
        <div
          className={`mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <button
            className="relative group"
            onClick={() => {
              // Create a burst effect
              const hearts = Array.from({ length: 8 }).map((_, i) => {
                const el = document.createElement('div');
                el.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#f8dee2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
                el.style.position = 'absolute';
                el.style.left = '50%';
                el.style.top = '50%';
                el.style.pointerEvents = 'none';
                el.style.transform = `rotate(${i * 45}deg)`;
                el.animate([
                  { transform: `rotate(${i * 45}deg) translateY(0) scale(1)`, opacity: 1 },
                  { transform: `rotate(${i * 45}deg) translateY(-100px) scale(0)`, opacity: 0 },
                ], {
                  duration: 800,
                  easing: 'ease-out',
                });
                return el;
              });
              const container = document.getElementById('heart-container');
              hearts.forEach((h) => container?.appendChild(h));
              setTimeout(() => hearts.forEach((h) => h.remove()), 800);
            }}
          >
            <div id="heart-container" className="relative">
              <Heart
                className="w-32 h-32 md:w-44 md:h-44 text-[#f8dee3] fill-[#f8dee3] heartbeat transition-transform duration-300 group-hover:scale-110"
                strokeWidth={0}
              />
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-[#c3505c] font-body text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Нажми
            </span>
          </button>
        </div>

        {/* Instruction text */}
        <p
          className={`mt-8 font-body text-xs text-[#f8dee3]/60 tracking-wide transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Toque no coração
        </p>
      </div>
    </section>
  );
}
