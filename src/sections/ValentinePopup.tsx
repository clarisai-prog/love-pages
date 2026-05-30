import { useEffect, useState, useRef } from 'react';
import { Heart } from 'lucide-react';

interface ValentinePopupProps {
  onClose: () => void;
}

export default function ValentinePopup({ onClose }: ValentinePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const heartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  const handleHeartClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Create mini heart burst
    if (heartContainerRef.current) {
      const container = heartContainerRef.current;
      const count = 12;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 360;
        const distance = 80 + Math.random() * 60;
        const tx = Math.cos((angle * Math.PI) / 180) * distance;
        const ty = Math.sin((angle * Math.PI) / 180) * distance;

        const mini = document.createElement('div');
        mini.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#f8dee2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        mini.className = 'mini-heart';
        mini.style.left = '50%';
        mini.style.top = '50%';
        mini.style.setProperty('--tx', `${tx}px`);
        mini.style.setProperty('--ty', `${ty}px`);
        container.appendChild(mini);
      }

      // Clean up mini hearts after animation
      setTimeout(() => {
        container.querySelectorAll('.mini-heart').forEach((el) => el.remove());
      }, 1000);
    }

    // Close popup after heart opens
    setTimeout(handleClose, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[100000] flex items-center justify-center bg-[#f8dee2] transition-all duration-500 ${
        isVisible && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Left Polaroid */}
        <div
          className={`absolute left-[5%] md:left-[10%] top-[15%] transition-all duration-1000 delay-300 ${
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
          {/* Washi tape image */}
          <img
            src="/images/popup/washi-tape.png"
            alt="Fita decorativa"
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 opacity-80 rotate-[-15deg] object-cover pointer-events-none"
          />
        </div>

        {/* Right Polaroid */}
        <div
          className={`absolute right-[5%] md:right-[10%] bottom-[15%] transition-all duration-1000 delay-500 ${
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
          {/* Washi tape image */}
          <img
            src="/images/popup/washi-tape.png"
            alt="Fita decorativa"
            className="absolute -bottom-2 right-1/4 w-20 h-6 opacity-80 rotate-[20deg] object-cover pointer-events-none"
          />
        </div>

        {/* Title */}
        <div
          className={`text-center z-10 transition-all duration-1000 delay-200 ${
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

        {/* Heart Button */}
        <button
          onClick={handleHeartClick}
          disabled={isOpening}
          className={`mt-12 relative z-10 group transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="relative" ref={heartContainerRef}>
            <Heart
              className={`w-32 h-32 md:w-40 md:h-40 text-[#c3505c] fill-[#c3505c] transition-transform duration-300 group-hover:scale-110 ${
                isOpening ? 'heart-opening' : ''
              }`}
              strokeWidth={0}
            />
            <span
              className={`absolute inset-0 flex items-center justify-center text-[#f8dee2] font-body text-sm md:text-base tracking-wide transition-opacity duration-300 ${
                isOpening ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Toque
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
