// server/services/auth.js
import { db } from '../configs';
import { users, professionals, regularUsers } from '../configs/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createId } from '@paralleldrive/cuid2';

export async function createUser(userData) {
  try {
    const { email, password, name } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = createId();
    
    // Create base user
    const [baseUser] = await db
      .insert(users)
      .values({
        id: userId,
        email,
        password: hashedPassword,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning()
      .execute();

    if (!baseUser) {
      throw new Error("Failed to create user.");
    }

    // Create user profile
    const [userProfile] = await db
      .insert(regularUsers)
      .values({
        id: createId(),
        user_id: userId,
        name,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning()
      .execute();

    return { ...baseUser, profile: userProfile };
  } catch (error) {
    console.error('❌ Create user error:', error);
    throw new Error(error.message || 'User registration failed');
  }
}

export async function createProfessional(userData) {
  try {
    const { 
      email, 
      password, 
      professional_name, 
      phone, 
      profession, 
      bio, 
      profile_image,
      business_address,    
      business_email,      
      experience_years,    
      terms_accepted      
    } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = createId();
    const currentDate = new Date();
    
    // Create base professional user
    const [baseUser] = await db
      .insert(users)
      .values({
        id: userId,
        email,
        password: hashedPassword,
        role: 'professional',
        created_at: currentDate,
        updated_at: currentDate
      })
      .returning()
      .execute();

    if (!baseUser) {
      throw new Error("Failed to create professional user.");
    }

    // Create professional profile with all fields
    const [professionalProfile] = await db
      .insert(professionals)
      .values({
        id: createId(),
        user_id: userId,
        professional_name,
        phone,
        profession,
        bio,
        profile_image,
        business_address,    
        business_email,      
        experience_years: typeof experience_years === 'string' ? parseInt(experience_years) : experience_years,    
        terms_accepted,      
        terms_accepted_at: terms_accepted ? currentDate : null,
        rating: 0,
        is_verified: false,
        availability: [],
        online: false,
        userPlan: 'free',
        created_at: currentDate,
        updated_at: currentDate
      })
      .returning()
      .execute();

    console.log('✅ Created professional profile:', professionalProfile);

    return { ...baseUser, profile: professionalProfile };
  } catch (error) {
    console.error('❌ Create professional error:', error, '\nStack:', error.stack);
    throw new Error(error.message || 'Professional registration failed');
  }
}

export async function verifyUser(email, password) {
  try {
    // Fetch user with profile (joined query)
    const result = await db
      .select()
      .from(users)
      .leftJoin(professionals, eq(users.id, professionals.user_id))
      .leftJoin(regularUsers, eq(users.id, regularUsers.user_id))
      .where(eq(users.email, email))
      .limit(1)
      .execute();

    if (!result.length) {
      throw new Error('User not found');
    }

    const user = result[0].users;
    const profile = result[0].professionals || result[0].regular_users;

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, profile };
  } catch (error) {
    console.error('❌ Verify user error:', error);
    throw new Error(error.message || 'Authentication failed');
  }
}

export async function getUserById(userId) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .execute();

    if (!user) {
      throw new Error('User not found');
    }

    // Get profile based on user role
    let profile;
    if (user.role === 'professional') {
      [profile] = await db
        .select()
        .from(professionals)
        .where(eq(professionals.user_id, user.id))
        .limit(1)
        .execute();
    } else {
      [profile] = await db
        .select()
        .from(regularUsers)
        .where(eq(regularUsers.user_id, user.id))
        .limit(1)
        .execute();
    }

    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      ...userWithoutPassword,
      profile
    };
  } catch (error) {
    console.error('❌ Get user by ID error:', error);
    throw new Error('Failed to retrieve user data');
  }
}

// In auth.js
export async function migrateUserToProfessional(userId, professionalData) {
  try {
    // 1. Find and verify the user exists
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .execute();

    if (!user) {
      throw new Error('User not found');
    }

    // 2. Check if they're already a professional
    const [existingProfessional] = await db
      .select()
      .from(professionals)
      .where(eq(professionals.user_id, userId))
      .limit(1)
      .execute();

    if (existingProfessional) {
      throw new Error('User is already a professional');
    }

    const currentDate = new Date();

    // 3. Update user role first
    await db
      .update(users)
      .set({ 
        role: 'professional',
        updated_at: currentDate
      })
      .where(eq(users.id, userId))
      .execute();

    console.log('✅ Updated user role to professional');

    // 4. Delete regular user profile
    await db
      .delete(regularUsers)
      .where(eq(regularUsers.user_id, userId))
      .execute();

    console.log('✅ Deleted regular user profile');

    // 5. Create professional profile
    const [newProfessional] = await db
      .insert(professionals)
      .values({
        id: createId(),
        user_id: userId,
        professional_name: professionalData.professional_name,
        phone: professionalData.phone,
        profession: professionalData.profession,
        bio: professionalData.bio,
        profile_image: professionalData.profile_image,
        business_address: professionalData.business_address,    
        business_email: professionalData.business_email,      
        experience_years: typeof professionalData.experience_years === 'string' 
          ? parseInt(professionalData.experience_years) 
          : professionalData.experience_years,
        terms_accepted: professionalData.terms_accepted,      
        terms_accepted_at: professionalData.terms_accepted ? currentDate : null,
        rating: 0,
        is_verified: false,
        availability: [],
        online: false,
        userPlan: 'free',
        created_at: currentDate,
        updated_at: currentDate
      })
      .returning()
      .execute();

    console.log('✅ Created professional profile:', newProfessional);

    // 6. Return updated user data
    return {
      id: userId,
      email: user.email,
      role: 'professional',
      profile: newProfessional
    };

  } catch (error) {
    console.error('❌ Migration error:', error, '\nStack:', error.stack);
    throw new Error(error.message || 'Failed to migrate user to professional');
  }
}