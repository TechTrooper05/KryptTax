'use client'

import { useState, useEffect } from 'react'

const STATIC_PRICES: Record<string, number> = {
  'BTC': 4250000,
  'ETH': 280000,
  'ADA': 45,
  'SOL': 18500,
  'MATIC': 95,
  'DOT': 850
}

const CRYPTOS = ['BTC', 'ETH', 'ADA', 'SOL', 'MATIC', 'DOT']

interface MarketPricesProps {
  livePricesEnabled: boolean
}

export function MarketPrices({ livePricesEnabled }: MarketPricesProps) {
  const [prices, setPrices] = useState(STATIC_PRICES)
  const [priceChanges, setPriceChanges] = useState<Record<string, number>>({})

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (livePricesEnabled) {
      interval = setInterval(() => {
        const newPrices = { ...STATIC_PRICES }
        const newChanges: Record<string, number> = {}
        
        CRYPTOS.forEach(crypto => {
          const basePrice = STATIC_PRICES[crypto]
          const change = (Math.random() - 0.5) * 0.04 // ±2%
          newPrices[crypto] = basePrice * (1 + change)
          newChanges[crypto] = change * 100 // Convert to percentage
        })
        setPrices(newPrices)
        setPriceChanges(newChanges)
      }, 30000) // 30 seconds
    } else {
      setPrices(STATIC_PRICES)
      setPriceChanges({})
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [livePricesEnabled])

  const refreshPrices = () => {
    if (livePricesEnabled) {
      const newPrices = { ...STATIC_PRICES }
      const newChanges: Record<string, number> = {}
      
      CRYPTOS.forEach(crypto => {
        const basePrice = STATIC_PRICES[crypto]
        const change = (Math.random() - 0.5) * 0.04
        newPrices[crypto] = basePrice * (1 + change)
        newChanges[crypto] = change * 100
      })
      setPrices(newPrices)
      setPriceChanges(newChanges)
      alert('🔄 Prices refreshed!')
    } else {
      alert('⚠️ Enable live prices to refresh')
    }
  }

  const formatINR = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        📊 Market Prices
      </h2>
      
      <div className="bg-purple-900/30 border border-purple-500/30 p-4 mb-6 rounded-lg">
        <p className="text-purple-200">
          {livePricesEnabled 
            ? '🟢 Live prices enabled! Prices update every 30 seconds.'
            : '🔴 Static prices shown. Toggle live prices for real-time data.'
          }
        </p>
      </div>

      <div className="mb-6">
        <button 
          onClick={refreshPrices}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-medium"
        >
          🔄 Refresh Prices
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CRYPTOS.map((crypto) => (
          <div key={crypto} className="relative bg-gradient-to-br from-purple-900/50 to-black/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-500/30 backdrop-blur-sm">
            {livePricesEnabled && (
              <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            )}
            <div className="text-center">
              <div className="text-xl font-bold text-purple-200 mb-3">
                {crypto}
              </div>
              <div className="text-pink-300 font-semibold text-lg mb-2">
                {formatINR(prices[crypto])}
              </div>
              {livePricesEnabled && priceChanges[crypto] !== undefined && (
                <div className={`text-sm font-medium ${
                  priceChanges[crypto] >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {priceChanges[crypto] >= 0 ? '↗' : '↘'} {Math.abs(priceChanges[crypto]).toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
