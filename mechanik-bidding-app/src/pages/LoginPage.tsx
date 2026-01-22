import React from 'react'
import { useAuth } from 'react-oidc-context'
import { Navigate } from 'react-router-dom'
import { Wrench } from 'lucide-react'

export const LoginPage = () => {
    const auth = useAuth()

    if (auth.isAuthenticated) {
        return <Navigate to="/welcome" replace />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full border border-slate-200">
                <div className="flex items-center justify-center mb-8">
                    <Wrench className="w-16 h-16 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">Mechanik</h1>
                <p className="text-slate-500 text-center mb-8">Car Repair Quotes & Bidding Platform</p>

                <button
                    onClick={() => auth.signinRedirect()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md"
                >
                    Login with Keycloak
                </button>

                <p className="text-xs text-slate-400 text-center mt-6">
                    Secure authentication via Keycloak SSO
                </p>
            </div>
        </div>
    )
}