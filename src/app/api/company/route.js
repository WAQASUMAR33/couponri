import { NextResponse } from "next/server";
import prisma from "../../util/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      com_title, 
      comp_logo, 
      comp_category, 
      comp_webtitle,
      comp_description, 
      comp_phone, 
      comp_email, 
      comp_website, 
      meta_title,
      meta_description,
      meta_focusKeyword,
      web_slug,
      comp_affiliateLink,
      comp_rating, 
      comp_details,
        comp_other_details, 
        comp_status,  
    } = data;

    const newCompany = await prisma.company.create({
      data: {
        com_title,
        comp_logo,
        comp_category,
        comp_webtitle,
        comp_description,
        comp_phone,
        comp_email,
        comp_website,
        comp_rating,
        meta_title,
      meta_description,
      meta_focusKeyword,
      web_slug,
      comp_affiliateLink,
        comp_details,
        comp_other_details,
        comp_status, 
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    console.log(newCompany);

    return NextResponse.json(newCompany);
  } catch (error) {
    console.error("Error Creating Company Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve all companies
export async function GET() {
  try {
    const companies = await prisma.company.findMany();
    // console.log("COMPANIES: ",companies);
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error Fetching Companies:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}