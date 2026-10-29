import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { jejuKeywords } from '../data/keywords'

export default function Search() {
  const { user } = useAuth()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || '제주도'

  const [input, setInput] = useState(q)
  const [images, setImages] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 검색어가 바뀌면 처음부터 다시 조회
  useEffect(() => {
    setInput(q)
    setImages([])
    setPage(1)
    load(q, 1, true)
  }, [q])

  async function load(query, pageNo, replace) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/pixabay?q=${encodeURIComponent(query)}&page=${pageNo}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '이미지를 불러오지 못했습니다.')
      setTotal(data.total)
      setImages((prev) => (replace ? data.hits : [...prev, ...data.hits]))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = input.trim()
    if (next) setParams({ q: next })
  }

  function loadMore() {
    const next = page + 1
    setPage(next)
    load(q, next, false)
  }

  const name = user?.user_metadata?.nickname || user?.email

  return (
    <section className="search">
      <div className="search-head">
        <span className="eyebrow">✳ {name}님의 이미지 찾기</span>
        <h2>어떤 제주를<br />찾고 계세요?</h2>
        <form className="hero-form" onSubmit={handleSubmit}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: 한라산, 해녀, 협재해변" />
          <button className="btn">검색 <span aria-hidden>→</span></button>
        </form>
        <div className="chips">
          {jejuKeywords.map((k) => (
            <button key={k} className={`chip ${k === q ? 'on' : ''}`} onClick={() => setParams({ q: k })}>
              {k}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="error center">{error}</p>}
      {!error && !loading && images.length === 0 && <p className="muted center">검색 결과가 없습니다.</p>}

      <div className="photos">
        {images.map((img) => (
          <figure key={img.id}>
            <a href={img.large} target="_blank" rel="noreferrer">
              <img src={img.thumb} alt={img.tags} loading="lazy" />
            </a>
            <figcaption>
              <span>{img.tags}</span>
              <a href={img.page} target="_blank" rel="noreferrer">by {img.user}</a>
            </figcaption>
          </figure>
        ))}
      </div>

      {loading && <p className="center muted">불러오는 중…</p>}
      {!loading && images.length > 0 && images.length < total && page < 20 && (
        <div className="row-center"><button className="btn ghost" onClick={loadMore}>더 보기</button></div>
      )}
    </section>
  )
}
