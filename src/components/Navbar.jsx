import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="nav">
      <Link to="/" className="brand">🍊 제주 IP 라운지</Link>
      <nav>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/gallery">IP 갤러리</NavLink>
        {user ? (
          <>
            <NavLink to="/profile">내 정보</NavLink>
            <button className="btn ghost" onClick={handleSignOut}>로그아웃</button>
          </>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>
            <Link to="/signup" className="btn">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  )
}
