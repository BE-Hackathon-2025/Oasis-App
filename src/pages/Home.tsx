import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { mockEBTBalance, mockShutdownRisk } from '../lib/mockData'

export default function Home() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const quickStats = [
    {
      label: 'EBT Balance',
      value: `$${mockEBTBalance.balance.toFixed(2)}`,
      icon: '💳',
      color: 'bg-blue-500',
      action: () => navigate('/balance')
    },
    {
      label: 'Days Until Refill',
      value: mockEBTBalance.daysUntilRefill.toString(),
      icon: '📅',
      color: 'bg-purple-500',
      action: () => navigate('/balance')
    },
    {
      label: 'Nearest Food Bank',
      value: '0.6 mi',
      icon: '📍',
      color: 'bg-green-500',
      action: () => navigate('/map')
    },
    {
      label: 'Shutdown Risk',
      value: `${mockShutdownRisk.percentage}%`,
      icon: '⚠️',
      color: 'bg-yellow-500',
      action: () => navigate('/shutdown')
    }
  ]

  const quickActions = [
    {
      title: 'Talk to ZENO',
      description: 'Ask questions, get help',
      icon: '💬',
      color: 'from-blue-500 to-purple-600',
      action: () => navigate('/chat')
    },
    {
      title: 'Check Balance',
      description: 'View EBT transactions',
      icon: '💳',
      color: 'from-green-500 to-emerald-600',
      action: () => navigate('/balance')
    },
    {
      title: 'Find Food',
      description: '5 pantries nearby',
      icon: '🗺️',
      color: 'from-orange-500 to-red-600',
      action: () => navigate('/map')
    },
    {
      title: 'Budget Help',
      description: 'Stretch your benefits',
      icon: '📊',
      color: 'from-purple-500 to-pink-600',
      action: () => navigate('/budget')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Oasis
              </h1>
              <p className="text-sm text-gray-600">AI for Community Impact</p>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name || user?.email?.split('@')[0]}! 👋
          </h2>
          <p className="text-gray-600">
            Jackson, Tennessee • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <button
              key={index}
              onClick={stat.action}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-2xl mb-3 mx-auto`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`bg-gradient-to-br ${action.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left`}
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <h4 className="text-xl font-bold mb-1">{action.title}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start">
            <div className="text-3xl mr-4">🆘</div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-2">Need Immediate Help?</h4>
              <p className="text-sm opacity-90 mb-3">
                If you're running out of food or need emergency assistance, we're here to help you find resources right now.
              </p>
              <button
                onClick={() => navigate('/map')}
                className="bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Find Food Now
              </button>
            </div>
          </div>
        </div>

        {/* About Oasis */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About Oasis</h3>
          <p className="text-gray-600 mb-4">
            Oasis uses AI to help families in Jackson, TN navigate SNAP/EBT benefits, find food resources,
            and prepare for government disruptions. We're here to ensure no one goes hungry while navigating assistance programs.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">5+</p>
              <p className="text-sm text-gray-600">Food Pantries</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">24/7</p>
              <p className="text-sm text-gray-600">ZENO Support</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">100%</p>
              <p className="text-sm text-gray-600">Free to Use</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
