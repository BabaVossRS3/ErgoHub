// app/api/auth/migrate-professional/route.js
import { NextResponse } from 'next/server';
import { migrateUserToProfessional } from '../../../../server/services/auth';
import { generateToken, generateAuthCookieConfig } from '../../../../server/services/jwt';

export async function POST(request) {
  try {
    const { 
      userId, 
      professional_name, 
      phone, 
      profession, 
      bio, 
      profile_image,
      business_address,
      business_email,
      experience_years,
      terms_accepted
    } = await request.json();

    console.log('📝 Migration data received:', { 
      userId, 
      professional_name, 
      profession,
      business_address,
      experience_years,
      terms_accepted
    });
    
    // Enhanced validation for required fields
    const requiredFields = {
      professional_name: 'Professional name',
      profession: 'Profession',
      business_address: 'Business address',
      experience_years: 'Years of experience',
      terms_accepted: 'Terms acceptance'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([field, label]) => {
        if (field === 'experience_years') {
          return experience_years === undefined || experience_years === null;
        }
        return !eval(field);
      })
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare the professional data with all fields
    const professionalData = {
      professional_name,
      phone,
      profession,
      bio,
      profile_image,
      business_address,
      business_email,
      experience_years: parseInt(experience_years),
      terms_accepted,
      terms_accepted_at: terms_accepted ? new Date().toISOString() : null
    };

    console.log('✅ Professional data being saved:', {
      ...professionalData,
      userId
    });

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