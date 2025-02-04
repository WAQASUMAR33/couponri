// pages/api/headertag.js
import prisma from '../../app/util/prisma'

export async function GET() {
  try {
    const headertag = await prisma.headertag.findFirst();
    if (!headertag) {
      return new Response(JSON.stringify({ error: 'Headertag not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(headertag), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Headertag' }), { status: 500 });
  }
}
