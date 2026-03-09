import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'lucide-react'

function BackButton({ href, mainPageName }: { href: string, mainPageName: string }) {
  return (
    <Link
    href={href}
    className="flex items-center gap-2 text-primary font-medium p-2 px-4 border border-border rounded-md w-fit hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out"
  >
    <ArrowLeft className="size-4" /> Back to {mainPageName}
  </Link>
  )
}

export default BackButton