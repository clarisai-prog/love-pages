import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   TelaDestino — Modo Destino / Signos
   Carta de compatibilidade astrológica entre os dois signos.
   Fundo creme #faf5f0, tipografia romântica, barra animada.
   ═══════════════════════════════════════════════════════════ */

interface SignoData {
  nome: string;
  emoji: string;
  data: string;
}

const SIGNOS: Record<string, SignoData> = {
  aries:     { nome: 'Áries',     emoji: '♈', data: '21 mar – 19 abr' },
  touro:     { nome: 'Touro',     emoji: '♉', data: '20 abr – 20 mai' },
  gemeos:    { nome: 'Gêmeos',    emoji: '♊', data: '21 mai – 20 jun' },
  cancer:    { nome: 'Câncer',    emoji: '♋', data: '21 jun – 22 jul' },
  leao:      { nome: 'Leão',      emoji: '♌', data: '23 jul – 22 ago' },
  virgem:    { nome: 'Virgem',    emoji: '♍', data: '23 ago – 22 set' },
  libra:     { nome: 'Libra',     emoji: '♎', data: '23 set – 22 out' },
  escorpiao: { nome: 'Escorpião', emoji: '♏', data: '23 out – 21 nov' },
  sagitario: { nome: 'Sagitário', emoji: '♐', data: '22 nov – 21 dez' },
  capricornio:{ nome: 'Capricórnio', emoji: '♑', data: '22 dez – 19 jan' },
  aquario:   { nome: 'Aquário',   emoji: '♒', data: '20 jan – 18 fev' },
  peixes:    { nome: 'Peixes',    emoji: '♓', data: '19 fev – 20 mar' },
};

/* Dados do casal — ajustar conforme necessário.
   signoCriador: quem construiu o site (data de nascimento)
   signoDestinatario: quem recebe a declaração */
const CONFIG = {
  titulo: 'Compatibilidade',
  signoCriador: 'aquario' as const,
  signoDestinatario: 'libra' as const,
  score: 87,
  leitura:
    'A combinação de Aquário e Libra traz equilíbrio entre paixão e harmonia. ' +
    'Vocês se completam como o céu e o mar — um sonhador, o outro poeta. ' +
    'Juntos, escrevem constelações que ninguém mais consegue ler.',
};

export default function TelaDestino() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const criador = SIGNOS[CONFIG.signoCriador];
  const destinatario = SIGNOS[CONFIG.signoDestinatario];
  const reduce = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const bar = barRef.current;
    const score = scoreRef.current;
    const text = textRef.current;
    if (!section || !card || !bar || !score || !text) return;

    const triggers: ScrollTrigger[] = [];

    if (reduce) {
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      gsap.set(bar, { scaleX: 1 });
      gsap.set(score, { opacity: 1 });
      gsap.set(text.children, { opacity: 1, y: 0 });
      return;
    }

    /* Card flutua para cima e aparece */
    gsap.set(card, { opacity: 0, y: 50, scale: 0.96 });
    const cardReveal = gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 35%',
        scrub: true,
      },
    });
    if (cardReveal.scrollTrigger) triggers.push(cardReveal.scrollTrigger);

    /* Barra de progresso preenche */
    gsap.set(bar, { transformOrigin: 'left center', scaleX: 0 });
    const barAnim = gsap.to(bar, {
      scaleX: CONFIG.score / 100,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 60%',
        end: 'top 30%',
        scrub: true,
      },
    });
    if (barAnim.scrollTrigger) triggers.push(barAnim.scrollTrigger);

    /* Score aparece */
    gsap.set(score, { opacity: 0 });
    const scoreAnim = gsap.to(score, {
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 50%',
        end: 'top 25%',
        scrub: true,
      },
    });
    if (scoreAnim.scrollTrigger) triggers.push(scoreAnim.scrollTrigger);

    /* Texto revela em stagger */
    gsap.set(text.children, { opacity: 0, y: 20 });
    const textReveal = gsap.to(text.children, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 45%',
        end: 'top 15%',
        scrub: true,
      },
    });
    if (textReveal.scrollTrigger) triggers.push(textReveal.scrollTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: '#faf5f0' }}
    >
      {/* ── Carta de compatibilidade ── */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg mx-auto px-6"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Moldura estilo carta/postal */}
        <div
          className="relative bg-white p-8 md:p-12 shadow-xl"
          style={{
            boxShadow:
              '0 1px 1px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.06)',
          }}
        >
          {/* Washi tape decorativa — topo */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 opacity-80 rotate-[-4deg]"
            style={{
              background:
                'repeating-linear-gradient(45deg, #f8dee2 0px, #f8dee2 5px, #c3505c 5px, #c3505c 6px)',
            }}
            aria-hidden="true"
          />

          {/* Título */}
          <h2
            className="text-center font-display text-3xl md:text-4xl text-[#b00d1e] tracking-wide"
            style={{ fontWeight: 500 }}
          >
            {CONFIG.titulo}
          </h2>

          {/* Signos + coração */}
          <div className="mt-10 flex items-center justify-center gap-4 md:gap-6">
            {/* Signo criador */}
            <div className="text-center">
              <span
                className="block text-4xl md:text-5xl"
                role="img"
                aria-label={`Signo ${criador.nome}`}
              >
                {criador.emoji}
              </span>
              <span className="block mt-2 font-body text-sm text-[#c3505c] tracking-wide uppercase">
                {criador.nome}
              </span>
              <span className="block mt-1 font-mono text-[10px] text-[#c3505c]/50">
                {criador.data}
              </span>
            </div>

            {/* Coração */}
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-[#c3505c]"
                viewBox="0 0 48 48"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 42.5l-2.9-2.6C14.4 30.8 8 25.6 8 19c0-5 3.8-8.5 8.5-8.5 3 0 5.8 1.4 7.5 3.6 1.7-2.2 4.5-3.6 7.5-3.6C36.2 10.5 40 14 40 19c0 6.6-6.4 11.8-13.1 20.9L24 42.5z" />
              </svg>
            </div>

            {/* Signo destinatário */}
            <div className="text-center">
              <span
                className="block text-4xl md:text-5xl"
                role="img"
                aria-label={`Signo ${destinatario.nome}`}
              >
                {destinatario.emoji}
              </span>
              <span className="block mt-2 font-body text-sm text-[#c3505c] tracking-wide uppercase">
                {destinatario.nome}
              </span>
              <span className="block mt-1 font-mono text-[10px] text-[#c3505c]/50">
                {destinatario.data}
              </span>
            </div>
          </div>

          {/* Score + barra */}
          <div className="mt-10 text-center">
            <span
              ref={scoreRef}
              className="font-mono text-4xl md:text-5xl text-[#b00d1e] tracking-tight"
              style={{ fontWeight: 600 }}
            >
              {CONFIG.score}%
            </span>

            {/* Barra de progresso */}
            <div className="mt-4 mx-auto w-full max-w-xs h-3 rounded-full bg-[#f8dee2] overflow-hidden">
              <div
                ref={barRef}
                className="h-full rounded-full"
                style={{
                  width: '100%',
                  backgroundColor: '#c3505c',
                  willChange: 'transform',
                }}
              />
            </div>

            {/* Marcadores sutis */}
            <div className="mt-2 flex justify-between max-w-xs mx-auto px-1">
              <span className="font-mono text-[9px] text-[#c3505c]/40">0%</span>
              <span className="font-mono text-[9px] text-[#c3505c]/40">100%</span>
            </div>
          </div>

          {/* Texto da leitura */}
          <div ref={textRef} className="mt-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#c3505c]/30" />
              <svg
                className="w-4 h-4 text-[#c3505c]/30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="w-8 h-[1px] bg-[#c3505c]/30" />
            </div>

            <p
              className="font-display text-base md:text-lg italic leading-relaxed text-[#c3505c]/80 max-w-sm mx-auto"
              style={{ fontWeight: 400 }}
            >
              “{CONFIG.leitura}”
            </p>
          </div>
        </div>

        {/* Sombra sob a carta */}
        <div className="absolute -bottom-6 left-6 right-6 h-8 bg-black/8 blur-xl rounded-full -z-10" />
      </div>

      {/* ── Decorativos flutuantes ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        {/* Estrela canto superior direito */}
        <div className="absolute top-12 right-12 w-6 h-6 opacity-15">
          <svg viewBox="0 0 24 24" fill="#c3505c">
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
          </svg>
        </div>
        {/* Lua canto inferior esquerdo */}
        <div className="absolute bottom-20 left-10 w-8 h-8 opacity-10">
          <svg viewBox="0 0 24 24" fill="#c3505c">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
