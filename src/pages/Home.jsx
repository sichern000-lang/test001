import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Photo from '../components/Photo'
import { collections, spots } from '../data/keywords'

const searchUrl = (q) => `/search?q=${encodeURIComponent(q)}`

function HeroForm() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (user) navigate(searchUrl(value.trim() || '제주도'))
    else navigate('/signup', { state: { email: value.trim() } })
  }

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <input
        type={user ? 'text' : 'email'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={user ? '찾고 싶은 풍경 (예: 한라산)' : '이메일을 입력하세요'}
      />
      <button className="btn">{user ? '검색' : '시작하기'} <span aria-hidden>→</span></button>
    </form>
  )
}

export default function Home() {
  const { user } = useAuth()

  return (
    <>
      {/* 1. Hero */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow">✳ Jeju Image Lounge</span>
          <h1>
            제주의 풍경을<br />
            한 장씩 <u>찾아서</u><br />
            담아보세요.
          </h1>
          <HeroForm />
          <div className="hero-note">
            <div className="avatars">
              <Photo q="바다" i={2} />
              <Photo q="오름" i={2} />
              <Photo q="유채꽃" i={2} />
            </div>
            <span>무료 사진 수백만 장 중에서<br />제주의 순간을 검색해요</span>
          </div>
        </div>

        <Photo q="한라산" i={0} size="large" className="hero-right">
          <Link className="hero-tag" to={user ? searchUrl('유채꽃') : '/signup'}>
            <Photo q="유채꽃" i={1} />
            <span>오늘의 키워드<br /><b>유채꽃</b></span>
          </Link>
          <div className="hero-bubbles">
            <Link to={searchUrl('한라산')}>한라산</Link>
            <Link to={searchUrl('바다')}>바다</Link>
            <Link to={searchUrl('오름')}>오름</Link>
          </div>
          <p className="hero-caption">키워드 하나로 제주의 풍경을<br />찾고 원본을 내려받아 보세요.</p>
        </Photo>
      </section>

      {/* 2. Mission */}
      <section className="mission">
        <Photo q="바다" i={0} className="float f1" />
        <Photo q="오름" i={0} className="float f2" />
        <Photo q="감귤" i={0} className="float f3" />
        <Photo q="유채꽃" i={0} className="float f4" />
        <h2>제주의 모든 순간을<br />한 장으로 담아요</h2>
        <p>바다, 오름, 돌담, 감귤밭까지.<br />원하는 풍경을 검색하고 바로 열어 보세요.</p>
        <div className="row-center">
          <Link className="btn ghost" to={user ? '/search' : '/signup'}>이미지 찾기 →</Link>
          <a className="link-dot" href="#collections">시즌 컬렉션 보기</a>
        </div>
      </section>

      {/* 3. Pill row */}
      <section className="pills">
        <div className="pill gray"><span>제주를</span></div>
        <Photo q="바다" i={1} className="pill"><span>찾고</span></Photo>
        <Link className="pill lime" to={user ? '/search' : '/signup'} aria-label="이미지 찾기">
          <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </Link>
        <Photo q="오름" i={1} className="pill"><span>담다</span></Photo>
      </section>

      {/* 4. Collections list */}
      <section className="collections" id="collections">
        <div className="section-head">
          <h2>시즌 컬렉션</h2>
          <p>계절마다 달라지는 제주의 얼굴을<br />키워드로 모아 두었어요.</p>
        </div>
        <div className="list-head">
          <span>제목</span><span>태그</span><span>시기</span><span />
        </div>
        {collections.map((c, idx) => (
          <Link key={c.title} to={user ? searchUrl(c.q) : '/login'} state={{ from: searchUrl(c.q) }} className="list-row">
            <span className="list-title">{c.title}</span>
            <span className="tags">
              {c.tags.map((t, n) => <em key={t} className={idx % 2 === 1 && n === 0 ? 'hl' : ''}>{t}</em>)}
            </span>
            <span className="list-date">{c.season}</span>
            <span className="arrow">↗</span>
            <Photo q={c.q} i={idx + 2} className="list-pop" />
          </Link>
        ))}
      </section>

      {/* 5. Spot cards */}
      <section className="spots">
        {spots.map((s) => (
          <Link key={s.q} to={user ? searchUrl(s.q) : '/login'} state={{ from: searchUrl(s.q) }}>
            <Photo q={s.q} i={s.i} className="spot">
              <div className="spot-top">
                <span className="tags">{s.tags.map((t) => <em key={t}>{t}</em>)}</span>
                <span className="arrow">↗</span>
              </div>
              <div className="spot-bottom">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="spot-btn">사진 보러 가기 <span>→</span></span>
              </div>
            </Photo>
          </Link>
        ))}
      </section>

      {/* 6. CTA */}
      {!user && (
        <section className="cta">
          <span className="eyebrow">✳ 무료 회원가입</span>
          <h2>지금 가입하고<br />제주 사진을 마음껏 찾아보세요.</h2>
          <Link className="btn" to="/signup">회원가입 →</Link>
        </section>
      )}
    </>
  )
}
