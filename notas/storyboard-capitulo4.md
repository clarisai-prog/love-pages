# 🎬 Storyboard — Capítulo 4: Quem Somos

## Visão Geral

Este capítulo responde à pergunta: *"Somos mais do que tempo... quem somos nós, além dos momentos?"*

Organizado cronologicamente da origem ao presente:
1. **Antes de nos conhecermos** — de onde viemos
2. **Descobrindo novos lugares** — o que construímos juntos
3. **Nossa playlist** — o que nos define agora

---

## CENA 4.1 — A Origem
**Seção:** `BeforeWeMet`
**Transição:** HeartbeatSection (vermelho) → rasga para creme via borda SVG no BeforeWeMet

### Propósito Narrativo
> *"Mostrar que o amor não começou no primeiro encontro — começou muito antes, em duas vidas que ainda não se tocaram."*

### Direção Visual

- **Fundo:** `#faf5f0` creme (consistência com a paleta do site, elimina faixa rosa solta)
- **Texto:** `#c3505c` vermelho
- **Foto:** Moldura vintage com `sepia-[0.3]`, washi tape, rotação sutil
- **Atmosfera:** Nostalgia suave, infância

### Copy (mantido)
> *antes de nos conhecermos*
> *Éramos apenas crianças...*
> *Éramos apenas crianças, sem saber que um dia seríamos o mais importante "nós" na vida um do outro*
> *"Toda história de amor é linda, mas a nossa é a minha favorita"*

### Interação
- Entrada: foto desliza da esquerda, texto da direita, stagger de 200ms/400ms
- Sem interação ativa — é uma cena de contemplação

### Mobile
- Grid empilhado (foto em cima, texto embaixo)
- Foto ocupa largura total

---

## CENA 4.2 — As Viagens
**Seção:** `TravelSection`
**Transição:** BeforeWeMet (creme) → rasga para vermelho via borda SVG inferior do BeforeWeMet

### Propósito Narrativo
> *"Mostrar que construímos memórias não só no tempo, mas no espaço."*

### Direção Visual

- **Fundo:** `#c3505c` vermelho (continuidade com HeartbeatSection)
- **Texto:** `#f8dee2` rosa claro
- **Foto:** Viagem em P&B que ganha cor no scroll (mobile-friendly)
- **Washi tape:** decorativa no topo da foto

### Copy (mantido)
> *Descobrindo novos lugares*
> *Eu amo viajar com você de carro, porque você sempre está pronto para ir a qualquer lugar que eu queira*

### Interação & Motion
- **Entrada:** foto da esquerda, texto da direita, delay 300ms
- **Revelação de cor:** foto começa em `grayscale(1)` e ganha cor gradualmente conforme o usuário scrolla (`scrub: true`, `start: 'top 80%'`, `end: 'top 30%'`)
- Funciona em mobile (sem dependência de hover)

### Mobile
- Grid empilhado
- Washi tape reduzido proporcionalmente

---

## CENA 4.3 — A Trilha Sonora
**Seção:** `PlaylistSection`
**Transição:** TravelSection (vermelho) → continua vermelho (mesma cor, sem borda necessária)

### Propósito Narrativo
> *"Cada música é um momento que vivemos juntos."*

### Direção Visual

- **Fundo:** `#c3505c` vermelho
- **Vinil:** Disco escuro girando quando "tocando" (`vinyl-spin` CSS animation)
- **Label:** `#f8dee2` rosa com coração
- **Lista:** Cards minimalistas com hover/active states

### Interação
- **Clique na track:** ativa/desativa "tocando"
- **Vinil gira** quando `isPlaying`
- **Equalizador** anima quando `isPlaying`
- **Card ativo:** fundo mais claro, scale sutil

### Mobile
- Vinil reduzido para 64vw máximo
- Lista de tracks em largura total
- Equalizador mais compacto

---

## CENA 4.4 — A Costura (saída)

PlaylistSection tem borda rasgada SVG inferior para `#f8dee2` (rosa), preparando o terreno para o Capítulo 5 (`ThankYouSection`).

---

## Mudanças Aplicadas

| Arquivo | Mudança | Motivo |
|---|---|---|
| `App.tsx` | Reordenação: BeforeWeMet → TravelSection → PlaylistSection | Cronologia: infância → viagens → música |
| `BeforeWeMet.tsx` | Fundo `#f8dee2` → `#faf5f0` | Elimina faixa rosa solta no meio do site |
| `BeforeWeMet.tsx` | Texto `#b00d1e` → `#c3505c` | Consistência de paleta no creme |
| `BeforeWeMet.tsx` | Adiciona borda SVG inferior `fill="#c3505c"` | Transição suave para vermelho |
| `TravelSection.tsx` | `hover:grayscale-0` → GSAP scroll-scrubbed grayscale | Funciona em mobile |
| `TravelSection.tsx` | Remove borda inferior SVG | PlaylistSection é vermelho também (mesma cor) |
| `TravelSection.tsx` | Alt text russo → português | Acessibilidade |
| `BeforeWeMet.tsx` | Alt text russo → português | Acessibilidade |

---

## Próximo Passo

Seguir para o **Capítulo 5 — O Futuro** (`ThankYouSection`) quando o usuário quiser.
