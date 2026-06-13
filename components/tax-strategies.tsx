'use client'

export function TaxStrategies() {
  const strategies = [
    {
      title: '🏢 Use Pvt Ltd Company',
      description: 'Save 5.2% tax (26% vs 31.2%) by trading through a private limited company instead of individual account.',
      gradient: 'from-cyan-500/20 to-teal-600/20',
      borderColor: 'border-cyan-500/30'
    },
    {
      title: '⏰ Strategic Timing',
      description: 'Time your profit booking across financial years to manage tax brackets and cash flow.',
      gradient: 'from-purple-500/20 to-pink-600/20',
      borderColor: 'border-purple-500/30'
    },
    {
      title: '📝 Expense Management',
      description: 'For LLP/Company: Deduct trading fees, internet costs, professional fees, and other business expenses.',
      gradient: 'from-orange-500/20 to-red-600/20',
      borderColor: 'border-orange-500/30'
    },
    {
      title: '🔄 FIFO vs LIFO',
      description: 'Use FIFO when early buys are cheaper, LIFO when recent buys are higher - optimize your cost basis.',
      gradient: 'from-green-500/20 to-emerald-600/20',
      borderColor: 'border-green-500/30'
    }
  ]

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        💡 Tax Optimization Strategies
      </h2>
      
      <div className="space-y-6">
        {strategies.map((strategy, index) => (
          <div key={index} className={`bg-gradient-to-r ${strategy.gradient} border ${strategy.borderColor} text-white p-6 rounded-xl backdrop-blur-sm`}>
            <h3 className="text-xl font-bold mb-3 text-purple-200">{strategy.title}</h3>
            <p className="text-purple-100 leading-relaxed">{strategy.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
