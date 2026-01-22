import React from 'react'
import { useAuth } from 'react-oidc-context'
import { Navigate } from 'react-router-dom'

interface Props {
    children: JSX.Element
}

export const ProtectedRoute = ({ children }: Props) => {
    const auth = useAuth()

    if (!auth.isAuthenticated) {
        if (auth.isLoading) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
                    <div className="text-slate-600">Loading...</div>
                </div>
            )
        }
        return <Navigate to="/" replace />
    }

    return children
}