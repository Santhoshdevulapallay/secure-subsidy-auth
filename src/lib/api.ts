// API utility functions for Django backend communication

export interface LoginRequest {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface SignupCitizenRequest {
  full_name: string;
  email: string;
  mobile: string;
  aadhaar_id: string;
  password: string;
  confirm_password: string;
}

export interface SignupShopRequest {
  shop_name: string;
  email: string;
  mobile: string;
  registration_number: string;
  password: string;
  confirm_password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'citizen' | 'shop';
    full_name?: string;
    shop_name?: string;
  };
  message?: string;
  errors?: Record<string, string[]>;
}

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
  }
}

// CSRF token handling for Django
const getCSRFToken = (): string => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return token || '';
};

// HTTP client with CSRF and security headers
const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCSRFToken(),
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Include cookies for CSRF
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP error! status: ${response.status}`,
      errorData.errors
    );
  }

  return response.json();
};

// Authentication API functions
export const authApi = {
  // Login with username/password
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiCall('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      if (credentials.remember_me) {
        localStorage.setItem('remember_me', 'true');
      }
    }
    
    return response;
  },

  // Google OAuth login
  googleLogin: async (googleToken: string): Promise<AuthResponse> => {
    const response = await apiCall('/auth/google/', {
      method: 'POST',
      body: JSON.stringify({ token: googleToken }),
    });
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  },

  // Citizen signup
  signupCitizen: async (userData: SignupCitizenRequest): Promise<AuthResponse> => {
    return apiCall('/auth/signup/citizen/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Shop signup
  signupShop: async (userData: SignupShopRequest): Promise<AuthResponse> => {
    return apiCall('/auth/signup/shop/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Verify email after signup
  verifyEmail: async (token: string): Promise<AuthResponse> => {
    return apiCall('/auth/verify-email/', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  // Get current user info
  getCurrentUser: async (): Promise<AuthResponse> => {
    return apiCall('/auth/user/');
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await apiCall('/auth/logout/', { method: 'POST' });
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('remember_me');
    }
  },

  // Password reset request
  requestPasswordReset: async (email: string): Promise<AuthResponse> => {
    return apiCall('/auth/password-reset/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

export const getUserRole = (): string | null => {
  // This would typically decode the JWT token to get user role
  // For now, we'll store it separately or decode from token
  return localStorage.getItem('user_role');
};

export const clearAuthData = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('remember_me');
};