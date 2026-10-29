import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { user, signUp } = useAuth()

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/gallery" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    setBusy(true)
    const { data, error } = await signUp(email, password, nickname)
    setBusy(false)
    if (error) {
      setError(error.message)
      return
    }
    // 이메일 인증을 끈 프로젝트는 session 이 바로 생기고 자동 로그인 → 위 Navigate 로 이동
    if (!data.session) setDone(true)
  }

  if (done) {
    return (
      <div className="panel">
        <h2>메일을 확인해 주세요 📬</h2>
        <p><b>{email}</b> 로 인증 메일을 보냈습니다. 메일의 링크를 누르면 가입이 완료됩니다.</p>
        <Link className="btn" to="/login">로그인 하러 가기</Link>
      </div>
    )
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <label>
        닉네임
        <input required maxLength={20} value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </label>
      <label>
        이메일
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        비밀번호 (6자 이상)
        <input type="password" required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="btn big" disabled={busy}>{busy ? '가입 중…' : '가입하기'}</button>
      <p className="muted">이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
    </form>
  )
}
