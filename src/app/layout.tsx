import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'NotionHub Marketplace',
  description: 'Sell and showcase Notion templates & resources',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: 20, borderBottom: '1px solid #eee' }}>
          <nav style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 700 }}>NotionHub</div>
            <div>
              <a href="/" style={{ marginRight: 16 }}>Home</a>
              <a href="/shop" style={{ marginRight: 16 }}>Shop</a>
              <a href="/dashboard">Dashboard</a>
            </div>
          </nav>
        </header>
        <main style={{ maxWidth: 960, margin: '32px auto', padding: '0 16px' }}>{children}</main>
        <footer style={{ padding: 20, borderTop: '1px solid #eee', marginTop: 40, textAlign: 'center' }}>
          © {new Date().getFullYear()} NotionHub — Built with ♥
        </footer>
      </body>
    </html>
  )
}
