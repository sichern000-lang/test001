import { useAuth } from '../context/AuthContext'
import { displayName } from '../lib/user'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="panel">
      <h2>내 정보</h2>
      <dl>
        <dt>닉네임</dt>
        <dd>{displayName(user) || '-'}</dd>
        <dt>이메일</dt>
        <dd>{user.email}</dd>
        <dt>가입일</dt>
        <dd>{new Date(user.created_at).toLocaleDateString('ko-KR')}</dd>
      </dl>
    </div>
  )
}
