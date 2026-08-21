import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CollegeDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const college = await prisma.college.findUnique({
    where: { id },
    include: { reviews: true },
  })

  if (!college) {
    notFound()
  }

  const placements = college.placements as {
    avgPackage?: number
    highestPackage?: number
    topRecruiters?: string[]
  } | null

  return (
    <main className="max-w-3xl mx-auto p-8">
      <Link href="/" className="text-blue-600 hover:underline text-sm">
        ← Back to all colleges
      </Link>

      <h1 className="text-3xl font-bold mt-4">{college.name}</h1>
      <p className="text-gray-600 mt-1">{college.location}</p>

      <div className="flex gap-6 mt-4 text-sm">
        <span>⭐ {college.rating} rating</span>
        <span>₹{college.fees.toLocaleString()}/year</span>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-700">{college.overview}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Courses</h2>
        <div className="flex flex-wrap gap-2">
          {college.courses.map((course) => (
            <span
              key={course}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {course}
            </span>
          ))}
        </div>
      </section>

      {placements && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Placements</h2>
          <div className="flex gap-6 text-sm">
            {placements.avgPackage && (
              <span>Average: ₹{placements.avgPackage} LPA</span>
            )}
            {placements.highestPackage && (
              <span>Highest: ₹{placements.highestPackage} LPA</span>
            )}
          </div>
          {placements.topRecruiters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {placements.topRecruiters.map((r) => (
                <span
                  key={r}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {college.reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {college.reviews.map((review) => (
              <div key={review.id} className="border rounded p-3">
                <p className="font-medium">
                  {review.authorName} — ⭐ {review.rating}
                </p>
                <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}