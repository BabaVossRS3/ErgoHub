import { db } from '@/server/configs';
import { users, regularUsers, professionals } from '@/server/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get user ID from request headers or cookies
    // You can add your auth middleware here or extract the token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract user ID from your auth token
    const userId = authHeader.split(' ')[1]; // Adjust based on your token structure

    const userData = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!userData || userData.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = userData[0];
    let profileData;

    if (user.role === 'professional') {
      profileData = await db
        .select({
          name: professionals.professional_name,
          phone: professionals.phone,
          address: professionals.business_address,
          businessEmail: professionals.business_email,
          bio: professionals.bio,
          profileImage: professionals.profile_image,
          isVerified: professionals.is_verified,
          userPlan: professionals.userPlan
        })
        .from(professionals)
        .where(eq(professionals.user_id, userId));
    } else {
      profileData = await db
        .select({
          name: regularUsers.name,
          phone: regularUsers.phone,
          address: regularUsers.address
        })
        .from(regularUsers)
        .where(eq(regularUsers.user_id, userId));
    }

    const profile = profileData[0] || {};

    return NextResponse.json({
      ...user,
      ...profile
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = authHeader.split(' ')[1]; // Adjust based on your token structure
    const { field, value } = await request.json();

    const userData = await db
      .select({
        id: users.id,
        role: users.role
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!userData || userData.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = userData[0];

    // Update the appropriate table based on user role
    if (user.role === 'professional') {
      const fieldMapping = {
        name: 'professional_name',
        address: 'business_address',
        businessEmail: 'business_email',
        phone: 'phone',
        bio: 'bio'
      };

      if (field in fieldMapping) {
        await db
          .update(professionals)
          .set({ [fieldMapping[field]]: value })
          .where(eq(professionals.user_id, userId));
      }
    } else {
      const fieldMapping = {
        name: 'name',
        address: 'address',
        phone: 'phone'
      };

      if (field in fieldMapping) {
        await db
          .update(regularUsers)
          .set({ [fieldMapping[field]]: value })
          .where(eq(regularUsers.user_id, userId));
      }
    }

    // If updating email, update the users table
    if (field === 'email') {
      await db
        .update(users)
        .set({ email: value })
        .where(eq(users.id, userId));
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}