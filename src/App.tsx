import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { LoginPage } from './pages/LoginPage'
import { CallbackPage } from './pages/CallbackPage'
import { WelcomePage } from './pages/WelcomePage'
import { BiddingPage } from './pages/BiddingPage'

export default function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/bidding" element={<BiddingPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}
