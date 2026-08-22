'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function SaveButton({ collegeId }: { collegeId: string }) {
  const { data: session } = useSession()
  const [saved, setSaved] = useState(false)

  async function toggleSave(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!session) {
      alert('Please login to save colleges')
      return
    }

    const res = await fetch('/api/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collegeId }),
    })
    const data = await res.json()
    setSaved(data.saved)
  }

  return (
    <button
      onClick={toggleSave}
      className={`text-xs px-3 py-1 rounded-full border ml-2 ${
        saved ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
      }`}
    >
      {saved ? '✓ Saved' : '♡ Save'}
    </button>
  )
}
