// Vercel Serverless Function: Pixabay API 프록시 (키를 브라우저에 노출하지 않기 위함)
export default async function handler(req, res) {
  const key = process.env.PIXABAY_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'PIXABAY_API_KEY 환경 변수가 설정되지 않았습니다.' })
  }

  const q = String(req.query.q || '').trim().slice(0, 100) || '제주도'
  const page = Math.min(Math.max(parseInt(req.query.page, 10) || 1, 1), 20)

  const params = new URLSearchParams({
    key,
    q,
    lang: 'ko',
    image_type: 'photo',
    per_page: '24',
    page: String(page),
    safesearch: 'true',
  })

  try {
    const upstream = await fetch(`https://pixabay.com/api/?${params}`)
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `Pixabay 응답 오류 (${upstream.status})` })
    }
    const data = await upstream.json()

    // Pixabay 권장: 결과를 24시간 캐시
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
    return res.status(200).json({
      total: data.totalHits,
      hits: data.hits.map((h) => ({
        id: h.id,
        thumb: h.webformatURL,
        large: h.largeImageURL,
        page: h.pageURL,
        tags: h.tags,
        user: h.user,
        width: h.imageWidth,
        height: h.imageHeight,
      })),
    })
  } catch {
    return res.status(502).json({ error: 'Pixabay 에 연결하지 못했습니다.' })
  }
}
