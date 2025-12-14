import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 34, margin: '8px 0' }}>NotionHub Marketplace</h1>
        <p style={{ color: '#555' }}>
          A simple marketplace for buying and selling Notion templates, dashboards, and resources. Built with
          Next.js and Notion as the content source.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22 }}>Featured Templates</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 12 }}>
          <article style={{ border: '1px solid #e6e6e6', borderRadius: 8, padding: 12 }}>
            <h3 style={{ margin: '6px 0' }}>Personal Planner</h3>
            <p style={{ color: '#666', fontSize: 14 }}>
              A compact personal planner template with tasks, goals, and weekly views.
            </p>
            <div style={{ marginTop: 8 }}>
              <Link href="/products/personal-planner"><a>View</a></Link>
            </div>
          </article>

          <article style={{ border: '1px solid #e6e6e6', borderRadius: 8, padding: 12 }}>
            <h3 style={{ margin: '6px 0' }}>Freelancer CRM</h3>
            <p style={{ color: '#666', fontSize: 14 }}>
              Manage clients, proposals, invoices, and projects, built specifically for freelancers.
            </p>
            <div style={{ marginTop: 8 }}>
              <Link href="/products/freelancer-crm"><a>View</a></Link>
            </div>
          </article>

          <article style={{ border: '1px solid #e6e6e6', borderRadius: 8, padding: 12 }}>
            <h3 style={{ margin: '6px 0' }}>Startup One-Pager</h3>
            <p style={{ color: '#666', fontSize: 14 }}>
              A polished landing + roadmap template to present an early stage startup.
            </p>
            <div style={{ marginTop: 8 }}>
              <Link href="/products/startup-one-pager"><a>View</a></Link>
            </div>
          </article>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22 }}>How it works</h2>
        <ol style={{ color: '#555' }}>
          <li>Connect your Notion database to list templates and product details.</li>
          <li>Use Stripe to accept payments and deliver template download links or sharing instructions.</li>
          <li>Manage orders in the dashboard and fulfil manually or with automation.</li>
        </ol>
      </section>

      <section>
        <h2 style={{ fontSize: 22 }}>Get started</h2>
        <p style={{ color: '#555' }}>
          To preview locally, run the dev server and visit <strong>http://localhost:3000</strong>.
        </p>
        <div style={{ marginTop: 12 }}>
          <Link href="/setup"><a>Setup Guide</a></Link>
        </div>
      </section>
    </div>
  )
}
