import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function PageBanner({ title, description, breadcrumb }: { title: string, description: string, breadcrumb: string }) {
  return (
    <div className='flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center h-54 bg-linear-to-r from-primary to-blue-950 relative'>
             <div className="w-25 rotate-30 bg-linear-to-t from-primary to-blue-950 h-full absolute top-20 right-20 z-0 rounded-full"></div>
          <div className="w-30 rotate-30 bg-linear-to-t from-primary to-blue-950 h-full absolute -top-30 right-40 z-0 rounded-full"></div>

        <h1 className='text-4xl lg:text-5xl font-bold text-white z-10'>{title}</h1>
        <p className='text-sm lg:text-lg text-muted z-10'>{description}</p>
    </div>
  )
}

export default PageBanner