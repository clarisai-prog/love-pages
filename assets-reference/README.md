# 📁 Guia de Imagens — Valentine Page

Coloque suas imagens nesta pasta (`assets-reference/`) e depois copie/mova para `public/images/` seguindo os nomes abaixo.

---

## `polaroid-left.jpg`
- **Onde usar:** `ValentinePopup` — Polaroid à esquerda do popup inicial
- **Proporção recomendada:** 4:5 (vertical)
- **Tamanho ideal:** ~500x625px ou maior
- **Descrição:** Uma foto íntima do casal, de preferência em preto e branco (o código já aplica `grayscale`)
- **Estilo:** Romântico, close, abraço ou olhar trocado

---

## `polaroid-right.jpg`
- **Onde usar:** `ValentinePopup` — Polaroid à direita do popup inicial
- **Proporção recomendada:** 4:5 (vertical)
- **Tamanho ideal:** ~500x625px ou maior
- **Descrição:** Segunda foto do casal para o par de polaroids
- **Estilo:** Pode ser mais descontraída — risada, passeio, momento casual

---

## `couple-main.jpg`
- **Onde usar:** `PhotoSection` — Foto principal em largura total
- **Proporção recomendada:** 16:9 ou 3:2 (horizontal, panorâmica)
- **Tamanho ideal:** ~1200x675px ou maior (vai até 80vh de altura)
- **Descrição:** A foto mais bonita/impactante do casal. É a imagem de destaque da página
- **Estilo:** P&B no código, mas pode colorida — será convertida a cinza
- **Posição:** Ocupa toda a largura da tela com borda de papel rasgado embaixo

---

## `moment-1.jpg`
- **Onde usar:** `MomentsGallery` — 1ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Пикник в парке" (Piquenique no parque)
- **Sugestão:** Foto ao ar livre, grama, céu, cesta de piquenique

---

## `moment-2.jpg`
- **Onde usar:** `MomentsGallery` — 2ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Закат на пляже" (Pôr do sol na praia)
- **Sugestão:** Silhuetas contra o sol, mar, areia dourada

---

## `moment-3.jpg`
- **Onde usar:** `MomentsGallery` — 3ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Совместный ужин" (Jantar juntos)
- **Sugestão:** Mesa de restaurante, velas, comida, taças, luz ambiente

---

## `moment-4.jpg`
- **Onde usar:** `MomentsGallery` — 4ª polaroid da galeria
- **Proporção recomendada:** 1:1 (quadrada) ou 4:5
- **Tamanho ideal:** ~400x400px ou maior
- **Legenda no site:** "Кафе в Европе" (Café na Europa)
- **Sugestão:** Fachada de café, xícara de café, rua de paralelepípedos, viagem

---

## `travel.jpg`
- **Onde usar:** `TravelSection` — Foto de viagem
- **Proporção recomendada:** 3:4 ou 4:3 (vertical ou horizontal funciona)
- **Tamanho ideal:** ~600x800px ou maior
- **Descrição:** Foto de uma viagem que vocês fizeram juntos, de carro ou não
- **Estilo:** Paisagem com o casal, estrada, vista, bagagem
- **Posição:** Fica à esquerda com fita washi tape decorativa no topo

---

## `childhood.jpg`
- **Onde usar:** `BeforeWeMet` — Foto de infância
- **Proporção recomendada:** 4:5 ou 3:2
- **Tamanho ideal:** ~500x625px ou maior
- **Descrição:** Foto antiga, de infância, ou do início do relacionamento. Pode ser uma montagem dos dois ainda crianças, ou uma foto que remeta ao passado
- **Estilo:** O código aplica filtro `sepia(0.3)` para efeito vintage
- **Legenda no site:** "Когда мы были просто детьми..." (Quando éramos apenas crianças...)

---

## 📋 Checklist

| # | Arquivo | Seção | Status |
|---|---------|-------|--------|
| 1 | `polaroid-left.jpg` | Popup esquerda | ⬜ |
| 2 | `polaroid-right.jpg` | Popup direita | ⬜ |
| 3 | `couple-main.jpg` | Foto principal | ⬜ |
| 4 | `moment-1.jpg` | Galeria — Piquenique | ⬜ |
| 5 | `moment-2.jpg` | Galeria — Praia | ⬜ |
| 6 | `moment-3.jpg` | Galeria — Jantar | ⬜ |
| 7 | `moment-4.jpg` | Galeria — Café | ⬜ |
| 8 | `travel.jpg` | Seção de viagem | ⬜ |
| 9 | `childhood.jpg` | Antes de nos conhecermos | ⬜ |

---

## ⚡ Como subir

Depois de colocar as imagens nesta pasta (`assets-reference/`), copie para o destino final:

```bash
cp /Users/carolina/Downloads/app/assets-reference/*.jpg /Users/carolina/Downloads/app/public/images/
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
