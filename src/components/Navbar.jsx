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
      <nav className="pill-group">
        <NavLink to="/" end>홈</NavLink>
        <NavLink to="/search">이미지 찾기</NavLink>
        {user && <NavLink to="/profile">내 정보</NavLink>}
      </nav>

      <Link to="/" className="brand"><i /> 제주 이미지 찾기</Link>

      <nav className="pill-group">
        {user ? (
          <button onClick={handleSignOut}>로그아웃</button>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>
            <Link to="/signup" className="solid">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  )
}
