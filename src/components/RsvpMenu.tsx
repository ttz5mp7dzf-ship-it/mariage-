"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { User, Phone, Users, UtensilsCrossed } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";
import QRCode from "qrcode";
import * as htmlToImage from "html-to-image";

const plats = [
  "Sauce Kôpê", "Sauce Foufou", "Kplé", "Soupe de pâte de bœuf", 
  "Tchep blanc", "Sauce tomate", "Poulet braisé", "Poisson braisé"
];

const accompagnements = [
  "Alloco", "Attiéké blanc", "Attiéké rouge", "Riz blanc", 
  "Placali", "Foufou", "Foutou banane", "Pommes sautées", "Abolo"
];

export default function RsvpMenu() {
  const { register, handleSubmit, watch } = useForm();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const present = watch("present");
  
  const [rsvpData, setRsvpData] = useState<any>(null);
  const [qrSrc, setQrSrc] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const onSubmit = async (data: any) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
      });
      if (response.ok) {
        const json = await response.json();
        const rsvp = json.rsvp;
        setRsvpData(rsvp);
        
        // Generate QR code pointing to the guest profile page
        const guestUrl = `${window.location.origin}/guest/${rsvp.id}`;
        const qr = await QRCode.toDataURL(guestUrl, { color: { dark: '#0F1C3F', light: '#FFFFFF' }, margin: 1 });
        setQrSrc(qr);

        setStatus("success");
        // Confetti floral
        confetti({ particleCount: 200, spread: 150, origin: { y: 0.6 }, colors: ['#7A0A15', '#C5A059', '#234226', '#FFFDF9'] });
      } else {
        setStatus("error");
      }
    } catch (err) { setStatus("error"); }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 1, pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `Invitation-Royale-${rsvpData.name.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (status === "success" && rsvpData) {
      document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status, rsvpData]);

  if (status === "success" && rsvpData) {
    return (
      <section id="rsvp" className="py-20 px-4 text-center flex flex-col justify-center items-center min-h-screen relative overflow-hidden bg-transparent">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          
          <h2 className="text-4xl md:text-6xl font-heading text-[#FFFDF9] mb-4 drop-shadow-md">Bienvenue à la Cour</h2>
          <p className="text-xl md:text-2xl font-sans font-light text-[#C5A059] mb-12">Votre invitation personnelle a été générée avec succès.</p>

          {/* LA CARTE D'INVITATION (DESIGN INSPIRÉ DE L'IMAGE) */}
          <div className="w-full max-w-[500px] bg-white rounded-md shadow-2xl p-2 relative overflow-hidden border-2 border-[#C5A059]">
            <div 
              ref={cardRef} 
              className="w-full aspect-[4/5] bg-gradient-to-br from-[#f8f5f0] to-[#e4dbc8] relative overflow-hidden"
              style={{ padding: '20px' }}
            >
              {/* Filigrane / Effet lumineux au centre */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_transparent_70%)] opacity-80 pointer-events-none z-0"></div>

              <div className="relative z-10 h-full flex flex-col items-center justify-between text-[#2c343b]">
                
                {/* Haut : Solemnization */}
                <div className="text-center w-full mt-4">
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-sans text-gray-500 mb-4">La Fête dans la Cour Royale</p>
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-2 inline-block shadow-sm">
                    <p className="font-heading text-xl md:text-3xl text-gray-800">Save the Date</p>
                  </div>
                </div>

                {/* Milieu : Photo + Date block */}
                <div className="relative w-full h-[40%] flex justify-center items-center mt-6">
                  {/* Photo centrée détourée ou fondue */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-full overflow-hidden shadow-2xl border-4 border-white">
                      <Image src="/couple.jpg" alt="Couple" fill className="object-cover object-top" />
                    </div>
                  </div>
                  
                  {/* Date Block sur le côté */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-heading font-bold text-[#0F1C3F] leading-none">10</span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-600 border-y border-gray-300 py-1 my-1 w-full text-center">OCTOBRE</span>
                    <span className="bg-[#0F1C3F] text-white text-[10px] font-bold px-2 py-1 rounded w-full text-center">12:00</span>
                  </div>

                  {/* Tampon RSVP sur l'autre côté */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-[#C5A059] flex items-center justify-center p-1 opacity-70">
                      <div className="w-full h-full rounded-full bg-[#C5A059]/20 flex flex-col items-center justify-center text-center leading-none">
                        <span className="text-[7px] uppercase tracking-wider font-bold text-[#C5A059]">Accès</span>
                        <span className="text-[8px] font-serif italic text-gray-800">VIP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bas : Noms et invité */}
                <div className="text-center w-full z-20 mt-12">
                  <h1 className="text-5xl md:text-7xl font-heading font-bold text-[#0F1C3F] drop-shadow-lg leading-none" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>
                    Élisée <br/><span className="text-4xl md:text-6xl text-[#C5A059]">&</span> Lydia
                  </h1>
                </div>

                {/* Bloc invité + QR */}
                <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#C5A059]/30 mt-4 flex justify-between items-center text-left">
                  <div className="flex-1 pr-4">
                    <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059] mb-1">Vous êtes invité(e)</p>
                    <p className="text-lg md:text-xl font-heading font-bold text-[#0F1C3F] truncate">{rsvpData.name}</p>
                    <p className="text-xs font-sans text-gray-500 mt-1">{rsvpData.groupSize} personne(s) • Menu: {rsvpData.mainDish}</p>
                    <p className="text-[10px] font-sans italic text-gray-400 mt-2 mt-2 leading-tight">
                      "Que notre joie soit parfaite en votre présence."
                    </p>
                  </div>
                  {qrSrc && (
                    <div className="w-20 h-20 bg-white p-1 rounded-lg border border-gray-200 shadow-inner flex-shrink-0">
                      <img src={qrSrc} alt="QR Code" className="w-full h-full" />
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="mt-12 bg-gradient-to-r from-[#C5A059] to-[#8E6F33] text-white px-12 py-5 rounded-full font-sans text-sm uppercase tracking-[0.2em] font-bold shadow-[0_10px_20px_rgba(197,160,89,0.4)] hover:shadow-[0_15px_30px_rgba(197,160,89,0.6)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
          >
            {isDownloading ? "Génération en cours..." : "Télécharger mon invitation"}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-32 px-4 relative bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-[#C5A059] mb-4">Registre Royal</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-[#FFFDF9] mb-6">Confirmez votre Présence</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-premium bg-[#0F1C3F]/40 p-8 md:p-20 rounded-[2rem] relative shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group">
              <label className="block text-[#FFFDF9] text-xs font-bold mb-3 uppercase tracking-widest">Nom Complet</label>
              <div className="flex items-center border-b border-[#C5A059]/50 group-focus-within:border-[#C5A059] transition-colors">
                <User className="text-[#C5A059] mr-4" size={20} />
                <input {...register("name", { required: true })} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-[#FFFDF9] placeholder-[#FFFDF9]/30" placeholder="Entrez votre nom" />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-[#FFFDF9] text-xs font-bold mb-3 uppercase tracking-widest">Téléphone</label>
              <div className="flex items-center border-b border-[#C5A059]/50 group-focus-within:border-[#C5A059] transition-colors">
                <Phone className="text-[#C5A059] mr-4" size={20} />
                <input {...register("phone", { required: true })} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-[#FFFDF9] placeholder-[#FFFDF9]/30" placeholder="07 XX XX XX XX" />
              </div>
            </div>

            <div className="relative group md:col-span-2 max-w-md mx-auto w-full">
              <label className="block text-[#FFFDF9] text-xs font-bold mb-3 uppercase tracking-widest text-center">Serez-vous présent ?</label>
              <select {...register("present", { required: true })} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-[#C5A059] text-center border-b border-[#C5A059]/50">
                <option value="" className="bg-[#0F1C3F]">Sélectionnez...</option>
                <option value="oui" className="bg-[#0F1C3F]">Oui, c'est un honneur</option>
                <option value="non" className="bg-[#0F1C3F]">Non, avec regret</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {present === "oui" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-20 overflow-hidden">
                
                <div className="relative group max-w-md mx-auto w-full mb-20">
                  <label className="block text-[#FFFDF9] text-xs font-bold mb-3 uppercase tracking-widest text-center">Nombre d'invités</label>
                  <div className="flex items-center justify-center border-b border-[#C5A059]/50 group-focus-within:border-[#C5A059] transition-colors">
                    <Users className="text-[#C5A059] mr-4" size={20} />
                    <input type="number" min="1" max="5" {...register("groupSize", { required: true, valueAsNumber: true })} className="w-32 text-center py-4 bg-transparent focus:outline-none text-xl font-sans text-[#FFFDF9]" defaultValue={1} />
                  </div>
                </div>

                <div className="text-center mb-16">
                  <UtensilsCrossed size={40} className="mx-auto text-[#C5A059] mb-6" />
                  <h4 className="text-4xl md:text-5xl font-heading text-[#FFFDF9] mb-2">Menu Gastronomique</h4>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-[#0F1C3F]/80 p-8 rounded-2xl border border-[#C5A059]/20 shadow-xl backdrop-blur-md">
                    <h5 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-8 text-center border-b border-[#C5A059]/30 pb-4">Plats Principaux</h5>
                    <div className="space-y-3">
                      {plats.map((plat) => (
                        <label key={plat} className="flex items-center space-x-4 cursor-pointer group hover:bg-[#C5A059]/10 p-4 rounded-xl transition-all duration-300">
                          <div className="w-5 h-5 rounded-full border-2 border-[#C5A059] flex items-center justify-center">
                            <input type="radio" value={plat} {...register("mainDish", { required: true })} className="opacity-0 absolute w-0 h-0 peer" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="text-lg font-sans text-[#FFFDF9] group-hover:text-[#C5A059] transition-colors">{plat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0F1C3F]/80 p-8 rounded-2xl border border-[#C5A059]/20 shadow-xl backdrop-blur-md">
                    <h5 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-8 text-center border-b border-[#C5A059]/30 pb-4">Accompagnements</h5>
                    <div className="space-y-3">
                      {accompagnements.map((acc) => (
                        <label key={acc} className="flex items-center space-x-4 cursor-pointer group hover:bg-[#C5A059]/10 p-4 rounded-xl transition-all duration-300">
                          <div className="w-5 h-5 rounded-full border-2 border-[#C5A059] flex items-center justify-center">
                            <input type="radio" value={acc} {...register("sideDish", { required: true })} className="opacity-0 absolute w-0 h-0 peer" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="text-lg font-sans text-[#FFFDF9] group-hover:text-[#C5A059] transition-colors">{acc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <h4 className="text-4xl md:text-5xl font-heading text-[#FFFDF9] mb-2">Votre Don</h4>
                  <p className="text-sm font-sans uppercase tracking-[0.2em] text-[#C5A059] mb-10">Participez à notre joie</p>
                  
                  <div className="max-w-2xl mx-auto bg-[#0F1C3F]/80 p-8 rounded-2xl border border-[#C5A059]/20 shadow-xl backdrop-blur-md">
                    <select {...register("gift")} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-[#C5A059] text-center border-b border-[#C5A059]/30">
                      <option value="" className="bg-[#0F1C3F]">Je choisis mon type de cadeau...</option>
                      <option value="Mobilier" className="bg-[#0F1C3F]">Mobilier</option>
                      <option value="Électroménager" className="bg-[#0F1C3F]">Électroménager</option>
                      <option value="Décoration" className="bg-[#0F1C3F]">Décoration</option>
                      <option value="Enveloppe d'argent" className="bg-[#0F1C3F]">Enveloppe d'argent</option>
                      <option value="Chèque Cadeau" className="bg-[#0F1C3F]">Chèque Cadeau</option>
                      <option value="Voyage" className="bg-[#0F1C3F]">Voyage</option>
                      <option value="Expérience" className="bg-[#0F1C3F]">Expérience</option>
                      <option value="Surprise" className="bg-[#0F1C3F]">C'est une surprise !</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-32 pb-16 text-center relative">
            <button type="submit" disabled={status === "loading"} className="relative group inline-block">
              {/* Le Sceau Royal */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#7A0A15] to-[#4A040B] shadow-[0_10px_30px_rgba(122,10,21,0.6)] flex items-center justify-center border-4 border-[#C5A059] group-hover:scale-95 group-active:scale-90 transition-transform duration-300">
                <div className="absolute inset-2 border-2 border-dashed border-[#C5A059]/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-[#C5A059]/30 rounded-full"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-deco text-[#C5A059] text-3xl md:text-4xl mb-1">E&L</span>
                  <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                    {status === "loading" ? "Scellement..." : "Confirmer"}
                  </span>
                </div>
                <div className="absolute top-2 left-2 w-10 h-10 bg-white/20 rounded-full blur-sm"></div>
              </div>
              <div className="absolute inset-0 bg-[#C5A059]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <p className="mt-8 font-sans text-xs uppercase tracking-widest text-[#C5A059]/80">Apposer votre sceau</p>
          </div>
        </form>
      </div>
    </section>
  );
}
