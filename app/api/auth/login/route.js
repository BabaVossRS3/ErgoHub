import { NextResponse } from 'next/server';
import { verifyUser } from '../../../../server/services/auth';
import { generateToken, generateAuthCookieConfig } from '../../../../server/services/jwt';

export async function POST(request) {
  try {
    console.log('Login API route hit');
    const { email, password } = await request.json();
    console.log('Attempting to verify user:', { email });
    
    const user = await verifyUser(email, password);
    console.log('User verified successfully');
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Create response with user data
    const response = NextResponse.json({ user }, { status: 200 });
    
    // Set auth cookie
    const cookieConfig = generateAuthCookieConfig(token);
    response.cookies.set(cookieConfig);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}