'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.get('title'),
        content: formData.get('content'),
      }),
    })

    if (!res.ok) {
      const { error } = await res.json()
      setError(error ?? 'Something went wrong')
      setSubmitting(false)
      return
    }

    router.push('/admin')
  }

  const inputStyle = {
    width: '100%',
    fontSize: '15px',
    padding: '10px 14px',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    background: 'var(--bg)',
    color: 'var(--fg)',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '32px 0 28px' }}>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-muted)' }}>
              new post
            </span>
            <Link
              href="/admin"
              style={{ fontSize: '13px', color: 'var(--fg-muted)', textDecoration: 'none', fontFamily: 'var(--font-geist-mono)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
            >
              ← admin
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
        <form onSubmit={handleSubmit} style={{ paddingTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {error && (
            <p style={{ fontSize: '13px', color: '#dc2626', fontFamily: 'var(--font-geist-mono)', padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="title" style={{ fontSize: '12px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Post title"
              style={{ ...inputStyle, fontSize: '20px', fontWeight: 600, padding: '10px 0', border: 'none', borderBottom: '2px solid var(--border)', borderRadius: 0 }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--fg)')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="content" style={{ fontSize: '12px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={16}
              placeholder="Write something..."
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--fg)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '48px' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: 'var(--font-geist-mono)',
                color: 'var(--bg)',
                background: submitting ? 'var(--fg-muted)' : 'var(--fg)',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '6px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = 'var(--accent)' }}
              onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = 'var(--fg)' }}
            >
              {submitting ? 'publishing...' : 'publish →'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
