import { useAuth } from '../context/AuthContext'
import { jejuIps } from '../data/jejuIp'

export default function Gallery() {
  const { user } = useAuth()
  const name = user?.user_metadata?.nickname || user?.email

  return (
    <section>
      <h2>제주 IP 갤러리</h2>
      <p className="muted">{name}님, 환영합니다. 제주 문화 IP 소재 {jejuIps.length}가지입니다.</p>
      <div className="grid">
        {jejuIps.map((ip) => (
          <article className="card" key={ip.id}>
            <div className="emoji">{ip.emoji}</div>
            <h3>{ip.name}</h3>
            <span className="tag">{ip.tag}</span>
            <p>{ip.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
