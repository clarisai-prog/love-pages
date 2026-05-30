import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100005] flex items-center justify-center bg-[#f8dee2] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="loading-pulse">
        <Heart
          className="w-28 h-28 text-[#c3505c] fill-[#c3505c]"
          strokeWidth={0}
        />
      </div>
    </div>
  );
}
