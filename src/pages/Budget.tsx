import { useNavigate } from 'react-router-dom'
import { mockEBTBalance, calculateDailyBudget } from '../lib/mockData'

export default function Budget() {
  const navigate = useNavigate()
  const balance = mockEBTBalance.balance
  const daysLeft = mockEBTBalance.daysUntilRefill
  const dailyBudget = calculateDailyBudget(balance, daysLeft)

  const mealPlan = [
    {
      day: 'Monday',
      meals: [
        { name: 'Breakfast', items: 'Oatmeal with banana', cost: 0.75 },
        { name: 'Lunch', items: 'PB&J sandwich, apple', cost: 1.25 },
        { name: 'Dinner', items: 'Chicken & rice with veggies', cost: 3.00 }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { name: 'Breakfast', items: 'Eggs and toast', cost: 1.00 },
        { name: 'Lunch', items: 'Leftover chicken & rice', cost: 0.50 },
        { name: 'Dinner', items: 'Spaghetti with sauce', cost: 2.50 }
      ]
    },
    {
      day: 'Wednesday',
      meals: [
        { name: 'Breakfast', items: 'Cereal with milk', cost: 0.80 },
        { name: 'Lunch', items: 'Bean and cheese burrito', cost: 1.50 },
        { name: 'Dinner', items: 'Baked chicken, potatoes', cost: 3.20 }
      ]
    }
  ]

  const savingTips = [
    { icon: '🏪', title: 'Shop Store Brands', description: 'Save 30-40% by choosing store brands over name brands' },
    { icon: '🛒', title: 'Buy in Bulk', description: 'Rice, beans, pasta cost less per serving in larger quantities' },
    { icon: '📅', title: 'Plan Your Meals', description: 'Planning prevents impulse purchases and food waste' },
    { icon: '❄️', title: 'Use Your Freezer', description: 'Buy meat on sale and freeze for later use' },
    { icon: '🥫', title: 'Stock Up on Sales', description: 'Buy non-perishables when they\'re on sale' },
    { icon: '💰', title: 'Check Unit Prices', description: 'Bigger isn\'t always cheaper - compare per-ounce costs' }
  ]

  const cheapStores = [
    { name: 'Dollar General', distance: '0.8 mi', savings: 'Best for: Canned goods, snacks' },
    { name: 'Aldi', distance: '1.2 mi', savings: 'Best for: Fresh produce, dairy' },
    { name: 'Walmart', distance: '1.5 mi', savings: 'Best for: Bulk items, meat' }
  ]

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
            <h1 className="text-lg font-semibold text-gray-900">Smart Budget</h1>
            <p className="text-sm text-gray-500">Make your benefits last</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Budget Summary */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">Your Daily Budget</p>
          <p className="text-5xl font-bold mb-4">${dailyBudget.toFixed(2)}</p>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Current Balance</span>
              <span className="font-semibold">${balance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Days Until Refill</span>
              <span className="font-semibold">{daysLeft} days</span>
            </div>
          </div>
        </div>

        {/* Sample Meal Plan */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📝</span>
            Sample 3-Day Meal Plan
          </h2>

          <div className="space-y-4">
            {mealPlan.map((day, dayIndex) => (
              <div key={dayIndex} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-2">{day.day}</h3>
                {day.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="flex justify-between items-start mb-2 ml-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{meal.name}</p>
                      <p className="text-xs text-gray-500">{meal.items}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">${meal.cost.toFixed(2)}</span>
                  </div>
                ))}
                <div className="mt-2 ml-4 pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700">Total:</span>
                    <span className="text-sm font-bold text-gray-900">
                      ${day.meals.reduce((sum, meal) => sum + meal.cost, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              💡 This 3-day plan costs $15.50 total, averaging $5.17/day - right on budget!
            </p>
          </div>
        </div>

        {/* Money-Saving Tips */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Money-Saving Tips</h2>
          <div className="grid grid-cols-1 gap-3">
            {savingTips.map((tip, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">{tip.icon}</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{tip.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cheapest Stores Nearby */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cheapest Stores Nearby</h2>
          <div className="space-y-3">
            {cheapStores.map((store, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{store.name}</h3>
                  <span className="text-sm text-gray-500">{store.distance}</span>
                </div>
                <p className="text-sm text-gray-600">{store.savings}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Talk to ZENO */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-2">Need Personalized Budget Help?</h3>
          <p className="text-sm opacity-90 mb-4">
            ZENO can help you create a custom meal plan based on your family size, dietary needs, and preferences.
          </p>
          <button
            onClick={() => navigate('/chat')}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Ask ZENO
          </button>
        </div>
      </div>
    </div>
  )
}
