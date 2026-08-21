import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const idsParam = req.nextUrl.searchParams.get('ids')

  if (!idsParam) {
    return NextResponse.json([])
  }

  const ids = idsParam.split(',')

  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
  })

  return NextResponse.json(colleges)
}