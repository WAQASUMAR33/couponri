import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';

// GET a single blog by ID
export async function GET(request, { params }) {
  const id = params.id;
  console.log("BLOG : ",id);

  try {
    const blog = await prisma.Blogcategories.findMany({
      where: { web_slug: id },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    console.log("Categories data: ",blog);

    return NextResponse.json(blog[0]);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
