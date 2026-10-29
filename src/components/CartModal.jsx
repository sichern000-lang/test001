import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function CartModal() {
  const { open, closeCart, items, count, error, remove, clear } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={closeCart}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="장바구니" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>장바구니 <span className="muted">{count}</span></h3>
          <button className="arrow" onClick={closeCart} aria-label="닫기">✕</button>
        </div>

        {error && <p className="error">{error}</p>}

        {count === 0 ? (
          <p className="muted center modal-empty">아직 담은 사진이 없어요.<br />검색 결과에서 마음에 드는 사진을 담아 보세요.</p>
        ) : (
          <ul className="cart-list">
            {items.map((it) => (
              <li key={it.id}>
                <a href={it.large_url} target="_blank" rel="noreferrer">
                  <img src={it.thumb_url} alt={it.tags || ''} />
                </a>
                <div className="cart-info">
                  <b>{it.tags || '제주 이미지'}</b>
                  <a className="muted" href={it.page_url} target="_blank" rel="noreferrer">by {it.photographer}</a>
                </div>
                <span className="price">0원</span>
                <button className="arrow" onClick={() => remove(it.pixabay_id)} aria-label="빼기">✕</button>
              </li>
            ))}
          </ul>
        )}

        <div className="modal-foot">
          <div className="total"><span>합계</span><b>0원</b></div>
          <div className="row-center">
            <button className="btn ghost" onClick={clear} disabled={count === 0}>비우기</button>
            <button className="btn lime" onClick={closeCart}>계속 둘러보기</button>
          </div>
          <p className="muted center small">체험용 장바구니로 실제 결제는 이루어지지 않습니다.</p>
        </div>
      </div>
    </div>
  )
}
