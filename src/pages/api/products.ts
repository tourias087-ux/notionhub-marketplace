import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  id: string
  title: string
  price: number
  description: string
  slug: string
}

const PRODUCTS: Product[] = [
  { id: 'p1', title: 'Personal Planner', price: 9, description: 'Compact planner for daily use.', slug: 'personal-planner' },
  { id: 'p2', title: 'Freelancer CRM', price: 29, description: 'CRM + proposals + invoices for freelancers.', slug: 'freelancer-crm' },
  { id: 'p3', title: 'Startup One-Pager', price: 19, description: 'Investor-ready one-pager and roadmap.', slug: 'startup-one-pager' }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return the product list (in a real app you'd fetch Notion DB)
    res.status(200).json({ data: PRODUCTS })
    return
  }

  if (req.method === 'POST') {
    // Example: create a new product (validate and persist in a DB in real app)
    const body = req.body
    if (!body?.title || !body?.price) {
      res.status(400).json({ error: 'Missing title or price' })
      return
    }
    const newProduct: Product = {
      id: `p${PRODUCTS.length + 1}`,
      title: body.title,
      price: Number(body.price),
      description: body.description || '',
      slug: (body.title || 'product').toLowerCase().replace(/\s+/g, '-')
    }
    PRODUCTS.push(newProduct)
    res.status(201).json({ data: newProduct })
    return
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
