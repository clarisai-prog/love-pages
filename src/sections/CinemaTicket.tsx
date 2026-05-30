import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CinemaTicket() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

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

  const handleTicketClick = () => {
    setIsRevealed(!isRevealed);
  };

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
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#b00d1e] leading-tight"
            style={{ fontWeight: 500 }}
          >
            ты помнишь,
            <br />
            как всё началось?
          </h2>
        </div>

        {/* Instruction text */}
        <div
          className={`text-center mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-body text-sm text-[#b00d1e] tracking-wide">
            Нажми на отрывную часть билета
          </p>
          <div className="flex justify-center mt-2">
            <ArrowRight className="w-5 h-5 text-[#b00d1e] rotate-90 md:rotate-0" />
          </div>
        </div>

        {/* Cinema Ticket */}
        <div
          className={`flex justify-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div
            onClick={handleTicketClick}
            className="relative cursor-pointer group"
            style={{ perspective: '1000px' }}
          >
            {/* Ticket container */}
            <div
              className={`relative flex transition-transform duration-700 ${
                isRevealed ? 'translate-x-8 md:translate-x-16' : 'translate-x-0'
              }`}
            >
              {/* Main ticket part */}
              <div className="relative bg-[#c3505c] text-[#f8dee2] px-8 py-8 md:px-12 md:py-10 w-64 md:w-80">
                {/* Ticket header */}
                <div className="border-b border-[#f8dee2]/30 pb-4 mb-4">
                  <h3
                    className="font-display text-2xl md:text-3xl tracking-widest text-center"
                    style={{ fontWeight: 500 }}
                  >
                    КИНОБИЛЕТ
                  </h3>
                </div>

                {/* Ticket fields */}
                <div className="space-y-3 font-body text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Дата:</span>
                    <span>14 февраля 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Время:</span>
                    <span>19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Фильм:</span>
                    <span>Наша любовь</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Ряд:</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Место:</span>
                    <span>Рядом с тобой</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Стоимость:</span>
                    <span>Бесценно</span>
                  </div>
                </div>

                {/* Decorative corner cuts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f8dee2] rounded-full" />
              </div>

              {/* Tear-off stub */}
              <div
                className={`relative bg-[#c3505c] border-l-2 border-dashed border-[#f8dee2]/50 px-4 py-8 md:px-6 md:py-10 w-20 md:w-24 flex flex-col items-center justify-center transition-all duration-700 ${
                  isRevealed ? '-translate-x-2 rotate-[-5deg]' : ''
                }`}
              >
                {/* Barcode lines */}
                <div className="flex gap-[2px] h-24 md:h-32">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#f8dee2] w-[2px]"
                      style={{
                        height: `${40 + Math.random() * 60}%`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>

                {/* Decorative corner cuts */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f8dee2] rounded-full" />
              </div>
            </div>

            {/* Shadow under ticket */}
            <div
              className="absolute -bottom-4 left-4 right-4 h-8 bg-black/10 blur-xl rounded-full -z-10 transition-all duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
