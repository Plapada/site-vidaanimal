/**
 * Servidor estatico minimo para revisar o preview.
 *
 * Usa SOMENTE modulos nativos do Node (node:http, node:fs, node:path). Nao toca
 * em node_modules, que e exatamente o que trava neste ambiente: cada arquivo
 * lido de la tem um custo altissimo, e ferramentas que leem centenas (Vite,
 * esbuild, Babel) nunca terminam de carregar.
 *
 *   node servidor.mjs   ->  http://127.0.0.1:5173
 */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = fileURLToPath(new URL('.', import.meta.url))
const PORTA = Number(process.env.PORT) || 5173

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
}

createServer(async (req, res) => {
  let caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (caminho === '/' || caminho === '') caminho = '/index.html'

  // normalize + strip de ".." impede sair da pasta do projeto
  const seguro = normalize(caminho).replace(/^(\.\.[/\\])+/, '')
  const alvo = join(RAIZ, seguro)

  try {
    const corpo = await readFile(alvo)
    res.writeHead(200, {
      'Content-Type': TIPOS[extname(alvo).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    res.end(corpo)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Nao encontrado: ' + seguro)
  }
}).listen(PORTA, '127.0.0.1', () => {
  console.log(`\n  Vida Animal  ->  http://127.0.0.1:${PORTA}\n`)
})
