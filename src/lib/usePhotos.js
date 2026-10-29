import { useEffect, useState } from 'react'

// 같은 키워드는 한 번만 요청 (서버 응답도 24시간 캐시됨)
const cache = new Map()

export function fetchPhotos(q) {
  if (!cache.has(q)) {
    cache.set(
      q,
      fetch(`/api/pixabay?q=${encodeURIComponent(q)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('fail'))))
        .then((d) => d.hits)
        .catch(() => {
          cache.delete(q)
          return []
        }),
    )
  }
  return cache.get(q)
}

export function usePhotos(q) {
  const [hits, setHits] = useState([])
  useEffect(() => {
    let alive = true
    fetchPhotos(q).then((h) => alive && setHits(h))
    return () => {
      alive = false
    }
  }, [q])
  return hits
}
