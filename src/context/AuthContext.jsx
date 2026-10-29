import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp: (email, password, nickname) =>
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname },
          emailRedirectTo: window.location.origin,
        },
      }),
    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),
    signInWithProvider: (provider) =>
      supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/search`,
          // 카카오는 이메일 권한이 비즈 앱 전용이라 닉네임/프로필만 요청
          ...(provider === 'kakao' && { scopes: 'profile_nickname profile_image' }),
        },
      }),
    signOut: () => supabase.auth.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
