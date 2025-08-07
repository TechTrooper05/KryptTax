'use client'

import { useState } from 'react'

interface FilingFormat {
  country: string
  flag: string
  forms: {
    name: string
    description: string
    dueDate: string
    frequency: string
    requirements: string[]
    templateContent?: string
  }[]
  recordKeeping: string[]
  penalties: string[]
  resources: {
    name: string
    url: string
    description: string
  }[]
}

const FILING_FORMATS: FilingFormat[] = [
  {
    country: 'India',
    flag: '🇮🇳',
    forms: [
      {
        name: 'ITR-2 (Individual)',
        description: 'Income Tax Return for individuals with capital gains',
        dueDate: 'July 31st',
        frequency: 'Annual',
        requirements: [
          'Report crypto gains in Schedule CG',
          'Provide transaction details',
          'Calculate tax at 31.2%',
          'Report TDS deducted'
        ],
        templateContent: `ITR-2 TEMPLATE - CRYPTO GAINS REPORTING

SCHEDULE CG - CAPITAL GAINS
=====================================

PART A - SHORT TERM CAPITAL GAINS
----------------------------------
Description of Asset: Cryptocurrency
Date of Purchase: [DD/MM/YYYY]
Date of Sale: [DD/MM/YYYY]
Sale Price: ₹[Amount]
Cost of Acquisition: ₹[Amount]
Expenses on Transfer: ₹[Amount]
Short Term Capital Gain: ₹[Amount]

PART B - LONG TERM CAPITAL GAINS
---------------------------------
Description of Asset: Cryptocurrency
Date of Purchase: [DD/MM/YYYY]
Date of Sale: [DD/MM/YYYY]
Sale Price: ₹[Amount]
Cost of Acquisition: ₹[Amount]
Expenses on Transfer: ₹[Amount]
Long Term Capital Gain: ₹[Amount]

TAX CALCULATION
===============
Total Capital Gains: ₹[Amount]
Tax Rate: 31.2% (30% + 4% cess)
Tax Payable: ₹[Amount]
TDS Deducted: ₹[Amount]
Tax Payable after TDS: ₹[Amount]

IMPORTANT NOTES:
- All crypto gains are taxed at 31.2%
- No indexation benefit available
- Losses cannot be set off against other income
- Maintain detailed transaction records`
      },
      {
        name: 'ITR-6 (Company)',
        description: 'Income Tax Return for companies',
        dueDate: 'October 31st',
        frequency: 'Annual',
        requirements: [
          'Report crypto gains as business income',
          'Maintain detailed transaction records',
          'Calculate tax at 26%',
          'File audit report if required'
        ],
        templateContent: `ITR-6 TEMPLATE - COMPANY CRYPTO INCOME

PROFIT & LOSS ACCOUNT
=====================

INCOME:
-------
Crypto Trading Income: ₹[Amount]
Other Business Income: ₹[Amount]
Total Income: ₹[Amount]

EXPENSES:
---------
Trading Fees: ₹[Amount]
Internet & Software: ₹[Amount]
Professional Fees: ₹[Amount]
Other Expenses: ₹[Amount]
Total Expenses: ₹[Amount]

NET PROFIT: ₹[Amount]

TAX COMPUTATION:
================
Net Profit: ₹[Amount]
Tax Rate: 26%
Income Tax: ₹[Amount]
Cess (4%): ₹[Amount]
Total Tax: ₹[Amount]

COMPLIANCE REQUIREMENTS:
- Maintain transaction logs
- File audit report if turnover > ₹1 crore
- Pay advance tax quarterly`
      }
    ],
    recordKeeping: [
      'Date and time of each transaction',
      'Type of transaction (buy/sell/exchange)',
      'Amount of cryptocurrency involved',
      'Value in INR at the time of transaction',
      'Exchange or platform used',
      'Wallet addresses',
      'Purpose of transaction'
    ],
    penalties: [
      'Late filing: ₹5,000 (up to ₹1 lakh for higher income)',
      'Non-filing: Up to ₹10,000',
      'Concealment of income: 50-300% of tax',
      'TDS non-compliance: Interest and penalties'
    ],
    resources: [
      {
        name: 'Income Tax Department',
        url: 'https://incometaxindia.gov.in',
        description: 'Official IT department website'
      },
      {
        name: 'ITR Filing Portal',
        url: 'https://eportal.incometax.gov.in',
        description: 'Online tax filing portal'
      }
    ]
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    forms: [
      {
        name: 'Form 8949',
        description: 'Sales and Other Dispositions of Capital Assets',
        dueDate: 'April 15th',
        frequency: 'Annual',
        requirements: [
          'Report each crypto transaction',
          'Calculate gain/loss for each trade',
          'Distinguish short-term vs long-term',
          'Attach to Schedule D'
        ],
        templateContent: `FORM 8949 - CRYPTO TRANSACTIONS

PART I - SHORT-TERM CAPITAL GAINS/LOSSES
=========================================

(a) Description of Property: Bitcoin (BTC)
(b) Date Acquired: [MM/DD/YYYY]
(c) Date Sold: [MM/DD/YYYY]
(d) Proceeds: $[Amount]
(e) Cost Basis: $[Amount]
(f) Adjustments: $[Amount]
(g) Gain/Loss: $[Amount]

PART II - LONG-TERM CAPITAL GAINS/LOSSES
========================================

(a) Description of Property: Ethereum (ETH)
(b) Date Acquired: [MM/DD/YYYY]
(c) Date Sold: [MM/DD/YYYY]
(d) Proceeds: $[Amount]
(e) Cost Basis: $[Amount]
(f) Adjustments: $[Amount]
(g) Gain/Loss: $[Amount]

INSTRUCTIONS:
- Report each crypto transaction separately
- Use FIFO method unless specific identification
- Include all fees in cost basis
- Attach supporting documentation`
      },
      {
        name: 'Schedule D',
        description: 'Capital Gains and Losses',
        dueDate: 'April 15th',
        frequency: 'Annual',
        requirements: [
          'Summarize gains/losses from Form 8949',
          'Calculate net capital gain/loss',
          'Apply capital loss limitations',
          'Report on Form 1040'
        ],
        templateContent: `SCHEDULE D - CAPITAL GAINS SUMMARY

SHORT-TERM CAPITAL GAINS/LOSSES
===============================
Total from Form 8949, Part I: $[Amount]
Short-term capital loss carryover: $[Amount]
Net short-term capital gain/loss: $[Amount]

LONG-TERM CAPITAL GAINS/LOSSES
==============================
Total from Form 8949, Part II: $[Amount]
Long-term capital loss carryover: $[Amount]
Net long-term capital gain/loss: $[Amount]

SUMMARY
=======
Net short-term gain/loss: $[Amount]
Net long-term gain/loss: $[Amount]
Total capital gain/loss: $[Amount]

TAX CALCULATION:
- Short-term gains: Ordinary income rates (up to 37%)
- Long-term gains: 0%, 15%, or 20% depending on income
- Capital loss limitation: $3,000 per year`
      }
    ],
    recordKeeping: [
      'Date of acquisition and sale',
      'Fair market value at acquisition',
      'Sale price and date',
      'Transaction fees',
      'Exchange records',
      'Wallet addresses and private keys',
      'Mining pool records'
    ],
    penalties: [
      'Late filing: 5% per month (max 25%)',
      'Late payment: 0.5% per month',
      'Accuracy-related penalty: 20%',
      'Fraud penalty: 75%'
    ],
    resources: [
      {
        name: 'IRS Crypto Guidance',
        url: 'https://irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions',
        description: 'Official IRS crypto tax guidance'
      },
      {
        name: 'Form 8949 Instructions',
        url: 'https://irs.gov/forms-pubs/about-form-8949',
        description: 'Instructions for reporting crypto transactions'
      }
    ]
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    forms: [
      {
        name: 'Self Assessment (SA100)',
        description: 'Annual Self Assessment tax return',
        dueDate: 'January 31st',
        frequency: 'Annual',
        requirements: [
          'Report capital gains on SA108',
          'Calculate CGT liability',
          'Claim annual exemption',
          'Pay CGT by January 31st'
        ],
        templateContent: `SA100 - SELF ASSESSMENT RETURN

CAPITAL GAINS SECTION
=====================

Total disposal proceeds: £[Amount]
Total allowable costs: £[Amount]
Total gains before losses: £[Amount]
Total losses: £[Amount]
Net gains after losses: £[Amount]
Annual exempt amount: £6,000
Taxable gains: £[Amount]

CGT CALCULATION:
================
Basic rate band available: £[Amount]
Gains taxed at 10%: £[Amount]
Gains taxed at 20%: £[Amount]
Total CGT due: £[Amount]

CRYPTO-SPECIFIC NOTES:
- Apply pooling rules for identical tokens
- Same day and 30-day rules apply
- Keep detailed transaction records`
      }
    ],
    recordKeeping: [
      'Date and type of transaction',
      'Number of tokens/coins',
      'Value in GBP at transaction date',
      'Exchange rate used',
      'Transaction fees',
      'Wallet addresses',
      'Exchange statements'
    ],
    penalties: [
      'Late filing: £100 + daily penalties',
      'Late payment: Interest charges',
      'Inaccurate return: Up to 100% penalty',
      'Deliberate concealment: Up to 200%'
    ],
    resources: [
      {
        name: 'HMRC Crypto Guidance',
        url: 'https://gov.uk/hmrc-internal-manuals/cryptoassets-manual',
        description: 'Official HMRC cryptoasset guidance'
      },
      {
        name: 'Self Assessment Online',
        url: 'https://gov.uk/self-assessment-tax-returns',
        description: 'Online self assessment portal'
      }
    ]
  }
]

export function TaxFilingFormats() {
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [activeTab, setActiveTab] = useState<'forms' | 'records' | 'penalties' | 'resources'>('forms')
  const [taxReportData, setTaxReportData] = useState({
    totalGains: '',
    totalLosses: '',
    transactions: '',
    taxYear: new Date().getFullYear().toString()
  })

  const selectedFormat = FILING_FORMATS.find(f => f.country === selectedCountry)!

  const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadTemplate = (form: any) => {
    if (form.templateContent) {
      const filename = `${form.name.replace(/[^a-zA-Z0-9]/g, '_')}_Template.txt`
      downloadFile(form.templateContent, filename)
      alert(`✅ Downloaded ${form.name} template successfully!`)
    } else {
      // Generate a basic template
      const basicTemplate = `${form.name} - ${selectedCountry}
${'='.repeat(50)}

Form: ${form.name}
Description: ${form.description}
Due Date: ${form.dueDate}
Frequency: ${form.frequency}

Requirements:
${form.requirements.map((req, i) => `${i + 1}. ${req}`).join('\n')}

Instructions:
- Fill in all required fields
- Attach supporting documentation
- Submit before due date
- Keep copies for your records

Generated by KryptTax - ${new Date().toLocaleDateString()}`

      const filename = `${form.name.replace(/[^a-zA-Z0-9]/g, '_')}_Template.txt`
      downloadFile(basicTemplate, filename)
      alert(`✅ Downloaded ${form.name} template successfully!`)
    }
  }

  const downloadRecordKeepingGuide = () => {
    const guide = `CRYPTO TAX RECORD KEEPING GUIDE - ${selectedCountry}
${'='.repeat(60)}

REQUIRED RECORDS:
${selectedFormat.recordKeeping.map((record, i) => `${i + 1}. ${record}`).join('\n')}

BEST PRACTICES:
- Use crypto tax software for automatic tracking
- Export data from exchanges regularly
- Backup records in multiple locations
- Keep records for at least 7 years
- Document the source of all transactions
- Maintain separate records for personal vs business use

RECOMMENDED TOOLS:
- Spreadsheet templates
- Crypto tax software (Koinly, CoinTracker, etc.)
- Exchange export tools
- Blockchain explorers for verification

PENALTIES FOR NON-COMPLIANCE:
${selectedFormat.penalties.map((penalty, i) => `${i + 1}. ${penalty}`).join('\n')}

Generated by KryptTax - ${new Date().toLocaleDateString()}
For educational purposes only - consult a tax professional`

    downloadFile(guide, `${selectedCountry}_Crypto_Record_Keeping_Guide.txt`)
    alert('✅ Downloaded record keeping guide successfully!')
  }

  const generateTaxReport = () => {
    if (!taxReportData.totalGains && !taxReportData.totalLosses) {
      alert('⚠️ Please enter tax report data first!')
      return
    }

    const report = `CRYPTOCURRENCY TAX REPORT - ${selectedCountry}
${'='.repeat(60)}

TAX YEAR: ${taxReportData.taxYear}
GENERATED: ${new Date().toLocaleDateString()}
JURISDICTION: ${selectedFormat.flag} ${selectedCountry}

SUMMARY:
--------
Total Capital Gains: ${taxReportData.totalGains || '0'}
Total Capital Losses: ${taxReportData.totalLosses || '0'}
Number of Transactions: ${taxReportData.transactions || '0'}

NET POSITION:
-------------
Net Gain/Loss: ${(parseFloat(taxReportData.totalGains || '0') - parseFloat(taxReportData.totalLosses || '0')).toFixed(2)}

TAX IMPLICATIONS (${selectedCountry}):
${selectedFormat.forms.map(form => `
${form.name}:
- Due Date: ${form.dueDate}
- Requirements: ${form.requirements.join(', ')}
`).join('')}

REQUIRED FORMS:
${selectedFormat.forms.map(form => `- ${form.name}: ${form.description}`).join('\n')}

RECORD KEEPING REQUIREMENTS:
${selectedFormat.recordKeeping.map((req, i) => `${i + 1}. ${req}`).join('\n')}

PENALTIES FOR NON-COMPLIANCE:
${selectedFormat.penalties.map((penalty, i) => `${i + 1}. ${penalty}`).join('\n')}

OFFICIAL RESOURCES:
${selectedFormat.resources.map(res => `- ${res.name}: ${res.url}`).join('\n')}

DISCLAIMER:
-----------
This report is for informational purposes only and does not constitute 
tax advice. Please consult with a qualified tax professional for your 
specific situation. Tax laws vary by jurisdiction and change frequently.

Generated by KryptTax - Advanced Crypto Tax Calculator
Report ID: KT-${Date.now()}`

    downloadFile(report, `${selectedCountry}_Crypto_Tax_Report_${taxReportData.taxYear}.txt`)
    alert('✅ Tax report generated and downloaded successfully!')
  }

  const downloadAllTemplates = () => {
    selectedFormat.forms.forEach((form, index) => {
      setTimeout(() => {
        downloadTemplate(form)
      }, index * 500) // Stagger downloads
    })
    alert(`📄 Downloading all ${selectedFormat.forms.length} templates for ${selectedCountry}...`)
  }

  const exportToCSV = () => {
    const csvContent = `Form Name,Description,Due Date,Frequency
${selectedFormat.forms.map(form => 
  `"${form.name}","${form.description}","${form.dueDate}","${form.frequency}"`
).join('\n')}`

    downloadFile(csvContent, `${selectedCountry}_Tax_Forms.csv`, 'text/csv')
    alert('✅ Exported forms data to CSV successfully!')
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        📋 Tax Filing Formats
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-200 mb-2">Select Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        >
          {FILING_FORMATS.map((format) => (
            <option key={format.country} value={format.country} className="bg-black">
              {format.flag} {format.country}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={downloadAllTemplates}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
        >
          📦 Download All Templates
        </button>
        <button
          onClick={downloadRecordKeepingGuide}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
        >
          📝 Record Keeping Guide
        </button>
        <button
          onClick={exportToCSV}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
        >
          📊 Export to CSV
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'forms', label: '📄 Forms', icon: '📄' },
          { id: 'records', label: '📝 Records', icon: '📝' },
          { id: 'penalties', label: '⚠️ Penalties', icon: '⚠️' },
          { id: 'resources', label: '🔗 Resources', icon: '🔗' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-black/30 border border-purple-500/30 p-6 rounded-xl backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-4 text-purple-200">
          {selectedFormat.flag} {selectedFormat.country}
        </h3>

        {/* Forms Tab */}
        {activeTab === 'forms' && (
          <div className="space-y-6">
            {/* Tax Report Generator */}
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-bold text-green-300 mb-4">📊 Generate Tax Report</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-green-200 mb-2">Tax Year</label>
                  <input
                    type="number"
                    value={taxReportData.taxYear}
                    onChange={(e) => setTaxReportData({...taxReportData, taxYear: e.target.value})}
                    className="w-full px-3 py-2 bg-black/50 border border-green-500/30 rounded-lg text-white"
                    min="2020"
                    max="2030"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-200 mb-2">Total Gains</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={taxReportData.totalGains}
                    onChange={(e) => setTaxReportData({...taxReportData, totalGains: e.target.value})}
                    className="w-full px-3 py-2 bg-black/50 border border-green-500/30 rounded-lg text-white"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-200 mb-2">Total Losses</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={taxReportData.totalLosses}
                    onChange={(e) => setTaxReportData({...taxReportData, totalLosses: e.target.value})}
                    className="w-full px-3 py-2 bg-black/50 border border-green-500/30 rounded-lg text-white"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-200 mb-2">Transactions</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={taxReportData.transactions}
                    onChange={(e) => setTaxReportData({...taxReportData, transactions: e.target.value})}
                    className="w-full px-3 py-2 bg-black/50 border border-green-500/30 rounded-lg text-white"
                  />
                </div>
              </div>
              <button
                onClick={generateTaxReport}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 font-medium"
              >
                📊 Generate Complete Tax Report
              </button>
            </div>

            {selectedFormat.forms.map((form, index) => (
              <div key={index} className="bg-black/30 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-purple-300 mb-2">{form.name}</h4>
                    <p className="text-purple-200 mb-2">{form.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-cyan-300">Due: {form.dueDate}</span>
                      <span className="text-pink-300">Frequency: {form.frequency}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadTemplate(form)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
                    >
                      📄 Download Template
                    </button>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-purple-300 mb-2">Requirements:</h5>
                  <ul className="space-y-1">
                    {form.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start text-purple-200 text-sm">
                        <span className="text-pink-400 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-purple-300">Required Record Keeping</h4>
              <button
                onClick={downloadRecordKeepingGuide}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                📥 Download Guide
              </button>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <p className="text-purple-200 mb-4">
                Maintain detailed records of all cryptocurrency transactions for tax compliance:
              </p>
              <ul className="space-y-2">
                {selectedFormat.recordKeeping.map((record, index) => (
                  <li key={index} className="flex items-start text-purple-200">
                    <span className="text-green-400 mr-2">✓</span>
                    {record}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-purple-900/30 rounded-lg">
                <p className="text-purple-300 font-semibold mb-2">💡 Pro Tip:</p>
                <p className="text-purple-200 text-sm">
                  Use crypto tax software or maintain a detailed spreadsheet to track all transactions. 
                  Export data from exchanges regularly and backup your records securely.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Penalties Tab */}
        {activeTab === 'penalties' && (
          <div>
            <h4 className="text-xl font-bold text-purple-300 mb-4">Penalties & Consequences</h4>
            <div className="bg-black/30 p-6 rounded-lg">
              <p className="text-red-300 mb-4 font-semibold">
                ⚠️ Non-compliance can result in significant penalties:
              </p>
              <ul className="space-y-2">
                {selectedFormat.penalties.map((penalty, index) => (
                  <li key={index} className="flex items-start text-purple-200">
                    <span className="text-red-400 mr-2">⚠</span>
                    {penalty}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 font-semibold mb-2">🚨 Important:</p>
                <p className="text-purple-200 text-sm">
                  Always consult with a qualified tax professional for your specific situation. 
                  Tax laws change frequently and professional advice is recommended.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <h4 className="text-xl font-bold text-purple-300 mb-4">Official Resources</h4>
            <div className="space-y-4">
              {selectedFormat.resources.map((resource, index) => (
                <div key={index} className="bg-black/30 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-1">{resource.name}</h5>
                      <p className="text-purple-200 text-sm mb-2">{resource.description}</p>
                      <p className="text-cyan-300 text-sm font-mono">{resource.url}</p>
                    </div>
                    <button
                      onClick={() => {
                        window.open(resource.url, '_blank')
                        alert(`🔗 Opening ${resource.name} in new tab...`)
                      }}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg transition-all duration-300"
                    >
                      🔗 Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 font-semibold mb-2">📚 Additional Help:</p>
              <p className="text-purple-200 text-sm">
                Consider using crypto tax software like Koinly, CoinTracker, or TaxBit for automated 
                calculations and form generation. Always verify with official government resources.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
