import { useNavigate } from 'react-router-dom'
import { mockEBTBalance, calculateDailyBudget, calculateRunOutDate, getAvgDailySpending } from '../lib/mockData'

export default function Balance() {
  const navigate = useNavigate()
  const balanceData = mockEBTBalance

  const dailyBudget = calculateDailyBudget(balanceData.balance, balanceData.daysUntilRefill)
  const avgDailySpending = getAvgDailySpending(balanceData.transactions)
  const predictedRunOut = calculateRunOutDate(balanceData.balance, avgDailySpending)

  const isOverBudget = avgDailySpending > dailyBudget

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
          <h1 className="text-lg font-semibold text-gray-900">EBT Balance</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">SNAP Balance</p>
          <p className="text-5xl font-bold mb-4">${balanceData.balance.toFixed(2)}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Next Refill</p>
              <p className="text-lg font-semibold">{balanceData.daysUntilRefill} days</p>
            </div>
            <button
              onClick={() => navigate('/chat')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Ask ZENO
            </button>
          </div>
        </div>

        {/* Budget Insights */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Budget Insights
          </h2>

          <div className="space-y-4">
            {/* Daily Budget */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-gray-600">Recommended Daily Budget</span>
                <span className="text-2xl font-bold text-blue-600">${dailyBudget.toFixed(2)}/day</span>
              </div>
              <p className="text-xs text-gray-500">To make your benefits last until refill</p>
            </div>

            {/* Spending vs Budget */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-gray-600">Your Average Daily Spending</span>
                <span className={`text-xl font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                  ${avgDailySpending.toFixed(2)}/day
                </span>
              </div>
              {isOverBudget && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ You're spending ${(avgDailySpending - dailyBudget).toFixed(2)} more per day than recommended
                  </p>
                </div>
              )}
            </div>

            {/* Predicted Run Out */}
            {isOverBudget && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">⏰ Warning:</span> At your current rate, benefits may run out around{' '}
                  <span className="font-bold">{predictedRunOut.toLocaleDateString()}</span>
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate('/budget')}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Get Smart Budget Plan
          </button>
        </div>

        {/* Last Deposit */}
        {balanceData.lastDeposit && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Last Deposit</h3>
            <p className="text-2xl font-bold text-green-600 mb-1">
              ${balanceData.lastDeposit.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">{balanceData.lastDeposit.date}</p>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>

          <div className="space-y-3">
            {balanceData.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{transaction.merchant}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p
                  className={`text-lg font-bold ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'deposit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/map')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🗺️</div>
            <p className="text-sm font-medium text-gray-900">Find Food</p>
            <p className="text-xs text-gray-500">Nearby pantries</p>
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💬</div>
            <p className="text-sm font-medium text-gray-900">Ask ZENO</p>
            <p className="text-xs text-gray-500">Get help</p>
          </button>
        </div>

        {/* Last Updated */}
        <p className="text-center text-xs text-gray-400 py-2">
          Last updated: {new Date(balanceData.lastChecked).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
