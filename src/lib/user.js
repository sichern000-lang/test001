// 이메일 가입은 nickname, 소셜 로그인은 provider 가 주는 name 계열 값을 사용
export function displayName(user) {
  const m = user?.user_metadata ?? {}
  return m.nickname || m.name || m.full_name || m.preferred_username || user?.email || ''
}
