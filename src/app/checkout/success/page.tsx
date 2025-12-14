export default function SuccessPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const sessionId = searchParams?.session_id || ''
  return (
    <div>
      <h1 style={{ fontSize: 28 }}>Payment successful 🎉</h1>
      <p style={{ color: '#555' }}>
        Thanks for your purchase. Your files and instructions will be emailed or made available according to your order.
      </p>
      {sessionId && (
        <p style={{ fontSize: 13, color: '#666' }}>
          Session ID: <code>{sessionId}</code>
        </p>
      )}
      <p style={{ marginTop: 12 }}>
        <a href="/" style={{ color: '#0366d6' }}>Return to home</a>
      </p>
    </div>
  )
}
