'use client'

import { useState, useEffect } from 'react'

const STATIC_PRICES: Record<string, number> = {
  'BTC': 4250000,
  'ETH': 280000,
  'ADA': 45,
  'SOL': 18500,
  'MATIC': 95,
  'DOT': 850,
  'USD': 83.5,
  'EUR': 90,
  'INR': 1
}

interface CurrencyConverterProps {
  livePricesEnabled: boolean
}

export function CurrencyConverter({ livePricesEnabled }: CurrencyConverterProps) {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('INR')
  const [toCurrency, setToCurrency] = useState('BTC')
  const [result, setResult] = useState<number | null>(null)
  const [prices, setPrices] = useState(STATIC_PRICES)

  const currencies = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'ADA', label: 'Cardano (ADA)' },
    { value: 'SOL', label: 'Solana (SOL)' },
    { value: 'MATIC', label: 'Polygon (MATIC)' },
    { value: 'DOT', label: 'Polkadot (DOT)' },
    { value: 'USD', label: 'US Dollar' },
    { value: 'EUR', label: 'Euro' },
    { value: 'INR', label: 'Indian Rupee' },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (livePricesEnabled) {
      interval = setInterval(() => {
        const newPrices = { ...STATIC_PRICES }
        Object.keys(STATIC_PRICES).forEach(crypto => {
          if (crypto !== 'INR' && crypto !== 'USD' && crypto !== 'EUR') {
            const basePrice = STATIC_PRICES[crypto]
            const change = (Math.random() - 0.5) * 0.04
            newPrices[crypto] = basePrice * (1 + change)
          }
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

  const convertCurrency = () => {
    const amountNum = parseFloat(amount)
    if (!amountNum || amountNum <= 0) {
      alert('⚠️ Please enter a valid amount')
      return
    }

    const convertedAmount = (amountNum * prices[fromCurrency]) / prices[toCurrency]
    setResult(convertedAmount)
  }

  const clearForm = () => {
    setAmount('')
    setResult(null)
  }

  const formatAmount = (value: number, currency: string) => {
    if (currency === 'INR') {
      return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return value.toLocaleString('en-US', { maximumFractionDigits: 8 })
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        💱 Currency Converter
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="any"
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value} className="bg-black">
                {currency.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value} className="bg-black">
                {currency.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={convertCurrency}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-medium"
        >
          🔄 Convert
        </button>
        <button 
          onClick={clearForm}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
        >
          🗑️ Clear
        </button>
      </div>

      {result !== null && (
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4 text-purple-200">💱 Conversion Result</h3>
          <div className="flex justify-between items-center text-lg">
            <span className="text-purple-300">{formatAmount(parseFloat(amount), fromCurrency)} {fromCurrency}</span>
            <span className="text-2xl text-purple-400">→</span>
            <span className="font-bold text-pink-300">{formatAmount(result, toCurrency)} {toCurrency}</span>
          </div>
        </div>
      )}
    </div>
  )
}
