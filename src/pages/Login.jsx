import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import OAuthButtons from '../components/OAuthButtons'

export default function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/search'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error } = await signIn(email, password)
    setBusy(false)
    if (error) {
      setError(
        error.message === 'Invalid login credentials'
          ? '이메일 또는 비밀번호가 올바르지 않습니다.'
          : error.message === 'Email not confirmed'
            ? '이메일 인증이 아직 완료되지 않았습니다. 메일함을 확인해 주세요.'
            : error.message,
      )
      return
    }
    navigate(redirectTo, { replace: true })
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <label>
        이메일
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        비밀번호
        <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="btn big" disabled={busy}>{busy ? '로그인 중…' : '로그인'}</button>
      <OAuthButtons />
      <p className="muted">계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
    </form>
  )
}
