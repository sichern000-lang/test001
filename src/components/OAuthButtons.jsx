import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const PROVIDERS = [
  { id: 'google', label: 'Google로 계속하기', className: 'google' },
  { id: 'kakao', label: '카카오로 계속하기', className: 'kakao' },
]

export default function OAuthButtons() {
  const { signInWithProvider } = useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')

  async function handleClick(id) {
    setError('')
    setBusy(id)
    const { error } = await signInWithProvider(id)
    // 성공하면 소셜 로그인 페이지로 이동하므로 여기까지 오는 건 실패한 경우
    if (error) {
      setError(error.message)
      setBusy('')
    }
  }

  return (
    <div className="oauth">
      <div className="divider"><span>또는</span></div>
      {PROVIDERS.map((p) => (
        <button key={p.id} type="button" className={`oauth-btn ${p.className}`} disabled={Boolean(busy)} onClick={() => handleClick(p.id)}>
          {p.label}
        </button>
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
