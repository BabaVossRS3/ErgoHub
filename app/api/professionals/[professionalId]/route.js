// app/api/professionals/[professionalId]/route.js
import { db } from '@/server/configs';
import { professionals, users, services, reviews } from '@/server/configs/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { professionalId } = params;

    // Get base professional data with user info
    const professionalData = await db
      .select({
        id: professionals.id,
        userId: professionals.user_id,
        name: professionals.professional_name,
        profession: professionals.profession,
        location: professionals.business_address,
        bio: professionals.bio,
        rating: professionals.rating,
        profileImage: professionals.profile_image,
        isVerified: professionals.is_verified,
        online: professionals.online,
        userPlan: professionals.userPlan,
        email: users.email,
        phone: professionals.phone,
        experience: professionals.experience_years,
        availability: professionals.availability,
        businessEmail: professionals.business_email
      })
      .from(professionals)
      .innerJoin(users, eq(professionals.user_id, users.id))
      .where(eq(professionals.id, professionalId));

    if (!professionalData || professionalData.length === 0) {
      return NextResponse.json(
        { error: 'Professional not found' },
        { status: 404 }
      );
    }

    // Get services
    const professionalServices = await db
      .select({
        id: services.id,
        name: services.name,
        description: services.description,
        duration: services.duration,
        price: services.price
      })
      .from(services)
      .where(eq(services.professional_id, professionalId));

    // Get review counts and stats
    const reviewStats = await db
      .select({
        professionalId: reviews.professional_id,
        count: sql`COUNT(*)::int`,
        avgRating: sql`ROUND(AVG(${reviews.rating})::numeric, 1)`
      })
      .from(reviews)
      .where(eq(reviews.professional_id, professionalId))
      .groupBy(reviews.professional_id);

    // Format final response
    const formattedProfessional = {
      id: professionalData[0].id,
      name: professionalData[0].name || 'Unnamed Professional',
      profession: professionalData[0].profession || 'General Professional',
      rating: professionalData[0].rating ? Number(professionalData[0].rating) : 0,
      reviews: reviewStats[0]?.count || 0,
      location: professionalData[0].location || 'Location not specified',
      availability: professionalData[0].availability || {},
      imageUrl: professionalData[0].profileImage || '/images/default-avatar.jpg',
      is_verified: Boolean(professionalData[0].isVerified),
      bio: professionalData[0].bio || 'Επαγγελματίας στο ErgoHub',
      experience: professionalData[0].experience || 0,
      online: Boolean(professionalData[0].online),
      userPlan: professionalData[0].userPlan || 'free',
      email: professionalData[0].email,
      phone: professionalData[0].phone,
      businessEmail: professionalData[0].businessEmail,
      services: professionalServices.map(service => ({
        ...service,
        price: Number(service.price),
        duration: Number(service.duration)
      }))
    };

    return NextResponse.json(formattedProfessional);
    
  } catch (error) {
    console.error('Error fetching professional profile:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to fetch professional profile', details: error.message },
      { status: 500 }
    );
  }
}