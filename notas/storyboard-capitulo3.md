# 🎬 Storyboard — Capítulo 3: Nossa História

## Visão Geral

Este capítulo acontece **imediatamente após a Linha do Tempo** (MomentsGallery). A proposta é fazer o visitante parar, respirar, e sentir o peso do tempo — não como estatística, mas como batida de coração.

Do creme (`#faf5f0`) da timeline, rasgamos de volta para o vermelho (`#c3505c`). É o momento emocional mais intenso do site até aqui.

---

## CENA 3.1 — A Batida
**Seção:** `HeartbeatSection`
**Transição:** Borda rasgada SVG já existe (MomentsGallery → vermelho)

### Propósito Narrativo
> *"Fazer o visitante sentir que o tempo não passou — ele acumulou."*

A Linha do Tempo mostrou *quando*. Esta seção responde: *"e desde então, quanto?"*

### Direção Visual

- **Fundo:** `#c3505c` vermelho profundo, saturado
- **Textura:** Mesma textura de papel/pó do capítulo 2, agora com um leve brilho/rosa (`#f8dee2`) para dar calor
- **Elemento central:** Coração SVG grande que pulsa em loop — não é decoração, é o *motor* da cena
- **Tipografia:** Display serif, cor `#f8dee3`, com contador em tamanho heroico

### Copy

**Headline (entrada):**
> *celebrando mais um*
> *momento nosso*

**Contador (revelado em sequência):**
> *4 anos,*
> *5 meses,*
> *5 dias ao seu lado*

**Fecho:**
> *e eu sigo feliz por viver isso com você.*

### Interação & Motion

1. **Entrada:**
   - Headline desliza de baixo com `translate-y-8 → 0`, opacity, 1s
   - Coração aparece com `scale(0.5) → scale(1)`, opacity, com delay 300ms

2. **Coração pulsando (loop infinito):**
   - GSAP `yoyo: true`, `repeat: -1`
   - `scale: 1 → 1.08 → 1`
   - `duration: 1.2s` (batida cardíaca ~50bpm, calma)
   - Easing: `sine.inOut`

3. **Contador com stagger:**
   - "4 anos," aparece primeiro (delay 500ms após headline)
   - "5 meses," aparece segundo (delay +400ms)
   - "5 dias ao seu lado" aparece terceiro (delay +400ms)
   - Cada linha: `opacity 0 → 1`, `translate-y-4 → 0`

4. **Batida sutil no fundo:**
   - A cada pulso do coração, um `box-shadow` ou gradiente overlay muda de opacidade 0.02 → 0.06
   - Cria a sensação de que o *fundo* também respira

5. **Fecho:**
   - Aparece com fade suave após o contador completo

### Mobile
- Coração reduzido para ~120px vs 200px desktop
- Contador em 2-3 linhas conforme espaço
- Pulso mais sutil (scale 1 → 1.04) para não gastar bateria
- Remove sombra pulsante no fundo se impactar performance

---

## CENA 3.2 — A Costura (saída)

Nenhuma borda rasgada necessária aqui — a transição para o Cap 4 (TravelSection, creme) será feita via borda SVG na seção seguinte.

---

## Assets Necessários

| Asset | Status | Nota |
|---|---|---|
| Textura de papel/pó | ✅ Reutilizar do capítulo 2 |
| Coração SVG | ✅ Já existe no código (decoração) — promover a elemento central |
| Fonte Display | ✅ Já carregada |

---

## Próximo Passo

- [ ] Aprovar copy do contador (datas reais?)
- [ ] Aprovar ritmo da batida (1.2s = calmo, 0.8s = acelerado)
- [ ] Implementar no `HeartbeatSection.tsx`
