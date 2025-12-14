import { NextResponse } from 'next/server'

// Example in-memory data (replace with your DB/Notion fetch)
const PRODUCTS = [
  { id: '1', title: 'Personal Planner', price: 9, description: 'Compact planner.' },
  { id: '2', title: 'Freelancer CRM', price: 29, description: 'CRM for freelancers.' },
  { id: '3', title: 'Startup One-Pager', price: 19, description: 'Investor one-pager.' },
]

export async function GET(_req: Request, { params }: { params: { id?: string } }) {
  const id = params?.id
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const product = PRODUCTS.find((p) => p.id === id)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ data: product })
}
