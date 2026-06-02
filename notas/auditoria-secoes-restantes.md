# 🔍 AUDITORIA UNIFICADA — Seções Restantes

**Data:** 2026-06-01
**Seções auditadas:** SceneConvite · OpeningText · PhotoSection · CinemaTicket · ThankYouSection
**Padrão do site:** GSAP ScrollTrigger · prefers-reduced-motion · SVG borders · Paleta 5 cores · A11y

---

## 📊 RESUMO EXECUTIVO

| Seção | Cap | Score | Status | Principal problema |
|---|---|---|---|---|
| **SceneConvite** | 1 | 7.5/10 | ⚠️ Mediana | `prefers-reduced-motion` parcial, texto não escondido em reduce |
| **OpeningText** | 2 | 5.5/10 | 🔴 Ruim | IntersectionObserver + CSS transition (não GSAP), sem SVG border top |
| **PhotoSection** | 2 | 7.0/10 | ⚠️ Mediana | Reveal usa CSS transition (inconsistência), falta `aria-label` na foto |
| **CinemaTicket** | 2 | 7.5/10 | ⚠️ Mediana | `Math.random()` no SSR hidratação, data hardcoded genérica |
| **ThankYouSection** | 5 | 4.0/10 | 🔴 Ruim | CSS transition only, sem SVG borders, sem GSAP, ano corrigido mas fraco |

**Média geral:** 6.3/10

---

## 1️⃣ SCENECONVITE (Cap 1 — O Convite)

### ✅ Pontos fortes
1. **GSAP timeline** para crescimento do coração — power2.out suave
2. **Áudio procedural** completo: vinyl crackle, heartbeat 60bpm, ambient piano, click, typewriter
3. **Canvas 2D** para partículas de coração — performático (40 partículas)
4. **Typewriter effect** com som sincronizado
5. **AudioContext** init apenas após interação do usuário — respeita autoplay policy
6. **Z-index bem gerenciado** (canvas z-50, noise z-60, conteúdo z-10)

### 🔴 Problemas críticos
| # | Problema | Linha | Impacto |
|---|---|---|---|
| 1 | **`exploded` verifica em `setTimeout` do heartbeat** — linha 71 usa `if (!exploded) playHeartbeat(bpm)` dentro de setTimeout. Se o usuário clica exatamente no intervalo, pode tocar um beat "órfão" depois da explosão. | 69-72 | Baixo (race condition rara) |
| 2 | **`prefers-reduced-motion: reduce` NÃO esconde elementos** — o coração ainda cresce (scale 0.05→1 em 8s). Deveria ser instantâneo em reduce. | 229-237 | 🔴 Alto |
| 3 | **Barcodes usam `Math.random()` — hidratação SSR inconsistente** — se houver SSR, o checksum do HTML muda entre server e client. | 259-273 | 🟡 Médio (site é estático, não SSR) |
| 4 | **Nenhuma SVG border** — SceneConvite é fullscreen fixed, então não precisa de border de transição, mas a transição para OpeningText é `backgroundColor` GSAP. Funciona, mas é jump de z-index. | 336-342 | 🟢 Baixo (aceitável para fullscreen overlay) |
| 5 | **Canvas não redimensiona em resize** — `canvas.width = window.innerWidth` roda só no click. Resize depois da explosão não atualiza. | 147-148 | 🟡 Médio |

### 🟡 Melhorias sugeridas
- Adicionar `prefers-reduced-motion` check no `useEffect` da timeline principal: se reduce, `gsap.set(heartWrapperRef.current, { scale: 1, opacity: 1 })` imediatamente
- Adicionar `resize` listener para o canvas
- O `textSegredoRef` mostra "Nosso dia 13" — verificar se isso conversa com a data real do casal

### 🛠️ Fix recomendado
```ts
// No useEffect da timeline principal:
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  gsap.set(heartWrapperRef.current, { scale: 1, opacity: 1 });
  gsap.set([textParaVoceRef, textSegredoRef, textClicaRef, setaRef].current, { opacity: 1 });
  return; // skip timeline
}
```

---

## 2️⃣ OPENINGTEXT (Cap 2 — O Começo)

### ✅ Pontos fortes
1. **Polaroids decorativas** com rotação e washi tape — visual scrapbook autêntico
2. **Borda rasgada SVG inferior** correta (`fill="#faf5f0"` para PhotoSection)
3. **Texto central** bem posicionado com z-10
4. **Scroll indicator** bounce animado

### 🔴 Problemas críticos
| # | Problema | Linha | Impacto |
|---|---|---|---|
| 1 | **IntersectionObserver + CSS transition — INCONSISTENTE com padrão do site** — Todo resto usa GSAP ScrollTrigger. Aqui: IO detecta + `transition-all duration-1000`. Isso cria 2 sistemas de animação diferentes. | 7-23, 42-48 | 🔴🔴 Alto |
| 2 | **Polaroid `style={{ transform: rotate(...) }}` CONFLITA com Tailwind `transition-all`** — O Tailwind aplica `transition-all` na classe, então o `transform` inline também é animado. Isso causa flicker no primeiro render. | 46-47, 69-70 | 🔴 Alto |
| 3 | **Sem `prefers-reduced-motion`** — usuário com reduce ainda vê stagger delay-500/delay-700. | 42, 65 | 🔴 Alto |
| 4 | **Sem SVG border superior** — transição de SceneConvite (fullscreen #f5f0e8) para OpeningText (#c3505c) é brusca. Não há borda rasgada ou gradiente suave. | — | 🟡 Médio |
| 5 | **Alt das polaroids genérico** — "Lembrança do casal" nas duas. Poderia ser mais específico ou descritivo. | 52, 76 | 🟢 Baixo |

### 🛠️ Fix recomendado (reescrita parcial)
```ts
// Substituir IO + CSS por GSAP ScrollTrigger
useEffect(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const section = sectionRef.current;
  if (!section) return;

  const children = section.querySelectorAll('.reveal-item');
  if (reduce) {
    gsap.set(children, { opacity: 1, y: 0 });
    return;
  }
  gsap.set(children, { opacity: 0, y: 20 });
  gsap.to(children, {
    opacity: 1, y: 0, stagger: 0.2,
    scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 30%', scrub: true }
  });
}, []);
```

---

## 3️⃣ PHOTOSECTION (Cap 2 — O Começo)

### ✅ Pontos fortes
1. **GSAP ScrollTrigger grayscale** — `grayscale(1)→grayscale(0)` com scrub. Funciona desktop + mobile. Padrão do site. | 31-56
2. **SVG border inferior** correta (`fill="#faf5f0"`)
3. **Polaroid com shadow realista** — blur-xl under
4. **`prefers-reduced-motion: reduce`** — respeita: `el.style.filter = 'grayscale(0)'` imediato | 34-36
5. **Washi tape posicionada** com rotate e pointer-events-none

### 🔴 Problemas críticos
| # | Problema | Linha | Impacto |
|---|---|---|---|
| 1 | **Reveal do container usa CSS transition (inconsistência)** — `isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'` com IO. O grayscale usa GSAP. Duas abordagens na mesma seção. | 66-69 | 🔴 Alto |
| 2 | **`aria-label` ausente na foto principal** — a foto tem alt "Nossa foto", mas como é `grayscale(1)` inicialmente, não há descrição do efeito para screen readers. | 83-87 | 🟡 Médio |
| 3 | **Washi tape como `<img>` — requer request HTTP extra** — `images/popup/washi-tape.png`. Poderia ser SVG inline ou CSS repeating-linear-gradient como no PlaylistSection. | 72-75 | 🟢 Baixo |
| 4 | **`maxHeight: '60vh'` inline style** — quebra em telas muito pequenas? Funciona, mas não é Tailwind-first. | 87 | 🟢 Baixo |

### 🛠️ Fix recomendado
- Unificar reveal: remover IO do container e usar GSAP ScrollTrigger para `opacity + translateY` também
- Ou: transformar toda a seção em autopropelled via IO (se quiser manter simples), mas sem conflito

---

## 4️⃣ CINEMATICKET (Cap 2 — O Começo)

### ✅ Pontos fortes
1. **Som procedural de rasgar papel** — white noise + lowpass filter + envelope. Autêntico. | 46-77
2. **GSAP para canhoto voar** — power3.out, x/y/rotation/opacity. Física convincente. | 90-98
3. **`prefers-reduced-motion`** — canhoto não voa em reduce (só some). | 88-98
4. **Estado lift `onRasgar`** — conecta com App.tsx → MomentsGallery. Padrão do site. | 101
5. **Paper texture** com SVG noise inline — leve, sem HTTP request
6. **Barcode realista** — larguras variadas, alturas aleatórias

### 🔴 Problemas críticos
| # | Problema | Linha | Impacto |
|---|---|---|---|
| 1 | **`Math.random()` em barcode — hidratação inconsistente** | 267 | 🟡 Médio (site estático, mas quebra checksum se houver hidratação) |
| 2 | **Data hardcoded "14 FEB 2024"** — genérica. Não conversa com "Nosso dia 13" do SceneConvite nem com "14 FEV 2023" do StarMapSection. | 203 | 🔴 Alto |
| 3 | **Serial number "0013-0214-2024-∞"** — `2024` hardcoded, `0214` talvez significativo? | 229 | 🟡 Médio |
| 4 | **Reveal usa IO + CSS transition** — inconsistência. Title, instruction, ticket: todos CSS transition. | 120-155 | 🔴 Alto |
| 5 | **Sem SVG border superior** — PhotoSection termina com border `fill="#faf5f0"`, mas CinemaTicket começa com `bg-[#faf5f0]`. Ok, mesma cor. Mas falta textura de transição. | — | 🟢 Baixo |
| 6 | **`group-hover:scale-110` no shadow** — hover não funciona mobile. Mas é decorativo. | 289-290 | 🟢 Baixo |

### 🛠️ Fix recomendado
```ts
// Substituir IO por GSAP ScrollTrigger para reveal
// Data: trocar por data real do casal
// Serial: usar data real + símbolo pessoal
```

---

## 5️⃣ THANKYOUSECTION (Cap 5 — O Futuro)

### ✅ Pontos fortes
1. **Ano corrigido** — `new Date().getFullYear()` (já foi fixado na sessão anterior) | 131
2. **Gradiente inferior suave** — `bg-gradient-to-t from-[#c3505c]/10` — ponte visual para o fim
3. **Coração SVG com animação heartbeat** CSS — pulso reconhecível
4. **Decorative elements** — flores SVG rotacionando e balançando

### 🔴 Problemas críticos
| # | Problema | Linha | Impacto |
|---|---|---|---|
| 1 | **CSS transition ONLY — zero GSAP** — `transition-all duration-1000` com IO. Única seção do site sem GSAP. | 74-134 | 🔴🔴 Alto |
| 2 | **`prefers-reduced-motion` AUSENTE** — usuário com reduce ainda vê delay-500, delay-700, delay-900, heartbeat CSS, slow-rotate, sway. | 34-68 | 🔴🔴 Alto |
| 3 | **Sem SVG border superior** — MoonPhaseSection termina com gradiente rosa, mas ThankYouSection começa com `bg-[#f8dee2]`. O gradiente do MoonPhase cobre, mas a borda rasgada SVG está ausente. | — | 🟡 Médio |
| 4 | **`slow-rotate` e `sway` CSS globais** — decorações que giram/balançam sem respeitar reduce. | 34, 50 | 🔴 Alto |
| 5 | **"Sua amada" — assinatura genérica** — deveria ser algo mais pessoal (nome, apelido, inside joke). | 106 | 🟡 Médio |
| 6 | **Texto principal color `#f8dee3` typo?** — Na linha 92: `text-[#f8dee3]` (3 no final). A paleta do site usa `#f8dee2` (2 no final). Isso é um hex diferente (quase invisível, mas inconsistente). | 92 | 🟢 Baixo |

### 🛠️ Fix recomendado (reescrita necessária)
Esta seção precisa ser reescrita para alinhar com o padrão do site:
1. Migrar para GSAP ScrollTrigger (scrub, stagger)
2. Adicionar `prefers-reduced-motion` completo
3. Parar CSS animations (heartbeat, slow-rotate, sway) em reduce
4. SVG border superior (transição do MoonPhase)
5. Personalizar assinatura

---

## 📋 CHECKLIST DE PADRONIZAÇÃO POR SEÇÃO

### SceneConvite
- [x] GSAP timeline principal
- [ ] GSAP `prefers-reduced-motion` completo (só audio respeita, visual não)
- [x] Áudio procedural
- [ ] `aria-label` no coração (tem, mas "heart" genérico)
- [x] Canvas performático

### OpeningText
- [ ] Migrar IO → GSAP ScrollTrigger
- [ ] Adicionar `prefers-reduced-motion`
- [ ] Corrigir conflito inline transform + Tailwind transition
- [ ] SVG border superior (transição do SceneConvite)

### PhotoSection
- [ ] Unificar reveal: GSAP ScrollTrigger (não IO + CSS)
- [ ] `aria-label` na foto
- [ ] Washi tape como CSS gradient (não `<img>`)

### CinemaTicket
- [ ] Migrar IO → GSAP ScrollTrigger
- [ ] Data real do casal (não "14 FEB 2024" genérico)
- [ ] `Math.random()` → seed fixo para barcode
- [ ] Serial number personalizado

### ThankYouSection
- [ ] **Reescrever completamente** — migrar para GSAP ScrollTrigger
- [ ] `prefers-reduced-motion` completo (parar CSS animations)
- [ ] SVG border superior
- [ ] Personalizar assinatura
- [ ] Corrigir `#f8dee3` → `#f8dee2`

---

## 🎯 PRIORIDADE DE FIX

| Rank | Seção | Justificativa |
|---|---|---|
| 🔴 1 | ThankYouSection | Pior score (4.0), sem GSAP, sem reduced-motion, é o FECHAMENTO da história |
| 🔴 2 | OpeningText | IO+CSS inconsiste com todo resto, conflito transform, sem reduced-motion |
| 🟡 3 | CinemaTicket | Data genérica, IO+CSS, barcode random |
| 🟡 4 | PhotoSection | Apenas reveal inconsistente, resto está bom |
| 🟢 5 | SceneConvite | Só reduced-motion incompleto, resto excelente |

---

## 📊 COMPARAÇÃO: Seções já auditadas vs. pendentes

| Padrão | PlaylistSection ✅ | MomentsGallery ✅ | StarMap ✅ | ThankYou ❌ | OpeningText ❌ |
|---|---|---|---|---|---|
| GSAP ScrollTrigger | ✅ | ✅ | ✅ | ❌ CSS | ❌ IO+CSS |
| prefers-reduced-motion | ✅ completo | ✅ completo | ✅ completo | ❌ ausente | ❌ ausente |
| SVG border | ✅ | ✅ | ✅ gradiente | ❌ | ❌ |
| A11y aria-label | ✅ | ✅ | ✅ | ❌ parcial | ❌ |
| Paleta correta | ✅ | ✅ | ✅ | ⚠️ typo #f8dee3 | ✅ |

---

*Auditoria gerada via Experience Strategist skill · 2026-06-01*
