"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import AuthModal from '../_components/auth/AuthModal'
import { useState } from 'react'
import useAuth from '../../lib/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated, logout, checkSession } = useAuth();

  useEffect(() => {
    checkSession();
  }, []);

  const navItems = [
    { name: 'Αρχική', href: '/' },
    { name: 'Άρθρα & Συμβουλές', href: '/blog' },
    { name: 'Επικοινωνία', href: '/contact' },
    { name: 'How To', href: '#' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Rest of the component remains the same...
  return (
    <nav className="bg-white shadow-sm" style={{ borderColor: 'rgba(151, 78, 195, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="transform hover:scale-105 transition-transform duration-200">
              <span style={{ color: '#313866' }} className="text-3xl font-bold">
                ErgoHub
              </span>
            </Link>   
          </div>

          {/* Desktop menu */}
          <div className="ml-10 flex items-center space-x-6">
            <div className="md:flex hidden">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-lg font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:text-[#974EC3] after:bg-[#FE7BE5] after:transition-all after:duration-200 hover:after:w-full"
                  style={{ color: '#504099' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>    
        
            <div className="flex items-center space-x-4">
              <Link 
                href="/professionals"
                className="bg-white border-2 px-4 py-2 rounded-xl text-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
                style={{ 
                  borderColor: '#974EC3',
                  color: '#974EC3',
                }}
              >
                Βρες Ειδικούς
              </Link>
              {(!isAuthenticated || (isAuthenticated && user?.role !== 'professional')) && (
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    // Always show professional registration flow
                    useAuth.setState({ 
                      authModalConfig: {
                        initialTab: 'professional',
                        initialView: 'register',
                        trigger: null
                      }
                    });
                  }}
                  className="text-white px-4 py-2 rounded-xl text-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ backgroundColor: '#974EC3' }}
                >
                  Γίνε Ειδικός
                </button>
              )}

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="w-10 h-10 rounded-full bg-[#974EC3] text-white flex items-center justify-center hover:bg-[#7e41a3] transition-colors">
                      {user?.profile?.profile_image ? (
                        <img 
                          src={user.profile.profile_image} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/profile" className="w-full">
                        Το προφίλ μου
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/appointments" className="w-full">
                        Τα ραντεβού μου
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/settings" className="w-full">
                        Ρυθμίσεις
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600" 
                      onClick={handleLogout}
                    >
                      Αποσύνδεση
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    // Always open on user tab for regular login/register
                    useAuth.setState({ 
                      authModalConfig: {
                        initialTab: 'user',
                        initialView: 'login',
                        trigger: null
                      }
                    });
                  }}
                  className="text-[#974EC3] px-4 py-2 rounded-xl text-md font-medium transition-all duration-300 ease-out 
                            hover:bg-[#974EC3] hover:shadow-md hover:-translate-y-0.5"
                  style={{ backgroundColor: 'transparent' }}
                >
                  Εγγραφή / Σύνδεση
                </button>
              )}
            </div>

            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                currentUser={isAuthenticated ? user : null}
              />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header