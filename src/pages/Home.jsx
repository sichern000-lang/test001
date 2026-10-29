import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { jejuIps } from '../data/jejuIp'

export default function Home() {
  const { user } = useAuth()

  return (
    <>
      <section className="hero">
        <h1>제주의 이야기를<br />IP로 만나는 곳</h1>
        <p>돌하르방, 해녀, 감귤, 한라산… 제주를 대표하는 문화 IP를 모아 보고 아이디어를 나눠 보세요.</p>
        {user ? (
          <Link className="btn big" to="/gallery">IP 갤러리 보기</Link>
        ) : (
          <Link className="btn big" to="/signup">무료로 시작하기</Link>
        )}
      </section>

      <section>
        <h2>미리보기</h2>
        <div className="grid">
          {jejuIps.slice(0, 3).map((ip) => (
            <article className="card" key={ip.id}>
              <div className="emoji">{ip.emoji}</div>
              <h3>{ip.name}</h3>
              <span className="tag">{ip.tag}</span>
            </article>
          ))}
        </div>
        <p className="muted center">전체 IP 목록과 상세 설명은 회원에게만 공개됩니다.</p>
      </section>
    </>
  )
}
