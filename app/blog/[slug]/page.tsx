'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type Post = {
  id: number
  title: string
  slug: string
  content: string
  createdAt: string
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/posts?slug=${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true)
          setLoading(false)
          return null
        }
        return r.json()
      })
      .then((data) => {
        if (data) {
          setPost(data)
          setLoading(false)
        }
      })
  }, [slug])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '28px 0' }}>
            <Link
              href="/"
              style={{ fontSize: '13px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
            >
              ← The Log
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
        {loading ? (
          <p style={{ padding: '64px 0', color: 'var(--fg-faint)', fontSize: '14px', fontFamily: 'var(--font-geist-mono)' }}>
            loading...
          </p>
        ) : notFound || !post ? (
          <div style={{ padding: '64px 0' }}>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px' }}>Post not found.</p>
          </div>
        ) : (
          <article style={{ padding: '56px 0 80px' }}>
            <time style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-geist-mono)', color: 'var(--fg-faint)', letterSpacing: '0.02em', marginBottom: '20px' }}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.6px', lineHeight: 1.25, margin: '0 0 40px', color: 'var(--fg)' }}>
              {post.title}
            </h1>
            <div style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--fg)', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </div>
          </article>
        )}
      </main>
    </div>
  )
}
