import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { api } from '../services/apiService';

export const WelcomePage: React.FC = () => {
    const { user, logout } = useAuth();
    const [helloMessage, setHelloMessage] = useState<string>('Loading...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHello = async () => {
            try {
                const data = await api('/hello');
                if (data && data.message) {
                    setHelloMessage(data.message);
                } else if (typeof data === 'string') {
                    setHelloMessage(data);
                } else {
                    setHelloMessage('Received successful response from /hello');
                }
            } catch (err) {
                setError('Failed to fetch /hello endpoint');
                console.error(err);
            }
        };

        fetchHello();
    }, []);

    return (
        <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '20px',
                borderBottom: '1px solid #eee',
                marginBottom: '40px'
            }}>
                <h2>Car Quote Bid System</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span>Welcome, <strong>{user?.name || user?.email || 'User'}</strong></span>
                    <button
                        onClick={logout}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div style={{
                padding: '30px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
            }}>
                <h3>Protected API Response</h3>
                {error ? (
                    <p style={{ color: '#dc3545' }}>{error}</p>
                ) : (
                    <p style={{ fontSize: '18px', fontWeight: '500', color: '#28a745' }}>
                        {helloMessage}
                    </p>
                )}
            </div>
        </div>
    );
};