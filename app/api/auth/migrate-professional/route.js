import { migrateUserToProfessional } from './../../../../server/services/auth';

export async function POST(req) {
  try {
    const { userId, ...professionalData } = await req.json();
    const user = await migrateUserToProfessional(userId, professionalData);
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}