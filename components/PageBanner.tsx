import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function PageBanner({ title, description, breadcrumb }: { title: string, description: string, breadcrumb: string }) {
  return (
    <div className='flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center h-54 bg-linear-to-r from-primary to-blue-950'>
        <h1 className='text-4xl lg:text-5xl font-bold text-white'>{title}</h1>
        <p className='text-sm lg:text-lg text-muted'>{description}</p>
    </div>
  )
}

export default PageBanner