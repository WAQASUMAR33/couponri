import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';
export async function GET(request, { params }) {
  try {
    const companyId = parseInt(params.id, 10);  // Convert the company ID to an integer

    if (isNaN(companyId)) {
      return NextResponse.json({ error: 'Invalid companyId provided' }, { status: 400 });
    }

    // Log the companyId and its string version
    console.log('Company ID:', companyId);
    console.log('Company ID (as string):', companyId.toString());

    // Fetch offers associated with the companyId
    const offers = await prisma.Offer.findMany({
      where: {
        comp_id: companyId,  // Convert companyId back to string for querying
      },
    });

    // Log the offers fetched
    console.log('Offers:', offers);

    if (offers.length === 0) {
      return NextResponse.json({ message: 'No offers found for this company' });
    }

    return NextResponse.json(offers);
  } catch (error) {
    console.log('Error fetching offers:', error);
    return NextResponse.error(new Error('Internal Server Error'), { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        {
          message: 'Offer ID is required',
          status: false,
        },
        { status: 400 }
      );
    }

    const updatedOffer = await prisma.Offer.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Offer updated successfully',
      status: true,
      data: updatedOffer,
    });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json(
      {
        message: 'Failed to update offer',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    // const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          message: 'Offer ID is required',
          status: false,
        },
        { status: 400 }
      );
    }
    console.log(id);

    await prisma.offer.delete({
      where: { id: id },
    });

    return NextResponse.json({
      message: 'Offer deleted successfully',
      status: true,
    });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete offer',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}