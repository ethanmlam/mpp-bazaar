import { createServer } from 'node:http'
import { exec } from 'node:child_process'

const PORT = 8788

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }
  if (req.method !== 'POST') { res.writeHead(405); res.end(); return }

  let body = ''
  req.on('data', (chunk) => (body += chunk))
  req.on('end', () => {
    // Escape single quotes in the JSON for shell safety
    const escaped = body.replace(/'/g, "'\\''")
    const cmd = `tempo request -X POST --json '${escaped}' http://localhost:8787/api/order`

    console.log('[pay-proxy]', cmd)

    exec(cmd, { timeout: 30000 }, (err, stdout, stderr) => {
      if (err) {
        console.error('[pay-proxy] error:', stderr || err.message)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: stderr || err.message }))
        return
      }
      console.log('[pay-proxy] success:', stdout.substring(0, 200))
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(stdout)
    })
  })
})

server.listen(PORT, () => {
  console.log(`[pay-proxy] listening on http://localhost:${PORT}`)
  console.log('[pay-proxy] proxies to: tempo request → http://localhost:8787/api/order')
})
