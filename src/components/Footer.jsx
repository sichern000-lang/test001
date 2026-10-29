import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 제주 이미지 찾기</span>
      <Link to="/" className="brand"><i /> 제주 이미지 찾기</Link>
      <span className="pill-group">
        <a href="https://pixabay.com" target="_blank" rel="noreferrer">Photos by Pixabay</a>
      </span>
    </footer>
  )
}
