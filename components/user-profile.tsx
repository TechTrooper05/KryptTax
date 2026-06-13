'use client'

import { UserProfileType, PortfolioPosition } from '@/app/page'

const STATIC_PRICES: Record<string, number> = {
  'BTC': 4250000,
  'ETH': 280000,
  'ADA': 45,
  'SOL': 18500,
  'MATIC': 95,
  'DOT': 850
}

interface UserProfileProps {
  userProfile: UserProfileType
  setUserProfile: (profile: UserProfileType) => void
  portfolio: PortfolioPosition[]
}

export function UserProfile({ userProfile, setUserProfile, portfolio }: UserProfileProps) {
  const saveProfile = () => {
    if (!userProfile.name.trim()) {
      alert('⚠️ Please enter your name')
      return
    }
    
    const updatedProfile = {
      ...userProfile,
      joinDate: userProfile.joinDate || new Date().toLocaleString('en-IN')
    }
    setUserProfile(updatedProfile)
    alert('✅ Profile saved successfully!')
  }

  const resetProfile = () => {
    if (confirm('Are you sure you want to reset your profile? This will clear all your information.')) {
      setUserProfile({
        name: 'Guest User',
        email: '',
        experience: 'beginner'
      })
      alert('🔄 Profile reset successfully!')
    }
  }

  const calculateUserStats = () => {
    let totalPnL = 0
    portfolio.forEach(pos => {
      const currentPrice = STATIC_PRICES[pos.coin]
      const posValue = pos.amount * currentPrice
      const posInvestment = pos.amount * pos.buyPrice
      totalPnL += (posValue - posInvestment)
    })

    return {
      totalPositions: portfolio.length,
      totalPnL,
      taxSaved: totalPnL * 0.052, // 5.2% saved with Pvt Ltd
      memberSince: userProfile.joinDate || 'Today'
    }
  }

  const stats = calculateUserStats()

  const formatINR = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        👤 User Profile
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userProfile.name}
            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={userProfile.email}
            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Trading Experience</label>
          <select 
            value={userProfile.experience} 
            onChange={(e) => setUserProfile({ ...userProfile, experience: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            <option value="beginner" className="bg-black">Beginner</option>
            <option value="intermediate" className="bg-black">Intermediate</option>
            <option value="advanced" className="bg-black">Advanced</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={saveProfile}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-medium"
        >
          💾 Save Profile
        </button>
        <button 
          onClick={resetProfile}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
        >
          🔄 Reset Profile
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-200">📊 Your Stats</h3>
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white p-6 rounded-xl backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-purple-500/20">
              <span className="text-purple-300">Total Positions:</span>
              <span className="text-pink-300">{stats.totalPositions}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-purple-500/20">
              <span className="text-purple-300">Total P&L:</span>
              <span className={stats.totalPnL >= 0 ? 'text-green-300' : 'text-red-300'}>
                {stats.totalPnL >= 0 ? '+' : '-'}{formatINR(Math.abs(stats.totalPnL))}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-purple-500/20">
              <span className="text-purple-300">Tax Saved (Pvt Ltd):</span>
              <span className="text-cyan-300">{formatINR(Math.abs(stats.taxSaved))}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-purple-300">Member Since:</span>
              <span className="text-sm text-purple-200">{stats.memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
