import Image from "next/image"
import { Car, Users, Fuel, Settings } from "lucide-react"

interface CarCardProps {
  id: string
  name: string
  price: string
  image: string
  transmission: string
  engine: string
  seats: number
}

export default function CarCard({ id, name, price, image, transmission, engine, seats }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Car Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-800">{price}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{name}</h3>

        {/* Specifications */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Settings className="w-4 h-4" />
            <span className="text-sm">{transmission}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Fuel className="w-4 h-4" />
            <span className="text-sm">{engine}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{seats} seats</span>
          </div>
        </div>

        {/* View Details Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
          <Car className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  )
}
