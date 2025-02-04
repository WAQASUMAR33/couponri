import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

export async function GET(request, { params }) {
  try {
    const companyId = parseInt(params.id);

    if (isNaN(companyId)) {
      return NextResponse.json({ error: 'Invalid companyId provided' }, { status: 400 });
    }

    const faqs = await prisma.Faqs.findMany({
      where: {
        comp_id: companyId,
      },
    });

    if (faqs.length === 0) {
      return NextResponse.json({ message: 'No FAQs found for this company' });
    }

    return NextResponse.json(faqs);
  } catch (error) {
    console.log('Error fetching FAQs:', error);
    return NextResponse.error(new Error('Internal Server Error'), { status: 500 });
  }
}
