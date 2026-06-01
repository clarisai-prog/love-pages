# 🎬 STORYBOARD — CAPÍTULO 1: O CONVITE

Baseado nas decisões: Nostalgia + Coração crescendo + Vinil chiando + Confetes + Segredo único

---

## CENA 1.1: A CHEGADA (0–5 segundos)

**Objetivo:** Criar expectativa nostálgica em 3 segundos.

### Copy
- **Headline:** (nenhum — deixar o som falar primeiro)
- **Sub:** "..." (silêncio)

### Visual
- Fundo: `#faf5f0` (creme antigo, papel envelhecido)
- Textura: noise sutil + pontos de papel reciclado
- Centro: apenas o som começa — nenhum elemento visual por 1 segundo
- Depois: um **coração mínimo** (12px) aparece no centro, pulsando em silêncio

### Interação
- Nenhuma ainda. Apenas observar.

### Som
- **Vinil chiando** começa suavemente — loop de 4s de crackle de vinil + ambiente de quarto vazio
- Volume: 15% (sutil, como se alguém tivesse acabado de colocar o disco)

---

## CENA 1.2: O CRESCIMENTO (5–15 segundos)

**Objetivo:** O coração cresce, revelando que há algo vivo aqui.

### Copy
- **Texto sutil (fade-in):** "Para você, com todo o meu amor"
- **Posição:** acima do coração, fonte Cormorant Garamond italic, 14px, `#c3505c`
- **Timing:** aparece quando o coração atinge 48px

### Visual
- Coração: de **12px** → **48px** → **120px** → **240px**
- Cada pulso = crescimento de 20%
- Cor: `#c3505c` (vermelho rosado), preenchido, com leve glow suave
- **Segredo no centro:** quando o coração atinge 120px, aparece uma **data manuscrita** no meio:
  - `"13 de outubro de 2019"`
  - Fonte: cursiva manuscrita (ou `Cormorant Garamond italic`)
  - Cor: `#f8dee2` (contraste suave)
  - Significado: data do início do relacionamento (ou data do primeiro "eu te amo", ou dia que se conheceram — ajustável)

### Interação
- Mouse hover: coração acelera o pulso (de 1.2s para 0.8s por batida)
- Cursor: vira uma **lupa pequena** ou **dedo apontando**

### Som
- Vinil continua chiando
- Adiciona: **batimento cardíaco sutil** (60 BPM) sincronizado com o pulso visual
- Quando o coração cresce, o batimento acelera levemente (60 → 72 BPM)

---

## CENA 1.3: O MOMENTO DA ESCOLHA (15–30 segundos)

**Objetivo:** Convite claro. "Clica em mim."

### Copy
- **Headline:** "Clica no meu coração"
- **Posição:** abaixo do coração
- **Fonte:** Cormorant Garamond, 18px, `#b00d1e`, tracking suave
- **Timing:** aparece quando coração atinge 240px

### Visual
- Coração: **240px**, pulsando com força
- Glow: sombra difusa `#c3505c` com blur 40px
- Seta sutil apontando para o coração (SVG, opacity 0.6, animate-bounce)
- Fundo: transição sutil de `#faf5f0` para `#f8dee2` (rosa blush)

### Interação
- **Hover no coração:** escala 1.1, glow intensifica, cursor = pointer
- **Click:** trigger do evento principal

### Som
- Vinil + batimento continuam
- Hover: **leve swish** (som de seda/vento, 0.3s)

---

## CENA 1.4: A EXPLOSÃO / REVELAÇÃO (clique)

**Objetivo:** A recompensa pelo clique. Transformação emocional.

### Visual — A Explosão
1. **Coração explode** em 20+ partículas de coração (Canvas 2D ou CSS)
2. Cada partícula: cor `#c3505c` ou `#f8dee2`, tamanho 8–24px
3. Trajetória: radial para fora, depois gravidade suave para baixo
4. Duração: 1.2s

### Visual — A Revelação
- Enquanto as partículas caem, o **fundo se transforma**:
  - De `#f8dee2` (rosa blush) → gradiente suave para `#f5f0e8` (papel pardo)
- Emerge a **primeira foto do casal** (PhotoSection original), em preto e branco, com efeito de **revelação de foto Polaroid** (desliza de baixo para cima, com borda branca)
- Sobre a foto: texto aparece em **máquina de escrever** (typewriter effect):
  - `"Esse site é um pequeno lembrete de como eu te amo muito"`

### Interação
- Nenhuma necessária — a experiência é automática após o clique
- O scroll fica desbloqueado após a animação terminar

### Som
- **Explosão:** som de **pétalas/corações flutuando** (wind chime, 0.8s)
- **Revelação:** vinil chiando continua, mas agora com uma **melodia sutil** por baixo (simulada com Web Audio API — um laço de piano suave)
- **Typewriter:** som de máquina de escrever (click-clack suave por letra)

---

## 🎨 SISTEMA VISUAL DO CAPÍTULO 1

### Paleta
| Elemento | Cor | Uso |
|---|---|---|
| Fundo inicial | `#faf5f0` | Creme envelhecido, papel antigo |
| Fundo pós-explosão | `#f8dee2` | Rosa blush, intimidade |
| Coração | `#c3505c` | Vida, pulso, amor |
| Texto | `#b00d1e` | Declaração, importância |
| Data/segredo | `#f8dee2` | Mistério pessoal |
| Glow | `#c3505c` (40% opacity) | Respiração, calor |

### Tipografia
- **Display:** Cormorant Garamond, weight 500, italic para frases curtas
- **Segredo/data:** Cormorant Garamond italic, 14px, tracking 0.05em
- **CTA:** Cormorant Garamond, 18px, uppercase opcional

### Animações
| Evento | Animação | Duração | Easing |
|---|---|---|---|
| Coração cresce | scale(0.05) → scale(1.0) | 8s total | power2.out,分段 |
| Texto "Para você" | opacity 0→1, y 10→0 | 1.5s | power3.out |
| Segredo (data) | opacity 0→1 | 0.8s | power2.inOut |
| Hover coração | scale 1.0→1.1 | 0.3s | elastic.out(1, 0.5) |
| Explosão | partículas radiais + gravidade | 1.2s | power4.out |
| Revelação foto | y 100%→0%, rotate 5°→0° | 1.5s | power3.out |
| Typewriter | 1 letra a cada 80ms | ~4s total | linear |

---

## 🛠️ STACK TÉCNICA SUGERIDA

### HTML/CSS
- Coração: SVG `<path>` com `transform-origin: center`
- Glow: CSS `filter: drop-shadow(0 0 40px rgba(195,80,92,0.4))`
- Partículas: Canvas 2D (leve, performático) ou CSS `position: absolute` com `animation`
- Typewriter: GSAP `SplitText` ou `setInterval` simples com `substring`

### JS
- GSAP para todas as timelines (crescimento do coração, fade-ins, revelação)
- Web Audio API para vinil crackle + batimento + piano
- IntersectionObserver opcional (mas preferível usar GSAP ScrollTrigger para consistência)

### Performance
- Tamanho do coração SVG: ~1KB
- Som gerado proceduralmente: ~0KB de assets
- Partículas: máximo 30 elementos, reutilizáveis

---

## ✅ CHECKLIST ANTI-AI-SLOP PARA ESTE CAPÍTULO

- [x] 3+ pontos de interação? → Sim (hover acelera pulso, clique explode, scroll revela)
- [x] Hook impactante em 3s? → Sim (coração crescendo + vinil chiando)
- [x] Mobile projetado? → Sim (coração central, touch = click, partículas adaptam)
- [x] Som intencional? → Sim (vinil + batimento + pétalas + piano)
- [x] Tipografia conta história? → Sim (Cormorant italic = carta antiga, máquina de escrever = nostalgia)
- [x] Paleta evolui? → Sim (crema → rosa blush → papel pardo)
- [x] CTA único? → Sim — "Clica no meu coração"
- [x] Zero Lorem ipsum? → Sim (copy personalizado)
- [x] Segredo/inside joke? → Sim (data do início do relacionamento no centro do coração)

---

## 💬 NOTA SOBRE O "SEGREDO"

Coloquei `"13 de outubro de 2019"` como placeholder. 

**Você precisa me dizer a data real** (ou substituir por outro segredo):
- Data que começaram a namorar?
- Data do primeiro "eu te amo"?
- Data do primeiro encontro?
- Um número que só vocês entendem?
- Uma frase curta (máx 20 caracteres)?

Isso vai no **centro do coração** e é a primeira coisa que ela vê quando o coração cresce o suficiente. É o **âncora emocional** de toda a experiência.

---

## 🚀 PRÓXIMO PASSO

**Aprova este storyboard?** Responda:
- **"Aprovo"** → Passo para implementação do Capítulo 1 (código)
- **"Ajusta [o quê]"** → Ex: "muda a cor do coração", "troca o segredo", "adiciona fotos no início"
- **"Próxima sessão"** → Pula implementação, vamos para Sessão 2: O Começo

---

*Baseado em: Noomo ValenTime (portal revelação), LoveTale (envelope), Made For You Hub (carta digital), DeclarationOfLove (partículas + glassmorphism), scrapbook físico (papel envelhecido, lacre, carta dobrada).*