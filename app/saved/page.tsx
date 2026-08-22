import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import Link from 'next/link'

export default async function SavedPage() {
  const session = await auth()

  if (!session?.user?.email) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <p>Please <Link href="/login" className="text-blue-600">login</Link> to view saved colleges.</p>
      </main>
    )
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { savedColleges: { include: { college: true } } },
  })

  const colleges = user?.savedColleges.map((s) => s.college) || []

  return (
    <main className="max-w-3xl mx-auto p-8">
      <Link href="/" className="text-blue-600 hover:underline text-sm">← Back to all colleges</Link>
      <h1 className="text-2xl font-bold mt-4 mb-6">Saved Colleges</h1>
      {colleges.length === 0 ? (
        <p className="text-gray-500">No saved colleges yet.</p>
      ) : (
        <div className="grid gap-4">
          {colleges.map((c) => (
            <Link key={c.id} href={`/colleges/${c.id}`} className="border rounded-lg p-4 block">
              <h2 className="text-xl font-semibold">{c.name}</h2>
              <p className="text-gray-600">{c.location}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
