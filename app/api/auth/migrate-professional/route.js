// app/api/auth/migrate-professional/route.js
import { NextResponse } from 'next/server';
import { migrateUserToProfessional } from '../../../../server/services/auth';
import { generateToken, generateAuthCookieConfig } from '../../../../server/services/jwt';

export async function POST(request) {
  try {
    const { userId, professional_name, phone, profession, bio, profile_image } = await request.json();
    console.log('📝 Migration data received:', { userId, professional_name, profession });
    
    // Validate required professional fields
    if (!professional_name || !profession) {
      return NextResponse.json(
        { error: 'Professional name and profession are required' },
        { status: 400 }
      );
    }

    // Perform the migration with only the professional-specific data
    const professionalData = {
      professional_name,
      phone,
      profession,
      bio,
      profile_image
    };

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
    
    return NextResponse.json(
      { error: error.message || 'Migration failed' },
      { status: 400 }
    );
  }
}