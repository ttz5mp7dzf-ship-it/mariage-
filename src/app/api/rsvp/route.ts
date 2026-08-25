import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const rsvp = await prisma.rsvp.create({
      data: {
        name: body.name,
        phone: body.phone,
        present: body.present === "oui",
        groupSize: body.groupSize ? parseInt(body.groupSize) : 1,
        mainDish: body.mainDish || null,
        sideDish: body.sideDish || null,
        gift: body.gift || null,
      }
    });

    return NextResponse.json({ success: true, rsvp });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json({ success: false, error: "Failed to save RSVP" }, { status: 500 });
  }
}
