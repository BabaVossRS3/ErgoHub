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
      profile_image 
    } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = createId();
    
    // Create base professional user
    const [baseUser] = await db
      .insert(users)
      .values({
        id: userId,
        email,
        password: hashedPassword,
        role: 'professional',
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning()
      .execute();

    if (!baseUser) {
      throw new Error("Failed to create professional user.");
    }

    // Create professional profile
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
        rating: 0,
        is_verified: false,
        availability: [],
        online: false,
        userPlan: 'free',
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning()
      .execute();

    return { ...baseUser, profile: professionalProfile };
  } catch (error) {
    console.error('❌ Create professional error:', error);
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

export async function migrateUserToProfessional(userId, professionalData) {
  try {
    // 1. Find and verify the user exists
    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .execute();

    if (!currentUser) {
      throw new Error('User not found');
    }

    console.log("Current user:", currentUser);

    // 2. Check if the user is already a professional
    const [existingProfessional] = await db
      .select()
      .from(professionals)
      .where(eq(professionals.user_id, userId))
      .limit(1)
      .execute();

    if (existingProfessional) {
      throw new Error('User is already a professional.');
    }

    // 3. Update the user's role BEFORE deleting the regularUsers record
    console.log("Updating role for user:", userId);
    await db
      .update(users)
      .set({ role: 'professional' })
      .where(eq(users.id, userId))
      .execute();

    // 4. Ensure the user exists in regularUsers before deletion
    const [regularUser] = await db
      .select()
      .from(regularUsers)
      .where(eq(regularUsers.user_id, userId))
      .limit(1)
      .execute();

    if (!regularUser) {
      throw new Error('Regular user record not found');
    }

    // 5. Now delete the regular user record (AFTER updating role)
    console.log("Deleting regular user record for:", userId);
    await db
      .delete(regularUsers)
      .where(eq(regularUsers.user_id, userId))
      .execute();

    // 6. Create the professional record
    console.log("Creating professional profile for:", userId);
    const [newProfessional] = await db
      .insert(professionals)
      .values({
        user_id: userId,
        professional_name: professionalData.professional_name,
        phone: professionalData.phone,
        profession: professionalData.profession,
        bio: professionalData.bio,
        profile_image: professionalData.profile_image,
        userPlan: 'free'
      })
      .returning()
      .execute();

    return {
      id: userId,
      email: currentUser.email, // Use email from users table
      role: 'professional',
      profile: newProfessional
    };
  } catch (error) {
    console.error('❌ Migration service error:', error);
    throw new Error('Failed to migrate user to professional');
  }
}
