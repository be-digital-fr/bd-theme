import React from 'react'
import { Skeleton } from '@/app/_components/ui/skeleton'

export default function LoadingFilter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-24 md:h-32 w-full"
        />
      ))}
    </div>
  )
}
