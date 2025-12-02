export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface Item {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    user: string;
    createdAt: string;
    updatedAt: string;
}

export interface ItemInput {
    title: string;
    description: string;
    status?: 'pending' | 'in-progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
}
