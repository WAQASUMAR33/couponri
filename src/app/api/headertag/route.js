import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';

// GET: Fetch the single Headertag record
export async function GET() {
  try {
    const headertag = await prisma.headertag.findFirst();
    return NextResponse.json(headertag || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Headertag' }, { status: 500 });
  }
}

// POST: Create a new Headertag record
export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Code is ",data);
   
    const newHeadertag = await prisma.headertag.create({data});

    return NextResponse.json(newHeadertag, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create Headertag' }, { status: 500 });
  }
}

// PUT: Update the existing Headertag record
export async function PUT(req) {
  try {
    const { id, code } = await req.json();
    if (!id || !code) {
      return NextResponse.json({ error: 'ID and code are required' }, { status: 400 });
    }

    const updatedHeadertag = await prisma.headertag.update({
      where: { id },
      data: { code, updated_at: new Date() },
    });

    return NextResponse.json(updatedHeadertag, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update Headertag' }, { status: 500 });
  }
}
// import { NextResponse } from 'next/server';
// import prisma from '../../util/prisma'

// export async function GET() {
//   try {
//     const banners = await prisma.Headertag.findMany();
//     console.log("All headders tags are ",banners);
//     return NextResponse.json(banners);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     console.log("data is :--",data);
//     const newBanner = await prisma.Headertag.create({ data });
//     return NextResponse.json(newBanner, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
//   }
// }
