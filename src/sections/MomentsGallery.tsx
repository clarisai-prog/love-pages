import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MomentsGalleryProps {
  /** Disparada pela rasgada do ingresso (CinemaTicket). */
  ativa?: boolean;
}

// Linha do tempo — 5 marcos cronológicos.
// Datas/legendas são placeholder: trocar pelas reais.
// Marco 1 usa polaroid-left.jpg como placeholder até chegar a foto do 1º encontro.
const momentos = [
  {
    id: 1,
    data: '13 OUT 2019',
    legenda: 'onde tudo começou',
    image: 'images/popup/polaroid-left.jpg',
    rotation: -5,
  },
  {
    id: 2,
    data: 'ABR 2021',
    legenda: 'nosso primeiro piquenique',
    image: 'images/gallery/moment-1.jpg',
    rotation: 4,
  },
  {
    id: 3,
    data: 'JAN 2022',
    legenda: 'o pôr do sol que a gente não esquece',
    image: 'images/gallery/moment-2.jpg',
    rotation: -3,
  },
  {
    id: 4,
    data: 'SET 2022',
    legenda: 'jantar improvisado, noite perfeita',
    image: 'images/gallery/moment-3.jpg',
    rotation: 5,
  },
  {
    id: 5,
    data: 'JUN 2023',
    legenda: 'café do outro lado do mundo',
    image: 'images/gallery/moment-4.jpg',
    rotation: -4,
  },
];

export default function MomentsGallery({ ativa = false }: MomentsGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [iniciado, setIniciado] = useState(false);

  // Início: pela rasgada (ativa) OU quando a seção entra na viewport (fallback)
  useEffect(() => {
    if (ativa) {
      setIniciado(true);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIniciado(true);
      },
      { threshold: 0.05 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [ativa]);

  // Reveal scroll-driven: o fio cresce e cada marco aparece em sequência
  useEffect(() => {
    if (!iniciado) return;
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const triggers: ScrollTrigger[] = [];

    // O fio que conecta as memórias
    if (lineRef.current) {
      if (reduce) {
        gsap.set(lineRef.current, { scaleY: 1 });
      } else {
        gsap.set(lineRef.current, { transformOrigin: 'top center', scaleY: 0 });
        const t = gsap.to(lineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 65%',
            scrub: true,
          },
        });
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      }
    }

    // Cada marco
    itemsRef.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector('img');
      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        if (img) gsap.set(img, { filter: 'grayscale(0)' });
        return;
      }
      gsap.set(el, { opacity: 0, y: 40 });
      const reveal = gsap.to(el, {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 60%',
          scrub: true,
        },
      });
      if (reveal.scrollTrigger) triggers.push(reveal.scrollTrigger);

      if (img) {
        gsap.set(img, { filter: 'grayscale(1)' });
        const color = gsap.to(img, {
          filter: 'grayscale(0)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          },
        });
        if (color.scrollTrigger) triggers.push(color.scrollTrigger);
      }
    });

    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, [iniciado]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#faf5f0' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-4">
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#b00d1e] leading-tight"
            style={{ fontWeight: 500 }}
          >
            E o filme começou a passar…
          </h2>
        </div>

        {/* Subtítulo */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-body text-sm md:text-base text-[#c3505c]/80 max-w-lg mx-auto leading-relaxed">
            Cada cena, uma memória de verdade — na ordem em que aconteceram.
          </p>
        </div>

        {/* Linha do tempo */}
        <div className="relative">
          {/* O fio */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-[#c3505c]/50"
          />

          <div className="space-y-16 md:space-y-28">
            {momentos.map((m, i) => {
              const esquerda = i % 2 === 0;
              return (
                <div
                  key={m.id}
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  className="relative grid md:grid-cols-2 items-center"
                >
                  {/* Marcador na linha */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#c3505c] ring-4 ring-[#faf5f0] z-10" />

                  {/* Polaroid (lado alternado no desktop) */}
                  <div
                    className={`pl-12 md:pl-0 ${
                      esquerda
                        ? 'md:col-start-1 md:pr-12 md:justify-self-end'
                        : 'md:col-start-2 md:pl-12 md:justify-self-start'
                    }`}
                  >
                    <div
                      className="inline-block bg-white p-3 pb-8 shadow-lg"
                      style={{ transform: `rotate(${m.rotation}deg)` }}
                    >
                      <div className="w-48 md:w-60 aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={m.image}
                          alt={m.legenda}
                          className="w-full h-full object-cover"
                          style={{ filter: 'grayscale(1)' }}
                        />
                      </div>
                      <p className="mt-3 text-center font-mono text-[10px] tracking-[0.2em] text-[#b00d1e]/80">
                        {m.data}
                      </p>
                      <p className="text-center font-display italic text-sm text-[#c3505c] mt-1">
                        {m.legenda}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fecho */}
        <div className="text-center mt-16 md:mt-24">
          <p className="font-body text-sm md:text-base text-[#c3505c]/70 max-w-lg mx-auto leading-relaxed">
            E ainda centenas de momentos que eu gostaria de reviver com você, de
            novo e de novo…
          </p>
        </div>
      </div>

    </section>
  );
}
