'use client'

import React, { useEffect, useState } from 'react'

type Product = {
  id: string
  title: string
  price: number
  description?: string
  slug?: string
}

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  slug?: string
}

const CART_KEY = 'nh_cart_v1'

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load products from local API
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(data?.data || []))
      .catch(() => setProducts([]))

    // Load cart from localStorage
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) setCart(JSON.parse(raw))
    } catch (e) {
      setCart([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  function addToCart(p: Product) {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === p.id)
      if (existing) {
        return prev.map((x) => (x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x))
      }
      return [...prev, { id: p.id, title: p.title, price: p.price, quantity: 1, slug: p.slug }]
    })
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((x) => x.id !== id))
      return
    }
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, quantity: qty } : x)))
  }

  function clearCart() {
    setCart([])
  }

  async function handleCheckout() {
    if (cart.length === 0) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((i) => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Checkout error')
      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err: any) {
      setError(err.message || 'Checkout failed')
      setLoading(false)
    }
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div>
      <h1 style={{ fontSize: 28 }}>Shop</h1>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18 }}>Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginTop: 12 }}>
          {products.map((p) => (
            <div key={p.id} style={{ border: '1px solid #e6e6e6', padding: 12, borderRadius: 8 }}>
              <h3 style={{ margin: '6px 0' }}>{p.title}</h3>
              <p style={{ color: '#666', fontSize: 14 }}>{p.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <strong>${p.price}</strong>
                <button onClick={() => addToCart(p)} style={{ padding: '6px 10px' }}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 18 }}>Cart</h2>
        {cart.length === 0 ? (
          <p style={{ color: '#666' }}>Your cart is empty.</p>
        ) : (
          <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
            {cart.map((it) => (
              <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f3f3' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{it.title}</div>
                  <div style={{ color: '#666', fontSize: 13 }}>${it.price} each</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => updateQty(it.id, it.quantity - 1)}>-</button>
                  <div>{it.quantity}</div>
                  <button onClick={() => updateQty(it.id, it.quantity + 1)}>+</button>
                  <div style={{ width: 80, textAlign: 'right' }}>${(it.price * it.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <div>
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={clearCart}>Clear</button>
                <button onClick={handleCheckout} disabled={loading} style={{ background: '#111827', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
                  {loading ? 'Redirecting…' : 'Checkout'}
                </button>
              </div>
            </div>

            {error && <div style={{ marginTop: 8, color: 'crimson' }}>{error}</div>}
          </div>
        )}
      </section>
    </div>
  )
}
