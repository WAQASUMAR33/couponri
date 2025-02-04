import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';

// POST method to handle form submissions
export async function POST(request) {
  try {
    const data = await request.json();
    const { storeWebsite, offerType, code, description, startDate, expirationDate } = data;

    // Validate required fields
    if (!storeWebsite || !offerType || !code || !description) {
      return NextResponse.json({ error: 'All fields except dates are required' }, { status: 400 });
    }

    // Create a new coupon offer record in the database
    const newCouponOffer = await prisma.submittion.create({
      data: {
        storeWebsite,
        offerType,
        code,
        description,
        startDate: startDate ? new Date(startDate) : null,
        expirationDate: expirationDate ? new Date(expirationDate) : null,
      },
    });

    return NextResponse.json(newCouponOffer);
  } catch (error) {
    console.error('Error Creating Coupon Offer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET method to retrieve all coupon offers
export async function GET() {
  try {
    const couponOffers = await prisma.submittion.findMany();
    return NextResponse.json(couponOffers);
  } catch (error) {
    console.error('Error fetching coupon offers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
