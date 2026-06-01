import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface CinemaTicketProps {
  onRasgar?: () => void;
}

export default function CinemaTicket({ onRasgar }: CinemaTicketProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stubRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

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

  // Init audio on user interaction
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Paper tear sound
  const playTearSound = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;

    // White noise burst for tear
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const env = Math.exp(-i / (bufferSize * 0.15));
      data[i] = (Math.random() * 2 - 1) * env * 0.3;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    // Lowpass filter for paper texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, t);
    filter.frequency.linearRampToValueAtTime(800, t + 0.3);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(t);
    source.stop(t + 0.5);
  };

  const handleTicketClick = () => {
    if (isRevealed) return;
    initAudio();
    playTearSound();
    setIsRevealed(true);

    // O canhoto "voa" ao rasgar
    if (
      stubRef.current &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      gsap.to(stubRef.current, {
        x: 48,
        y: 24,
        rotation: -12,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    // Dispara a linha do tempo (Cena 2.5)
    onRasgar?.();
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#faf5f0' }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'multiply',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
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
            você lembra
            <br />
            como tudo começou?
          </h2>
        </div>

        {/* Instruction text */}
        <div
          className={`text-center mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-body text-sm text-[#b00d1e] tracking-wide">
            Rasga aqui pra começar o filme
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
              <div
                className="relative text-[#f8dee2] px-8 py-8 md:px-12 md:py-10 w-64 md:w-80"
                style={{
                  backgroundColor: '#c3505c',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)',
                }}
              >
                {/* Ticket texture overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    mixBlendMode: 'multiply',
                  }}
                />

                {/* Ticket header */}
                <div className="border-b border-[#f8dee2]/30 pb-4 mb-4 relative z-10">
                  <h3
                    className="font-mono text-xl md:text-2xl tracking-[0.2em] text-center uppercase"
                    style={{ fontWeight: 600 }}
                  >
                    ADMIT ONE
                  </h3>
                  <p className="text-center font-mono text-[10px] tracking-widest opacity-60 mt-1">
                    NO REFUNDS • NO EXCHANGES
                  </p>
                </div>

                {/* Ticket fields */}
                <div className="space-y-3 font-mono text-xs md:text-sm relative z-10">
                  <div className="flex justify-between">
                    <span className="opacity-60">DATE:</span>
                    <span className="tracking-wide">14 FEB 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">TIME:</span>
                    <span className="tracking-wide">19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">MOVIE:</span>
                    <span className="tracking-wide">A NOSSA HISTÓRIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">ROW:</span>
                    <span className="tracking-wide">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">SEAT:</span>
                    <span className="tracking-wide">AO SEU LADO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">PRICE:</span>
                    <span className="tracking-wide">INESTIMÁVEL</span>
                  </div>

                  {/* Serial number */}
                  <div className="pt-3 border-t border-[#f8dee2]/20">
                    <p className="text-[9px] tracking-[0.3em] opacity-40 text-center">
                      S/N 0013-0214-2024-∞
                    </p>
                  </div>
                </div>

                {/* Decorative corner cuts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#faf5f0] rounded-full" />
              </div>

              {/* Tear-off stub */}
              <div
                ref={stubRef}
                className="relative border-l-2 border-dashed border-[#f8dee2]/50 px-4 py-8 md:px-6 md:py-10 w-20 md:w-24 flex flex-col items-center justify-center"
                style={{
                  backgroundColor: '#c3505c',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12)',
                }}
              >
                {/* Stub texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    mixBlendMode: 'multiply',
                  }}
                />

                {/* Barcode lines — more realistic */}
                <div className="flex gap-[2px] h-24 md:h-32 relative z-10">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const widths = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 2];
                    return (
                      <div
                        key={i}
                        className="bg-[#f8dee2]"
                        style={{
                          width: `${widths[i]}px`,
                          height: `${35 + Math.random() * 55}%`,
                          opacity: 0.75,
                          marginRight: i % 3 === 0 ? '1px' : '0px',
                        }}
                      />
                    );
                  })}
                </div>

                <p className="mt-3 font-mono text-[8px] tracking-widest opacity-50 text-center relative z-10">
                  TEAR
                  <br />
                  HERE
                </p>

                {/* Decorative corner cuts */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#faf5f0] rounded-full" />
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
