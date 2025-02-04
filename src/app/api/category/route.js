import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { category_name, category_image, category_description, category_status, meta_title,
      meta_description,
      meta_focusKeyword,
      web_slug, } = data;

    // Validate required fields
    if (!category_name || !category_image) {
      return NextResponse.json({ error: 'Category name and image are required' }, { status: 400 });
    }

    // Create a new category record in the database
    const newCategory = await prisma.category.create({
      data: {
        category_name,
        category_description,
        category_status,
        category_image,
        meta_title,
        meta_description,
        meta_focusKeyword,
        web_slug,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('Error Creating Category Record:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const categories = await prisma.Category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}