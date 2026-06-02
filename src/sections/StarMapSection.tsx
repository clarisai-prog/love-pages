import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   StarMapSection — Capítulo poético do céu noturno
   Fundo escuro #0d0d0f com estrelas piscantes, constelação
   de coração e coordenadas da noite em que tudo começou.
   ═══════════════════════════════════════════════════════════ */

interface Star {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  blinkDelay: number;
  blinkDuration: number;
}

/* 70 estrelas espalhadas proceduralmente — seed fixo para
   consistência entre renders (evita flicker hidratação SSR).  */
function generateStars(count = 70): Star[] {
  const stars: Star[] = [];
  // Pseudo-random com seed simples para reprodutibilidade
  let seed = 42;
  const rnd = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    stars.push({
      cx: rnd() * 100,
      cy: rnd() * 100,
      r: 0.5 + rnd() * 1.5,
      opacity: 0.3 + rnd() * 0.7,
      blinkDelay: rnd() * 4,
      blinkDuration: 2 + rnd() * 3,
    });
  }
  return stars;
}

/* Coordenadas da constelação de coração (viewBox 0 0 100 100).
   8 pontos principais conectados por curvas de Bezier.        */
const CORACAO_PONTOS = [
  { x: 50, y: 18, label: 'α' },   // topo
  { x: 28, y: 32, label: 'β' },  // topo-esquerdo externo
  { x: 18, y: 55, label: 'γ' },  // lateral esquerda
  { x: 50, y: 85, label: 'δ' },  // ponta inferior
  { x: 82, y: 55, label: 'ε' },  // lateral direita
  { x: 72, y: 32, label: 'ζ' },  // topo-direito externo
  { x: 50, y: 40, label: 'η' },  // centro (indentação topo)
];

const CORACAO_PATH =
  'M50,18 ' +
  'C28,32 18,55 50,85 ' +
  'C82,55 72,32 50,18 ' +
  'M50,18 C42,28 38,35 50,40 ' +
  'C62,35 58,28 50,18 Z';

export default function StarMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => generateStars(70), []);
  const reduce = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /* GSAP reveal — conteúdo emerge suavemente ao entrar na viewport */
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    if (reduce) {
      gsap.set(content.children, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const children = content.children;
    gsap.set(children, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 25%',
        scrub: true,
      },
    });

    tl.to(children, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0d0d0f' }}
    >
      {/* ── Transição suave do creme/rosa para o escuro ── */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="nightFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#faf5f0" />
              <stop offset="40%" stopColor="#c3505c" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0d0d0f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="120" fill="url(#nightFade)" />
        </svg>
      </div>

      {/* ── Campo de estrelas (SVG) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#ffffff"
            opacity={reduce ? s.opacity : undefined}
          >
            {!reduce && (
              <animate
                attributeName="opacity"
                values={`${s.opacity * 0.3};${s.opacity};${s.opacity * 0.3}`}
                dur={`${s.blinkDuration}s`}
                begin={`${s.blinkDelay}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </svg>

      {/* ── Constelação de coração ── */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <svg
          viewBox="0 0 100 100"
          className="w-64 h-64 md:w-80 md:h-80 mx-auto drop-shadow-[0_0_30px_rgba(195,80,92,0.35)]"
          aria-label="Constelação de coração"
          role="img"
        >
          {/* Linhas conectando os pontos da constelação */}
          <path
            d={CORACAO_PATH}
            fill="none"
            stroke="#c3505c"
            strokeWidth="0.4"
            strokeDasharray="1.5 1"
            opacity="0.7"
          />

          {/* Estrelas da constelação (pontos brilhantes) */}
          {CORACAO_PONTOS.map((p) => (
            <g key={p.label}>
              <circle
                cx={p.x}
                cy={p.y}
                r="1.8"
                fill="#faf5f0"
                opacity="0.95"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="#c3505c"
                opacity="0.25"
              />
              <text
                x={p.x + 3}
                y={p.y - 2}
                fontSize="3"
                fill="#faf5f0"
                opacity="0.6"
                fontFamily="monospace"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── Conteúdo textual ── */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 mt-8 md:mt-12 max-w-xl mx-auto"
      >
        {/* Título cursivo */}
        <h2
          className="font-script text-3xl md:text-4xl lg:text-5xl leading-relaxed"
          style={{ color: '#f8dee2', fontWeight: 500 }}
        >
          O céu da noite em que tudo começou
        </h2>

        {/* Data */}
        <p
          className="mt-4 font-mono text-xs md:text-sm tracking-[0.25em] uppercase"
          style={{ color: 'rgba(248,222,226,0.5)' }}
        >
          14 de fevereiro de 2023
        </p>

        {/* Coordenadas no rodapé do mapa */}
        <div
          className="mt-8 inline-block border-t border-b py-2 px-4"
          style={{
            borderColor: 'rgba(195,80,92,0.3)',
            color: 'rgba(248,222,226,0.4)',
          }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em]">
            SÃO PAULO &nbsp;•&nbsp; 14 FEV 2023 &nbsp;•&nbsp; 23:42
          </p>
        </div>
      </div>

      {/* ── Estrelas cadentes decorativas (só reduced-motion off) ── */}
      {!reduce && (
        <>
          <div
            className="absolute top-[15%] left-[10%] w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-0 animate-[shootingStar_4s_ease-out_infinite_2s]"
            style={{ transform: 'rotate(-45deg)' }}
          />
          <div
            className="absolute top-[25%] right-[15%] w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-0 animate-[shootingStar_5s_ease-out_infinite_7s]"
            style={{ transform: 'rotate(-45deg)' }}
          />
        </>
      )}

      {/* ── Borda inferior rasgada → preto contínuo para MoonPhase ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-16"
          fill="#0d0d0f"
        >
          <path d="M0,30 Q30,5 60,25 T120,15 T180,28 T240,10 T300,22 T360,8 T420,26 T480,12 T540,24 T600,10 T660,20 T720,6 T780,25 T840,14 T900,22 T960,8 T1020,26 T1080,12 T1140,20 T1200,5 T1260,24 T1320,15 T1380,22 T1440,10 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
