import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
  }

  const { collegeId } = await req.json()

  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const existing = await prisma.savedCollege.findUnique({
    where: { userId_collegeId: { userId: user.id, collegeId } },
  })

  if (existing) {
    await prisma.savedCollege.delete({ where: { id: existing.id } })
    return NextResponse.json({ saved: false })
  } else {
    await prisma.savedCollege.create({ data: { userId: user.id, collegeId } })
    return NextResponse.json({ saved: true })
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json([])
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { savedColleges: { include: { college: true } } },
  })

  return NextResponse.json(user?.savedColleges.map((s) => s.college) || [])
}
