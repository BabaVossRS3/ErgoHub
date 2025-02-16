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

    // Enhanced validation for professionals
    if (isProfessional) {
      const requiredFields = [
        'professional_name',
        'profession',
        'business_address',
        'experience_years',
        'terms_accepted'
      ];

      const missingFields = requiredFields.filter(field => {
        // Special handling for experience_years since 0 is a valid value
        if (field === 'experience_years') {
          return userData[field] === undefined || userData[field] === null;
        }
        return !userData[field];
      });

      if (missingFields.length > 0) {
        return NextResponse.json(
          { 
            error: `Missing required fields: ${missingFields.join(', ')}`,
            missingFields 
          },
          { status: 400 }
        );
      }

      // Add business_email and terms_accepted_at
      userData.business_email = userData.email;
      if (userData.terms_accepted) {
        userData.terms_accepted_at = new Date().toISOString();
      }
    }

    // Create the user based on type
    let user;
    if (isProfessional) {
      // Ensure experience_years is an integer
      userData.experience_years = parseInt(userData.experience_years);
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

    // Log the final user data being sent to the database
    console.log('✅ User data being saved:', {
      ...userData,
      password: '[REDACTED]'
    });

    return response;

  } catch (error) {
    console.error('❌ Registration error:', {
      message: error.message,
      stack: error.stack
    });
    
    const errorMessage = typeof error === 'object' ? error.message : String(error);
    
    return NextResponse.json(
      { error: errorMessage || 'Registration failed' },
      { status: 400 }
    );
  }
}