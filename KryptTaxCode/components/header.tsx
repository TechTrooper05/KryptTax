'use client'

import { UserProfileType } from '@/app/page'

interface HeaderProps {
  userProfile: UserProfileType
  livePricesEnabled: boolean
  setLivePricesEnabled: (enabled: boolean) => void
  onProfileClick: () => void
  onTermsClick: () => void
}

export function Header({ userProfile, livePricesEnabled, setLivePricesEnabled, onProfileClick, onTermsClick }: HeaderProps) {
  const handleToggle = () => {
    setLivePricesEnabled(!livePricesEnabled)
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-sm rounded-3xl p-8 text-center mb-8 shadow-2xl border border-purple-500/20 relative">
      <button 
        onClick={onProfileClick}
        className="absolute top-5 right-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
      >
        👤 {userProfile.name}
      </button>
      
      <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3">
        🇮🇳 KryptTax
      </h1>
      <p className="text-purple-200 text-lg mb-6">
        Advanced Crypto Tax Calculator & Portfolio Tracker for Indian Traders
      </p>
      
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <label htmlFor="live-prices" className="text-sm font-medium text-purple-200">
            Live Prices:
          </label>
          <div className="relative inline-block w-14 h-7 cursor-pointer" onClick={handleToggle}>
            <input
              type="checkbox"
              id="live-prices"
              checked={livePricesEnabled}
              onChange={handleToggle}
              className="sr-only"
            />
            <div 
              className={`block w-14 h-7 rounded-full transition-all duration-300 ${
                livePricesEnabled 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
                  : 'bg-gray-600'
              }`}
            >
              <div 
                className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow-lg ${
                  livePricesEnabled ? 'transform translate-x-7' : ''
                }`}
              />
            </div>
          </div>
          <span className="text-sm text-purple-200 font-medium">
            {livePricesEnabled ? '🟢 Live Prices' : '🔴 Static Prices'}
          </span>
        </div>
        
        <button
          onClick={onTermsClick}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 font-medium"
        >
          📋 Terms & Conditions
        </button>
      </div>
    </div>
  )
}
