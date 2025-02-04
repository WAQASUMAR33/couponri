import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

// PUT: Update a company by ID
export async function PUT(request, { params }) {
  const { id } = params;
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
      comp_rating,
      meta_title,
      meta_description,
      meta_focusKeyword,
      web_slug,
      comp_affiliateLink,
      comp_details,
        comp_other_details,
        comp_status, 
    } = data;
    console.log(data);

    // // Check if the image is a new file
    // let uploadedImageUrl = comp_logo;

    // if (comp_logo) {
    //   const uploadImageToExternalAPI = async (imageBase64) => {
    //     try {
    //       const response = await fetch('https://m3xtrader.com/coupon/uploadImage.php', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ image: imageBase64 }),
    //       });

    //       const result = await response.json();

    //       if (!response.ok) {
    //         throw new Error(result.error || 'Failed to upload image');
    //       }

    //       return result.image_url; // Assuming the API returns the image URL in this field
    //     } catch (error) {
    //       console.error("Error uploading image:", error);
    //       throw new Error("Image upload failed");
    //     }
    //   };

    //   const imageBase64 = comp_logo.replace(/^data:image\/\w+;base64,/, "");
    //   uploadedImageUrl = await uploadImageToExternalAPI(imageBase64);
    // }

    const updatedCompany = await prisma.company.update({
      where: { id: parseInt(id, 10) },
      data: {
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
        updated_at: new Date(),
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("Error Updating Company Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Delete a company by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const deletedCompany = await prisma.company.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedCompany);
  } catch (error) {
    console.error("Error Deleting Company Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Retrieve a single company by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const companies = await prisma.company.findUnique({
      where: { id: parseInt(id)},
    });

    console.log("companies are: ",companies);
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error Fetching Companies:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}