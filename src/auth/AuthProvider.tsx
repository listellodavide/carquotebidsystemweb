import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/apiService';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkSession = async () => {
        try {
            setIsLoading(true);
            // Assuming the BFF has a /me or /session endpoint to get current user info
            const userData = await api('/me');
            if (userData) {
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const login = () => {
        // Redirect to BFF login which handles Keycloak OIDC flow
        window.location.href = `${API_BASE_URL}/login`;
    };

    const logout = async () => {
        try {
            await api('/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setUser(null);
            window.location.href = '/';
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};