import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

function friendly(error) {
  if (/cart_items/.test(error.message) && /(does not exist|schema cache)/.test(error.message)) {
    return 'cart_items 테이블이 없습니다. supabase/cart.sql 을 SQL Editor 에서 실행해 주세요.'
  }
  return error.message
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      setItems([])
      setOpen(false)
      return
    }
    let alive = true
    supabase
      .from('cart_items')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return
        if (error) setError(friendly(error))
        else {
          setError('')
          setItems(data)
        }
      })
    return () => {
      alive = false
    }
  }, [user?.id])

  const ids = useMemo(() => new Set(items.map((i) => i.pixabay_id)), [items])

  async function add(img) {
    setError('')
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        pixabay_id: img.id,
        thumb_url: img.thumb,
        large_url: img.large,
        page_url: img.page,
        tags: img.tags,
        photographer: img.user,
      })
      .select()
      .single()
    if (error) {
      if (error.code !== '23505') setError(friendly(error)) // 23505: 이미 담긴 사진
      return
    }
    setItems((prev) => [data, ...prev])
  }

  async function remove(pixabayId) {
    setError('')
    const { error } = await supabase.from('cart_items').delete().eq('pixabay_id', pixabayId)
    if (error) return setError(friendly(error))
    setItems((prev) => prev.filter((i) => i.pixabay_id !== pixabayId))
  }

  async function clear() {
    setError('')
    const { error } = await supabase.from('cart_items').delete().eq('user_id', user.id)
    if (error) return setError(friendly(error))
    setItems([])
  }

  const value = {
    items,
    count: items.length,
    total: 0, // 실제 결제 없음: 항상 0원
    error,
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    has: (pixabayId) => ids.has(pixabayId),
    toggle: (img) => (ids.has(img.id) ? remove(img.id) : add(img)),
    remove,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
