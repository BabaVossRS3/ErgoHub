// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import { createUser, createProfessional } from '../../../../server/services/auth';
import { generateToken, generateAuthCookieConfig } from '../../../../server/services/jwt';

export async function POST(request) {
  try {
    const userData = await request.json();
    console.log('📝 Registration data received:', userData);
    
    // Check if this is a professional registration
    const isProfessional = userData.professional_name !== undefined;
    
    // Validate required fields
    if (!userData.email || !userData.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Additional validation for professionals
    if (isProfessional) {
      if (!userData.professional_name || !userData.profession) {
        return NextResponse.json(
          { error: 'Professional name and profession are required' },
          { status: 400 }
        );
      }
    }

    // Create the user based on type
    let user;
    if (isProfessional) {
      user = await createProfessional(userData);
    } else {
      user = await createUser(userData);
    }

    // Generate JWT token
    const token = generateToken(user);
    
    // Create response with user data
    const response = NextResponse.json({ user }, { status: 201 });
    
    // Set auth cookie
    const cookieConfig = generateAuthCookieConfig(token);
    response.cookies.set(cookieConfig);

    return response;

  } catch (error) {
    console.error('❌ Registration error:', {
      message: error.message,
      stack: error.stack
    });
    
    // Make sure to stringify error object or extract message
    const errorMessage = typeof error === 'object' ? error.message : String(error);
    
    return NextResponse.json(
      { error: errorMessage || 'Registration failed' },
      { status: 400 }
    );
  }
}