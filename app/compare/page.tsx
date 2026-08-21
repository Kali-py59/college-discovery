'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type College = {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  placements: {
    avgPackage?: number
    highestPackage?: number
  } | null
}

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('compareList') || '[]') as string[]

    if (ids.length === 0) {
      setLoading(false)
      return
    }

    fetch(`/api/colleges/compare?ids=${ids.join(',')}`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data)
        setLoading(false)
      })
  }, [])

  function clearAll() {
    localStorage.removeItem('compareList')
    setColleges([])
  }

  if (loading) return <main className="max-w-4xl mx-auto p-8">Loading...</main>

  if (colleges.length === 0) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to all colleges
        </Link>
        <p className="mt-6 text-gray-600">
          No colleges selected yet. Go back and click "Add to Compare" on a few colleges.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <Link href="/" className="text-blue-600 hover:underline text-sm">
        ← Back to all colleges
      </Link>

      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-2xl font-bold">Compare Colleges</h1>
        <button
          onClick={clearAll}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 border-b"></th>
              {colleges.map((c) => (
                <th key={c.id} className="text-left p-2 border-b font-semibold">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b text-gray-500">Location</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-2 border-b">{c.location}</td>
              ))}
            </tr>
            <tr>
              <td className="p-2 border-b text-gray-500">Fees</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-2 border-b">₹{c.fees.toLocaleString()}/year</td>
              ))}
            </tr>
            <tr>
              <td className="p-2 border-b text-gray-500">Rating</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-2 border-b">⭐ {c.rating}</td>
              ))}
            </tr>
            <tr>
              <td className="p-2 border-b text-gray-500">Avg Package</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-2 border-b">
                  {c.placements?.avgPackage ? `₹${c.placements.avgPackage} LPA` : '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}