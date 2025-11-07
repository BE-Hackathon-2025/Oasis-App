import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockShutdownRisk } from '../lib/mockData'

export default function Shutdown() {
  const navigate = useNavigate()
  const [checklist, setChecklist] = useState(mockShutdownRisk.preparationChecklist)

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const getRiskColor = (percentage: number) => {
    if (percentage < 30) return { bg: 'bg-green-500', text: 'text-green-700', label: 'LOW' }
    if (percentage < 70) return { bg: 'bg-yellow-500', text: 'text-yellow-700', label: 'MEDIUM' }
    return { bg: 'bg-red-500', text: 'text-red-700', label: 'HIGH' }
  }

  const risk = getRiskColor(mockShutdownRisk.percentage)
  const completedTasks = checklist.filter(item => item.completed).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Shutdown Risk</h1>
            <p className="text-sm text-gray-500">Stay prepared</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Risk Meter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Government Shutdown Risk</p>

            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg className="transform -rotate-90" width="192" height="192">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#E5E7EB"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(mockShutdownRisk.percentage / 100) * 502.4} 502.4`}
                  className={risk.text}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-5xl font-bold text-gray-900">{mockShutdownRisk.percentage}%</p>
                <p className={`text-sm font-semibold ${risk.text} mt-1`}>{risk.label} RISK</p>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Last updated: {new Date(mockShutdownRisk.lastUpdated).toLocaleDateString()}
            </p>
          </div>

          {/* Risk Factors */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Factors:</h3>
            <ul className="space-y-2">
              {mockShutdownRisk.factors.map((factor, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="mr-2">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What This Means */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-2">What This Means For You</h3>
          <p className="text-sm text-blue-800">
            {mockShutdownRisk.percentage < 30 &&
              "Risk is low right now. Congress has plenty of time to pass funding, and there's bipartisan support. Your benefits are safe for now, but it's always good to have a backup plan."
            }
            {mockShutdownRisk.percentage >= 30 && mockShutdownRisk.percentage < 70 &&
              "There's moderate risk of a shutdown. Start preparing now by stocking non-perishables and knowing where food pantries are located. Your benefits may be delayed if a shutdown happens."
            }
            {mockShutdownRisk.percentage >= 70 &&
              "Risk is high. A shutdown is likely within the next few weeks. Take action now: stock up on essentials, apply for emergency assistance, and make a backup plan. SNAP benefits may be delayed or interrupted."
            }
          </p>
        </div>

        {/* Preparation Checklist */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Preparation Checklist</h2>
            <span className="text-sm text-gray-600">
              {completedTasks}/{checklist.length} completed
            </span>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className="w-full flex items-start p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors text-left"
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 mr-3 flex items-center justify-center ${
                  item.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                }`}>
                  {item.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {item.task}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks / checklist.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Emergency Resources</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/map')}
              className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-left transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🗺️</span>
                <div>
                  <p className="font-medium text-gray-900">Find Food Pantries</p>
                  <p className="text-sm text-gray-600">5 locations in Jackson</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/chat')}
              className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-left transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">💬</span>
                <div>
                  <p className="font-medium text-gray-900">Ask ZENO</p>
                  <p className="text-sm text-gray-600">Get personalized shutdown guidance</p>
                </div>
              </div>
            </button>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📞</span>
                <div>
                  <p className="font-medium text-gray-900">Emergency Hotline</p>
                  <a href="tel:211" className="text-sm text-blue-600">Dial 211 for assistance</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stay Informed */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-2">Stay Informed</h3>
          <p className="text-sm opacity-90 mb-4">
            Oasis monitors Congress 24/7 and will alert you if the shutdown risk increases. We'll make sure you're prepared.
          </p>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="text-sm font-medium">Alerts Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
