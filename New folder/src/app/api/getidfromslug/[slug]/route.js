import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';

export async function GET(request, { params }) {
  const webSlug = params; // Renaming for clarity
  const slug = webSlug.slug;
  console.log("Received web_slug:", slug);



  try {
    console.log("Query: ",slug);
    // Execute a raw SQL query to fetch the category's id based on web_slug
    const result = await prisma.$queryRaw`
      SELECT id
      FROM Category
      WHERE web_slug = ${slug}
      LIMIT 1
    `;

    // `$queryRaw` returns an array of results
    if (!result || result.length === 0) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 });
    }

    const categoryId = result[0].id;
    console.log("Found Category ID:", categoryId);

    // Return the category id in the response
    return NextResponse.json({ id: categoryId }, { status: 200 });
  } catch (error) {
    console.error('Error fetching category ID:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
