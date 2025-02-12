// app/api/auth/migrate-professional/route.js
import { NextResponse } from 'next/server';
import { migrateUserToProfessional } from '../../../../server/services/auth';
import { generateToken, generateAuthCookieConfig } from '../../../../server/services/jwt';

export async function POST(request) {
  try {
    const { userId, ...professionalData } = await request.json();
    console.log('📝 Migration data received:', { userId, ...professionalData });
    
    // Validate required professional fields
    if (!professionalData.professional_name || !professionalData.profession) {
      return NextResponse.json(
        { error: 'Professional name and profession are required' },
        { status: 400 }
      );
    }

    // Perform the migration
    const user = await migrateUserToProfessional(userId, professionalData);

    // Generate new JWT token with updated role
    const token = generateToken(user);
    
    // Create response with updated user data
    const response = NextResponse.json({ user }, { status: 200 });
    
    // Set new auth cookie with updated claims
    const cookieConfig = generateAuthCookieConfig(token);
    response.cookies.set(cookieConfig);

    return response;

  } catch (error) {
    console.error('❌ Migration error:', {
      message: error.message,
      stack: error.stack
    });
    
    // Make sure to stringify error object or extract message
    const errorMessage = typeof error === 'object' ? error.message : String(error);
    
    return NextResponse.json(
      { error: errorMessage || 'Migration failed' },
      { status: 400 }
    );
  }
}