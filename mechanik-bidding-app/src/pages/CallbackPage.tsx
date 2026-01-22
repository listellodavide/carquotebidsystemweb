import React, { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'

export const CallbackPage = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isLoading && auth.isAuthenticated) {
            navigate('/welcome')
        }
        if (!auth.isLoading && auth.error) {
            console.error('Auth error:', auth.error)
        }
    }, [auth, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="text-slate-600">Loading authentication...</div>
        </div>
    )
}