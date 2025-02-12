// app/api/auth/session/route.js
import { NextResponse } from 'next/server';
import { getUserById } from '../../../../server/services/auth';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    // cookies() is synchronous, no need for await
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token found', user: null }, 
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const user = await getUserById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', user: null }, 
        { status: 401 }
      );
    }

    return NextResponse.json({ user });

  } catch (error) {
    console.error('Session check error:', {
      message: error.message,
      stack: error.stack
    });

    // Handle different types of JWT errors
    let errorMessage = 'Session validation failed';
    if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = 'Invalid token';
    } else if (error instanceof jwt.TokenExpiredError) {
      errorMessage = 'Token expired';
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        user: null 
      }, 
      { status: 401 }
    );
  }
}