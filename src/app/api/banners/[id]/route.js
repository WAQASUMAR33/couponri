import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma'

// GET, PUT, and DELETE banner by ID
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const banner = await prisma.banners.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banner' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const data = await req.json();
    const updatedBanner = await prisma.banners.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    console.log("updated banner is ",updatedBanner);
    return NextResponse.json(updatedBanner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.banners.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ message: 'Banner deleted successfully' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
