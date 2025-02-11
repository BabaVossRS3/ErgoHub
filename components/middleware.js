import { NextResponse } from 'next/server';
import { verifyToken } from './../server/services/jwt';

// Add paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register'
];

// Add paths that require professional role
const professionalPaths = [
  '/dashboard/professional',
  '/api/professional'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get('auth_token')?.value;
  
  if (!token) {
    // Redirect to login if no token found
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify token
  const { valid, expired, payload } = verifyToken(token);

  if (!valid || expired) {
    // Clear invalid/expired token and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth_token');
    return response;
  }

  // Check role for professional paths
  if (professionalPaths.some(path => pathname.startsWith(path))) {
    if (payload.role !== 'professional') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}