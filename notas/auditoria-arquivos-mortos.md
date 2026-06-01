# 🧹 Auditoria — Arquivos Mortos e Sem Utilidade

**Data:** 2026-06-01  
**Auditor:** Claude

---

## Resumo Executivo

Foram identificados **8 arquivos mortos** (código e assets) e **52 componentes shadcn boilerplate** que não são usados pelo app real. Removendo os 8 arquivos mortos, o projeto fica mais limpo para deploy.

---

## 🔴 Arquivos Mortos — Removidos

### 1. `src/App.css` — CSS legado do template Vite
**Problema:** Contém `.logo`, `.card`, `.read-the-docs`, `@keyframes logo-spin` — estilos do template padrão do Vite. Não é importado por `App.tsx` nem por nenhuma seção.  
**Impacto:** Nenhum. Só polui o build.  
**Ação:** ✅ Removido.

### 2. `src/pages/Home.tsx` — Template Vite padrão
**Problema:** Componente com contador (`count is 0`), importa `../App.css`. Nunca é importado por `main.tsx` (que monta `<App />` diretamente). A pasta `pages/` inteira está vazia de uso real.  
**Impacto:** Código morto que confunde novos devs.  
**Ação:** ✅ Removido (arquivo + pasta `pages/`).

### 3. `src/sections/LoadingScreen.tsx` — Tela de carregamento não usada
**Problema:** Componente completo com coração pulsante, fade-out de 3s, z-index `100005`. Nunca é importado em `App.tsx` ou em qualquer lugar. O convite (`SceneConvite`) substituiu completamente essa função.  
**Impacto:** Código morto com z-index absurdamente alto que, se importado por acidente, bloquearia tudo.  
**Ação:** ✅ Removido.

### 4. `src/sections/ValentinePopup.tsx` — Popup antigo substituído
**Problema:** Popup com polaroids, botão "Toque" no coração, z-index `100000`. Era a versão anterior do convite. Foi completamente substituído por `SceneConvite.tsx` (que tem partículas, som procedural, typewriter).  
**Impacto:** Código duplicado/legado. Se importado por acidente, conflitaria com `SceneConvite`.  
**Ação:** ✅ Removido.

### 5. `src/hooks/use-mobile.ts` + `src/components/ui/sidebar.tsx` — Hook e dependente não usados
**Problema:** Hook `useIsMobile()` bem escrito, mas nunca é importado pelo app real. O único importador era `sidebar.tsx` (componente shadcn boilerplate), que também não é usado.  
**Impacto:** Nenhum em runtime, mas o TypeScript falha no build porque `sidebar.tsx` tenta importar um módulo deletado.  
**Ação:** ✅ Removidos (arquivo `use-mobile.ts` + pasta `hooks/` + `sidebar.tsx`).

### 6. `public/images/efeito-papel-1.webp` — Imagem raster de borda rasgada
**Problema:** Era usada com `maskImage` / `webkitMaskImage` para criar bordas rasgadas. Todas as seções foram migradas para **SVG inline** (`preserveAspectRatio="none"`) — elimina faixa de cor indesejada e é mais leve.  
**Verificação:** Nenhuma seção atual referencia `efeito-papel-1.webp`.  
**Impacto:** Asset morto de ~5-15KB no build.  
**Ação:** ✅ Removido.

### 7. `public/.DS_Store` — Metadados do macOS
**Problema:** Arquivo oculto do Finder do macOS. Não é referenciado, não é asset.  
**Impacto:** Polui o repositório e o build.  
**Ação:** ✅ Removido.

---

## 🟡 Componentes shadcn/ui — Não removidos (boilerplate intencional)

A pasta `src/components/ui/` contém **53 componentes** gerados automaticamente pelo `npx shadcn add`. **Nenhum é importado pelo código real do site** (exceto internamente entre si — ex: `pagination.tsx` importa `button.tsx`).

**Por que NÃO remover:**
1. São parte do setup do shadcn/ui — se o projeto crescer e precisar de um botão/dialog, já estão lá.
2. Remover exigiria rastrear dependências internas (`button.tsx` é importado por `pagination.tsx`, `calendar.tsx`, `input-group.tsx`, `sidebar.tsx`, `toggle-group.tsx`).
3. O custo de manter é zero — não são bundleados pelo Vite se não são importados.

**Recomendação futura:** Se quiser reduzir drasticamente o tamanho do repositório, rodar `npx shadcn add [componente]` sob demanda ao invés de manter todos.

---

## 🟡 `src/lib/utils.ts` — Mantido

**Uso:** É importado por TODOS os componentes shadcn (`cn()` para merge de classes Tailwind).  
**Por que manter:** Mesmo que o app real não use `cn()`, os componentes shadcn dependem dele. Remover quebraria o build.

---

## 📊 Antes vs Depois

| Métrica | Antes | Depois |
|---|---|---|
| Arquivos `.tsx` mortos | 5 | 0 |
| Assets mortos | 2 | 0 |
| Pastas vazias/desnecessárias | 2 (`pages/`, `hooks/`) | 0 |
| Linhas de código mortas | ~300 | 0 |
| Tamanho de `public/` | ~+15KB de lixo | limpo |

---

## ✅ Checklist de Limpeza

- [x] Remover `src/App.css`
- [x] Remover `src/pages/Home.tsx` + pasta `pages/`
- [x] Remover `src/sections/LoadingScreen.tsx`
- [x] Remover `src/sections/ValentinePopup.tsx`
- [x] Remover `src/hooks/use-mobile.ts` + pasta `hooks/`
- [x] Remover `src/components/ui/sidebar.tsx` (dependente de `use-mobile`)
- [x] Remover `public/images/efeito-papel-1.webp`
- [x] Remover `public/.DS_Store`
- [x] Verificar build passa (`npm run build`)
- [x] Verificar TypeScript (`npx tsc --noEmit`)
