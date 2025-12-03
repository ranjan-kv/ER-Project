import { LoginCredentials, RegisterCredentials, AuthResponse, User, Item, ItemInput } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || 'Request failed');
    }
    return response.json();
}

export const authApi = {
    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponse>(response);
    },

    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponse>(response);
    },

    getProfile: async (): Promise<User> => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse<User>(response);
    },

    updateProfile: async (data: { name: string; email: string }): Promise<AuthResponse> => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/auth/updatedetails`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return handleResponse<AuthResponse>(response);
    },
};

export const itemsApi = {
    getAll: async (params?: { search?: string; status?: string; priority?: string }): Promise<Item[]> => {
        const token = getAuthToken();
        const queryParams = new URLSearchParams();

        if (params?.search) queryParams.append('search', params.search);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.priority) queryParams.append('priority', params.priority);

        const queryString = queryParams.toString();
        const url = `${API_URL}/items${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse<Item[]>(response);
    },

    getById: async (id: string): Promise<Item> => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/items/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse<Item>(response);
    },

    create: async (item: ItemInput): Promise<Item> => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(item),
        });
        return handleResponse<Item>(response);
    },

    update: async (id: string, item: ItemInput): Promise<Item> => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(item),
        });
        return handleResponse<Item>(response);
    },

    delete: async (id: string): Promise<{ message: string }> => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse<{ message: string }>(response);
    },
};
