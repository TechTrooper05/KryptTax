'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { PortfolioPosition } from '@/app/page'

const STATIC_PRICES: Record<string, number> = {
  'BTC': 4250000,
  'ETH': 280000,
  'ADA': 45,
  'SOL': 18500,
  'MATIC': 95,
  'DOT': 850
}

interface PortfolioProps {
  portfolio: PortfolioPosition[]
  setPortfolio: (portfolio: PortfolioPosition[]) => void
  livePricesEnabled: boolean
}

export function Portfolio({ portfolio, setPortfolio, livePricesEnabled }: PortfolioProps) {
  const [coin, setCoin] = useState('BTC')
  const [amount, setAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [nextId, setNextId] = useState(1)
  const [prices, setPrices] = useState(STATIC_PRICES)

  const coins = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'ADA', label: 'Cardano (ADA)' },
    { value: 'SOL', label: 'Solana (SOL)' },
    { value: 'MATIC', label: 'Polygon (MATIC)' },
    { value: 'DOT', label: 'Polkadot (DOT)' },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (livePricesEnabled) {
      interval = setInterval(() => {
        const newPrices = { ...STATIC_PRICES }
        Object.keys(STATIC_PRICES).forEach(crypto => {
          const basePrice = STATIC_PRICES[crypto]
          const change = (Math.random() - 0.5) * 0.04
          newPrices[crypto] = basePrice * (1 + change)
        })
        setPrices(newPrices)
      }, 30000)
    } else {
      setPrices(STATIC_PRICES)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [livePricesEnabled])

  const addPosition = () => {
    const amountNum = parseFloat(amount)
    const buyPriceNum = parseFloat(buyPrice)

    if (!amountNum || !buyPriceNum || amountNum <= 0 || buyPriceNum <= 0) {
      alert('⚠️ Please enter valid amount and buy price')
      return
    }

    const newPosition: PortfolioPosition = {
      id: nextId,
      coin,
      amount: amountNum,
      buyPrice: buyPriceNum
    }

    setPortfolio([...portfolio, newPosition])
    setNextId(nextId + 1)
    setAmount('')
    setBuyPrice('')
    alert('✅ Position added successfully!')
  }

  const removePosition = (id: number) => {
    if (confirm('Are you sure you want to remove this position?')) {
      setPortfolio(portfolio.filter(pos => pos.id !== id))
      alert('🗑️ Position removed successfully!')
    }
  }

  const clearAllPositions = () => {
    if (confirm('Are you sure you want to clear all positions? This action cannot be undone.')) {
      setPortfolio([])
      alert('🗑️ All positions cleared!')
    }
  }

  const calculatePortfolioStats = () => {
    let totalInvestment = 0
    let currentValue = 0

    portfolio.forEach(pos => {
      const investment = pos.amount * pos.buyPrice
      const value = pos.amount * prices[pos.coin]
      totalInvestment += investment
      currentValue += value
    })

    const totalPnL = currentValue - totalInvestment

    return {
      totalPositions: portfolio.length,
      totalInvestment,
      currentValue,
      totalPnL,
      lastUpdated: new Date().toLocaleString('en-IN')
    }
  }

  const stats = calculatePortfolioStats()

  const formatINR = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        📁 Portfolio Manager
      </h2>
      
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white p-6 rounded-xl mb-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 text-purple-200">📊 Portfolio Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-purple-500/20">
            <span className="text-purple-300">Positions:</span>
            <span className="text-pink-300">{stats.totalPositions}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-purple-500/20">
            <span className="text-purple-300">Investment:</span>
            <span className="text-pink-300">{formatINR(stats.totalInvestment)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-purple-500/20">
            <span className="text-purple-300">Current Value:</span>
            <span className="text-pink-300">{formatINR(stats.currentValue)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-purple-500/20">
            <span className="text-purple-300">P&L:</span>
            <span className={stats.totalPnL >= 0 ? 'text-green-300' : 'text-red-300'}>
              {stats.totalPnL >= 0 ? '+' : '-'}{formatINR(Math.abs(stats.totalPnL))}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-purple-300">Updated:</span>
            <span className="text-sm text-cyan-300">{stats.lastUpdated}</span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-purple-200">➕ Add Position</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Coin</label>
          <select
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            {coins.map((coinOption) => (
              <option key={coinOption.value} value={coinOption.value} className="bg-black">
                {coinOption.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Amount</label>
          <input
            type="number"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="any"
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Buy Price (₹)</label>
          <input
            type="number"
            placeholder="42,50,000"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            step="any"
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={addPosition}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-medium"
        >
          ➕ Add Position
        </button>
        {portfolio.length > 0 && (
          <button 
            onClick={clearAllPositions}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {portfolio.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-black/50 rounded-lg overflow-hidden shadow-lg border border-purple-500/30">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Coin</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Buy Price</th>
                <th className="px-4 py-3 text-left">Current Price</th>
                <th className="px-4 py-3 text-left">Investment</th>
                <th className="px-4 py-3 text-left">Current Value</th>
                <th className="px-4 py-3 text-left">P&L</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((position) => {
                const currentPrice = prices[position.coin]
                const investment = position.amount * position.buyPrice
                const currentValue = position.amount * currentPrice
                const pnl = currentValue - investment
                const pnlPercentage = (pnl / investment) * 100

                return (
                  <tr key={position.id} className="border-b border-purple-500/20 text-white">
                    <td className="px-4 py-3 font-medium text-purple-200">{position.coin}</td>
                    <td className="px-4 py-3 text-purple-200">{position.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })}</td>
                    <td className="px-4 py-3 text-purple-200">{formatINR(position.buyPrice)}</td>
                    <td className="px-4 py-3 text-purple-200">{formatINR(currentPrice)}</td>
                    <td className="px-4 py-3 text-purple-200">{formatINR(investment)}</td>
                    <td className="px-4 py-3 text-purple-200">{formatINR(currentValue)}</td>
                    <td className={`px-4 py-3 font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {pnl >= 0 ? '+' : '-'}{formatINR(Math.abs(pnl))}
                      <br />
                      <span className="text-sm">({pnlPercentage.toFixed(2)}%)</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removePosition(position.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
