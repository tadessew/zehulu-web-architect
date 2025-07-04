const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new ApiError(response.status, errorData.message || 'Request failed');
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.setToken(null);
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  // Portfolio CRUD
  async getPortfolioItems() {
    return this.request<any[]>('/portfolio');
  }

  async getPortfolioItem(id: string) {
    return this.request<any>(`/portfolio/${id}`);
  }

  async createPortfolioItem(data: any) {
    return this.request<any>('/portfolio', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePortfolioItem(id: string, data: any) {
    return this.request<any>(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePortfolioItem(id: string) {
    return this.request<void>(`/portfolio/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog Posts CRUD
  async getBlogPosts() {
    return this.request<any[]>('/blog');
  }

  async getBlogPost(id: string) {
    return this.request<any>(`/blog/${id}`);
  }

  async createBlogPost(data: any) {
    return this.request<any>('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(id: string, data: any) {
    return this.request<any>(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlogPost(id: string) {
    return this.request<void>(`/blog/${id}`, {
      method: 'DELETE',
    });
  }

  // Users CRUD
  async getUsers() {
    return this.request<any[]>('/users');
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  async createUser(data: any) {
    return this.request<any>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: string, data: any) {
    return this.request<any>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string) {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.request<any>('/dashboard/stats');
  }
}

export const api = new ApiClient(API_BASE_URL);
export { ApiError };