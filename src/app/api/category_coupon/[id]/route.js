import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';
export async function GET(request, { params }) {
  const id = params.id;

  try {
    const categoryCoupon = await prisma.categoryCoupon.findMany({
      where: { web_slug: id },
    });

    if (!categoryCoupon) {
      return NextResponse.json({ error: 'Category Coupon not found' }, { status: 404 });
    }
    console.log(categoryCoupon[0]);
    return NextResponse.json(categoryCoupon[0]);
  } catch (error) {
    console.error('Error fetching category coupon:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { name, offers, status, meta_title,
      meta_description,
      meta_focusKeyword,
      web_slug, } = data;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
    }

    // Join the offers array into a comma-separated string
    const offersString = offers.join(',');

    const updatedCategoryCoupon = await prisma.categoryCoupon.update({
      where: { id },
      data: {
        name,
        offer: offersString,
        status,
        meta_title,
        meta_description,
        meta_focusKeyword,
        web_slug,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(updatedCategoryCoupon);
  } catch (error) {
    console.error('Error updating category coupon:', error);
    if (error.code === 'P2025') { // Prisma specific error when record not found
      return NextResponse.json({ error: 'Category Coupon not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
  }

  try {
    const deletedCategoryCoupon = await prisma.categoryCoupon.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting category coupon:', error);
    if (error.code === 'P2025') { // Prisma specific error when record not found
      return NextResponse.json({ error: 'Category Coupon not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
