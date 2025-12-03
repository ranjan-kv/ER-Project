'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, LoginCredentials, RegisterCredentials } from '@/types';
import { authApi } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    updateProfile: (data: { name: string; email: string }) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await authApi.getProfile();
                    setUser(userData);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const data = await authApi.login(credentials);
        localStorage.setItem('token', data.token);
        setUser({ _id: data._id, name: data.name, email: data.email });
        router.push('/dashboard');
    };

    const register = async (credentials: RegisterCredentials) => {
        const data = await authApi.register(credentials);
        localStorage.setItem('token', data.token);
        setUser({ _id: data._id, name: data.name, email: data.email });
        router.push('/dashboard');
    };

    const updateProfile = async (credentials: { name: string; email: string }) => {
        const data = await authApi.updateProfile(credentials);
        localStorage.setItem('token', data.token);
        setUser({ _id: data._id, name: data.name, email: data.email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                updateProfile,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
