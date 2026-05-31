# 📁 Catálogo de Assets — Love Pages (Declaração de Amor)

> **Versão do projeto:** Capítulo 1 completo (SceneConvite + OpeningText + 9 seções originais)
> **Total de imagens:** 11 arquivos em `public/images/`
> **Total de efeitos:** 1 arquivo de borda de papel rasgado

Este documento serve como **fonte única de verdade** para todos os assets visuais do site. Antes de trocar qualquer imagem, consulte este guia para proporção, tamanho e seção de uso.

---

## 🗂️ Mapa de Seções e Imagens

| Seção | Componente | Imagens Usadas |
|-------|-----------|----------------|
| **Capítulo 1 — O Convite** | `SceneConvite.tsx` | *(nenhuma — coração SVG + Canvas procedural)* |
| **Capítulo 2 — O Começo** | `OpeningText.tsx` | `popup/polaroid-left.jpg`, `popup/polaroid-right.jpg`, `popup/washi-tape.png`, `efeito-papel-1.webp` |
| **A Nossa Foto** | `PhotoSection.tsx` | `hero/couple-main.jpg` |
| **Ingresso de Cinema** | `CinemaTicket.tsx` | *(nenhuma — SVG + CSS)* |
| **Nossos Momentos** | `MomentsGallery.tsx` | `gallery/moment-1.jpg` a `moment-4.jpg` |
| **Batimento** | `HeartbeatSection.tsx` | *(nenhuma — SVG animado)* |
| **Viagem** | `TravelSection.tsx` | `travel/travel.jpg` |
| **Antes de Nos Conhecermos** | `BeforeWeMet.tsx` | `childhood/childhood.jpg` |
| **Playlist** | `PlaylistSection.tsx` | *(nenhuma — embed Spotify)* |
| **Agradecimento** | `ThankYouSection.tsx` | *(nenhuma — texto puro)* |

---

## 📸 Detalhamento por Imagem

---

### `popup/polaroid-left.jpg`
- **Onde usar:** `OpeningText.tsx` — Polaroid flutuante no canto superior esquerdo da tela vermelha
- **Dimensões atuais:** 864×1184px
- **Proporção recomendada:** 3:4 (vertical)
- **Tamanho ideal:** ~500×650px ou maior
- **Descrição:** Uma foto íntima do casal, de preferência em preto e branco (o código aplica `grayscale`)
- **Estilo:** Romântico, close, abraço ou olhar trocado
- **Posição no site:** Girada em **-8°**, canto superior esquerdo, com washi tape no topo
- **Destino:** `public/images/popup/`
- **Código:** `src/sections/OpeningText.tsx:51`

---

### `popup/polaroid-right.jpg`
- **Onde usar:** `OpeningText.tsx` — Polaroid flutuante no canto inferior direito da tela vermelha
- **Dimensões atuais:** 864×1184px
- **Proporção recomendada:** 3:4 (vertical)
- **Tamanho ideal:** ~500×650px ou maior
- **Descrição:** Segunda foto do casal para o par de polaroids
- **Estilo:** Pode ser mais descontraída — risada, passeio, momento casual
- **Posição no site:** Girada em **+6°**, canto inferior direito, com washi tape na base
- **Destino:** `public/images/popup/`
- **Código:** `src/sections/OpeningText.tsx:75`

---

### `popup/washi-tape.png` *(formato: WebP)*
- **Onde usar:** `OpeningText.tsx` — Fita decorativa nas duas polaroids
- **Dimensões atuais:** *(formato WebP — dimensões visuais ~80×24px)*
- **Proporção recomendada:** ~4:1 (retangular horizontal)
- **Tamanho ideal:** 160×40px ou maior
- **Descrição:** Imagem de fita adesiva decorativa (washi tape) para simular fita colada no scrapbook
- **Estilo:** PNG/WebP com **fundo transparente** é essencial; pode ser colorido, levemente transparente, com textura de papel ou padrão delicado
- **Posições no site:**
  - Polaroid esquerda: girada em **-15°**, topo central
  - Polaroid direita: girada em **+20°**, base direita
- **Destino:** `public/images/popup/`
- **Código:** `src/sections/OpeningText.tsx:59,83`

---

### `efeito-papel-1.webp`
- **Onde usar:** `OpeningText.tsx` — Borda de papel rasgado na base da seção vermelha
- **Dimensões atuais:** *(WebP — usado em largura total)*
- **Proporção recomendada:** ~10:1 a 15:1 (faixa horizontal muito larga e baixa)
- **Tamanho ideal:** 1440×100px ou maior (será esticado em `object-cover`)
- **Descrição:** Textura de borda de papel rasgado/dechirado. Cria transição visual entre a seção vermelha e a próxima seção (branca/rosa)
- **Estilo:** Fundo transparente ou cor sólida que combine com a próxima seção (rosa `#f8dee2` ou branco)
- **Posição no site:** `absolute bottom-0`, largura total, z-index 20
- **Destino:** `public/images/efeito-papel-1.webp`
- **Código:** `src/sections/OpeningText.tsx:123`

---

### `hero/couple-main.jpg`
- **Onde usar:** `PhotoSection.tsx` — Foto principal em largura total
- **Dimensões atuais:** 1184×864px
- **Proporção recomendada:** 3:2 ou 16:9 (horizontal, panorâmica)
- **Tamanho ideal:** ~1200×800px ou maior (vai até `80vh` de altura)
- **Descrição:** A foto mais bonita/impactante do casal. É a imagem de destaque da página
- **Estilo:** P&B no código (`grayscale`), mas pode ser colorida — será convertida a cinza
- **Posição:** Ocupa toda a largura da tela com borda de papel rasgado SVG embaixo
- **Destino:** `public/images/hero/`
- **Código:** `src/sections/PhotoSection.tsx:34`

---

### `gallery/moment-1.jpg`
- **Onde usar:** `MomentsGallery.tsx` — 1ª polaroid da galeria
- **Dimensões atuais:** 1024×1024px
- **Proporção recomendada:** 1:1 (quadrada)
- **Tamanho ideal:** ~400×400px ou maior
- **Legenda no site:** "Piquenique no parque"
- **Sugestão:** Foto ao ar livre, grama, céu, cesta de piquenique
- **Destino:** `public/images/gallery/`
- **Código:** `src/sections/MomentsGallery.tsx:6`

---

### `gallery/moment-2.jpg`
- **Onde usar:** `MomentsGallery.tsx` — 2ª polaroid da galeria
- **Dimensões atuais:** 1024×1024px
- **Proporção recomendada:** 1:1 (quadrada)
- **Tamanho ideal:** ~400×400px ou maior
- **Legenda no site:** "Pôr do sol na praia"
- **Sugestão:** Silhuetas contra o sol, mar, areia dourada
- **Destino:** `public/images/gallery/`
- **Código:** `src/sections/MomentsGallery.tsx:12`

---

### `gallery/moment-3.jpg`
- **Onde usar:** `MomentsGallery.tsx` — 3ª polaroid da galeria
- **Dimensões atuais:** 1024×1024px
- **Proporção recomendada:** 1:1 (quadrada)
- **Tamanho ideal:** ~400×400px ou maior
- **Legenda no site:** "Jantar juntos"
- **Sugestão:** Mesa de restaurante, velas, comida, taças, luz ambiente
- **Destino:** `public/images/gallery/`
- **Código:** `src/sections/MomentsGallery.tsx:18`

---

### `gallery/moment-4.jpg`
- **Onde usar:** `MomentsGallery.tsx` — 4ª polaroid da galeria
- **Dimensões atuais:** 1024×1024px
- **Proporção recomendada:** 1:1 (quadrada)
- **Tamanho ideal:** ~400×400px ou maior
- **Legenda no site:** "Café na Europa"
- **Sugestão:** Fachada de café, xícara de café, rua de paralelepípedos, viagem
- **Destino:** `public/images/gallery/`
- **Código:** `src/sections/MomentsGallery.tsx:24`

---

### `travel/travel.jpg`
- **Onde usar:** `TravelSection.tsx` — Foto de viagem
- **Dimensões atuais:** 1184×864px
- **Proporção recomendada:** 3:2 ou 4:3
- **Tamanho ideal:** ~600×800px ou maior
- **Descrição:** Foto de uma viagem que vocês fizeram juntos, de carro ou não
- **Estilo:** Paisagem com o casal, estrada, vista, bagagem
- **Posição:** Fica à esquerda com fita washi tape decorativa no topo
- **Destino:** `public/images/travel/`
- **Código:** `src/sections/TravelSection.tsx:42`

---

### `childhood/childhood.jpg`
- **Onde usar:** `BeforeWeMet.tsx` — Foto de infância ou início do relacionamento
- **Dimensões atuais:** 1344×768px
- **Proporção recomendada:** 16:9 ou 3:2
- **Tamanho ideal:** ~500×625px ou maior
- **Descrição:** Foto antiga, de infância, ou do início do relacionamento. Pode ser uma montagem dos dois ainda crianças, ou uma foto que remeta ao passado
- **Estilo:** O código aplica filtro `sepia(0.3)` para efeito vintage
- **Legenda no site:** "Quando éramos apenas crianças..."
- **Destino:** `public/images/childhood/`
- **Código:** `src/sections/BeforeWeMet.tsx:58`

---

## 📋 Checklist Completo de Assets

| # | Caminho | Seção/Componente | Dimensões Atuais | Status |
|---|---------|------------------|-----------------|--------|
| 1 | `popup/polaroid-left.jpg` | OpeningText — Polaroid esquerda | 864×1184px | ✅ |
| 2 | `popup/polaroid-right.jpg` | OpeningText — Polaroid direita | 864×1184px | ✅ |
| 3 | `popup/washi-tape.png` | OpeningText — Fita decorativa | *(WebP)* | ✅ |
| 4 | `efeito-papel-1.webp` | OpeningText — Borda rasgada | *(WebP)* | ✅ |
| 5 | `hero/couple-main.jpg` | PhotoSection — Foto principal | 1184×864px | ✅ |
| 6 | `gallery/moment-1.jpg` | MomentsGallery — Piquenique | 1024×1024px | ✅ |
| 7 | `gallery/moment-2.jpg` | MomentsGallery — Praia | 1024×1024px | ✅ |
| 8 | `gallery/moment-3.jpg` | MomentsGallery — Jantar | 1024×1024px | ✅ |
| 9 | `gallery/moment-4.jpg` | MomentsGallery — Café | 1024×1024px | ✅ |
| 10 | `travel/travel.jpg` | TravelSection — Viagem | 1184×864px | ✅ |
| 11 | `childhood/childhood.jpg` | BeforeWeMet — Infância | 1344×768px | ✅ |

---

## 🎨 Regras de Substituição

### Formato
- **JPEG** para fotos (boa compressão, qualidade alta)
- **WebP** para efeitos e transparências (menor tamanho, qualidade igual)
- **PNG** aceito para transparências (fallback)

### Nomenclatura
- Use **kebab-case** (minúsculas com hífens)
- Não use espaços, acentos ou caracteres especiais
- Exemplo: `nosso-primeiro-beijo.jpg`, `viagem-paraisopolis-2024.webp`

### Proporções Críticas
| Uso | Proporção Mínima | Por quê |
|-----|-----------------|---------|
| Polaroids (popup) | 3:4 ou 4:5 | Moldura branca (`p-3 pb-10`) espera foto vertical |
| Hero principal | 16:9 ou 3:2 | Ocupa largura total, corta em `object-cover` |
| Galeria momentos | 1:1 | Moldura quadrada (`aspect-square`) |
| Borda de papel | 10:1+ | Faixa horizontal, seria esticada |

### Filtros CSS aplicados automaticamente
| Seção | Filtro | Significado |
|-------|--------|-------------|
| Polaroids popup | `grayscale` | Fica P&B, estilo vintage |
| Hero principal | `grayscale` | Fica P&B, estilo vintage |
| Galeria momentos | `grayscale` + hover `grayscale-0` | Começa P&B, revela cor no hover |
| Childhood | `sepia(0.3)` | Tom amarelado vintage |
| Travel | *(nenhum)* | Mantém cor original |

---

## ⚡ Como Trocar uma Imagem

### 1. Coloque o arquivo nesta pasta (`assets-reference/`)
```bash
# Exemplo: trocando a foto principal
cp nova-foto-principal.jpg /Users/carolina/Downloads/app/assets-reference/
```

### 2. Copie para o destino final (`public/images/`)
```bash
cp /Users/carolina/Downloads/app/assets-reference/nova-foto-principal.jpg \
   /Users/carolina/Downloads/app/public/images/hero/couple-main.jpg
```

### 3. Build e push
```bash
cd /Users/carolina/Downloads/app
npm run build
git add public/images/
git commit -m "assets: atualiza foto principal do casal"
git push origin main
```

---

## 🔧 Assets Procedurais (Não-SVG, Não-Imagem)

Além das imagens, o site usa assets gerados via código:

| Asset | Tecnologia | Local | Descrição |
|-------|-----------|-------|-----------|
| Coração crescendo | SVG + GSAP | `SceneConvite.tsx` | Path SVG que escala de 12px a 240px |
| Explosão de partículas | Canvas 2D | `SceneConvite.tsx` | 40 corações gerados proceduralmente |
| Borda SVG rasgada | SVG path | `PhotoSection.tsx` | Onda decorativa em baixo do hero |
| Textura de ruído | SVG filter | `SceneConvite.tsx` + `NoiseOverlay.tsx` | `feTurbulence` para textura de papel |
| Sons | Web Audio API | `SceneConvite.tsx` | Vinyl crackle, batimento, piano, typewriter |

---

## 🗂️ Estrutura de Pastas

```
assets-reference/
├── README.md                  ← você está aqui
├── efeito-papel-1.webp        ← borda rasgada de transição
└── popup/
    └── washi-tape.webp        ← fita decorativa (backup)

public/images/
├── childhood/
│   └── childhood.jpg          ← seção "Antes de nos conhecermos"
├── gallery/
│   ├── moment-1.jpg           ← polaroid: Piquenique
│   ├── moment-2.jpg           ← polaroid: Praia
│   ├── moment-3.jpg           ← polaroid: Jantar
│   └── moment-4.jpg           ← polaroid: Café
├── hero/
│   └── couple-main.jpg        ← foto principal B&W
├── popup/
│   ├── polaroid-left.jpg      ← polaroid esquerda (OpeningText)
│   ├── polaroid-right.jpg     ← polaroid direita (OpeningText)
│   └── washi-tape.png         ← fita decorativa
├── travel/
│   └── travel.jpg             ← seção de viagem
└── efeito-papel-1.webp        ← borda de transição (copiado do assets-reference)
```

---

*Última atualização: 2026-05-30 — Capítulo 1 completo (SceneConvite + OpeningText + polaroids + borda de papel)*
