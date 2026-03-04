import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function ProjectListSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 pb-16 w-full'>
        <Skeleton className="w-full h-60" />
        <Skeleton className="w-full h-60" />
        <Skeleton className="w-full h-60" />
    </div>
  )
}

export default ProjectListSkeleton