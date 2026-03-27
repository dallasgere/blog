'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Post = {
  id: number
  title: string
  slug: string
  createdAt: string
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  async function handleDelete(id: number) {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '32px 0 28px' }}>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-muted)' }}>
              admin
            </span>
            <Link
              href="/"
              style={{ fontSize: '13px', color: 'var(--fg-muted)', textDecoration: 'none', fontFamily: 'var(--font-geist-mono)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
            >
              ← blog
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
        {/* Action bar */}
        <div style={{ padding: '32px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', color: 'var(--fg-muted)' }}>
            {loading ? '' : `${posts.length} post${posts.length !== 1 ? 's' : ''}`}
          </span>
          <Link
            href="/admin/new"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--bg)',
              background: 'var(--fg)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontFamily: 'var(--font-geist-mono)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--fg)')}
          >
            + new post
          </Link>
        </div>

        {/* Post list */}
        {loading ? (
          <p style={{ padding: '48px 0', color: 'var(--fg-faint)', fontSize: '14px', fontFamily: 'var(--font-geist-mono)' }}>
            loading...
          </p>
        ) : posts.length === 0 ? (
          <p style={{ padding: '48px 0', color: 'var(--fg-muted)', fontSize: '15px' }}>No posts yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: '24px 0 0', margin: 0 }}>
            {posts.map((post, i) => (
              <li
                key={post.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '18px 0',
                  borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ fontSize: '15px', fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                  >
                    {post.title}
                  </Link>
                  <time style={{ fontSize: '12px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-faint)' }}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-geist-mono)',
                    color: 'var(--fg-faint)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-faint)')}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
