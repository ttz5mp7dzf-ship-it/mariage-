import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// In-memory fallback cache for codes created in admin session if DB is temporarily unreachable
export const globalCodesCache: Map<string, { name: string; maxGuests: number }> = new Map();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputCode = (body.code || "").trim().toUpperCase();

    if (!inputCode) {
      return NextResponse.json({ valid: false, error: "Code requis" }, { status: 400 });
    }

    // 1. Code universel secours "EL2026"
    if (inputCode === "EL2026") {
      return NextResponse.json({
        valid: true,
        code: "EL2026",
        name: "",
        maxGuests: 5,
        isUniversal: true,
      });
    }

    // 2. Recherche en cache mémoire
    if (globalCodesCache.has(inputCode)) {
      const cached = globalCodesCache.get(inputCode)!;
      return NextResponse.json({
        valid: true,
        code: inputCode,
        name: cached.name,
        maxGuests: cached.maxGuests,
      });
    }

    // 3. Recherche en Base de Données
    try {
      const guestCode = await prisma.guestCode.findUnique({
        where: { code: inputCode },
      });

      if (guestCode) {
        return NextResponse.json({
          valid: true,
          code: guestCode.code,
          name: guestCode.name,
          maxGuests: guestCode.maxGuests,
        });
      }
    } catch {
      // DB check fallback
    }

    // Si le code commence par EL- (code auto-généré), autoriser et extraire le nom
    if (inputCode.startsWith("EL-")) {
      const cleanName = inputCode.replace("EL-", "").replace(/-\d+$/, "").replace(/-/g, " ");
      return NextResponse.json({
        valid: true,
        code: inputCode,
        name: cleanName !== "GUEST" ? cleanName : "",
        maxGuests: 2,
      });
    }

    return NextResponse.json({ valid: false, error: "Code d'accès invalide" }, { status: 401 });
  } catch (error) {
    console.error("Access code verification error:", error);
    return NextResponse.json({ valid: false, error: "Erreur serveur" }, { status: 500 });
  }
}
