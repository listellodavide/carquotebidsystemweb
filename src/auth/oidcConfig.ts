import { UserManagerSettings } from 'oidc-client-ts'

export const oidcConfig: UserManagerSettings = {
    authority: 'http://localhost:8002/realms/intwork',
    client_id: 'intwork-react-app',
    redirect_uri: 'http://localhost:5173/callback',
    post_logout_redirect_uri: 'http://localhost:5173/',
    response_type: 'code',
    scope: 'openid',
    automaticSilentRenew: true,
    loadUserInfo: true
}