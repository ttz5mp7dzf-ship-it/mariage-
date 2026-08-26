import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  // Protection par mot de passe via query param
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const rsvps = await prisma.rsvp.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Statistiques globales
    const total = rsvps.length;
    const present = rsvps.filter((r) => r.present).length;
    const absent = rsvps.filter((r) => !r.present).length;
    const totalGuests = rsvps
      .filter((r) => r.present)
      .reduce((acc, r) => acc + (r.groupSize || 1), 0);

    const gifts = rsvps
      .filter((r) => r.gift && r.gift !== "Je n'ai pas de cadeau")
      .map((r) => r.gift as string);

    const menuStats = rsvps
      .filter((r) => r.present && r.mainDish)
      .reduce((acc: Record<string, number>, r) => {
        const key = r.mainDish as string;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

    return NextResponse.json({
      success: true,
      stats: { total, present, absent, totalGuests },
      menuStats,
      gifts,
      rsvps,
    });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
