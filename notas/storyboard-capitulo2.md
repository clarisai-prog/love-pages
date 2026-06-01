# 🎬 STORYBOARD — CAPÍTULO 2: O COMEÇO

Baseado nas decisões: Costura vermelho→creme (borda SVG) · Ingresso rasga e **inicia a linha do tempo** · 5 momentos cronológicos · Revelação **scroll-driven** · Mobile redesenhado

> **Propósito narrativo:** fazer o visitante sentir que, ao rasgar o ingresso, *o filme da história começa a passar* — e cada cena que sobe é uma memória real, em ordem no tempo.

---

## 🎞️ A METÁFORA QUE COSTURA O CAPÍTULO

O ingresso diz `ADMIT ONE — A NOSSA HISTÓRIA`. Rasgar o canhoto = **a sessão começa**. De baixo do ingresso "se desenha" um fio vertical (cordão de scrapbook / tira de filme) e as **5 memórias se fixam nele, uma a uma, conforme ela rola** — é a linha do tempo. Isso transforma 3 telas soltas (foto → ingresso → galeria) em **um único movimento contínuo** sobre papel creme.

Fluxo de cor depois das mudanças:
`#c3505c` vermelho (OpeningText) → **rasga direto no creme** → `#faf5f0` creme contínuo (PhotoSection · CinemaTicket · Linha do Tempo) → volta ao vermelho no HeartbeatSection.

---

## CENA 2.1 — A COSTURA (entrada no capítulo)

**Objetivo:** sair do vermelho do convite e entrar no creme da história sem "pulo" de cor.

### Visual
- Hoje a borda inferior usa `efeito-papel-1.webp`, que tem **rosa `#f8dee2` embutido** → cria a faixa rosa indesejada (aparece em OpeningText, PhotoSection e MomentsGallery).
- **Troca:** borda rasgada em **SVG inline** (mesmo padrão da [TravelSection:96](src/sections/TravelSection.tsx#L96)), com `fill` = cor da **próxima** seção.
  - OpeningText → fill `#faf5f0` (rasga direto no creme).
  - Aplicar a mesma técnica nas 3 costuras → fim da faixa rosa em todo o site.

### Som
- Nenhum (transição silenciosa).

### Mobile
- SVG `preserveAspectRatio="none"`, altura `h-10 md:h-16` — escala sem distorcer.

---

## CENA 2.2 — A FOTO QUE EU OLHO (PhotoSection)

**Objetivo:** primeira batida íntima do capítulo — uma polaroid sobre o creme.

### Copy
- Legenda manuscrita (mantém o tom, levemente mais pessoal):
  > "A foto que eu olho quando bate saudade de você"

### Visual
- Polaroid branca + washi tape (mantém). Foto `couple-main.jpg`.

### Interação — **corrige o bug do hover (mobile)**
- Hoje a cor só aparece no `hover` ([PhotoSection:52](src/sections/PhotoSection.tsx#L52)) → morto no touch.
- **Novo:** a foto entra **P&B** e ganha cor conforme entra na viewport (ScrollTrigger `grayscale(1)→grayscale(0)`, scrub). Funciona igual em desktop e mobile.

### Som
- Nenhum.

### Mobile
- Polaroid `max-w` reduzido, legenda 16px, sem hover.

---

## CENA 2.3 — O INGRESSO (CinemaTicket)

**Objetivo:** o objeto-convite. Bonito, físico, com um chamado claro pra rasgar.

### Copy (refinamento — tira o genérico)
| Campo | Hoje | Storyboard |
|---|---|---|
| Headline | "você lembra como tudo começou?" | manter |
| MOVIE | `NOSSO AMOR` | `A NOSSA HISTÓRIA` |
| Instrução | "Toque na parte destacável do ingresso" | "Rasga aqui pra começar o filme" |
| SEAT | `AO SEU LADO` | manter (é ótimo) |

### Visual
- **Fundo da seção:** `#f8dee2` → **`#faf5f0`** ([CinemaTicket:83](src/sections/CinemaTicket.tsx#L83)).
- **Círculos de corte:** `bg-[#f8dee2]` → **`bg-[#faf5f0]`** (linhas [210](src/sections/CinemaTicket.tsx#L210) e [259](src/sections/CinemaTicket.tsx#L259)) — senão o "buraco" fica rosa contra o creme.
- **Bug:** textura `fixed inset-0` → **`absolute inset-0`** ([linha 86](src/sections/CinemaTicket.tsx#L86)) pra não vazar pras outras seções.
- Corpo do ingresso `#c3505c`, tinta `#f8dee2`, barcode, corner cuts — **mantidos** (o audit elogiou).

### Som
- Rasgar procedural (já existe) — mantido.

---

## CENA 2.4 — O RASGAR (o gatilho)

**Objetivo:** o clímax interativo. O gesto que liga o ingresso à história.

### Sequência (timeline GSAP disparada no rasgar)
1. **0,0s** — som de rasgar + canhoto gira e "voa" com leve física (`rotate -8°`, `x +40`, `y +20`, `opacity`).
2. **0,2s** — corpo do ingresso desliza pro lado e sobe um pouco, abrindo espaço.
3. **0,3s** — **fio vertical "se desenha"** de cima pra baixo (linha SVG, `scaleY 0→1` com `transform-origin: top`).
4. A partir daí, o controle passa pro **scroll** (Cena 2.5).

### Arquitetura (componentes irmãos)
- Subir estado pro [App.tsx](src/App.tsx): `historiaIniciada`.
- `CinemaTicket` recebe `onRasgar()` → `App` seta `true` → `LinhaDoTempo` recebe `ativa`.
- **Fallback:** se rolar sem rasgar, a timeline ativa sozinha ao entrar na viewport (ninguém fica preso).

### Som
- Rasgar (0,4s) + um leve "swish" quando o fio se desenha.

### Mobile
- `onClick` já cobre o toque. Canhoto voa numa amplitude menor (telas pequenas).

---

## CENA 2.5 — A LINHA DO TEMPO (substitui o grid da MomentsGallery)

**Objetivo:** as 5 memórias sobem em ordem, no ritmo dela. O coração do capítulo.

### Estrutura — 5 marcos cronológicos
> Datas placeholder (você troca pelas reais). A 1ª ecoa o "Nosso dia 13" do Cap 1.

| # | Data | Legenda | Foto |
|---|---|---|---|
| 1 | **13 out 2019** | "onde tudo começou" | *placeholder* (reuso `polaroid-left.jpg` até você mandar a foto do 1º encontro) |
| 2 | **abr 2021** | "nosso primeiro piquenique" | `gallery/moment-1.jpg` |
| 3 | **jan 2022** | "o pôr do sol que a gente não esquece" | `gallery/moment-2.jpg` |
| 4 | **set 2022** | "jantar improvisado, noite perfeita" | `gallery/moment-3.jpg` |
| 5 | **jun 2023** | "café do outro lado do mundo" | `gallery/moment-4.jpg` |

### Visual
- Fundo **creme `#faf5f0`** (MomentsGallery sai do rosa `#f8dee2`, [linha 55](src/sections/MomentsGallery.tsx#L55)).
- **Fio vertical** central (desktop: alterna polaroids esquerda/direita; mobile: tudo à direita do fio).
- Cada marco = polaroid levemente rotacionada + **data em mono** (eco do ingresso) + legenda manuscrita.
- Título: "Nossos momentos" → **"E o filme começou a passar…"** (liga à metáfora do ingresso).

### Interação — **scroll-driven**
- Seção **pinada**; conforme rola, cada marco entra em **stagger**: `y 40→0`, `rotate ±5°→±2°`, `opacity 0→1`, `grayscale 1→0`.
- O fio "cresce" acompanhando o scroll (scrub), conectando os marcos.
- Termina ao desembocar no HeartbeatSection.

### Som
- Opcional: um "tick" sutil de projetor a cada marco que entra.

### 📱 Mobile (redesenho)
- **Sem pin/scrub pesado:** no mobile a timeline é **vertical empilhada**, fio à esquerda, marcos revelando em `IntersectionObserver`/ScrollTrigger leve (sem travar o scroll).
- Polaroids largura ~80vw, 1 por vez; data acima, legenda abaixo.
- Stagger só de `opacity`+`y` (sem rotação 3D) pra manter 60fps.

---

## 🎨 SISTEMA VISUAL DO CAPÍTULO 2

| Elemento | Cor | Uso |
|---|---|---|
| Fundo do capítulo | `#faf5f0` | creme contínuo (foto → ingresso → timeline) |
| Vermelho | `#c3505c` | OpeningText, corpo do ingresso |
| Tinta clara | `#f8dee2` | texto sobre o ingresso, barcode |
| Títulos / datas | `#b00d1e` | headline e marcadores de data |
| Fio da timeline | `#c3505c` 60% | cordão que conecta as memórias |

### Tipografia
- Display: Cormorant Garamond (legendas manuscritas, títulos).
- Datas: mono (eco do ingresso) — tracking largo.

### Animações (timing / easing)
| Evento | Animação | Duração | Easing |
|---|---|---|---|
| Costura SVG | estática | — | — |
| Foto ganha cor | grayscale 1→0 | scrub | linear (scrub) |
| Canhoto voa | rotate/x/y/opacity | 0,6s | power3.out |
| Fio se desenha | scaleY 0→1 | 0,5s | power2.out |
| Marco entra | y 40→0, rotate, opacity, grayscale | 0,7s cada, stagger 0,15s | power3.out |
| Fio cresce | scaleY scrub | scroll | linear |

---

## 🛠️ STACK TÉCNICA

- **GSAP + ScrollTrigger** (já em `gsap@3.15.0` — sem dependência nova). Substitui o `IntersectionObserver`+CSS, alinhando com o Cap 1.
- **Estado em App.tsx** (`historiaIniciada`) ligando CinemaTicket → LinhaDoTempo.
- **Borda SVG** reaproveitando o padrão da TravelSection.
- **Lenis** (smooth scroll global): opcional, 1 dependência — fica pra uma fase posterior.
- **`prefers-reduced-motion`:** timeline já montada, sem pin/scrub.

---

## ✅ CHECKLIST ANTI-AI-SLOP

- [x] 3+ pontos de interação? → rasgar, scroll-reveal da timeline, foto ganhando cor no scroll
- [x] Hook em 3s? → "Rasga aqui pra começar o filme"
- [x] Mobile projetado? → timeline vertical empilhada, sem pin pesado, sem hover
- [x] Som intencional? → rasgar + swish do fio (+ tick opcional)
- [x] Tipografia conta história? → mono nas datas (eco do ingresso), Cormorant nas memórias
- [x] Paleta evolui? → fim do rosa solto; vermelho → creme contínuo → vermelho
- [x] CTA único? → "Rasga aqui"
- [x] Zero genérico? → copy refinado + 5 marcos datados
- [x] Segredo/eco? → 1ª data "13 out 2019" conversa com o "Nosso dia 13" do Cap 1

---

## ⚠️ O QUE EU PRECISO DE VOCÊ (não bloqueia começar)

1. **Foto do 1º encontro** (marco 1) — enquanto não vier, uso `polaroid-left.jpg` como placeholder.
2. **Datas reais** dos 5 marcos (estão como placeholder).
3. **Legendas** — refinei pra tirar o genérico; me diga se quer trocar por algo que "só vocês dois entendem".

---

## 🚀 PRÓXIMO PASSO

**Aprova este storyboard?**
- **"Aprovo"** → implemento na ordem: (1) cor+bugs → (2) estado no App → (3) reveal GSAP → (4) ScrollTrigger+timeline → (5) polish mobile.
- **"Ajusta [o quê]"** → ex.: "menos marcos", "timeline horizontal", "outro título".

---

*Baseado em: Experience Strategist · storyboard do Cap 1 · scrapbook físico (papel rasgado, washi, polaroid) · revelação scroll-driven estilo LoveTale.*
