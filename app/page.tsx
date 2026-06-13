'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Navigation } from '@/components/navigation'
import { CurrencyConverter } from '@/components/currency-converter'
import { TaxCalculator } from '@/components/tax-calculator'
import { Portfolio } from '@/components/portfolio'
import { MarketPrices } from '@/components/market-prices'
import { TaxStrategies } from '@/components/tax-strategies'
import { CryptoRecommendations } from '@/components/crypto-recommendations'
import { UserProfile } from '@/components/user-profile'
import { TaxJurisdictions } from '@/components/tax-jurisdictions'
import { TaxFilingFormats } from '@/components/tax-filing-formats'

export type Section = 'converter' | 'tax' | 'portfolio' | 'prices' | 'strategies' | 'recommendations' | 'profile' | 'jurisdictions' | 'filing'

export interface UserProfileType {
  name: string
  email: string
  experience: 'beginner' | 'intermediate' | 'advanced'
  joinDate?: string
}

export interface PortfolioPosition {
  id: number
  coin: string
  amount: number
  buyPrice: number
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('converter')
  const [livePricesEnabled, setLivePricesEnabled] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    name: 'Guest User',
    email: '',
    experience: 'beginner'
  })
  const [portfolio, setPortfolio] = useState<PortfolioPosition[]>([])
  const [showTerms, setShowTerms] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Show terms modal on first load
  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem('krypttax-terms-accepted')
    if (!hasAcceptedTerms) {
      setShowTerms(true)
    } else {
      setTermsAccepted(true)
    }
  }, [])

  const handleAcceptTerms = () => {
    setTermsAccepted(true)
    setShowTerms(false)
    localStorage.setItem('krypttax-terms-accepted', 'true')
    alert('✅ Terms accepted! Welcome to KryptTax. Remember: Always consult professionals for tax advice.')
  }

  const handleDeclineTerms = () => {
    alert('❌ You must accept the terms to use KryptTax. Redirecting...')
    window.location.href = 'https://google.com'
  }

  // Don't render the main app until terms are accepted
  if (!termsAccepted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-purple-900/95 to-black/95 border border-purple-500/30 rounded-2xl max-w-4xl max-h-[95vh] overflow-y-auto p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              🇮🇳 KryptTax
            </h1>
            <p className="text-purple-200 text-xl mb-2">
              Advanced Crypto Tax Calculator & Portfolio Tracker
            </p>
            <p className="text-red-300 text-lg font-semibold">
              ⚠️ Please read and accept our Terms & Conditions to continue
            </p>
          </div>
          
          <div className="space-y-6 text-purple-200">
            <div className="bg-red-900/40 border border-red-500/40 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-300 mb-3">⚠️ CRITICAL DISCLAIMER</h3>
              <p className="text-red-200 text-lg leading-relaxed">
                This is a calculator tool for <strong>educational and informational purposes ONLY</strong>. 
                We are <strong>NOT responsible</strong> for any financial, legal, or tax-related decisions made based on this tool.
                <strong> USE AT YOUR OWN RISK!</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-300 mb-2">🚫 No Financial Advice</h3>
                <p className="text-sm leading-relaxed">
                  KryptTax is a calculation tool only. We do not provide financial, investment, tax, or legal advice. 
                  All calculations are estimates and should not be considered as professional advice.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-300 mb-2">📊 Calculation Accuracy</h3>
                <p className="text-sm leading-relaxed">
                  Tax calculations are complex and depend on numerous factors. Our calculations may not reflect 
                  your actual tax liability. Tax laws change frequently.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-300 mb-2">⚖️ Legal Information</h3>
                <p className="text-sm leading-relaxed">
                  Legal information provided is for educational purposes only and does not constitute legal advice. 
                  Always verify with official government sources.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-300 mb-2">🔒 Data Privacy</h3>
                <p className="text-sm leading-relaxed">
                  Your data is processed locally in your browser. We do not store or transmit your personal 
                  financial information. You are responsible for data security.
                </p>
              </div>
            </div>

            <div className="bg-yellow-900/40 border border-yellow-500/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">🚨 LIMITATION OF LIABILITY</h3>
              <p className="text-yellow-200 leading-relaxed">
                KryptTax, its developers, and affiliates shall <strong>NOT be liable</strong> for any direct, indirect, 
                incidental, special, or consequential damages arising from the use of this tool. This includes 
                but is not limited to <strong>financial losses, tax penalties, legal issues, or investment decisions</strong>.
              </p>
            </div>

            <div className="bg-orange-900/40 border border-orange-500/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-300 mb-3">📝 MANDATORY PROFESSIONAL CONSULTATION</h3>
              <p className="text-orange-200 leading-relaxed">
                We <strong>STRONGLY RECOMMEND</strong> consulting with qualified tax professionals, accountants, and legal 
                advisors before making any financial or tax-related decisions. This tool should supplement, 
                <strong> NOT REPLACE</strong>, professional advice.
              </p>
            </div>

            <div className="bg-red-900/50 border border-red-500/50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-300 mb-3">⚡ FINAL WARNING - USE AT YOUR OWN RISK</h3>
              <p className="text-red-200 text-lg leading-relaxed">
                By clicking "I Accept", you acknowledge that you understand these limitations and agree to use 
                this tool <strong>AT YOUR OWN RISK</strong>. You are <strong>SOLELY RESPONSIBLE</strong> for any decisions 
                made based on the information provided by this tool.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleAcceptTerms}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 font-bold text-lg"
              >
                ✅ I UNDERSTAND & ACCEPT ALL RISKS
              </button>
              <button
                onClick={handleDeclineTerms}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 font-bold text-lg"
              >
                ❌ I DECLINE - EXIT SITE
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-purple-300 text-sm">
                🔒 Your acceptance is stored locally. You can review terms anytime from the header.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-5">
        <Header 
          userProfile={userProfile}
          livePricesEnabled={livePricesEnabled}
          setLivePricesEnabled={setLivePricesEnabled}
          onProfileClick={() => setActiveSection('profile')}
          onTermsClick={() => setShowTerms(true)}
        />
        
        <Navigation 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/20">
          {activeSection === 'converter' && <CurrencyConverter livePricesEnabled={livePricesEnabled} />}
          {activeSection === 'tax' && <TaxCalculator />}
          {activeSection === 'portfolio' && (
            <Portfolio 
              portfolio={portfolio}
              setPortfolio={setPortfolio}
              livePricesEnabled={livePricesEnabled}
            />
          )}
          {activeSection === 'prices' && <MarketPrices livePricesEnabled={livePricesEnabled} />}
          {activeSection === 'strategies' && <TaxStrategies />}
          {activeSection === 'recommendations' && <CryptoRecommendations />}
          {activeSection === 'profile' && (
            <UserProfile 
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              portfolio={portfolio}
            />
          )}
          {activeSection === 'jurisdictions' && <TaxJurisdictions />}
          {activeSection === 'filing' && <TaxFilingFormats />}
        </div>

        {/* Optional Terms Modal for Re-reading */}
        {showTerms && termsAccepted && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-purple-900/95 to-black/95 border border-purple-500/30 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  📋 Terms & Conditions (Review)
                </h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-purple-300 hover:text-white text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6 text-purple-200">
                <div className="bg-red-900/30 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-red-300 mb-2">⚠️ IMPORTANT DISCLAIMER</h3>
                  <p className="text-red-200">
                    This is a calculator tool for educational and informational purposes only. 
                    We are NOT responsible for any financial, legal, or tax-related decisions made based on this tool.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2">🚫 No Financial Advice</h3>
                  <p className="text-sm leading-relaxed">
                    KryptTax is a calculation tool only. We do not provide financial, investment, tax, or legal advice. 
                    All calculations are estimates and should not be considered as professional advice. Always consult 
                    qualified professionals for your specific situation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2">📊 Calculation Accuracy</h3>
                  <p className="text-sm leading-relaxed">
                    While we strive for accuracy, tax calculations are complex and depend on numerous factors. 
                    Our calculations may not reflect your actual tax liability. Tax laws change frequently, 
                    and this tool may not reflect the most current regulations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2">⚖️ Legal Information</h3>
                  <p className="text-sm leading-relaxed">
                    Legal information provided is for educational purposes only and does not constitute legal advice. 
                    Laws vary by jurisdiction and change over time. The legal framework information may not be current 
                    or complete. Always verify with official government sources.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2">🔒 Data Privacy</h3>
                  <p className="text-sm leading-relaxed">
                    Your data is processed locally in your browser. We do not store or transmit your personal 
                    financial information. However, you are responsible for keeping your financial data secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2">🚨 Limitation of Liability</h3>
                  <p className="text-sm leading-relaxed">
                    KryptTax, its developers, and affiliates shall not be liable for any direct, indirect, 
                    incidental, special, or consequential damages arising from the use of this tool. This includes 
                    but is not limited to financial losses, tax penalties, legal issues, or investment decisions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2">📝 Professional Consultation</h3>
                  <p className="text-sm leading-relaxed">
                    We strongly recommend consulting with qualified tax professionals, accountants, and legal 
                    advisors before making any financial or tax-related decisions. This tool should supplement, 
                    not replace, professional advice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2">🔄 Updates and Changes</h3>
                  <p className="text-sm leading-relaxed">
                    Tax laws and regulations change frequently. This tool may not reflect the most current 
                    information. Users are responsible for verifying current tax rates, rules, and regulations 
                    with official sources.
                  </p>
                </div>

                <div className="bg-yellow-900/30 border border-yellow-500/30 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-300 mb-2">⚡ Use at Your Own Risk</h3>
                  <p className="text-yellow-200 text-sm">
                    By using KryptTax, you acknowledge that you understand these limitations and agree to use 
                    this tool at your own risk. You are solely responsible for any decisions made based on 
                    the information provided by this tool.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowTerms(false)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                  >
                    📖 Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
