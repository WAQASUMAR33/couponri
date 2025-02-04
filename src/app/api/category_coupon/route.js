import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
// POST handler for creating a new Category_Coupon
export async function POST(request) {
  try {
    const data = await request.json();
    const { name, offers, status, meta_title,
      meta_description,
      meta_focusKeyword,
      web_slug, } = data;

    // Validate required fields
    if (!name || !offers || !Array.isArray(offers)) {
      return NextResponse.json({ error: 'Name and offers are required and offers should be an array' }, { status: 400 });
    }

    // Convert the offers array into a comma-separated string
    const offersString = offers.join(',');

    // Create a new Category_Coupon record in the database
    const newCategoryCoupon = await prisma.categoryCoupon.create({
      data: {
        name,
        offer: offersString,  // Save the comma-separated string
        status,
        meta_title,
        meta_description,
        meta_focusKeyword,
        web_slug,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(newCategoryCoupon);
  } catch (error) {
    console.error('Error Creating Category_Coupon Record:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET handler for fetching all Category_Coupons
export async function GET() {
  try {
    const categoryCoupons = await prisma.categoryCoupon.findMany();

    // Convert the offers string back into an array for each categoryCoupon
    const categoryCouponsWithOffersArray = categoryCoupons.map((coupon) => ({
      ...coupon,
      offers: coupon.offers ? coupon.offers.split(',').map(id => parseInt(id, 10)) : [],
    }));

    return NextResponse.json(categoryCouponsWithOffersArray);
  } catch (error) {
    console.error('Error fetching Category_Coupons:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
