import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ success: false, error: "Le nom est obligatoire" }, { status: 400 });
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        name: body.name.trim(),
        phone: body.phone?.trim() || "",
        present: body.present === "oui",
        groupSize: body.groupSize ? parseInt(String(body.groupSize)) : 1,
        mainDish: body.mainDish || null,
        sideDish: body.sideDish || null,
        gift: body.gift || null,
      },
    });

    return NextResponse.json({ success: true, rsvp });
  } catch (error: any) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to save RSVP",
      },
      { status: 500 }
    );
  }
}
