import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import CompareBar from './CompareBar'
import SaveButton from './SaveButton'

export default async function Home() {
  const colleges = await prisma.college.findMany({
    orderBy: { rating: 'desc' },
  })

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">College Discovery</h1>
        <div className="flex gap-3">
          <Link href="/saved" className="text-sm border px-4 py-2 rounded">Saved</Link>
          <Link href="/compare" className="text-sm bg-blue-600 text-white px-4 py-2 rounded">
            View Comparison →
          </Link>
          <Link href="/login" className="text-sm border px-4 py-2 rounded">Login</Link>
        </div>
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
            <div className="flex mt-2">
              <CompareBar collegeId={college.id} />
              <SaveButton collegeId={college.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
