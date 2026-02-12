import { Clock, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

function CareerCard({ position, location, datePosted, description, id }: { position: string, location: string, datePosted: string, description: string, id: number }) {
  return (
    <div
 
    className="flex flex-col gap-2 border-border border-2 rounded-lg p-4 w-full bg-input"
  >
    <h3 className="text-xl font-bold">{position}</h3>
    <p className="flex items-center gap-2 text-sm">
      <MapPin className="w-4 h-4" /> {location}
    </p>
    <p className="flex items-center gap-2 text-sm">
      <Clock className="w-4 h-4" /> Posted on: {datePosted}
    </p>
    <p className="text-sm">{description}</p>
  
    <Link href={`/careers/${id}`}>
      <Button className="bg-primary text-white rounded-md w-fit">
        Apply Now
      </Button>
    </Link>
  </div>
  )
}

export default CareerCard