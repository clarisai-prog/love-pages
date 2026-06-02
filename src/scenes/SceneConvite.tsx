import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SceneConviteProps {
  onEnter: () => void;
}

export default function SceneConvite({ onEnter }: SceneConviteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const heartWrapperRef = useRef<HTMLDivElement>(null);
  const textParaVoceRef = useRef<HTMLParagraphElement>(null);
  const textSegredoRef = useRef<HTMLParagraphElement>(null);
  const textClicaRef = useRef<HTMLParagraphElement>(null);
  const setaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [exploded, setExploded] = useState(false);

  // Audio context refs
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Init audio
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play vinyl crackle
  const playVinylCrackle = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.03 * (1 - i / bufferSize);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 0.08;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  };

  // Play heartbeat
  const playHeartbeat = (bpm: number = 60) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(50, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.1);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.5);

    // Schedule next beat
    setTimeout(() => {
      if (!exploded) playHeartbeat(bpm);
    }, (60 / bpm) * 1000);
  };

  // Play simple ambient piano (procedural)
  const playAmbientPiano = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const notes = [261.63, 329.63, 392.0, 523.25]; // C, E, G, C
    let noteIndex = 0;
    const playNote = () => {
      if (exploded) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[noteIndex % notes.length], t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.04, t + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 3);
      noteIndex++;
      setTimeout(playNote, 3500 + Math.random() * 2000);
    };
    setTimeout(playNote, 2000);
  };

  // Play click/swish
  const playClickSound = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;
    // Wind swish
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2)) * 0.1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(t);
  };

  // Typewriter sound
  const playTypewriterSound = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);
    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  };

  // Heart confetti explosion
  const explodeHearts = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      life: number;
    }[] = [];

    const colors = ['#c3505c', '#f8dee2', '#b00d1e', '#e8889a'];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.5;
      const speed = 4 + Math.random() * 8;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 8 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        life: 1,
      });
    }

    let frame = 0;
    const animate = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.98;
        p.life -= 0.012;
        p.rotation += p.rotSpeed;

        ctx2d.save();
        ctx2d.translate(p.x, p.y);
        ctx2d.rotate(p.rotation);
        ctx2d.globalAlpha = p.life;
        ctx2d.fillStyle = p.color;

        // Draw heart shape
        const s = p.size;
        ctx2d.beginPath();
        ctx2d.moveTo(0, s / 4);
        ctx2d.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 4);
        ctx2d.bezierCurveTo(-s / 2, s / 2, 0, s, 0, s);
        ctx2d.bezierCurveTo(0, s, s / 2, s / 2, s / 2, s / 4);
        ctx2d.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
        ctx2d.fill();

        ctx2d.restore();
      });

      if (alive && frame < 180) {
        frame++;
        requestAnimationFrame(animate);
      } else {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  };

  // Main animation timeline
  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /* Reduced-motion: tudo visível instantaneamente */
    if (reduce) {
      if (heartWrapperRef.current) {
        gsap.set(heartWrapperRef.current, { scale: 1, opacity: 1 });
      }
      [textParaVoceRef, textSegredoRef, textClicaRef, setaRef].forEach(
        (ref) => {
          if (ref.current) gsap.set(ref.current, { opacity: 1, y: 0, scale: 1 });
        }
      );
      return;
    }

    const tl = gsap.timeline({ delay: 0.5 });

    // 1. Heart grows from 12px to 240px
    if (heartWrapperRef.current) {
      gsap.set(heartWrapperRef.current, { scale: 0.05 });
      tl.to(heartWrapperRef.current, {
        scale: 1,
        duration: 8,
        ease: 'power2.out',
      });
    }

    // 2. Text "Para você" appears when heart reaches ~48px (1.5s)
    if (textParaVoceRef.current) {
      tl.fromTo(
        textParaVoceRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
        1.5
      );
    }

    // 3. Secret "Nosso dia 13" appears when heart reaches ~120px (4s)
    if (textSegredoRef.current) {
      tl.fromTo(
        textSegredoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        4
      );
    }

    // 4. Text "Clica no meu coração" appears when heart reaches ~240px (6s)
    if (textClicaRef.current) {
      tl.fromTo(
        textClicaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        6.5
      );
    }

    // 5. Seta sinalizando
    if (setaRef.current) {
      tl.fromTo(
        setaRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.8, ease: 'power2.out' },
        7
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Heartbeat animation synced
  useEffect(() => {
    if (exploded) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduce) return;

    const interval = setInterval(() => {
      if (heartRef.current) {
        gsap.fromTo(
          heartRef.current,
          { scale: 1 },
          { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
        );
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [exploded]);

  const handleHeartClick = () => {
    if (exploded) return;
    initAudio();
    playClickSound();
    playVinylCrackle();
    playHeartbeat(60);
    playAmbientPiano();
    setExploded(true);

    // Explode particles
    explodeHearts();

    // Fade out heart and texts
    if (heartWrapperRef.current) {
      gsap.to(heartWrapperRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    [textParaVoceRef, textSegredoRef, textClicaRef, setaRef].forEach((ref) => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
        });
      }
    });

    // Background transition
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundColor: '#f5f0e8',
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }

    // Show main content after typewriter completes (~4.2s) + reading time
    setTimeout(() => {
      onEnter();
    }, 6000);
  };

  // Typewriter effect for the Opening Text (after transition)
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Esse site é um pequeno lembrete\nde como eu te amo muito';

  useEffect(() => {
    if (!exploded) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /* Reduced-motion: texto completo instantaneamente */
    if (reduce) {
      setTypewriterText(fullText);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        if (index > 0 && index % 3 === 0) {
          playTypewriterSound();
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [exploded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#faf5f0' }}
    >
      {/* Canvas for heart particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Heart wrapper */}
      <div
        ref={heartWrapperRef}
        className="relative flex flex-col items-center justify-center will-change-transform cursor-pointer"
        onClick={handleHeartClick}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[280px] h-[280px] rounded-full opacity-40 blur-3xl"
            style={{ backgroundColor: '#c3505c' }}
          />
        </div>

        {/* Heart SVG */}
        <svg
          ref={heartRef}
          className="w-60 h-60 relative z-10 will-change-transform"
          viewBox="0 0 48 48"
          fill="#c3505c"
        >
          <path d="M24 42.5l-2.9-2.6C14.4 30.8 8 25.6 8 19c0-5 3.8-8.5 8.5-8.5 3 0 5.8 1.4 7.5 3.6 1.7-2.2 4.5-3.6 7.5-3.6C36.2 10.5 40 14 40 19c0 6.6-6.4 11.8-13.1 20.9L24 42.5z" />
        </svg>

        {/* Secret text inside heart */}
        <p
          ref={textSegredoRef}
          className="absolute inset-0 flex items-center justify-center font-display text-lg md:text-xl text-[#f8dee2] italic opacity-0 pointer-events-none select-none"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)', fontWeight: 500 }}
        >
          Nosso dia 13
        </p>
      </div>

      {!exploded && (
        <>
          {/* Text: Para você */}
          <p
            ref={textParaVoceRef}
            className="mt-8 font-display text-sm md:text-base text-[#c3505c] italic tracking-wide opacity-0"
          >
            Para você, com todo o meu amor
          </p>

          {/* Text: Clica no meu coração */}
          <p
            ref={textClicaRef}
            className="mt-4 font-display text-lg md:text-xl text-[#b00d1e] tracking-wide opacity-0"
            style={{ fontWeight: 500 }}
          >
            Clica no meu coração
          </p>

          {/* Seta animada apontando para o coração */}
          <div ref={setaRef} className="mt-3 opacity-0">
            <svg
              className="w-8 h-8 text-[#b00d1e] animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </div>
        </>
      )}

      {/* Typewriter text (appears after explosion) */}
      {exploded && (
        <div className="absolute bottom-24 left-0 right-0 text-center px-6 z-40">
          <p
            className="font-display text-2xl md:text-4xl text-[#b00d1e] leading-relaxed whitespace-pre-line"
            style={{ fontWeight: 500 }}
          >
            {typewriterText}
            <span className="inline-block w-[3px] h-[1em] bg-[#b00d1e] ml-1 animate-pulse" />
          </p>
        </div>
      )}

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}
