import React from 'react'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Shield } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    realm_access?: {
        roles?: string[]
    }
}

export const WelcomePage = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const accessToken = auth.user?.access_token

    const roles = accessToken
        ? (jwtDecode<DecodedToken>(accessToken)?.realm_access?.roles || [])
        : []

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                Welcome back, {auth.user?.profile?.preferred_username}!
                            </h1>
                            <p className="text-slate-500">Ready to manage repair quotes</p>
                        </div>
                        <button
                            onClick={() => auth.signoutRedirect()}
                            className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <User className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-slate-800 mb-1">Account</h3>
                            <p className="text-sm text-slate-600">{auth.user?.profile?.email}</p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <Shield className="w-8 h-8 text-green-600 mb-3" />
                            <h3 className="font-semibold text-slate-800 mb-1">Roles</h3>
                            <p className="text-sm text-slate-600">{roles.join(', ') || 'No roles assigned'}</p>
                        </div>
                    </div>

                    <details className="mb-8 bg-slate-50 p-4 rounded-lg">
                        <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                            Access Token (raw)
                        </summary>
                        <pre className="mt-4 text-xs text-slate-600 overflow-auto max-h-64 bg-white p-4 rounded border border-slate-200">
              {accessToken}
            </pre>
                    </details>

                    <button
                        onClick={() => navigate('/bidding')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md"
                    >
                        Go to Bidding Platform →
                    </button>
                </div>
            </div>
        </div>
    )
}