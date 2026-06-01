# 🔍 Auditoria — `src/sections/PlaylistSection.tsx`

**Data:** 2026-06-01  
**Auditor:** Claude  
**Severidade:** 🟡 Média-Alta (problemas de consistência, acessibilidade e performance)

---

## 📋 Resumo Executivo

A seção funciona visualmente, mas possui **17 problemas** catalogados: 2 críticos, 7 médios, 8 leves. Os principais riscos são: inconsistência de paleta, falta de acessibilidade, e performance de re-render.

---

## 🔴 Crítico

### 1. Paleta de cores inconsistente com o resto do site
**Linha:** 206-210 (washi tape), 102-108 (tone arm)

O washi tape usa `#f4a6b5` e `#e8889a` — cores que **não existem** na paleta oficial do site. O braço do toca-discos usa `#d4af37` (ouro) e `#8a6e1a` — também fora da paleta.

**Impacto:** Quebra a coesão visual do capítulo 4. O resto do site usa apenas `#faf5f0`, `#c3505c`, `#f8dee2`, `#b00d1e`.

**Recomendação:** Trocar washi tape por `#f8dee2` + `#e8889a` → usar apenas tons derivados da paleta restrita. O braço do toca-discos pode ser `#f8dee2` (ouro não combina com o scrapbook romântico).

---

## 🟠 Médio

### 2. Re-render O(n) a cada clique
**Linhas:** 130-135

```tsx
{tracks.find((t) => t.id === activeTrack)?.title}
{tracks.find((t) => t.id === activeTrack)?.artist}
```

`tracks.find()` é chamado **4 vezes** a cada render. Como `tracks` tem apenas 5 itens, o impacto é pequeno — mas o padrão é ruim. Se o array crescer, escala mal.

**Recomendação:** Usar `useMemo` ou extrair o track ativo antes do render:

```tsx
const activeTrackData = useMemo(() => tracks.find(t => t.id === activeTrack), [activeTrack]);
```

### 3. Semântica HTML quebrada — vinil não é interativo
**Linhas:** 75-109

O vinil é um `<div>` puro. Sem `role`, `tabindex`, `aria-label`, ou `aria-hidden`. Screen readers vão anunciar "grupo vazio" ou ignorar completamente.

**Recomendação:**
```tsx
<div role="img" aria-label="Disco de vinil decorativo com coração no centro" ...>
```

### 4. Acessibilidade — botões sem estados ARIA
**Linhas:** 149-186

Os botões de track não têm:
- `aria-pressed` (indicar ativo/inativo)
- `aria-label` descrevendo a ação ("Tocar Sob o céu a dois" vs "Pausar")
- Focus ring visível no fundo vermelho

**Recomendação:**
```tsx
<button
  aria-pressed={isActive}
  aria-label={isActive && isPlaying ? `Pausar ${track.title}` : `Tocar ${track.title}`}
  className="... focus-visible:ring-2 focus-visible:ring-[#f8dee2] focus-visible:outline-none"
>
```

### 5. CSS animation reinicia ao pausar — vinil "pula"
**Linha:** 78-80

```tsx
className={`... ${isPlaying ? 'vinyl-spin' : ''}`}
```

Quando `isPlaying` muda de `true` para `false` e depois `true` de novo, a classe `vinyl-spin` é removida e readicionada. A animação CSS reinicia do zero — o vinil "pula" de posição.

**Recomendação:** Usar `animation-play-state: paused` ao invés de remover a classe:

```tsx
style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
```

E manter `vinyl-spin` sempre na classe.

### 6. Ausência de `prefers-reduced-motion`
**Linhas:** 78 (vinyl), 113-124 (equalizer), 193-201 (corações decorativos)

Nenhuma das animações CSS respeita `prefers-reduced-motion`. Usuários com sensibilidade a movimento não têm escape.

**Recomendação:**
```css
@media (prefers-reduced-motion: reduce) {
  .vinyl-spin, .eq-bar, .animate-pulse { animation: none !important; }
}
```

Ou verificar no React:
```tsx
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### 7. Equalizador não representa áudio real — sem indicação
**Linhas:** 112-125

O equalizador anima barras aleatoriamente, mas não há áudio real. Um usuário com deficiência visual pode achar que algo está tocando e não ouvir nada.

**Recomendação:** Adicionar `aria-hidden="true"` no equalizador e um texto invisível para screen readers:
```tsx
<span className="sr-only">Visualização decorativa do equalizador — sem áudio</span>
```

### 8. Hardcoded breakpoints inconsistentes
**Linhas:** várias

A seção usa `md:` (768px) como breakpoint, mas outras seções do site usam uma mistura. Não há um padrão rigoroso.

**Nota:** Não é um bug, mas uma oportunidade de padronização. O Tailwind já define `md:` como 768px — usar consistentemente é suficiente.

---

## 🟡 Leve

### 9. Array `tracks` sem tipo
**Linhas:** 4-10

```tsx
const tracks = [ ... ];
```

Sem interface `Track`. TypeScript infere o tipo, mas perde-se documentação e rigor.

**Recomendação:**
```tsx
interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

const tracks: Track[] = [ ... ];
```

### 10. Copy genérica — músicas são placeholders
**Linhas:** 5-9

```tsx
{ title: 'Seus olhos', artist: 'Nosso amor', duration: '3:14' }
```

As músicas são genéricas. O storyboard do capítulo 4 lista isso como decisão pendente.

**Nota:** Não é um bug de código, mas um reminder de conteúdo.

### 11. Tone arm pode sair do container em mobile
**Linhas:** 102-108

```tsx
<div className="absolute -top-2 right-2 w-3 h-36 ..." />
```

O braço do toca-discos sai do topo do container `w-64 h-64` em telas pequenas. Pode ser cortado pela viewport.

**Recomendação:** Reduzir `h-36` para `h-24` em mobile (`h-24 md:h-36`).

### 12. Ícones Lucide sem `aria-label`
**Linhas:** 91, 161

```tsx
<Heart strokeWidth={0} />
<Pause className="w-4 h-4 fill-current" />
```

Sem `aria-label`, screen readers não sabem o que é o ícone.

**Recomendação:**
```tsx
<Heart aria-label="Coração" strokeWidth={0} />
<Pause aria-label="Pausar" className="w-4 h-4 fill-current" />
```

### 13. `useEffect` sem cleanup robusto
**Linhas:** 18-34

```tsx
return () => observer.disconnect();
```

O cleanup desconecta o observer, mas se o componente desmontar DENTRO da callback `setIsVisible(true)`, pode haver um `setState` em componente desmontado (warning no React).

**Recomendação:**
```tsx
let isMounted = true;
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && isMounted) {
    setIsVisible(true);
    observer.disconnect();
  }
}, { threshold: 0.2 });
// ...
return () => { isMounted = false; observer.disconnect(); };
```

### 14. `grooves` decorativos sem `aria-hidden`
**Linhas:** 83-87

```tsx
<div className="absolute inset-3 rounded-full border border-[#333333]/60" />
```

5 divs decorativas sem `aria-hidden`. Screen readers podem anunciar "5 grupos vazios".

**Recomendação:** Adicionar `aria-hidden="true"` em todas.

### 15. Coração decorativo sem `aria-hidden`
**Linhas:** 193-201

```tsx
<div className="absolute top-20 right-10 w-6 h-6 opacity-20 animate-pulse">
  <svg viewBox="0 0 24 24" fill="#f8dee2">
```

Decorativo, mas sem `aria-hidden`.

### 16. Borda rasgada inferior — cor inconsistente com ThankYouSection
**Linhas:** 214-223

```tsx
fill="#f8dee2"
```

A borda rasgada usa `#f8dee2` (rosa), indo para o `ThankYouSection`. Mas o `ThankYouSection` também usa `#f8dee2`. Técnicamente consistente, mas o storyboard do cap. 5 ainda não foi feito — precisa confirmar se essa é a transição desejada.

### 17. Não usa GSAP — inconsistente com seções refinadas

Todas as outras seções transformadas (HeartbeatSection, PhotoSection, MomentsGallery, TravelSection) usam GSAP para animações. PlaylistSection ainda usa CSS transitions inline (`transition-all duration-1000`).

**Nota:** Não é um bug, mas uma oportunidade de elevar a qualidade para o padrão do resto do site.

---

## 📊 Scorecard

| Categoria | Score | Notas |
|---|---|---|
| **Funcionalidade** | 8/10 | Tudo funciona, mas com re-render desnecessário |
| **Performance** | 6/10 | O(n) por click, animações CSS pesadas sem reduced-motion |
| **Acessibilidade** | 3/10 | Sem ARIA, sem focus, sem indicação de estado |
| **Semântica HTML** | 5/10 | Divs sem roles, decorações sem aria-hidden |
| **Consistência Visual** | 5/10 | Cores fora da paleta, não usa GSAP como as outras |
| **Mobile** | 7/10 | Grid funciona, mas tone arm e vinil podem overflow |
| **TypeScript** | 6/10 | Sem tipagem explícita no array |
| **Manutenibilidade** | 6/10 | Hardcoded values, copy genérica |

**Média Geral: 5.75 / 10**

---

## ✅ Checklist de Correção (priorizado)

### Must-fix (antes de deploy)
- [ ] 1. Padronizar cores do washi tape e tone arm na paleta oficial
- [ ] 4. Adicionar `aria-pressed`, `aria-label` e `focus-visible` nos botões
- [ ] 6. Respeitar `prefers-reduced-motion` em vinil, equalizador e corações
- [ ] 7. Adicionar `aria-hidden` no equalizador + texto invisível

### Should-fix (próxima sprint)
- [ ] 2. Memoizar `activeTrackData` com `useMemo`
- [ ] 3. Adicionar `role="img"` e `aria-label` no vinil
- [ ] 5. Trocar remoção de classe por `animation-play-state`
- [ ] 9. Criar interface `Track`
- [ ] 12. Adicionar `aria-label` em ícones Lucide
- [ ] 14-15. Adicionar `aria-hidden` em elementos decorativos

### Nice-to-have
- [ ] 17. Migrar animações de entrada para GSAP (consistência com resto do site)
- [ ] 10. Substituir copy genérica por nomes de músicas reais do casal
- [ ] 11. Ajustar tone arm para não overflow em mobile
