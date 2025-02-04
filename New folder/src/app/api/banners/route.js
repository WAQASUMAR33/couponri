import { NextResponse } from 'next/server';
import prisma from '../../util/prisma'

// GET all banners and POST a new banner
export async function GET() {
  try {
    const banners = await prisma.banners.findMany();
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newBanner = await prisma.banners.create({ data });
    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}
