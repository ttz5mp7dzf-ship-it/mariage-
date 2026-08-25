"use client";

import { Download, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type RSVP = {
  id: string;
  name: string;
  phone: string;
  present: boolean;
  groupSize: number;
  mainDish: string | null;
  sideDish: string | null;
  gift: string | null;
  createdAt: Date;
};

export default function ExportButtons({ data }: { data: RSVP[] }) {
  const formatData = () => {
    return data.map((row) => ({
      Nom: row.name,
      Téléphone: row.phone,
      Présent: row.present ? "Oui" : "Non",
      Personnes: row.present ? row.groupSize : 0,
      Plat: row.mainDish || "-",
      Accompagnement: row.sideDish || "-",
      Don: row.gift || "-",
      Date: new Date(row.createdAt).toLocaleDateString("fr-FR"),
    }));
  };

  const exportExcel = () => {
    const formatted = formatData();
    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invités");
    XLSX.writeFile(workbook, "Liste_Invites_Mariage.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des Invités - Élisée & Lydia", 14, 15);
    
    const formatted = formatData();
    const tableColumn = ["Nom", "Téléphone", "Présent", "Pers.", "Menu", "Accomp.", "Don"];
    const tableRows = formatted.map(row => [
      row.Nom,
      row.Téléphone,
      row.Présent,
      row.Personnes.toString(),
      row.Plat,
      row.Accompagnement,
      row.Don
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Liste_Invites_Mariage.pdf");
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={exportExcel}
        className="flex items-center gap-2 bg-[#234226] text-white px-4 py-2 rounded-md font-sans text-sm hover:bg-[#234226]/80 transition-colors"
      >
        <Download size={16} /> Excel
      </button>
      <button 
        onClick={exportPDF}
        className="flex items-center gap-2 bg-[#7A0A15] text-white px-4 py-2 rounded-md font-sans text-sm hover:bg-[#7A0A15]/80 transition-colors"
      >
        <FileText size={16} /> PDF
      </button>
    </div>
  );
}
