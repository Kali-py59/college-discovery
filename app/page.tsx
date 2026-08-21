import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
  const colleges = await prisma.college.findMany({
    orderBy: { rating: 'desc' },
  })

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">College Discovery</h1>

      <div className="grid gap-4">
        {colleges.map((college) => (
          <Link
            key={college.id}
            href={`/colleges/${college.id}`}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition block"
          >
            <h2 className="text-xl font-semibold">{college.name}</h2>
            <p className="text-gray-600">{college.location}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span>⭐ {college.rating}</span>
              <span>₹{college.fees.toLocaleString()}/year</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}