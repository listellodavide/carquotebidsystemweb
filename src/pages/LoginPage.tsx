import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const { login, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            const from = (location.state as any)?.from?.pathname || '/welcome';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate, location]);

    const handleLogin = () => {
        login();
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#f8f9fa'
        }}>
            <div style={{
                padding: '40px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ marginBottom: '20px', color: '#1a1a1a' }}>Welcome</h1>
                <p style={{ marginBottom: '30px', color: '#666' }}>Please login to access the system.</p>
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                    Login with Keycloak
                </button>
            </div>
        </div>
    );
};