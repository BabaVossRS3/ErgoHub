// lib/hooks/useAuth.js
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuth = create(
  persist(
    (set) => ({
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
            credentials: 'include',
            body: JSON.stringify(userData)
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
          }
      
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

      migrateUserToProfessional: async (userId, professionalData) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await fetch('/api/auth/migrate-professional', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Important to include this like in other auth calls
            body: JSON.stringify({ userId, ...professionalData })
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Migration failed');
          }

          set({ 
            user: data.user,
            isAuthenticated: true,
            showAuthModal: false,
            error: null
          });

          return data.user;

        } catch (error) {
          console.error('Migration error:', error);
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

      checkSession: async () => {
        try {
          set({ isLoading: true });
          const response = await fetch('/api/auth/session');
          const data = await response.json();
          
          if (response.ok && data.user) {
            set({ 
              user: data.user,
              isAuthenticated: true,
              error: null 
            });
          }
        } catch (error) {
          console.error('Session check error:', error);
        } finally {
          set({ isLoading: false });
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
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);

export default useAuth;