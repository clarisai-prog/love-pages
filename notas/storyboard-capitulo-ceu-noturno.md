# 🎬 STORYBOARD — CAPÍTULO POÉTICO: O CÉU DAQUELA NOITE

Duas seções novas inseridas entre **PlaylistSection** e **ThankYouSection**, criando uma **pausa dramática** de fundo escuro no meio do scrapbook claro.

---

## 🌌 SEÇÃO 1: STARMAPSECTION — "O céu da noite em que tudo começou"

### Propósito narrativo
A história pausa. O visitante olha para cima e vê exatamente o céu que existia na noite em que tudo começou. É um momento de **perspectiva cósmica** — o amor deles é pequeno diante das estrelas, mas as estrelas foram testemunhas.

### Copy
- **Título:** "O céu da noite em que tudo começou" (Dancing Script, `#f8dee2`)
- **Data:** "14 de fevereiro de 2023" (mono, opacidade 50%)
- **Coordenadas:** "SÃO PAULO • 14 FEV 2023 • 23:42" (mono tracking largo, borda `#c3505c` 30%)

### Visual
- **Fundo:** `#0d0d0f` (preto azulado profundo)
- **Transição superior:** gradiente SVG suave de `#faf5f0` → `#c3505c` → transparente, criando ponte a partir do PlaylistSection claro
- **Estrelas:** 70 círculos SVG brancos com posições seed-fixas (reprodutíveis), piscando via SMIL `<animate>` (opacidade oscilando)
- **Constelação de coração:** 8 pontos (α–ζ, η) conectados por path SVG tracejado (`strokeDasharray="1.5 1"`), cor `#c3505c` 70%. Cada ponto tem glow duplo (centro branco + halo rosado)
- **Estrelas cadentes:** 2 raios de luz decorativos (`shootingStar` keyframe CSS), ângulo -45°, delay 2s e 7s
- **Borda inferior:** SVG rasgada `fill="#0d0d0f"` (transparência para próxima seção escura)

### Interação
- **Scroll-driven:** conteúdo emerge em stagger (opacity 0→1, y 30→0) via GSAP ScrollTrigger scrub
- **Reduced-motion:** estrelas ficam estáticas (sem piscar), estrelas cadentes desaparecem, reveal é instantâneo

### Som
- Nenhum (silêncio intencional — só o olhar para o céu)

### Mobile
- Constelação encolhe para w-64 h-64
- Título mantém 3xl
- Estrelas cadentes escondidas em telas < 768px (performance)

---

## 🌕 SEÇÃO 2: MOONPHASESECTION — "A lua era assim cheia naquela noite"

### Propósito narrativo
**Echo emocional.** Depois de ver as estrelas, o visitante encontra a lua — o corpo celeste mais próximo, mais íntimo. A frase final conecta o céu com os olhos do amado.

### Copy
- **Título:** "A lua era assim cheia naquela noite" (Dancing Script, `#f8dee2`)
- **Frase final:** "E quando eu olho pra ela hoje, ainda vejo o reflexo dos seus olhos" (Cormorant italic, opacidade 45%)

### Visual
- **Fundo:** `#0d0d0f` contínuo (sem costura com StarMapSection)
- **Lua:** SVG 200×200 viewBox
  - Gradiente radial: `#fdf6f0` (centro) → `#e8ddd4` → `#b8aea6` → `#9e958e` (borda)
  - 10 crateras: círculos `#8a827b` opacity 35%
  - Sombra esférica: path preto opacity 8% no limiar direito
  - **Glow:** CSS `drop-shadow(0 0 40px rgba(248,222,226,0.25)) drop-shadow(0 0 80px rgba(195,80,92,0.15))`
- **Pulso contínuo:** GSAP `scale 1 ↔ 1.03`, 4s, `sine.inOut`, infinito
- **Transição inferior:** SVG rasgada `fill="#faf5f0"` — retorna ao creme do ThankYouSection

### Interação
- **Scroll-driven:** lua emerge (opacity 0→1, scale 0.85→1) via ScrollTrigger scrub; texto emerge em stagger
- **Pulso:** inicia após reveal completar
- **Reduced-motion:** lua estática (sem pulso), reveal instantâneo

### Som
- Nenhum

### Mobile
- Lua w-48 → md:w-72 → lg:w-96
- Crateras mantêm proporção (viewBox 200×200 escala automaticamente)

---

## 🎨 SISTEMA VISUAL DO CAPÍTULO POÉTICO

| Elemento | Cor | Uso |
|---|---|---|
| Fundo | `#0d0d0f` | céu noturno contínuo |
| Texto principal | `#f8dee2` | títulos, frases |
| Constelação / glow | `#c3505c` | coração no céu, halos |
| Lua | `#fdf6f0` → `#9e958e` | gradiente realista |
| Crateras | `#8a827b` 35% | detalhes lunares |
| Transição superior | gradiente | ponte do creme ao escuro |
| Transição inferior | `#faf5f0` | retorno ao creme final |

### Tipografia
- **Títulos:** Dancing Script 400-700 (cursiva romântica)
- **Datas/coordenadas:** Monospace, tracking 0.2-0.25em
- **Frase final:** Cormorant Garamond italic, weight 400

### Animações
| Evento | Animação | Duração | Easing |
|---|---|---|---|
| Estrelas piscam | SMIL opacity oscillate | 2-5s | linear |
| Estrela cadente | translate + opacity | 4-5s | ease-out |
| Constelação reveal | stagger opacity/y | scrub | power2.out |
| Lua emerge | opacity + scale | scrub | power2.out |
| Lua pulsa | scale 1↔1.03 | 4s loop | sine.inOut |
| Texto stagger | opacity + y | scrub | power3.out |

---

## 🛠️ STACK TÉCNICA

- **GSAP ScrollTrigger** para reveal de ambas as seções
- **SVG inline** para estrelas, constelação e lua (leve, escalável)
- **SMIL `<animate>`** para piscar das estrelas (não CSS — evita recálculos de layout)
- **CSS keyframe** para estrelas cadentes (`shootingStar`)
- **CSS filter drop-shadow** para glow da lua
- **Gradiente SVG** para transição suave superior

---

## ✅ CHECKLIST ANTI-AI-SLOP

- [x] Mobile projetado? → Sim (lua escala, constelação reduz, cadentes escondidas)
- [x] Reduced-motion? → Sim (estrelas estáticas, sem cadentes, sem pulso)
- [x] Paleta evolui? → Sim — creme → escuro → creme (arco dramático)
- [x] Zero genérico? → Sim (data real, coordenadas reais, frase pessoal)
- [x] Acessibilidade? → `role="img"`, `aria-label`, textos não decorativos em contraste OK
- [x] Performance? → SVG inline (sem imagens), 70 estrelas máximo, 2 cadentes

---

## 📍 POSIÇÃO NA NARRATIVA

```
... PlaylistSection (creme) →
  [transição gradiente suave] →
  StarMapSection (escuro) →
  MoonPhaseSection (escuro) →
  [borda rasgada #faf5f0] →
  ThankYouSection (creme)
```

O escuro funciona como **respiração** antes do fechamento emocional. O visitante desce do céu e chega ao "Obrigada" com a sensação de ter flutuado.

---

*Criado em: 2026-06-01 | Baseado em especificações da usuária.*
