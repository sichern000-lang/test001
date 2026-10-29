import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// 로컬 `npm run dev` 에서도 /api/pixabay 가 동작하도록 Vercel 함수를 그대로 연결
function localApi(env) {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/pixabay', async (req, res) => {
        Object.assign(process.env, env)
        const url = new URL(req.url, 'http://localhost')
        req.query = Object.fromEntries(url.searchParams)
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (body) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }
        const { default: handler } = await server.ssrLoadModule('/api/pixabay.js')
        await handler(req, res)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), localApi(env)] }
})
