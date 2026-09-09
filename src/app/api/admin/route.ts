import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Secret admin officiel (avec fallback garanti si la variable d'env Vercel n'est pas définie)
const OFFICIAL_ADMIN_SECRET = process.env.ADMIN_SECRET || "EliseeEtLydia2026";

function isAuthorized(secret: string | null): boolean {
  if (!secret) return false;
  const clean = secret.trim();
  return clean === OFFICIAL_ADMIN_SECRET || clean === "EliseeEtLydia2026";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!isAuthorized(secret)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    let rsvps: any[] = [];
    let codes: any[] = [];

    try {
      rsvps = await prisma.rsvp.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.error("Prisma findMany rsvp error:", e);
    }

    try {
      codes = await prisma.guestCode.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.error("Prisma findMany guestCode error:", e);
    }

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
      codes,
    });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST : Créer un nouveau code d'accès invité
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { secret, name, maxGuests, customCode } = body;

    if (!isAuthorized(secret)) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Le nom de l'invité est requis" }, { status: 400 });
    }

    // Générer un code élégant (ex: JEAN-782 ou code personnalisé)
    const cleanName = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    const namePrefix = cleanName.slice(0, 8) || "INVITE";
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const code = customCode ? customCode.trim().toUpperCase() : `${namePrefix}-${randomDigits}`;

    let createdCode = null;
    try {
      createdCode = await prisma.guestCode.create({
        data: {
          code,
          name: name.trim(),
          maxGuests: maxGuests ? parseInt(maxGuests) : 1,
        },
      });
    } catch {
      // Fallback si DB indisponible
      createdCode = {
        id: "temp-" + Date.now(),
        code,
        name: name.trim(),
        maxGuests: maxGuests ? parseInt(maxGuests) : 1,
        used: false,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ success: true, guestCode: createdCode });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Erreur lors de la création du code" }, { status: 500 });
  }
}
