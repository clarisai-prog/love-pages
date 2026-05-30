import { useEffect, useRef, useState } from 'react';
import { Pause, Heart } from 'lucide-react';

const tracks = [
  { id: 1, title: 'Seus olhos', artist: 'Nosso amor', duration: '3:14' },
  { id: 2, title: 'Sob o céu a dois', artist: 'Verão com você', duration: '4:02' },
  { id: 3, title: 'Meu coração', artist: 'Eu e você', duration: '3:48' },
  { id: 4, title: 'Caminho para casa', artist: 'Nossos sonhos', duration: '3:55' },
  { id: 5, title: 'Para sempre', artist: 'Promessa', duration: '4:20' },
];

export default function PlaylistSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleTrackClick = (id: number) => {
    if (activeTrack === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(id);
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#c3505c] py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#f8dee3]"
            style={{ fontWeight: 500 }}
          >
            Nossa playlist
          </h2>
          <p className="mt-4 font-body text-sm md:text-base text-[#f8dee3]/70 max-w-lg mx-auto leading-relaxed">
            Cada música é um momento que vivemos juntos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Vinyl Player */}
          <div
            className={`flex flex-col items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Vinyl record */}
              <div
                className={`w-full h-full rounded-full bg-[#1a1a1a] shadow-2xl flex items-center justify-center relative overflow-hidden ${
                  isPlaying ? 'vinyl-spin' : ''
                }`}
              >
                {/* Grooves */}
                <div className="absolute inset-3 rounded-full border border-[#333333]/60" />
                <div className="absolute inset-6 rounded-full border border-[#333333]/60" />
                <div className="absolute inset-10 rounded-full border border-[#333333]/60" />
                <div className="absolute inset-14 rounded-full border border-[#333333]/60" />
                <div className="absolute inset-20 rounded-full border border-[#333333]/60" />

                {/* Label */}
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#f8dee2] flex items-center justify-center shadow-inner relative z-10">
                  <Heart
                    className="w-12 h-12 md:w-14 md:h-14 text-[#c3505c] fill-[#c3505c]"
                    strokeWidth={0}
                  />
                </div>

                {/* Center hole */}
                <div className="absolute w-3 h-3 bg-[#1a1a1a] rounded-full z-20" />
              </div>

              {/* Tone arm decoration */}
              <div
                className="absolute -top-2 right-2 w-3 h-36 bg-[#d4af37] rounded-full shadow-lg"
                style={{ transformOrigin: 'bottom center', transform: 'rotate(25deg)' }}
              />
              <div className="absolute top-0 right-0 w-10 h-10 bg-[#d4af37] rounded-full shadow-md flex items-center justify-center">
                <div className="w-3 h-3 bg-[#8a6e1a] rounded-full" />
              </div>
            </div>

            {/* Equalizer */}
            {isPlaying && (
              <div className="mt-8 flex items-end justify-center gap-[3px] h-10">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] bg-[#f8dee3] rounded-full eq-bar"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      height: '20%',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Active track info */}
            {activeTrack !== null && (
              <div className="mt-6 text-center">
                <p className="font-display text-xl md:text-2xl text-[#f8dee3]">
                  {tracks.find((t) => t.id === activeTrack)?.title}
                </p>
                <p className="font-body text-sm text-[#f8dee3]/60 mt-1">
                  {tracks.find((t) => t.id === activeTrack)?.artist}
                </p>
              </div>
            )}
          </div>

          {/* Track list */}
          <div
            className={`space-y-3 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {tracks.map((track) => {
              const isActive = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => handleTrackClick(track.id)}
                  className={`w-full group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left border ${
                    isActive
                      ? 'bg-[#f8dee2]/20 border-[#f8dee2]/30 shadow-lg scale-[1.02]'
                      : 'bg-[#f8dee2]/5 border-transparent hover:bg-[#f8dee2]/10 hover:border-[#f8dee2]/10'
                  }`}
                >
                  {/* Number / Pause */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f8dee2]/20 text-[#f8dee3] shrink-0 transition-all duration-300">
                    {isActive && isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <span className="font-body text-sm">{track.id}</span>
                    )}
                  </div>

                  {/* Track info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-display text-lg leading-tight transition-colors duration-300 ${
                        isActive ? 'text-[#f8dee3]' : 'text-[#f8dee3]/90'
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="font-body text-xs text-[#f8dee3]/50 mt-0.5">
                      {track.artist}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="font-body text-xs text-[#f8dee3]/40 shrink-0">
                    {track.duration}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-6 h-6 opacity-20 animate-pulse">
        <svg viewBox="0 0 24 24" fill="#f8dee2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="absolute bottom-24 left-10 w-8 h-8 opacity-15">
        <svg viewBox="0 0 32 32" fill="#f8dee2">
          <path d="M16 28.5l-1.9-1.7C7.2 21.5 3 17.7 3 13c0-3.3 2.5-5.8 5.8-5.8 2.3 0 4.4 1.1 5.7 2.8 1.3-1.7 3.4-2.8 5.7-2.8 3.3 0 5.8 2.5 5.8 5.8 0 4.7-4.2 8.5-10.1 13.8L16 28.5z" />
        </svg>
      </div>

      {/* Washi tape */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-7 opacity-70 rotate-[-3deg]"
        style={{
          background:
            'repeating-linear-gradient(45deg, #f4a6b5 0px, #f4a6b5 5px, #e8889a 5px, #e8889a 6px)',
        }}
      />

      {/* Bottom torn edge */}
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
    </section>
  );
}
