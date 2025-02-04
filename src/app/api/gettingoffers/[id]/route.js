import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';

export async function GET(request, { params }) {
  try {
    const comp_id = parseInt(params.id);  // Since comp_id is a string, use it directly

    if (!comp_id) {
      return NextResponse.json({ error: 'Invalid companyId provided' }, { status: 400 });
    }

    // Fetch offers associated with the companyId
    const offers = await prisma.Offer.findMany({
      where: {
        comp_id: comp_id,  // Use the comp_id directly as a string
      },
    });

    if (offers.length === 0) {
      return NextResponse.json({ message: 'No offers found for this company' });
    }

    console.log("Offers",offers);
    return NextResponse.json(offers);
  } catch (error) {
    console.log('Error fetching offers:', error);
    return NextResponse.error(new Error('Internal Server Error'), { status: 500 });
  }
}
