'use client';
// app/_components/providers/AuthModalProvider.jsx
import { useEffect } from 'react';
import AuthModal from '../auth/AuthModal';
import useAuth from '../../../lib/hooks/useAuth';

export default function AuthModalProvider() {
  const { showAuthModal, closeAuthModal, authModalConfig } = useAuth();

  return (
    <AuthModal
      isOpen={showAuthModal}
      onClose={closeAuthModal}
      initialTab={authModalConfig.initialTab}
      initialView={authModalConfig.initialView}
      trigger={authModalConfig.trigger}
    />
  );
}