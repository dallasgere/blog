'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Post = {
  id: number
  title: string
  slug: string
  content: string
  createdAt: string
}

export default function Home() {
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '32px 0 28px' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--fg)' }}>
              The Log
            </span>
            <Link
              href="/admin"
              style={{ fontSize: '13px', color: 'var(--fg-muted)', textDecoration: 'none', fontFamily: 'var(--font-geist-mono)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
            >
              admin ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
        {loading ? (
          <p style={{ padding: '64px 0', color: 'var(--fg-faint)', fontSize: '14px', fontFamily: 'var(--font-geist-mono)' }}>
            loading...
          </p>
        ) : posts.length === 0 ? (
          <div style={{ padding: '64px 0' }}>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px' }}>
              Nothing here yet.{' '}
              <Link href="/admin/new" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                Write something →
              </Link>
            </p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {posts.map((post, i) => (
              <li
                key={post.id}
                style={{ borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ display: 'block', padding: '36px 0', textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <time style={{ fontSize: '12px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-faint)', letterSpacing: '0.02em' }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2
                      style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.3px', margin: 0, lineHeight: 1.3, color: 'var(--fg)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                    >
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--fg-muted)', margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.content}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
