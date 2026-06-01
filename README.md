# 💌 Site de Declaração de Amor

Site romântico interativo construído como experiência narrativa de scroll. Conta a história de um casal através de 5 capítulos, com animações scroll-driven, interações táteis (rasgar ingresso, tocar vinil) e efeitos sonoros gerados proceduralmente.

---

## 🎬 Visão Geral

O site é uma **história linear de scroll** dividida em 5 capítulos:

| Capítulo | Seções | Pergunta Central |
|---|---|---|
| **1 — O Convite** | `SceneConvite` | "Você aceita entrar?" |
| **2 — O Começo** | `OpeningText → PhotoSection → CinemaTicket → MomentsGallery` | "Lembra como tudo começou?" |
| **3 — Nossa História** | `HeartbeatSection` | "Olha quantos momentos…" |
| **4 — Quem Somos** | `BeforeWeMet → TravelSection → PlaylistSection` | "Somos mais do que tempo…" |
| **5 — O Futuro** | `ThankYouSection` | "E agora, o que vem?" |

---

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| **React** | 19 | UI declarativa (componentes, hooks, estado) |
| **TypeScript** | 5.x | Tipagem estática |
| **Vite** | 7.x | Bundler, dev server, build production |
| **Tailwind CSS** | 3.x | Estilização utility-first |
| **GSAP + ScrollTrigger** | 3.x | Animações complexas scroll-driven |
| **shadcn/ui** | latest | Biblioteca de componentes de UI (boilerplate) |
| **Lucide React** | latest | Ícones SVG |

---

## 📁 Organização do Código

```
src/
├── main.tsx                 # Ponto de entrada — monta React no DOM
├── App.tsx                  # Diretor de orquestra: estados globais + ordem das seções
├── App.css                  # CSS legado (substituído pelo Tailwind)
├── index.css                # CSS global: fontes, Tailwind directives, keyframes, variáveis
│
├── scenes/                  # Telas que controlam o FLUXO narrativo
│   └── SceneConvite.tsx     # Tela cheia com coração pulsante. Recebe `onEnter`
│                            #   → Som procedural (vinil, heartbeat, piano)
│                            #   → Partículas de coração (Canvas 2D)
│                            #   → Transição suave para o conteúdo principal
│
├── sections/                # Blocos de CONTEÚDO que compõem a história
│   ├── OpeningText.tsx      # Headline "Esse site é um pequeno lembrete…"
│   ├── PhotoSection.tsx     # Polaroid gigante com washi tape, grayscale→color no scroll
│   ├── CinemaTicket.tsx     # Ingresso realista com círculos de corte, som de rasgar
│   ├── MomentsGallery.tsx   # Linha do tempo vertical com 5 marcos cronológicos
│   ├── HeartbeatSection.tsx # Coração pulsando, contador de tempo com stagger
│   ├── BeforeWeMet.tsx      # Foto de infância + citação
│   ├── TravelSection.tsx    # Foto de viagem, grayscale→color scroll-driven
│   ├── PlaylistSection.tsx  # Vinil giratório, equalizador, lista de tracks
│   └── ThankYouSection.tsx  # Fechamento, assinatura, coração
│
├── components/              # Componentes reutilizáveis
│   ├── NoiseOverlay.tsx     # Textura de ruído fixa sobre TUDO (z-index 9999)
│   └── ui/                  # 50+ componentes shadcn/ui (gerados automaticamente)
│       ├── button.tsx
│       ├── card.tsx
│       └── ...              # Boilerplate — não usados ativamente no site
│
├── hooks/
│   └── use-mobile.ts        # Detecta viewport mobile/tablet
│
├── lib/
│   └── utils.ts             # `cn()` — merge de classes Tailwind (shadcn)
│
└── pages/
    └── Home.tsx             # Página principal (renderiza <App />)

public/
└── images/                  # Assets estáticos (copiados cru pro dist/)
    ├── childhood/
    ├── gallery/
    ├── hero/
    ├── popup/
    └── travel/

notas/                       # Storyboards e planejamento (não é código)
├── plano-analise-capitulos.md
├── storyboard-capitulo1.md
├── storyboard-capitulo2.md
├── storyboard-capitulo3.md
└── storyboard-capitulo4.md
```

---

## 🧠 Padrões Arquiteturais

### 1. State Lifting

Estado compartilhado entre irmãos sobe para o pai (`App.tsx`):

```tsx
// App.tsx
const [historiaIniciada, setHistoriaIniciada] = useState(false);

<CinemaTicket onRasgar={() => setHistoriaIniciada(true)} />
<MomentsGallery ativa={historiaIniciada} />
```

`CinemaTicket` dispara `onRasgar` → `App` atualiza estado → `MomentsGallery` reage à prop `ativa`.

### 2. Seções Autopropulsadas

Cada seção detecta sozinha quando entra na viewport e dispara suas animações:

```tsx
export default function NomeDaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animações GSAP disparadas quando isVisible muda
  useEffect(() => { if (!isVisible) return; /* ... */ }, [isVisible]);

  return <section ref={sectionRef}>...</section>;
}
```

**Vantagem:** seções são ilhas independentes. Reordenar no `App.tsx` não quebra nada.

### 3. Scroll-Driven Animations (GSAP ScrollTrigger)

Fotos que ganham cor, timelines que crescem, polaroids que aparecem — tudo ligado ao scroll:

```tsx
gsap.to(element, {
  filter: 'grayscale(0)',
  scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 30%', scrub: true }
});
```

**Regra:** nunca use `hover:grayscale-0` como única forma de interação. Mobile não tem hover.

### 4. Bordas Rasgadas SVG

Transição entre seções de cores diferentes usa SVG inline com `preserveAspectRatio="none"`:

```tsx
<div className="absolute bottom-0 left-0 right-0">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12" fill="#c3505c">
    <path d="M0,30 Q30,5 60,25 T120,15 ..." />
  </svg>
</div>
```

**Regra:** nunca use `maskImage` com raster (`efeito-papel-1.webp`) — cria faixas de cor indesejadas.

### 5. Som Procedural (Web Audio API)

Todos os sons são gerados em tempo real (não arquivos de áudio):
- Ruido branco + lowpass filter = som de rasgar papel
- Oscilador sine + rampa exponencial = batida cardíaca
- Buffer aleatório = chiado de vinil
- Oscilador square curto = máquina de escrever

**Vantagem:** sem assets de áudio, nenhum problema de CORS/autoplay, tamanho de build menor.

### 6. Paleta de Cores Restrita

| Cor | Uso |
|---|---|
| `#faf5f0` | Fundo creme (seções de contemplação: OpeningText, Photo, CinemaTicket, MomentsGallery, BeforeWeMet) |
| `#c3505c` | Fundo vermelho (seções de emoção: Heartbeat, Travel, Playlist) |
| `#f8dee2` | Tom de rosa claro (texto em fundo vermelho, decorações) |
| `#b00d1e` | Vermelho escuro (acentos, destaques de texto) |
| `#f5f0e8` | Creme mais quente (transições suaves) |

---

## 🎨 Fluxo de Cores (de cima pra baixo)

```
#faf5f0 creme     (SceneConvite)
  ↓ rasga SVG
#c3505c vermelho   (OpeningText)
  ↓ rasga SVG
#faf5f0 creme      (PhotoSection → CinemaTicket → MomentsGallery)
  ↓ rasga SVG
#c3505c vermelho   (HeartbeatSection)
  ↓ rasga SVG
#faf5f0 creme      (BeforeWeMet)
  ↓ rasga SVG
#c3505c vermelho   (TravelSection → PlaylistSection)
  ↓ rasga SVG
#f8dee2 rosa       (ThankYouSection)
```

---

## 🚀 Scripts

| Comando | Função |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Vite, HMR) |
| `npm run build` | Build de produção (`tsc` + `vite build`) |
| `npm run preview` | Preview do build local |
| `npm run lint` | ESLint |

---

## 📦 Dependências Principais

```json
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "gsap": "^3.12.7",
  "lucide-react": "^0.474.0",
  "tailwindcss": "^3.4.17",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.0.1"
}
```

---

## 📝 Notas para Desenvolvedores

- **Não edite arquivos em `src/components/ui/` manualmente.** São gerados pelo shadcn. Se precisar de um novo componente, use `npx shadcn add [componente]`.
- **Todas as imagens reais do casal estão em `public/images/`.** Não importe no código — referencie diretamente pelo path `/images/...`.
- **Sons são procedurais.** Para adicionar um novo som, crie uma função no `SceneConvite.tsx` (ou copie o padrão de `playHeartbeat`) usando Web Audio API.
- **Mobile primeiro.** Todas as animações devem funcionar sem hover. Use `ScrollTrigger` com `scrub: true` ao invés de `:hover`.
- **Reduced motion.** Todas as animações GSAP devem respeitar `prefers-reduced-motion: reduce`.

---

## 🎓 Convenções de Código

1. **Seções exportam `default function` com o nome do arquivo.**
2. **Props são interfaces comentadas.**
3. **Cores usam valores arbitrários Tailwind** (`bg-[#c3505c]`) para manter a paleta restrita.
4. **Animações usam GSAP** (não CSS transitions inline) para controle preciso.
5. **Refs nomeados como `sectionRef`, `heartRef`, `lineRef`** — semântica clara.

---

*Construído com amor, GSAP e muito café.*
