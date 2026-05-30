# 📁 Guia de Imagens — Valentine Page

Coloque suas imagens nesta pasta (`assets-reference/`) e depois copie/mova para `public/images/` nas **subpastas correspondentes**.

> **Total de arquivos:** 10 imagens  
> **Estrutura:** `public/images/<subpasta>/<arquivo>`

---

## `popup/polaroid-left.jpg`
- **Onde usar:** `ValentinePopup` — Polaroid à esquerda do popup inicial
- **Proporção recomendada:** 4:5 (vertical)
- **Tamanho ideal:** ~500x625px ou maior
- **Descrição:** Uma foto íntima do casal, de preferência em preto e branco (o código já aplica `grayscale`)
- **Estilo:** Romântico, close, abraço ou olhar trocado
- **Destino:** `public/images/popup/`

---

## `popup/polaroid-right.jpg`
- **Onde usar:** `ValentinePopup` — Polaroid à direita do popup inicial
- **Proporção recomendada:** 4:5 (vertical)
- **Tamanho ideal:** ~500x625px ou maior
- **Descrição:** Segunda foto do casal para o par de polaroids
- **Estilo:** Pode ser mais descontraída — risada, passeio, momento casual
- **Destino:** `public/images/popup/`

---

## `popup/washi-tape.png`
- **Onde usar:** `ValentinePopup` — Fita decorativa na polaroid da direita (canto inferior)
- **Proporção recomendada:** ~80×24px (retangular, horizontal)
- **Tamanho ideal:** 80×24px ou maior (a classe `w-20 h-6` força essas dimensões)
- **Descrição:** Imagem de fita adesiva decorativa (washi tape) para substituir o gradiente CSS
- **Estilo:** PNG com fundo transparente é ideal; pode ser colorido, levemente transparente, com textura de papel ou padrão delicado
- **Posição:** Girada em 20°, na base direita da polaroid
- **Destino:** `public/images/popup/`

---

## `hero/couple-main.jpg`
- **Onde usar:** `PhotoSection` — Foto principal em largura total
- **Proporção recomendada:** 16:9 ou 3:2 (horizontal, panorâmica)
- **Tamanho ideal:** ~1200x675px ou maior (vai até 80vh de altura)
- **Descrição:** A foto mais bonita/impactante do casal. É a imagem de destaque da página
- **Estilo:** P&B no código, mas pode colorida — será convertida a cinza
- **Posição:** Ocupa toda a largura da tela com borda de papel rasgado embaixo
- **Destino:** `public/images/hero/`

---

## `gallery/moment-1.jpg`
- **Onde usar:** `MomentsGallery` — 1ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Piquenique no parque"
- **Sugestão:** Foto ao ar livre, grama, céu, cesta de piquenique
- **Destino:** `public/images/gallery/`

---

## `gallery/moment-2.jpg`
- **Onde usar:** `MomentsGallery` — 2ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Pôr do sol na praia"
- **Sugestão:** Silhuetas contra o sol, mar, areia dourada
- **Destino:** `public/images/gallery/`

---

## `gallery/moment-3.jpg`
- **Onde usar:** `MomentsGallery` — 3ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Jantar juntos"
- **Sugestão:** Mesa de restaurante, velas, comida, taças, luz ambiente
- **Destino:** `public/images/gallery/`

---

## `gallery/moment-4.jpg`
- **Onde usar:** `MomentsGallery` — 4ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Café na Europa"
- **Sugestão:** Fachada de café, xícara de café, rua de paralelepípedos, viagem
- **Destino:** `public/images/gallery/`

---

## `travel/travel.jpg`
- **Onde usar:** `TravelSection` — Foto de viagem
- **Proporção recomendada:** 3:4 ou 4:3 (vertical ou horizontal funciona)
- **Tamanho ideal:** ~600x800px ou maior
- **Descrição:** Foto de uma viagem que vocês fizeram juntos, de carro ou não
- **Estilo:** Paisagem com o casal, estrada, vista, bagagem
- **Posição:** Fica à esquerda com fita washi tape decorativa no topo
- **Destino:** `public/images/travel/`

---

## `childhood/childhood.jpg`
- **Onde usar:** `BeforeWeMet` — Foto de infância
- **Proporção recomendada:** 4:5 ou 3:2
- **Tamanho ideal:** ~500x625px ou maior
- **Descrição:** Foto antiga, de infância, ou do início do relacionamento. Pode ser uma montagem dos dois ainda crianças, ou uma foto que remeta ao passado
- **Estilo:** O código aplica filtro `sepia(0.3)` para efeito vintage
- **Legenda no site:** "Quando éramos apenas crianças..."
- **Destino:** `public/images/childhood/`

---

## 📋 Checklist Completo

| # | Caminho | Seção | Status |
|---|---------|-------|--------|
| 1 | `popup/polaroid-left.jpg` | Popup esquerda | ⬜ |
| 2 | `popup/polaroid-right.jpg` | Popup direita | ⬜ |
| 3 | `popup/washi-tape.png` | Fita decorativa do popup | ⬜ |
| 4 | `hero/couple-main.jpg` | Foto principal | ⬜ |
| 5 | `gallery/moment-1.jpg` | Galeria — Piquenique | ⬜ |
| 6 | `gallery/moment-2.jpg` | Galeria — Praia | ⬜ |
| 7 | `gallery/moment-3.jpg` | Galeria — Jantar | ⬜ |
| 8 | `gallery/moment-4.jpg` | Galeria — Café | ⬜ |
| 9 | `travel/travel.jpg` | Seção de viagem | ⬜ |
| 10 | `childhood/childhood.jpg` | Antes de nos conhecermos | ⬜ |

---

## ⚡ Como subir

Depois de colocar as imagens nesta pasta (`assets-reference/`), copie para as subpastas de destino:

```bash
cp polaroid-left.jpg polaroid-right.jpg washi-tape.png /Users/carolina/Downloads/app/public/images/popup/
cp couple-main.jpg /Users/carolina/Downloads/app/public/images/hero/
cp moment-1.jpg moment-2.jpg moment-3.jpg moment-4.jpg /Users/carolina/Downloads/app/public/images/gallery/
cp travel.jpg /Users/carolina/Downloads/app/public/images/travel/
cp childhood.jpg /Users/carolina/Downloads/app/public/images/childhood/
```

Ou arraste manualmente pelo Finder.

Depois, faça commit e push:
```bash
cd /Users/carolina/Downloads/app
git add public/images/
git commit -m "assets: update romantic photos"
git push origin main
```

O GitHub Actions vai rebuildar o site automaticamente com as novas imagens!
