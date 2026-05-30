import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

interface ValentinePopupProps {
  onClose: () => void;
}

export default function ValentinePopup({ onClose }: ValentinePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [heartScale, setHeartScale] = useState(0.15);
  const [tapOpacity, setTapOpacity] = useState(1);
  const [hasExploded, setHasExploded] = useState(false);
  const [showMinis, setShowMinis] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const heartWrapperRef = useRef<HTMLDivElement>(null);

  const miniHearts = Array.from({ length: 12 });
  const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    const popup = popupRef.current;
    if (!popup) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = popup.scrollTop;
        const maxScroll = popup.scrollHeight - popup.clientHeight;
        if (maxScroll <= 0) return;

        const progress = Math.min(scrollTop / maxScroll, 1);

        /* FASE 1: Coração cresce (0% ~ 60%) */
        let scale: number;
        if (progress <= 0.6) {
          scale = 0.15 + (progress / 0.6) * 3.35; // 0.15 → 3.5
        } else {
          /* FASE 2: Coração encolhe (60% ~ 100%) */
          const shrinkProgress = (progress - 0.6) / 0.4;
          scale = 3.5 - shrinkProgress * 3.35;
        }
        setHeartScale(Math.max(scale, 0.15));

        /* Texto Toque some entre 0% e 15% */
        setTapOpacity(Math.max(1 - progress / 0.15, 0));

        /* FASE 3: Explosão dos mini corações (~45%) */
        if (progress > 0.45 && progress < 0.75 && !hasExploded) {
          setHasExploded(true);
          setShowMinis(true);
          setTimeout(() => setShowMinis(false), 1000);
        }

        /* FASE 4: Fecha popup quando scroll acaba */
        if (progress >= 0.95 && !isClosing) {
          handleClose();
        }

        /* Reset se voltar ao topo */
        if (progress < 0.3 && hasExploded) {
          setHasExploded(false);
        }

        ticking = false;
      });
    };

    popup.addEventListener('scroll', handleScroll, { passive: true });
    return () => popup.removeEventListener('scroll', handleScroll);
  }, [hasExploded, isClosing]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  return (
    <div
      ref={popupRef}
      className={`fixed inset-0 z-[100000] overflow-y-auto overflow-x-hidden bg-[#f8dee2] transition-opacity duration-500 ${
        isVisible && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Barra de progresso */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#b00d1e] z-[100001] transition-none"
        style={{ width: `${Math.min(((popupRef.current?.scrollTop || 0) / ((popupRef.current?.scrollHeight || 1) - (popupRef.current?.clientHeight || 1))) * 100, 100)}%` }}
      />

      {/* Coração principal — fixed no centro */}
      <div
        ref={heartWrapperRef}
        className="fixed top-1/2 left-1/2 z-[100010] pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) scale(${heartScale})`,
          willChange: 'transform',
        }}
      >
        <Heart
          className="w-40 h-40 md:w-48 md:h-48 text-[#c3505c] fill-[#c3505c]"
          strokeWidth={0}
          style={{ filter: 'drop-shadow(0 20px 60px rgba(195, 80, 92, 0.3))' }}
        />
      </div>

      {/* Texto Toque */}
      <div
        className="fixed top-[62%] left-1/2 -translate-x-1/2 z-[100011] pointer-events-none font-body text-lg md:text-xl text-[#b00d1e] tracking-[3px] transition-opacity duration-300"
        style={{ opacity: tapOpacity }}
      >
        Toque
      </div>

      {/* Mini corações — explodem radialmente */}
      {showMinis &&
        miniHearts.map((_, i) => {
          const angle = angles[i % angles.length] * (Math.PI / 180);
          const distance = 80 + Math.random() * 120;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          const scale = 0.5 + Math.random() * 0.5;

          return (
            <div
              key={i}
              className="fixed top-1/2 left-1/2 z-[100009] pointer-events-none"
              style={{
                transform: `translate(-50%, -50%)`,
              }}
            >
              <div
                className="text-[#c3505c]"
                style={{
                  animation: `miniHeartBurst 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  '--scale': scale,
                } as React.CSSProperties}
              >
                <Heart className="w-6 h-6 fill-current" strokeWidth={0} />
              </div>
            </div>
          );
        })}

      {/* Palco de scroll — altura grande para dar "peso" */}
      <div ref={scrollRef} className="relative h-[400vh]">
        {/* Polaroids posicionadas absolutas no palco */}
        {/* Left Polaroid */}
        <div
          className={`absolute left-[5%] md:left-[10%] top-[8%] transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transform: 'rotate(-8deg)' }}
        >
          <div className="polaroid bg-white p-3 pb-10 shadow-lg">
            <div className="w-40 h-48 md:w-52 md:h-60 bg-gray-200 overflow-hidden">
              <img
                src="/images/popup/polaroid-left.jpg"
                alt="Lembrança do casal"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          <img
            src="/images/popup/washi-tape.png"
            alt="Fita decorativa"
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 opacity-80 rotate-[-15deg] object-cover pointer-events-none"
          />
        </div>

        {/* Right Polaroid */}
        <div
          className={`absolute right-[5%] md:right-[10%] top-[25%] transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transform: 'rotate(6deg)' }}
        >
          <div className="polaroid bg-white p-3 pb-10 shadow-lg">
            <div className="w-40 h-48 md:w-52 md:h-60 bg-gray-200 overflow-hidden">
              <img
                src="/images/popup/polaroid-right.jpg"
                alt="Lembrança do casal"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          <img
            src="/images/popup/washi-tape.png"
            alt="Fita decorativa"
            className="absolute -bottom-2 right-1/4 w-20 h-6 opacity-80 rotate-[20deg] object-cover pointer-events-none"
          />
        </div>

        {/* Title */}
        <div
          className={`absolute top-[40%] left-1/2 -translate-x-1/2 text-center z-[100005] transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl text-[#b00d1e] tracking-wide leading-tight"
            style={{ fontWeight: 500 }}
          >
            declaração de amor
          </h1>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#b00d1e] mt-2 tracking-widest uppercase"
            style={{ fontWeight: 500 }}
          >
            para a pessoa amada
          </h2>
        </div>

        {/* Marcadores de scroll */}
        <div className="absolute top-[85%] left-1/2 -translate-x-1/2 text-center">
          <p className="font-body text-sm text-[#b00d1e]/50 tracking-wide animate-bounce">
            Continue rolando ↓
          </p>
        </div>

        {/* Fim do palco — botão para fechar caso scroll não funcione */}
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2">
          <button
            onClick={handleClose}
            className="font-body text-xs text-[#b00d1e]/40 hover:text-[#b00d1e]/70 transition-colors tracking-wide underline underline-offset-4"
          >
            entrar no site
          </button>
        </div>
      </div>
    </div>
  );
}
