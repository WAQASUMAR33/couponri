import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';

// GET: Retrieve a specific coupon offer by ID
export async function GET(request, { params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
  }

  try {
    const couponOffer = await prisma.submittion.findUnique({
      where: { id },
    });

    if (!couponOffer) {
      return NextResponse.json({ error: 'Coupon offer not found' }, { status: 404 });
    }

    return NextResponse.json(couponOffer);
  } catch (error) {
    console.error('Error fetching coupon offer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update a specific coupon offer by ID
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { storeWebsite, offerType, code, description, startDate, expirationDate } = data;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
    }

    const updatedCouponOffer = await prisma.submittion.update({
      where: { id },
      data: {
        storeWebsite,
        offerType,
        code,
        description,
        startDate: startDate ? new Date(startDate) : null,
        expirationDate: expirationDate ? new Date(expirationDate) : null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCouponOffer);
  } catch (error) {
    console.error('Error updating coupon offer:', error);
    if (error.code === 'P2025') { // Prisma specific error when record not found
      return NextResponse.json({ error: 'Coupon offer not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Delete a specific coupon offer by ID
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
  }

  try {
    const deletedCouponOffer = await prisma.submittion.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Coupon offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon offer:', error);
    if (error.code === 'P2025') { // Prisma specific error when record not found
      return NextResponse.json({ error: 'Coupon offer not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
