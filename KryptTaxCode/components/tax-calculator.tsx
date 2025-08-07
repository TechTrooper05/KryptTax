'use client'

import { useState } from 'react'

export function TaxCalculator() {
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [entityType, setEntityType] = useState('individual')
  const [result, setResult] = useState<any>(null)

  const calculateTax = () => {
    const buy = parseFloat(buyPrice)
    const sell = parseFloat(sellPrice)

    if (!buy || !sell) {
      alert('⚠️ Please enter buy and sell prices')
      return
    }

    const profit = sell - buy
    
    if (profit <= 0) {
      setResult({
        type: 'no-tax',
        profit,
        isBreakeven: profit === 0
      })
      return
    }

    const taxRate = entityType === 'pvt_ltd' ? 26 : 31.2
    const taxAmount = profit * (taxRate / 100)
    const netProfit = profit - taxAmount
    const roi = (netProfit / buy) * 100
    const tds = Math.max(buy, sell) > 10000 ? Math.max(buy, sell) * 0.01 : 0

    setResult({
      type: 'tax-calculation',
      profit,
      taxRate,
      taxAmount,
      netProfit,
      roi,
      tds
    })
  }

  const clearForm = () => {
    setBuyPrice('')
    setSellPrice('')
    setResult(null)
  }

  const formatINR = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🧮 Tax Calculator
      </h2>
      
      <div className="bg-purple-900/30 border border-purple-500/30 p-4 mb-6 rounded-lg">
        <p className="text-purple-200">
          <strong className="text-purple-300">Indian Crypto Tax:</strong> 30% + 4% cess = 31.2% on profits | 1% TDS on trades {'>'} ₹10,000
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Buy Price (₹)</label>
          <input
            type="number"
            placeholder="Enter buy price"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            step="any"
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Sell Price (₹)</label>
          <input
            type="number"
            placeholder="Enter sell price"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            step="any"
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Entity Type</label>
          <select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            <option value="individual" className="bg-black">Individual (31.2% tax)</option>
            <option value="pvt_ltd" className="bg-black">Pvt Ltd (26% tax)</option>
            <option value="llp" className="bg-black">LLP (31.2% tax)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={calculateTax}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-medium"
        >
          📊 Calculate Tax
        </button>
        <button 
          onClick={clearForm}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
        >
          🗑️ Clear
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4 text-purple-200">
            {result.type === 'no-tax' ? '📉 No Tax Liability' : '📊 Tax Calculation'}
          </h3>
          {result.type === 'no-tax' ? (
            <div>
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">{result.isBreakeven ? 'Break-even' : 'Loss'}:</span>
                <span className="text-pink-300">{formatINR(Math.abs(result.profit))}</span>
              </div>
              <p className="mt-4 text-purple-200">
                {result.isBreakeven 
                  ? 'No tax on break-even trades.' 
                  : 'Losses cannot be offset against other income in India.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">Gross Profit:</span>
                <span className="text-pink-300">{formatINR(result.profit)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">Tax ({result.taxRate}%):</span>
                <span className="text-red-300">{formatINR(result.taxAmount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">Net Profit:</span>
                <span className="text-green-300 font-bold">{formatINR(result.netProfit)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-purple-300">ROI:</span>
                <span className="text-cyan-300">{result.roi.toFixed(2)}%</span>
              </div>
              {result.tds > 0 && (
                <div className="flex justify-between py-2 border-t border-purple-500/20">
                  <span className="text-purple-300">TDS (1%):</span>
                  <span className="text-orange-300">{formatINR(result.tds)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
