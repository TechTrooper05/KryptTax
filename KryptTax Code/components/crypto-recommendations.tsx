'use client'

export function CryptoRecommendations() {
  const recommendations = [
    {
      title: '🥇 Core Holdings (50%)',
      coins: [
        { name: 'Bitcoin (BTC)', description: 'Digital gold, most stable crypto' },
        { name: 'Ethereum (ETH)', description: 'Smart contract platform' }
      ],
      note: 'Low volatility = predictable tax planning',
      gradient: 'from-yellow-500/20 to-orange-600/20',
      borderColor: 'border-yellow-500/30'
    },
    {
      title: '🥈 Growth Plays (30%)',
      coins: [
        { name: 'Solana (SOL)', description: 'High-speed blockchain' },
        { name: 'Polygon (MATIC)', description: 'Ethereum scaling solution' }
      ],
      note: 'Medium volatility = strategic profit-taking opportunities',
      gradient: 'from-blue-500/20 to-purple-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      title: '🎲 Speculative (20%)',
      coins: [
        { name: 'Cardano (ADA)', description: 'Research-driven development' },
        { name: 'Polkadot (DOT)', description: 'Interoperability protocol' }
      ],
      note: 'Higher risk = potential for tax-loss harvesting',
      gradient: 'from-pink-500/20 to-red-600/20',
      borderColor: 'border-pink-500/30'
    }
  ]

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🚀 Strategic Crypto Picks
      </h2>
      
      <div className="space-y-6">
        {recommendations.map((category, index) => (
          <div key={index} className={`bg-gradient-to-r ${category.gradient} border ${category.borderColor} text-white p-6 rounded-xl backdrop-blur-sm`}>
            <h3 className="text-xl font-bold mb-4 text-purple-200">{category.title}</h3>
            <div className="space-y-3">
              {category.coins.map((coin, coinIndex) => (
                <div key={coinIndex}>
                  <p className="text-purple-100"><strong className="text-pink-300">{coin.name}:</strong> {coin.description}</p>
                </div>
              ))}
              <p className="text-sm text-purple-200 mt-4 italic">{category.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-purple-900/30 border border-purple-500/30 p-4 mt-6 rounded-lg">
        <p className="text-purple-200">
          <strong className="text-purple-300">Tax-Optimized Strategy:</strong> Use Pvt Ltd structure + Focus on BTC/ETH for stability + Use smaller caps for tax-loss harvesting when needed.
        </p>
      </div>
    </div>
  )
}
