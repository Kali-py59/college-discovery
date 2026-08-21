'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompareBar({ collegeId }: { collegeId: string }) {
  const [selected, setSelected] = useState(false)
  const router = useRouter()

  function toggleSelect(e: React.MouseEvent) {
    e.preventDefault() // stop the card's own Link from navigating
    e.stopPropagation()

    const stored = JSON.parse(localStorage.getItem('compareList') || '[]') as string[]

    let updated: string[]
    if (stored.includes(collegeId)) {
      updated = stored.filter((id) => id !== collegeId)
      setSelected(false)
    } else {
      if (stored.length >= 3) {
        alert('You can compare up to 3 colleges only.')
        return
      }
      updated = [...stored, collegeId]
      setSelected(true)
    }

    localStorage.setItem('compareList', JSON.stringify(updated))
  }

  return (
    <button
      onClick={toggleSelect}
      className={`text-xs px-3 py-1 rounded-full border mt-2 ${
        selected ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
      }`}
    >
      {selected ? '✓ Added to Compare' : '+ Add to Compare'}
    </button>
  )
}