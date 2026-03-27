import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { posts } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')

  if (slug) {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug))
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  }

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt))
  return NextResponse.json(allPosts)
}

export async function POST(request: NextRequest) {
  const { title, content } = await request.json()

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const slug = (title as string)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')

  const [post] = await db.insert(posts).values({ title: title.trim(), slug, content: content.trim() }).returning()
  return NextResponse.json(post, { status: 201 })
}
