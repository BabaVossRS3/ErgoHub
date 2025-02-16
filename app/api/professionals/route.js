// app/api/professionals/route.js
import { db } from '@/server/configs';
import { professionals, users, reviews } from '@/server/configs/schema';
import { eq, sql, and, inArray } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const availability = searchParams.get('availability');
    const rating = searchParams.get('rating');

    // Build base query
    let query = db
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
        experience: professionals.experience_years,
      })
      .from(professionals)
      .innerJoin(users, eq(professionals.user_id, users.id));

    // Build where conditions
    const conditions = [];

    if (search) {
      const normalizedSearch = `%${search.toLowerCase()}%`;
      conditions.push(
        sql`LOWER(${professionals.professional_name}) LIKE ${normalizedSearch} OR 
            LOWER(${professionals.profession}) LIKE ${normalizedSearch}`
      );
    }

    if (location && location !== 'all') {
      const normalizedLocation = `%${location.toLowerCase()}%`;
      conditions.push(sql`LOWER(${professionals.business_address}) LIKE ${normalizedLocation}`);
    }

    if (availability === 'today') {
      conditions.push(eq(professionals.online, true));
    }

    if (rating && rating !== 'all') {
      const ratingValue = parseFloat(rating);
      if (!isNaN(ratingValue)) {
        conditions.push(sql`${professionals.rating} >= ${ratingValue}`);
      }
    }

    // Add conditions to query if they exist
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Execute query
    console.log('Executing professionals query...');
    const results = await query;
    
    if (!results || results.length === 0) {
      return NextResponse.json([]);
    }

    // Get review counts
    const professionalIds = results.map(r => r.id);
    const reviewCounts = await db
      .select({
        professionalId: reviews.professional_id,
        count: sql`COUNT(*)::int`,
      })
      .from(reviews)
      .where(inArray(reviews.professional_id, professionalIds))
      .groupBy(reviews.professional_id);

    // Create review counts map
    const reviewCountMap = new Map(
      reviewCounts.map(r => [r.professionalId, r.count])
    );

    // Format results
    const formattedResults = results.map(pro => ({
      id: pro.id,
      name: pro.name || 'Unnamed Professional',
      profession: pro.profession || 'General Professional',
      rating: pro.rating ? Number(pro.rating) : 0,
      reviews: reviewCountMap.get(pro.id) || 0,
      location: pro.location || 'Location not specified',
      availability: pro.online ? 'Διαθέσιμος σήμερα' : 'Διαθέσιμος αύριο',
      imageUrl: pro.profileImage || '/images/default-avatar.jpg',
      is_verified: Boolean(pro.isVerified),
      bio: pro.bio || 'Επαγγελματίας στο ErgoHub',
      experience: pro.experience, // You might want to make this dynamic later
      online: Boolean(pro.online),
      userPlan: pro.userPlan || 'free',
      email: pro.email,
    }));

    return NextResponse.json(formattedResults);
    
  } catch (error) {
    console.error('Error fetching professionals:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to fetch professionals', details: error.message },
      { status: 500 }
    );
  }
}