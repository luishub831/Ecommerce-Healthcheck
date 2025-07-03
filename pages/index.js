import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import CalendlyWidget from './components/CalendlyWidget';
import Link from 'next/link';


// Simple Modal component
function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState(null)
  const [error, setError] = useState(null)

  // Modal state and accounts/properties state
  const [showAccountsModal, setShowAccountsModal] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [properties, setProperties] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accountLoading, setAccountLoading] = useState(null) // <-- NEW: Track loading per account


  const handleGoogleAuth = () => {
    setLoading(true)
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '581709402289-ub9q4lmhlfej220c4fa9sjoibpnmp96t.apps.googleusercontent.com'
    const redirectUri = `${window.location.origin}/api/auth/callback`
    const scope = 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/analytics'
    console.log("clientId", clientId)
    console.log("redirectUri", redirectUri)
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`
    
    window.location.href = authUrl
  }
  // Fetch accounts after authentication
  const fetchAccounts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/analytics/accounts')
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        return
      }
      setAccounts(data)
      setShowAccountsModal(true)
    } catch (err) {
      setError('Kunne ikke hente kontoer')
    } finally {
      setLoading(false)
    }
  }

  const fetchProperties = async (accountName) => {
    setAccountLoading(accountName)
    setError(null)
    try {
      const res = await fetch(`/api/analytics/properties?accountName=${encodeURIComponent(accountName)}`)
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setAccountLoading(null)
        return
      }
      setProperties(data)
      setSelectedAccount(accountName)
      setShowAccountsModal(false)
      setAnalyticsData(data)
      setStep(2)
      // You can open another modal for properties if needed
    } catch (err) {
      setError('Kunne ikke hente properties')
    } finally {
      setAccountLoading(null)
    }
  }

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/analytics')
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
        return
      }
      
      setAnalyticsData(data)
      setStep(2)
    } catch (err) {
      setError('Failed to fetch analytics data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check if we have auth code from OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    
    if (code && step === 1) {
      // Exchange code for access token and fetch data
      fetch('/api/auth/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchAccounts()
        } else {
          setError(data.error || 'Authentication failed')
        }
      })
      .catch(err => setError('Authentication failed'))
    }
  }, [step])

  const renderStep1 = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Side - Connect */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16  flex items-center justify-center mx-auto mb-6">
                <img
                  src="/moenco_ny_logo.webp"
                  alt="Moen & CO Logo"
                  className="w-16 h-16 object-contain"
                  width={32}
                  height={32}
                      />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Moen & CO Helsesjekk 2.0</h1>
            <p className="text-lg text-gray-600 mb-8">
              Få innsikt i konverteringsrate og gjennomsnittlig ordresum fra Google Analytics på under 30 sekunder.
            </p>
            
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Kobler til...' : 'GI TILGANG TIL GOOGLE ANALYTICS'}
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Sikker tilkobling via Google OAuth 2.0
            </p>
            <p className='flex justify-around mt-4'>
              <Link href="/personvern" className="underline hover:text-blue-600">
                Personvernerklæring
              </Link>
              <Link href="/vilkar" className="underline hover:text-blue-600">
                Vilkår og betingelser
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Dine Analytics Venter</h3>
            <p className="text-gray-500">Konverteringsrate og ordresum vises her etter tilkobling</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analytic Resultater for {
                  accounts.find(acc => acc.name === selectedAccount)?.displayName || selectedAccount
                }
              </h1>
              <p className="text-gray-600">Basert på de siste 90 dagene</p>
            </div>
            {/* Button to open accounts modal again */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => setShowAccountsModal(true)}
            >
              Bytt konto
            </button>
          </div>

          {analyticsData && (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Conversion Rate */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Konverteringsrate</h3>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {analyticsData.conversionRate}%
                </div>
                <p className="text-sm text-gray-600">
                  Benchmark: 2-3% er gjennomsnitt for e-handel
                </p>
                <div className="mt-4 bg-white rounded-lg p-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Ditt resultat</span>
                    <span>Benchmark</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(analyticsData.conversionRate / 5 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Average Order Value */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gjennomsnittlig ordreverdi</h3>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      analyticsData.averageOrderValue >= 700
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                    }`}
                    >
                    {analyticsData.averageOrderValue >= 700 ? 'Good!' : 'Not Good'}
                    </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {analyticsData.averageOrderValue} kr 
                </div>
                <p className="text-sm text-gray-600">
                  Høyere AOV betyr mer inntekt per kunde
                </p>
                {/* <div className="mt-4 bg-white rounded-lg p-3">
                  <ResponsiveContainer width="100%" height={60}>
                    <BarChart data={[{ name: 'AOV', value: analyticsData.averageOrderValue }]}>
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div> */}
                <div className="mt-4 bg-white rounded-lg p-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Ditt resultat</span>
                    <span>700, -</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                          analyticsData.averageOrderValue >= 700 ? 'bg-green-600' : 'bg-red-500'
                          }`}
                      style={{ width: `${Math.min((analyticsData.averageOrderValue / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="rounded-xl p-8 text-center text-white" style={{ backgroundColor: '#e3ccd7' }}>
            <h2 className="text-2xl font-bold mb-4">Vil du forbedre disse tallene?</h2>
            <p className="text-lg mb-6 opacity-90">
              Få en gratis gjennomgang av nettbutikken din og konkrete tips for å øke salget
            </p>
            {/* <button
              onClick={() => setStep(3)}
              className="bg-white text-red-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              GRATIS GJENNOMGANG AV NETTBUTIKKEN
            </button> */}
            <CalendlyWidget />
           
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Din Gratis Konsultasjon</h1>
        <p className="text-lg text-gray-600 mb-8">
          La oss analysere dine resultater og gi deg konkrete råd for å øke konverteringsraten og ordresummen.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Hva du får:</h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              30 minutters personlig gjennomgang
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Analyse av dine konkrete muligheter
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Handlingsplan for økt salg
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
            BOOK GRATIS KONSULTASJON
          </button>
          
          <button
            onClick={() => setStep(1)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Tilbake til start
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {error ? (
        // ...existing error rendering...
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Noe gikk galt</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null)
                setStep(1)
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Prøv igjen
            </button>
          </div>
        </div>
      ) : step === 1 ? (
        renderStep1()
      ) : step === 2 ? (
        renderStep2()
      ) : step === 3 ? (
        renderStep3()
      ) : null}

      {/* Accounts Modal */}
      <Modal open={showAccountsModal} onClose={() => setShowAccountsModal(false)}>
        <h2 className="text-xl font-bold mb-4">Velg Google Analytics-konto</h2>
        {accounts.length === 0 ? (
          <p>Ingen kontoer funnet.</p>
        ) : (
          <ul className="space-y-2">
            {accounts.map((account) => (
              <li key={account.name}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 border border-gray-200 flex items-center justify-between ${accountLoading === account.name ? 'opacity-60 cursor-wait' : ''}`}
                  onClick={() => fetchProperties(account.name)}
                  disabled={!!accountLoading}
                >
                  <span>{account.displayName}</span>
                  {accountLoading === account.name && (
                    <svg className="animate-spin h-5 w-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
        
      </Modal>
      {/* You can add a similar modal for properties if needed */}
    </>
  )
}