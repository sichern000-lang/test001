import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { isSupabaseConfigured } from './lib/supabase'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Gallery from './pages/Gallery'
import Profile from './pages/Profile'

export default function App() {
  if (!isSupabaseConfigured) {
    return (
      <div className="panel">
        <h2>환경 변수가 필요합니다</h2>
        <p>
          <code>VITE_SUPABASE_URL</code> 과 <code>VITE_SUPABASE_ANON_KEY</code> 를
          .env.local (로컬) 또는 Vercel Environment Variables 에 등록한 뒤 다시 실행/배포하세요.
        </p>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<p className="center muted">페이지를 찾을 수 없습니다.</p>} />
        </Routes>
      </main>
      <footer>© 2026 제주 IP 라운지</footer>
    </>
  )
}
