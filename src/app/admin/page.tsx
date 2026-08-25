import { PrismaClient } from "@prisma/client";
import { Users, Utensils, CheckCircle, Gift } from "lucide-react";
import ExportButtons from "./ExportButtons";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const rsvps = await prisma.rsvp.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalInvites = rsvps.reduce((acc, curr) => acc + (curr.present ? curr.groupSize : 0), 0);
  const totalConfirmations = rsvps.filter(r => r.present).length;
  const giftsDeclared = rsvps.filter(r => r.gift && r.gift !== "").length;
  
  return (
    <div className="min-h-screen bg-[#FFFDF9] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-[#0F1C3F] mb-8">Tableau de Bord - Élisée & Lydia</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-[#0F1C3F]">
            <div className="flex items-center gap-4">
              <Users className="text-[#0F1C3F]" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Invités (Personnes)</p>
                <p className="text-2xl font-bold font-sans text-gray-800">{totalInvites} <span className="text-sm font-normal">/ 300</span></p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-[#234226]">
            <div className="flex items-center gap-4">
              <CheckCircle className="text-[#234226]" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Présences Confirmées</p>
                <p className="text-2xl font-bold font-sans text-gray-800">{totalConfirmations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-[#E8D090]">
            <div className="flex items-center gap-4">
              <Utensils className="text-[#E8D090]" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Menus Choisis</p>
                <p className="text-2xl font-bold font-sans text-gray-800">{totalConfirmations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-[#D64D8B]">
            <div className="flex items-center gap-4">
              <Gift className="text-[#D64D8B]" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Cadeaux Déclarés</p>
                <p className="text-2xl font-bold font-sans text-gray-800">{giftsDeclared}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Liste des Invitations</h2>
            <ExportButtons data={rsvps} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 font-semibold text-sm">Nom</th>
                  <th className="px-6 py-3 font-semibold text-sm">Téléphone</th>
                  <th className="px-6 py-3 font-semibold text-sm">Présent</th>
                  <th className="px-6 py-3 font-semibold text-sm">Personnes</th>
                  <th className="px-6 py-3 font-semibold text-sm">Plat Principal</th>
                  <th className="px-6 py-3 font-semibold text-sm">Accompagnement</th>
                  <th className="px-6 py-3 font-semibold text-sm">Don</th>
                  <th className="px-6 py-3 font-semibold text-sm">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{rsvp.name}</td>
                    <td className="px-6 py-4 text-gray-600">{rsvp.phone}</td>
                    <td className="px-6 py-4">
                      {rsvp.present ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Oui</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Non</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{rsvp.present ? rsvp.groupSize : "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{rsvp.mainDish || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{rsvp.sideDish || "-"}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{rsvp.gift || "-"}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{rsvp.createdAt.toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
