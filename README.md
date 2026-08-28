# Para você ❤️

Uma carta digital interativa para celebrar 1 ano e 11 meses de namoro.

## Como executar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # pré-visualização do build
```

## Onde preencher os `PLACEHOLDER` / dados pessoais

| O quê | Onde |
| --- | --- |
| Nome, apelido e **data de início** | `src/config/relationship.ts` |
| Música (caminho + habilitar) | `src/config/relationship.ts` → `music` |
| Linha do tempo | `src/data/timeline.ts` |
| Galeria de memórias | `src/data/memories.ts` |
| Carta + "coisas que amo" | `src/data/letter.ts` |
| **Fotos** | `public/images/` (`memory-01.jpg` … `memory-04.jpg`) |
| **Áudio** | `public/audio/` (ex.: `nossa-musica.mp3`) |

Observações:

- O número de dias/horas/minutos é calculado automaticamente a partir de `startDate` — não precisa editar manualmente.
- Fotos e música ausentes **não quebram** a aplicação: aparecem placeholders elegantes e o áudio simplesmente não toca.
- Metadata (title, description, Open Graph, favicon) fica em `index.html`.

## Hospedagem

O build usa caminhos relativos (`base: "./"`), então funciona em Vercel, Cloudflare Pages e GitHub Pages sem configuração extra.
