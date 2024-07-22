import { LoginCredentials, SignupCredentials, AuthResponse } from '@/types';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
};

export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
};



// const API_URI = 'https://localhost:3000/api'
//
//
// export const fetchUsers = async () => {
//     const response = await fetch(`${API_URI}/users`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch users');
//     }
//     return response.json();
// };
//
// export const fetchUser = async (id: number) => {
//     const response = await fetch(`${API_URI}/users?id=${id}`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch user');
//     }
//     return response.json();
// };
//
