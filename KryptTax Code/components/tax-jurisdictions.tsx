'use client'

import { useState } from 'react'

interface TaxRule {
  shortTerm: number
  longTerm: number
  holdingPeriod: number // months
  tds?: number
  description: string
}

interface LegalFramework {
  acts: {
    name: string
    year: string
    sections: string[]
    description: string
    url: string
  }[]
  articles?: {
    article: string
    description: string
    url: string
  }[]
  notifications: {
    number: string
    date: string
    description: string
    url: string
  }[]
  courtCases?: {
    case: string
    year: string
    ruling: string
    url: string
  }[]
}

interface Jurisdiction {
  country: string
  flag: string
  currency: string
  individual: TaxRule
  corporate: TaxRule
  specialRules?: string[]
  legalFramework: LegalFramework
}

const TAX_JURISDICTIONS: Jurisdiction[] = [
  {
    country: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    individual: {
      shortTerm: 31.2,
      longTerm: 31.2,
      holdingPeriod: 12,
      tds: 1,
      description: '30% + 4% cess on all crypto gains'
    },
    corporate: {
      shortTerm: 26,
      longTerm: 26,
      holdingPeriod: 12,
      tds: 1,
      description: '26% corporate tax rate'
    },
    specialRules: [
      'No set-off against other income allowed',
      '1% TDS on transactions > ₹10,000',
      'No indexation benefit available'
    ],
    legalFramework: {
      acts: [
        {
          name: 'Income Tax Act',
          year: '1961',
          sections: ['Section 2(14)', 'Section 45', 'Section 48', 'Section 115BBH', 'Section 194S'],
          description: 'Primary legislation governing income tax in India, including cryptocurrency taxation',
          url: 'https://incometaxindia.gov.in/acts/income-tax-act-1961.pdf'
        },
        {
          name: 'Finance Act',
          year: '2022',
          sections: ['Section 115BBH', 'Section 194S'],
          description: 'Introduced specific provisions for taxation of virtual digital assets',
          url: 'https://incometaxindia.gov.in/acts/finance-acts/2022/102120220330.pdf'
        },
        {
          name: 'Prevention of Money Laundering Act (PMLA)',
          year: '2002',
          sections: ['Section 2(1)(u)', 'Section 12'],
          description: 'Anti-money laundering provisions applicable to cryptocurrency exchanges',
          url: 'https://enforcementdirectorate.gov.in/sites/default/files/PML%20Act%202002_0.pdf'
        },
        {
          name: 'Foreign Exchange Management Act (FEMA)',
          year: '1999',
          sections: ['Section 3', 'Section 6'],
          description: 'Regulates foreign exchange transactions including crypto',
          url: 'https://rbi.org.in/Scripts/BS_FemaNotifications.aspx'
        }
      ],
      articles: [
        {
          article: 'Article 265',
          description: 'No tax shall be levied or collected except by authority of law',
          url: 'https://www.india.gov.in/my-government/constitution-india/constitution-india-full-text'
        },
        {
          article: 'Article 246',
          description: 'Distribution of legislative powers - Union List includes income tax',
          url: 'https://www.india.gov.in/my-government/constitution-india/constitution-india-full-text'
        },
        {
          article: 'Article 366(29A)',
          description: 'Definition of tax for constitutional purposes',
          url: 'https://www.india.gov.in/my-government/constitution-india/constitution-india-full-text'
        }
      ],
      notifications: [
        {
          number: 'Notification No. 20/2022',
          date: '02-05-2022',
          description: 'Rules for TDS on Virtual Digital Assets under Section 194S',
          url: 'https://incometaxindia.gov.in/communications/notification/notification_20_2022.pdf'
        },
        {
          number: 'Circular No. 4/2022',
          date: '04-07-2022',
          description: 'Clarification on taxation of Virtual Digital Assets',
          url: 'https://incometaxindia.gov.in/communications/circular/circular_4_2022.pdf'
        },
        {
          number: 'CBDT Instruction No. 1/2022',
          date: '15-03-2022',
          description: 'Guidelines for assessment of cryptocurrency transactions',
          url: 'https://incometaxindia.gov.in/communications/instruction/instruction_1_2022.pdf'
        }
      ],
      courtCases: [
        {
          case: 'Internet and Mobile Association of India vs RBI',
          year: '2020',
          ruling: 'Supreme Court lifted RBI ban on cryptocurrency trading',
          url: 'https://main.sci.gov.in/supremecourt/2018/19230/19230_2018_35_1501_22822_Judgement_04-Mar-2020.pdf'
        },
        {
          case: 'Kali Digital Eco-Systems vs Union of India',
          year: '2022',
          ruling: 'Delhi HC upheld constitutional validity of crypto tax provisions',
          url: 'https://delhihighcourt.nic.in/dhcqrydisp_o.asp?pn=240962&yr=2022'
        }
      ]
    }
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    individual: {
      shortTerm: 37,
      longTerm: 20,
      holdingPeriod: 12,
      description: 'Short-term: ordinary income rates (up to 37%), Long-term: capital gains rates (0%, 15%, 20%)'
    },
    corporate: {
      shortTerm: 21,
      longTerm: 21,
      holdingPeriod: 12,
      description: 'Flat 21% corporate tax rate'
    },
    specialRules: [
      'Like-kind exchanges (1031) not applicable to crypto',
      'Wash sale rules may apply',
      'Mining income taxed as ordinary income'
    ],
    legalFramework: {
      acts: [
        {
          name: 'Internal Revenue Code',
          year: '1986',
          sections: ['Section 61', 'Section 1001', 'Section 1221', 'Section 1222'],
          description: 'Federal tax code governing cryptocurrency taxation',
          url: 'https://www.law.cornell.edu/uscode/text/26'
        },
        {
          name: 'Bank Secrecy Act',
          year: '1970',
          sections: ['Section 5312', 'Section 5314'],
          description: 'Anti-money laundering requirements for crypto businesses',
          url: 'https://www.fincen.gov/resources/statutes-regulations/bank-secrecy-act'
        },
        {
          name: 'Securities Act',
          year: '1933',
          sections: ['Section 2(a)(1)', 'Section 5'],
          description: 'Securities regulations applicable to certain cryptocurrencies',
          url: 'https://www.sec.gov/about/laws/sa33.pdf'
        }
      ],
      notifications: [
        {
          number: 'Notice 2014-21',
          date: '25-03-2014',
          description: 'IRS guidance on virtual currency taxation',
          url: 'https://www.irs.gov/pub/irs-drop/n-14-21.pdf'
        },
        {
          number: 'Revenue Ruling 2019-24',
          date: '09-10-2019',
          description: 'Tax treatment of cryptocurrency hard forks and airdrops',
          url: 'https://www.irs.gov/pub/irs-drop/rr-19-24.pdf'
        },
        {
          number: 'FAQ on Virtual Currency',
          date: '13-12-2019',
          description: 'Comprehensive FAQ on cryptocurrency tax treatment',
          url: 'https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions'
        }
      ],
      courtCases: [
        {
          case: 'United States vs Coinbase',
          year: '2017',
          ruling: 'Court ordered Coinbase to provide customer records to IRS',
          url: 'https://www.courtlistener.com/docket/4357015/united-states-v-coinbase-inc/'
        }
      ]
    }
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    individual: {
      shortTerm: 20,
      longTerm: 20,
      holdingPeriod: 0,
      description: 'Capital gains tax: 10% basic rate, 20% higher rate'
    },
    corporate: {
      shortTerm: 25,
      longTerm: 25,
      holdingPeriod: 0,
      description: '25% corporation tax (19% for profits under £250k)'
    },
    specialRules: [
      '£6,000 annual CGT allowance (2023-24)',
      'Same day and 30-day rules apply',
      'Pooling rules for identical assets'
    ],
    legalFramework: {
      acts: [
        {
          name: 'Taxation of Chargeable Gains Act',
          year: '1992',
          sections: ['Section 1', 'Section 21', 'Section 104'],
          description: 'Primary legislation for capital gains tax including crypto',
          url: 'https://www.legislation.gov.uk/ukpga/1992/12/contents'
        },
        {
          name: 'Corporation Tax Act',
          year: '2009',
          sections: ['Section 2', 'Section 35'],
          description: 'Corporate taxation of cryptocurrency gains',
          url: 'https://www.legislation.gov.uk/ukpga/2009/4/contents'
        },
        {
          name: 'Proceeds of Crime Act',
          year: '2002',
          sections: ['Section 327', 'Section 328'],
          description: 'Anti-money laundering provisions for crypto businesses',
          url: 'https://www.legislation.gov.uk/ukpga/2002/29/contents'
        }
      ],
      notifications: [
        {
          number: 'HMRC Brief 9/2014',
          date: '03-03-2014',
          description: 'Bitcoin and other cryptocurrencies tax treatment',
          url: 'https://webarchive.nationalarchives.gov.uk/ukgwa/20140407180432/http://www.hmrc.gov.uk/briefs/revenue-and-customs-brief-9-2014.htm'
        },
        {
          number: 'Cryptoassets Manual',
          date: '01-12-2018',
          description: 'Comprehensive guidance on cryptoasset taxation',
          url: 'https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual'
        }
      ],
      courtCases: [
        {
          case: 'R (on the application of Rowe) vs HMRC',
          year: '2017',
          ruling: 'High Court ruling on VAT treatment of Bitcoin',
          url: 'https://www.bailii.org/ew/cases/EWHC/Admin/2017/2800.html'
        }
      ]
    }
  }
]

export function TaxJurisdictions() {
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [entityType, setEntityType] = useState<'individual' | 'corporate'>('individual')
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [holdingMonths, setHoldingMonths] = useState('')
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'calculator' | 'laws'>('calculator')

  const selectedJurisdiction = TAX_JURISDICTIONS.find(j => j.country === selectedCountry)!

  const calculateGlobalTax = () => {
    const buy = parseFloat(buyPrice)
    const sell = parseFloat(sellPrice)
    const holding = parseInt(holdingMonths)

    if (!buy || !sell || !holding) {
      alert('⚠️ Please fill all fields')
      return
    }

    const profit = sell - buy
    if (profit <= 0) {
      setResult({
        type: 'no-tax',
        profit,
        country: selectedCountry
      })
      return
    }

    const taxRule = selectedJurisdiction[entityType]
    const isLongTerm = holding >= taxRule.holdingPeriod
    const taxRate = isLongTerm ? taxRule.longTerm : taxRule.shortTerm
    const taxAmount = profit * (taxRate / 100)
    const netProfit = profit - taxAmount
    const tdsAmount = selectedJurisdiction.individual.tds ? 
      (Math.max(buy, sell) * (selectedJurisdiction.individual.tds / 100)) : 0

    setResult({
      type: 'tax-calculation',
      country: selectedCountry,
      flag: selectedJurisdiction.flag,
      currency: selectedJurisdiction.currency,
      profit,
      taxRate,
      taxAmount,
      netProfit,
      isLongTerm,
      holdingPeriod: holding,
      requiredHolding: taxRule.holdingPeriod,
      tdsAmount,
      entityType
    })
  }

  const clearForm = () => {
    setBuyPrice('')
    setSellPrice('')
    setHoldingMonths('')
    setResult(null)
  }

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      'INR': '₹',
      'USD': '$',
      'GBP': '£',
      'EUR': '€',
      'SGD': 'S$',
      'CAD': 'C$',
      'AUD': 'A$',
      'JPY': '¥'
    }
    return `${symbols[currency] || currency} ${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  const openConstitutionLink = () => {
    window.open('https://www.india.gov.in/my-government/constitution-india/constitution-india-full-text', '_blank')
    alert('🏛️ Opening Indian Constitution in new tab...')
  }

  const downloadLegalSummary = () => {
    const summary = `LEGAL FRAMEWORK FOR CRYPTOCURRENCY TAXATION - ${selectedCountry}
${'='.repeat(80)}

JURISDICTION: ${selectedJurisdiction.flag} ${selectedCountry}
GENERATED: ${new Date().toLocaleDateString()}

PRIMARY LEGISLATION:
${selectedJurisdiction.legalFramework.acts.map(act => `
${act.name} (${act.year})
${'─'.repeat(40)}
Description: ${act.description}
Relevant Sections: ${act.sections.join(', ')}
URL: ${act.url}
`).join('')}

${selectedJurisdiction.legalFramework.articles ? `CONSTITUTIONAL PROVISIONS:
${selectedJurisdiction.legalFramework.articles.map(article => `
${article.article}
${'─'.repeat(20)}
Description: ${article.description}
URL: ${article.url}
`).join('')}` : ''}

OFFICIAL NOTIFICATIONS & CIRCULARS:
${selectedJurisdiction.legalFramework.notifications.map(notification => `
${notification.number} (${notification.date})
${'─'.repeat(40)}
Description: ${notification.description}
URL: ${notification.url}
`).join('')}

${selectedJurisdiction.legalFramework.courtCases ? `LANDMARK COURT CASES:
${selectedJurisdiction.legalFramework.courtCases.map(courtCase => `
${courtCase.case} (${courtCase.year})
${'─'.repeat(40)}
Ruling: ${courtCase.ruling}
URL: ${courtCase.url}
`).join('')}` : ''}

TAX RATES SUMMARY:
==================
Individual - Short Term: ${selectedJurisdiction.individual.shortTerm}%
Individual - Long Term: ${selectedJurisdiction.individual.longTerm}%
Corporate - Short Term: ${selectedJurisdiction.corporate.shortTerm}%
Corporate - Long Term: ${selectedJurisdiction.corporate.longTerm}%
${selectedJurisdiction.individual.tds ? `TDS Rate: ${selectedJurisdiction.individual.tds}%` : ''}

SPECIAL RULES:
${selectedJurisdiction.specialRules?.map((rule, i) => `${i + 1}. ${rule}`).join('\n') || 'None specified'}

DISCLAIMER:
===========
This document is for informational purposes only and does not constitute 
legal or tax advice. Laws and regulations change frequently. Always consult 
with qualified legal and tax professionals for your specific situation.

Generated by KryptTax - Advanced Crypto Tax Calculator
Report ID: LEGAL-${Date.now()}`

    const blob = new Blob([summary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedCountry}_Crypto_Legal_Framework.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    alert('✅ Legal framework summary downloaded successfully!')
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🌍 Global Tax Calculator & Legal Framework
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-200 mb-2">Select Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        >
          {TAX_JURISDICTIONS.map((jurisdiction) => (
            <option key={jurisdiction.country} value={jurisdiction.country} className="bg-black">
              {jurisdiction.flag} {jurisdiction.country}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        {selectedCountry === 'India' && (
          <button
            onClick={openConstitutionLink}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
          >
            🏛️ Indian Constitution
          </button>
        )}
        <button
          onClick={downloadLegalSummary}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
        >
          📋 Download Legal Summary
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'calculator'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/50'
          }`}
        >
          🧮 Tax Calculator
        </button>
        <button
          onClick={() => setActiveTab('laws')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'laws'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/50'
          }`}
        >
          ⚖️ Legal Framework
        </button>
      </div>

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tax Calculator */}
          <div className="bg-gradient-to-br from-purple-900/30 to-black/30 border border-purple-500/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-purple-200">Calculate Tax</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Entity Type</label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value as 'individual' | 'corporate')}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                >
                  <option value="individual" className="bg-black">Individual</option>
                  <option value="corporate" className="bg-black">Corporate</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Buy Price ({selectedJurisdiction.currency})
                  </label>
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
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Sell Price ({selectedJurisdiction.currency})
                  </label>
                  <input
                    type="number"
                    placeholder="Enter sell price"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    step="any"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Holding Period (Months)</label>
                <input
                  type="number"
                  placeholder="Enter holding period in months"
                  value={holdingMonths}
                  onChange={(e) => setHoldingMonths(e.target.value)}
                  min="0"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={calculateGlobalTax}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-medium"
                >
                  🧮 Calculate
                </button>
                <button 
                  onClick={clearForm}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>
          </div>

          {/* Tax Rules Display */}
          <div className="bg-gradient-to-br from-purple-900/30 to-black/30 border border-purple-500/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-purple-200">
              {selectedJurisdiction.flag} {selectedJurisdiction.country} Tax Rules
            </h3>
            
            <div className="space-y-4">
              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Individual Rates</h4>
                <p className="text-purple-200 text-sm mb-2">{selectedJurisdiction.individual.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-purple-300">Short-term:</span>
                    <span className="text-pink-300 ml-2">{selectedJurisdiction.individual.shortTerm}%</span>
                  </div>
                  <div>
                    <span className="text-purple-300">Long-term:</span>
                    <span className="text-green-300 ml-2">{selectedJurisdiction.individual.longTerm}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Corporate Rates</h4>
                <p className="text-purple-200 text-sm mb-2">{selectedJurisdiction.corporate.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-purple-300">Short-term:</span>
                    <span className="text-pink-300 ml-2">{selectedJurisdiction.corporate.shortTerm}%</span>
                  </div>
                  <div>
                    <span className="text-purple-300">Long-term:</span>
                    <span className="text-green-300 ml-2">{selectedJurisdiction.corporate.longTerm}%</span>
                  </div>
                </div>
              </div>

              {selectedJurisdiction.specialRules && (
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Special Rules</h4>
                  <ul className="text-purple-200 text-sm space-y-1">
                    {selectedJurisdiction.specialRules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'laws' && (
        <div className="space-y-8">
          {/* Primary Legislation */}
          <div className="bg-gradient-to-br from-purple-900/30 to-black/30 border border-purple-500/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-purple-200">📜 Primary Legislation</h3>
            <div className="space-y-4">
              {selectedJurisdiction.legalFramework.acts.map((act, index) => (
                <div key={index} className="bg-black/30 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-purple-300">{act.name} ({act.year})</h4>
                    <button
                      onClick={() => {
                        window.open(act.url, '_blank')
                        alert(`📖 Opening ${act.name} in new tab...`)
                      }}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg transition-all duration-300"
                    >
                      📖 View Act
                    </button>
                  </div>
                  <p className="text-purple-200 text-sm mb-2">{act.description}</p>
                  <div className="text-cyan-300 text-sm">
                    <strong>Relevant Sections:</strong> {act.sections.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constitutional Provisions (for India) */}
          {selectedJurisdiction.legalFramework.articles && (
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-orange-200">🏛️ Constitutional Provisions</h3>
                <button
                  onClick={openConstitutionLink}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                >
                  📜 Full Constitution
                </button>
              </div>
              <div className="space-y-4">
                {selectedJurisdiction.legalFramework.articles.map((article, index) => (
                  <div key={index} className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-orange-300">{article.article}</h4>
                      <button
                        onClick={() => {
                          window.open(article.url, '_blank')
                          alert(`🏛️ Opening ${article.article} in new tab...`)
                        }}
                        className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg transition-all duration-300"
                      >
                        📖 View Article
                      </button>
                    </div>
                    <p className="text-orange-200 text-sm">{article.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Notifications */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-green-200">📋 Official Notifications & Circulars</h3>
            <div className="space-y-4">
              {selectedJurisdiction.legalFramework.notifications.map((notification, index) => (
                <div key={index} className="bg-black/30 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-green-300">{notification.number}</h4>
                      <p className="text-green-400 text-sm">Date: {notification.date}</p>
                    </div>
                    <button
                      onClick={() => {
                        window.open(notification.url, '_blank')
                        alert(`📋 Opening ${notification.number} in new tab...`)
                      }}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg transition-all duration-300"
                    >
                      📄 View Document
                    </button>
                  </div>
                  <p className="text-green-200 text-sm">{notification.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Court Cases */}
          {selectedJurisdiction.legalFramework.courtCases && (
            <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-500/30 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-red-200">⚖️ Landmark Court Cases</h3>
              <div className="space-y-4">
                {selectedJurisdiction.legalFramework.courtCases.map((courtCase, index) => (
                  <div key={index} className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-red-300">{courtCase.case}</h4>
                        <p className="text-red-400 text-sm">Year: {courtCase.year}</p>
                      </div>
                      <button
                        onClick={() => {
                          window.open(courtCase.url, '_blank')
                          alert(`⚖️ Opening ${courtCase.case} judgment in new tab...`)
                        }}
                        className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg transition-all duration-300"
                      >
                        📖 View Judgment
                      </button>
                    </div>
                    <p className="text-red-200 text-sm">{courtCase.ruling}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {result && activeTab === 'calculator' && (
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4 text-purple-200">
            {result.flag} {result.country} Tax Calculation
          </h3>
          
          {result.type === 'no-tax' ? (
            <div className="text-center py-4">
              <p className="text-lg text-purple-200">No tax liability - Loss or break-even trade</p>
              <p className="text-red-300 mt-2">{formatCurrency(Math.abs(result.profit), selectedJurisdiction.currency)} Loss</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">Gross Profit:</span>
                <span className="text-pink-300">{formatCurrency(result.profit, result.currency)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">Holding Period:</span>
                <span className="text-cyan-300">
                  {result.holdingPeriod} months 
                  <span className={result.isLongTerm ? 'text-green-300' : 'text-orange-300'}>
                    ({result.isLongTerm ? 'Long-term' : 'Short-term'})
                  </span>
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">Tax Rate ({result.entityType}):</span>
                <span className="text-orange-300">{result.taxRate}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-500/20">
                <span className="text-purple-300">Tax Amount:</span>
                <span className="text-red-300">{formatCurrency(result.taxAmount, result.currency)}</span>
              </div>
              {result.tdsAmount > 0 && (
                <div className="flex justify-between py-2 border-b border-purple-500/20">
                  <span className="text-purple-300">TDS:</span>
                  <span className="text-orange-300">{formatCurrency(result.tdsAmount, result.currency)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 text-lg font-bold">
                <span className="text-purple-300">Net Profit:</span>
                <span className="text-green-300">{formatCurrency(result.netProfit, result.currency)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
