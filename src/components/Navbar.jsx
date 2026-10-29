import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { count, openCart } = useCart()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="nav">
      <nav className="pill-group">
        {user && (
          <button className="cart-btn" onClick={openCart} aria-label={`장바구니 ${count}개`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" /><circle cx="9.5" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" />
            </svg>
            {count > 0 && <i>{count}</i>}
          </button>
        )}
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
