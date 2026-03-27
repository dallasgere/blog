import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { posts } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function DELETE(_req: NextRequest, ctx: RouteContext<'/api/posts/[id]'>) {
  const { id } = await ctx.params
  await db.delete(posts).where(eq(posts.id, Number(id)))
  return new NextResponse(null, { status: 204 })
}
