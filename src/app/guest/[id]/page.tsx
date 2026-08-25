import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { CheckCircle, UtensilsCrossed, Users, Gift, Phone } from "lucide-react";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function GuestProfile({ params }: { params: { id: string } }) {
  // Wait for params as required in newer Next.js versions if needed, or simply use it
  const { id } = await params;
  
  const guest = await prisma.rsvp.findUnique({
    where: { id }
  });

  if (!guest) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#0F1C3F] relative flex items-center justify-center py-20 px-4">
      {/* Fond Palace unifié mais statique pour cette page */}
      <div className="fixed inset-0 z-0">
        <Image src="/palais.jpg" alt="Fond" fill className="object-cover opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C3F]/50 to-[#0F1C3F]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-[#C5A059]/30 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
        
        <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-8 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle size={48} className="text-green-400" />
        </div>

        <h1 className="text-sm font-sans uppercase tracking-[0.4em] text-[#C5A059] mb-4">Statut de l'invité</h1>
        <h2 className="text-4xl md:text-5xl font-heading text-[#FFFDF9] mb-2">{guest.name}</h2>
        <p className="text-[#FFFDF9]/60 font-sans text-sm tracking-widest uppercase mb-12">
          {guest.present ? "Présence Confirmée" : "Absence Confirmée"}
        </p>

        {guest.present && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-4 border-b border-[#C5A059]/20 pb-4">
              <Users className="text-[#C5A059]" size={24} />
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-[#FFFDF9]/50">Accompagnants</p>
                <p className="text-lg font-sans text-[#FFFDF9]">{guest.groupSize} Personne(s) au total</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-[#C5A059]/20 pb-4">
              <UtensilsCrossed className="text-[#C5A059]" size={24} />
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-[#FFFDF9]/50">Menu Choisi</p>
                <p className="text-lg font-sans text-[#FFFDF9]">{guest.mainDish} & {guest.sideDish}</p>
              </div>
            </div>

            {guest.gift && (
              <div className="flex items-center gap-4 border-b border-[#C5A059]/20 pb-4">
                <Gift className="text-[#C5A059]" size={24} />
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-[#FFFDF9]/50">Don de mariage</p>
                  <p className="text-lg font-sans text-[#FFFDF9]">{guest.gift}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <Phone className="text-[#C5A059]" size={24} />
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-[#FFFDF9]/50">Téléphone</p>
                <p className="text-lg font-sans text-[#FFFDF9]">{guest.phone}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-[#C5A059]/20">
          <p className="font-heading text-3xl text-[#C5A059] mb-1">Élisée & Lydia</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#FFFDF9]/50">La Fête dans la Cour Royale</p>
        </div>

      </div>
    </main>
  );
}
