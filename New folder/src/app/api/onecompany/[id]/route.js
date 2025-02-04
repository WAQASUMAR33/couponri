import { NextResponse } from "next/server";
import prisma from "../../../util/prisma";

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const {
      com_title,
      comp_logo,
      comp_category,
      comp_description,
      comp_phone,
      comp_email,
      comp_website,
      comp_rating,
      com_details,
    } = data;

    // Check if the image is a new file
    let uploadedImageUrl = comp_logo;

    if (comp_logo.startsWith("data:image")) {
      const uploadImageToExternalAPI = async (imageBase64) => {
        try {
          const response = await fetch('https://m3xtrader.com/coupon/uploadImage.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: imageBase64 }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Failed to upload image');
          }

          return result.image_url; // Assuming the API returns the image URL in this field
        } catch (error) {
          console.error("Error uploading image:", error);
          throw new Error("Image upload failed");
        }
      };

      // Convert image to base64 and upload it
      const imageBase64 = comp_logo.replace(/^data:image\/\w+;base64,/, "");
      uploadedImageUrl = await uploadImageToExternalAPI(imageBase64);
    }

    // Update company data in the database
    const updatedCompany = await prisma.company.update({
      where: { id: parseInt(id, 10) },
      data: {
        com_title,
        comp_logo: uploadedImageUrl,
        comp_category: parseInt(comp_category, 10), // Ensure category is an integer
        comp_description,
        comp_phone,
        comp_email,
        comp_website,
        comp_rating,
        com_details,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("Error Updating Company Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

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

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const companies = await prisma.company.findMany({
      where: { web_slug: id},
    });

    console.log("companies are: ",companies);
    return NextResponse.json(companies[0]);
  } catch (error) {
    console.error("Error Fetching Companies:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}