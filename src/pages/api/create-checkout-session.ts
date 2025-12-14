import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  try {
    const { items } = req.body
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'No items provided' })
      return
    }

    const line_items = items.map((it: { title: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: it.title },
        unit_amount: Math.round(Number(it.price) * 100),
      },
      quantity: Number(it.quantity) || 1,
    }))

    const origin = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:3000`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    })

    res.status(200).json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe error', err)
    res.status(500).json({ error: err.message || 'Server error' })
  }
}
