'use client'

import { Section } from '@/app/page'

interface NavigationProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

const navItems = [
  { id: 'converter' as Section, label: '💱 Converter' },
  { id: 'tax' as Section, label: '🧮 Tax Calc' },
  { id: 'jurisdictions' as Section, label: '🌍 Global Tax' },
  { id: 'filing' as Section, label: '📋 Tax Filing' },
  { id: 'portfolio' as Section, label: '📁 Portfolio' },
  { id: 'prices' as Section, label: '📊 Prices' },
  { id: 'strategies' as Section, label: '💡 Strategies' },
  { id: 'recommendations' as Section, label: '🚀 Picks' },
  { id: 'profile' as Section, label: '👤 Profile' },
]

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const handleSectionClick = (sectionId: Section) => {
    setActiveSection(sectionId)
  }

  return (
    <div className="bg-gradient-to-r from-purple-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-3 mb-8 flex flex-wrap gap-2 border border-purple-500/20">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleSectionClick(item.id)}
          className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
            activeSection === item.id
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105'
              : 'text-purple-200 hover:bg-purple-800/50 hover:text-white hover:scale-102'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
