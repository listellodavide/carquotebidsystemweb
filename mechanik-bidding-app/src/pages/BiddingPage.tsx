import React, { useState, useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { ArrowUpCircle, ArrowDownCircle, Wrench, LogOut } from 'lucide-react'
import { ProtectedRoute } from '../auth/ProtectedRoute'

interface Bid {
    id: number
    jobId: string
    description: string
    bestAsk: string
    bestBid: string
    spread: string
    timestamp: string
}

const useBiddingSSE = () => {
    const [bids, setBids] = useState<Bid[]>([])
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        // TODO: Replace with actual EventSource
        // const eventSource = new EventSource('http://localhost:8080/api/bidding/stream')
        // eventSource.onmessage = (event) => {
        //   const bid = JSON.parse(event.data)
        //   setBids(prev => [bid, ...prev.slice(0, 9)])
        //   setConnected(true)
        // }
        // eventSource.onerror = () => setConnected(false)
        // return () => eventSource.close()

        // Mock data for demo
        const interval = setInterval(() => {
            const mockBid: Bid = {
                id: Date.now(),
                jobId: `JOB-${Math.floor(Math.random() * 1000)}`,
                description: ['Engine Repair', 'Brake Service', 'Oil Change', 'Transmission Fix'][
                    Math.floor(Math.random() * 4)
                    ],
                bestAsk: (Math.random() * 500 + 200).toFixed(2),
                bestBid: (Math.random() * 400 + 150).toFixed(2),
                spread: '0',
                timestamp: new Date().toLocaleTimeString()
            }
            mockBid.spread = (parseFloat(mockBid.bestAsk) - parseFloat(mockBid.bestBid)).toFixed(2)

            setBids((prev) => [mockBid, ...prev.slice(0, 9)])
            setConnected(true)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return { bids, connected }
}

const BiddingContent = () => {
    const auth = useAuth()
    const { bids, connected } = useBiddingSSE()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Wrench className="w-6 h-6 text-blue-600" />
                        <h1 className="text-xl font-bold text-slate-800">Mechanik Bidding</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    connected ? 'bg-green-500' : 'bg-red-500'
                                } animate-pulse`}
                            />
                            <span className="text-sm text-slate-600">{connected ? 'Live' : 'Connecting...'}</span>
                        </div>
                        <span className="text-sm text-slate-600">{auth.user?.profile?.preferred_username}</span>
                        <button
                            onClick={() => auth.signoutRedirect()}
                            className="text-slate-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Live Repair Quotes</h2>
                        <p className="text-blue-100 text-sm">Real-time bidding via WebFlux SSE</p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Job ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Best Ask
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Best Bid
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Spread
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Time
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {bids.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        Waiting for live quotes...
                                    </td>
                                </tr>
                            ) : (
                                bids.map((bid, idx) => (
                                    <tr
                                        key={bid.id}
                                        className={`hover:bg-blue-50 transition-colors ${idx === 0 ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-mono text-slate-700">{bid.jobId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-800">{bid.description}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <ArrowUpCircle className="w-4 h-4 text-red-500" />
                                                <span className="text-sm font-semibold text-red-600">${bid.bestAsk}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <ArrowDownCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm font-semibold text-green-600">${bid.bestBid}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-sm font-medium text-slate-700">${bid.spread}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-xs text-slate-500">{bid.timestamp}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                        <strong>💡 Integration:</strong> Connect to WebFlux backend via{' '}
                        <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                            EventSource('http://localhost:8080/api/bidding/stream')
                        </code>
                    </p>
                </div>
            </div>
        </div>
    )
}

export const BiddingPage = () => (
    <ProtectedRoute>
        <BiddingContent />
    </ProtectedRoute>
)