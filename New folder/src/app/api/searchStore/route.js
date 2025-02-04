import { NextResponse } from "next/server";
import prisma from "../../util/prisma";

// API for searching companies (stores) based on a text input
export async function GET(request) {
  try {
    // Extracting search query parameter from the request URL
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('query');

    if (!searchText) {
      return NextResponse.json(
        { message: "Search query is missing" },
        { status: 400 }
      );
    }

    // Raw SQL query to search companies using wildcards
    const results = await prisma.$queryRaw`
      SELECT * 
      FROM Company 
      WHERE com_title LIKE ${'%' + searchText + '%'} 
      OR comp_description LIKE ${'%' + searchText + '%'} 
      OR comp_category LIKE ${'%' + searchText + '%'} 
      OR comp_email LIKE ${'%' + searchText + '%'} 
      OR comp_website LIKE ${'%' + searchText + '%'} 
      OR comp_phone LIKE ${'%' + searchText + '%'}
    `;

    // Return the search results
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error performing search:", error);

    // Return error response with status 500
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
