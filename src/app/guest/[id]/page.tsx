import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { CheckCircle, UtensilsCrossed, Users, Calendar, MapPin, ShieldCheck, Crown } from "lucide-react";

const prisma = new PrismaClient();

export default async function GuestProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let guest: any = null;
  try {
    guest = await prisma.rsvp.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error("Error fetching guest profile:", e);
  }

  if (!guest) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#1A0B08] text-african-ivory relative flex items-center justify-center py-16 px-4 overflow-hidden">
      {/* Fond noble avec motif géométrique */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22%23D4AF37%22 fill-rule%3D%22evenodd%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
        }}
      />

      {/* Halos lumineux dorés */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-lg bg-[#2A1610] border-2 border-african-gold/60 p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.95)] text-center rounded-sm">
        {/* Coins dorés */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-african-gold/60" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-african-gold/60" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-african-gold/60" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-african-gold/60" />

        {/* Badge vérification */}
        <div className="w-20 h-20 mx-auto bg-green-500/15 rounded-full flex items-center justify-center mb-6 border-2 border-green-400 shadow-[0_0_40px_rgba(74,222,128,0.3)]">
          <ShieldCheck size={44} className="text-green-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-african-gold/15 border border-african-gold/40 text-african-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
          <Crown size={12} /> Passe-Droit Officiel Vérifié
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading text-african-ivory mb-1">
          {guest.name}
        </h1>
        <p className="text-african-gold font-sans text-xs uppercase tracking-[0.25em] font-bold mb-8">
          {guest.present ? "✓ Présence Confirmée à la Cour Royale" : "✗ Absent(e) de cœur"}
        </p>

        {guest.present && (
          <div className="space-y-5 text-left border-t border-b border-african-gold/20 py-6 my-6">
            <div className="flex items-center gap-4">
              <Users className="text-african-gold shrink-0" size={22} />
              <div>
                <p className="text-[10px] font-sans uppercase tracking-widest text-african-sand/60">Nombre d&apos;invités</p>
                <p className="text-base font-sans text-african-ivory font-bold">{guest.groupSize || 1} Personne(s) réservée(s)</p>
              </div>
            </div>

            {guest.mainDish && (
              <div className="flex items-center gap-4">
                <UtensilsCrossed className="text-african-gold shrink-0" size={22} />
                <div>
                  <p className="text-[10px] font-sans uppercase tracking-widest text-african-sand/60">Menu Sélectionné</p>
                  <p className="text-base font-sans text-african-ivory font-bold">{guest.mainDish}</p>
                  {guest.sideDish && <p className="text-xs text-african-sand/80">{guest.sideDish}</p>}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <Calendar className="text-african-gold shrink-0" size={22} />
              <div>
                <p className="text-[10px] font-sans uppercase tracking-widest text-african-sand/60">Date & Heure</p>
                <p className="text-base font-sans text-african-ivory font-bold">Samedi 10 Octobre 2026 · 12h00</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-african-gold shrink-0" size={22} />
              <div>
                <p className="text-[10px] font-sans uppercase tracking-widest text-african-sand/60">Lieu de la Réception</p>
                <p className="text-base font-sans text-african-ivory font-bold">Sweetlife Garden, BOUNOUMIN</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4">
          <p className="font-heading text-3xl text-african-gold mb-1">Élisée & Lydia</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-african-sand/50">
            Mariage Royal 2026 · Sceau d&apos;Authenticité
          </p>
        </div>
      </div>
    </main>
  );
}
