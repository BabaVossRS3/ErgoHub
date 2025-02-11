// lib/hooks/useAuth.js
'use client';

import { create } from 'zustand';

const useAuth = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  showAuthModal: false,
  authModalConfig: {
    initialTab: 'user',
    initialView: 'login',
    trigger: null
  },

  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    error: null 
  }),

  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      set({ 
        user: data.user,
        isAuthenticated: true,
        showAuthModal: false,
        error: null
      });

      return data.user;

    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
  
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for cookie handling
        body: JSON.stringify(userData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      // If registration was successful, set the user data
      set({ 
        user: data.user,
        isAuthenticated: true,
        showAuthModal: false,
        error: null
      });
  
      return data.user;
  
    } catch (error) {
      console.error('Registration error:', error);
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      const response = await fetch('/api/auth/logout', { 
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      set({
        user: null,
        isAuthenticated: false,
        error: null
      });

    } catch (error) {
      console.error('Logout error:', error);
      set({ error: error.message });
    }
  },

  openAuthModal: (config = {}) => set({
    showAuthModal: true,
    authModalConfig: {
      initialTab: config.initialTab || 'user',
      initialView: config.initialView || 'login',
      trigger: config.trigger || null
    }
  }),
  
  closeAuthModal: () => set({
    showAuthModal: false,
    error: null,
    authModalConfig: {
      initialTab: 'user',
      initialView: 'login',
      trigger: null
    }
  })
}));

export default useAuth;