import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';

// Helper function to get blogs based on category slug
export async function GET(request, { params }) {
  const slug = params.id;
  console.log("Category slug received:", slug);
  const blogcategoryid = await prisma.$queryRaw`
      SELECT title
      FROM Blogcategories
      WHERE web_slug = ${slug}
      LIMIT 1
    `;
    console.log("Found Blog Category ID:", blogcategoryid);
    const categoryId = blogcategoryid[0].title;
    console.log("Found Blog Category ID:", categoryId);
  try {
    const blogs = await prisma.$queryRaw`
      SELECT *
      FROM Blog
      WHERE category LIKE ${`%${categoryId},%`}
         OR category LIKE ${`%,${categoryId},%`}
         OR category LIKE ${`${categoryId},%`}
         OR category LIKE ${`%,${categoryId}%`}
         OR category = ${categoryId}
    `;

    console.log("Blogs for category:", blogs);

    // Return the blogs
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
