import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { jejuKeywords } from '../data/keywords'

export default function Home() {
  const { user } = useAuth()

  return (
    <>
      <section className="hero">
        <h1>제주의 풍경을<br />사진으로 찾아보세요</h1>
        <p>한라산, 바다, 오름, 돌하르방… 키워드 하나로 제주 이미지를 검색하고 원본을 바로 열어 볼 수 있어요.</p>
        {user ? (
          <Link className="btn big" to="/search">이미지 찾기</Link>
        ) : (
          <Link className="btn big" to="/signup">무료로 시작하기</Link>
        )}
      </section>

      <section>
        <h2>인기 키워드</h2>
        <div className="chips">
          {jejuKeywords.map((k) => (
            <Link key={k} className="chip" to={`/search?q=${encodeURIComponent(k)}`}>{k}</Link>
          ))}
        </div>
        <p className="muted center">이미지 검색은 로그인한 회원만 이용할 수 있습니다.</p>
      </section>
    </>
  )
}
