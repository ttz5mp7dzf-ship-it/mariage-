import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rsvps = await prisma.rsvp.findMany({
      select: { gift: true },
      where: { gift: { not: null } }
    });

    const claimedGifts = rsvps
      .map(r => r.gift)
      .filter((gift): gift is string => gift !== null);

    return NextResponse.json({ success: true, claimedGifts });
  } catch (error) {
    console.error("Error fetching gifts:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch gifts" }, { status: 500 });
  }
}
