const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

export const api = async (endpoint: string, options: RequestOptions = {}) => {
    const { params, ...customConfig } = options;

    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const url = `${API_BASE_URL}${endpoint}${queryString}`;

    const config: RequestInit = {
        method: customConfig.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...customConfig.headers,
        },
        credentials: 'include', // Important for cookies
        ...customConfig,
    };

    try {
        const response = await fetch(url, config);

        if (response.status === 401) {
            // Unauthorized - redirect to login or handle session expiry
            console.warn('Unauthorized, redirecting to login...');
            // Note: In BFF pattern, often we just redirect to the BFF login endpoint
            window.location.href = `${API_BASE_URL}/login`;
            return null;
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'API request failed');
        }

        // Handle empty response for 204 No Content
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
