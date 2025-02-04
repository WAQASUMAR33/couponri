import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

export async function GET(request, { params }) {
  const { id } = params;
  console.log("Filtering companies with category ID or slug: ", id);

  try {
    const newid = await getidfromslug(id);  // Ensure the slug is converted to an ID
    const companies = await prisma.company.findMany({
      where: {
        OR: [
          { comp_category: id.toString() }, // Exact match
          { comp_category: { startsWith: `${newid},` } }, // ID at the start
          { comp_category: { endsWith: `,${newid}` } }, // ID at the end
          { comp_category: { contains: `,${newid},` } }, // ID in the middle
        ],
      },
    });

    console.log("Filtered companies: ", companies);
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error Fetching Companies:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

const getidfromslug = async (id) => {
  try {
    const category = await prisma.category.findMany({
      where: {
        web_slug: id,
      },
    });

    if (category.length > 0) {
      console.log("Filtered category: ", category[0]);
      return category[0].id;
    } else {
      throw new Error("Category not found");
    }
  } catch (error) {
    console.error("Error Fetching category:", error);
    throw new Error("Error fetching category");
  }
};
