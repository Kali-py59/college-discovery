import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import CompareBar from './CompareBar'

export default async function Home() {
  const colleges = await prisma.college.findMany({
    orderBy: { rating: 'desc' },
  })

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">College Discovery</h1>
        <Link
          href="/compare"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Comparison →
        </Link>
      </div>

      <div className="grid gap-4">
        {colleges.map((college) => (
          <div key={college.id} className="border rounded-lg p-4 shadow-sm">
            <Link href={`/colleges/${college.id}`} className="block">
              <h2 className="text-xl font-semibold">{college.name}</h2>
              <p className="text-gray-600">{college.location}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>⭐ {college.rating}</span>
                <span>₹{college.fees.toLocaleString()}/year</span>
              </div>
            </Link>
            <CompareBar collegeId={college.id} />
          </div>
        ))}
      </div>
    </main>
  )
}