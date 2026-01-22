import React, { ReactNode } from 'react'
import { AuthProvider as OidcProvider } from 'react-oidc-context'
import { oidcConfig } from './oidcConfig'

interface Props {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    return <OidcProvider {...oidcConfig}>{children}</OidcProvider>
}