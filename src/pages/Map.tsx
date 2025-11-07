import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jacksonFoodPantries } from '../lib/mockData'
import type { FoodPantry } from '../lib/mockData'

export default function Map() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | 'open' | 'walk-in'>('all')
  const [selectedPantry, setSelectedPantry] = useState<FoodPantry | null>(null)

  const filteredPantries = jacksonFoodPantries.filter(pantry => {
    if (filter === 'open') return pantry.openNow
    if (filter === 'walk-in') {
      return pantry.requirements.some(req =>
        req.toLowerCase().includes('no appointment') ||
        req.toLowerCase().includes('walk-in')
      )
    }
    return true
  })

  const getInventoryColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-red-500'
    }
  }

  const getInventoryDots = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return '●●●'
      case 'medium': return '●●○'
      case 'low': return '●○○'
    }
  }

  const getDirections = (pantry: FoodPantry) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pantry.latitude},${pantry.longitude}`
    window.open(url, '_blank')
  }

  const callPantry = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-3">
          <button
            onClick={() => navigate('/')}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Food Resources</h1>
            <p className="text-sm text-gray-500">Jackson, TN</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({jacksonFoodPantries.length})
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'open'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🟢 Open Now
          </button>
          <button
            onClick={() => setFilter('walk-in')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'walk-in'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Walk-In OK
          </button>
        </div>
      </div>

      {/* Pantries List */}
      <div className="p-4 space-y-4">
        {filteredPantries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No pantries match your filters</p>
            <button
              onClick={() => setFilter('all')}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              Show all pantries
            </button>
          </div>
        ) : (
          filteredPantries.map(pantry => (
            <div
              key={pantry.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{pantry.name}</h3>
                    <p className="text-sm text-gray-600">
                      {pantry.address}, {pantry.city}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ~{(Math.random() * 2 + 0.5).toFixed(1)} miles away
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pantry.openNow
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {pantry.openNow ? '🟢 Open' : '🔴 Closed'}
                  </div>
                </div>

                {/* Hours Today */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Today:</span>{' '}
                    {pantry.hours[Object.keys(pantry.hours)[0] as keyof typeof pantry.hours] || 'Call for hours'}
                  </p>
                  {pantry.waitTime && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Wait time:</span> ~{pantry.waitTime} min
                    </p>
                  )}
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {pantry.services.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Current Inventory */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Stock:</p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">
                      <div className={`w-10 h-10 rounded-full ${getInventoryColor(pantry.inventory.produce)} mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold`}>
                        {getInventoryDots(pantry.inventory.produce)}
                      </div>
                      <p className="text-xs text-gray-600">Produce</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-10 h-10 rounded-full ${getInventoryColor(pantry.inventory.protein)} mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold`}>
                        {getInventoryDots(pantry.inventory.protein)}
                      </div>
                      <p className="text-xs text-gray-600">Protein</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-10 h-10 rounded-full ${getInventoryColor(pantry.inventory.dairy)} mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold`}>
                        {getInventoryDots(pantry.inventory.dairy)}
                      </div>
                      <p className="text-xs text-gray-600">Dairy</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-10 h-10 rounded-full ${getInventoryColor(pantry.inventory.nonPerishables)} mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold`}>
                        {getInventoryDots(pantry.inventory.nonPerishables)}
                      </div>
                      <p className="text-xs text-gray-600">Canned</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => getDirections(pantry)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    🗺️ Directions
                  </button>
                  <button
                    onClick={() => callPantry(pantry.phone)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    📞 Call
                  </button>
                  <button
                    onClick={() => setSelectedPantry(pantry)}
                    className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Info
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedPantry && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center"
          onClick={() => setSelectedPantry(null)}
        >
          <div
            className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedPantry.name}</h2>
              <button
                onClick={() => setSelectedPantry(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
                <p className="text-gray-900">{selectedPantry.address}</p>
                <p className="text-gray-900">{selectedPantry.city}, {selectedPantry.state} {selectedPantry.zip}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Phone</p>
                <a href={`tel:${selectedPantry.phone}`} className="text-blue-600">
                  {selectedPantry.phone}
                </a>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Hours</p>
                <div className="space-y-1">
                  {Object.entries(selectedPantry.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="capitalize text-gray-600">{day}</span>
                      <span className="text-gray-900">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Services Offered</p>
                <ul className="list-disc list-inside space-y-1">
                  {selectedPantry.services.map((service, index) => (
                    <li key={index} className="text-sm text-gray-900">{service}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Requirements</p>
                <ul className="list-disc list-inside space-y-1">
                  {selectedPantry.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-gray-900">{req}</li>
                  ))}
                </ul>
              </div>

              {selectedPantry.accessibility && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Accessibility</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPantry.accessibility.wheelchairAccessible && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        ♿ Wheelchair Accessible
                      </span>
                    )}
                    {selectedPantry.accessibility.parking && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        🅿️ Parking Available
                      </span>
                    )}
                    {selectedPantry.accessibility.publicTransit && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        🚌 Public Transit
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
