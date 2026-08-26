"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, Gift, BookOpen, ShoppingBag } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    // Trigger door opening animation shortly after mount
    const timer = setTimeout(() => setDoorsOpen(true), 500);
    
    const targetDate = new Date("2026-10-10T12:00:00").getTime();
    const interval = setInterval(() => {
      const difference = targetDate - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Portes du Royaume (African carved wood doors overlay) */}
      <div className={`fixed inset-0 z-50 pointer-events-none flex ${doorsOpen ? '' : 'bg-[#1A0B08]'}`}>
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: doorsOpen ? "-100%" : 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-1/2 h-full bg-[#3E2723] border-r-4 border-african-gold relative overflow-hidden shadow-2xl"
        >
          {/* Texture bois / motifs sur la porte gauche */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z\\' fill=\\'%23CD7F32\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')" }}></div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-32 bg-african-gold/80 rounded-l-full shadow-lg border border-african-copper/50"></div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: doorsOpen ? "100%" : 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-1/2 h-full bg-[#3E2723] border-l-4 border-african-gold relative overflow-hidden shadow-2xl"
        >
          {/* Texture bois / motifs sur la porte droite */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z\\' fill=\\'%23CD7F32\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')" }}></div>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-32 bg-african-gold/80 rounded-r-full shadow-lg border border-african-copper/50"></div>
        </motion.div>
      </div>

      <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-32">
        
        {/* Cadre de la cour royale (Terre cuite & Or) */}
        <div className="relative w-full max-w-[90vw] md:max-w-4xl h-[60vh] md:h-[75vh] rounded-t-[100px] md:rounded-t-[200px] mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-african-gold border-b-0 overflow-hidden">
          
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image 
              src="/couple.jpg" 
              alt="Élisée & Lydia" 
              fill 
              className="object-cover object-top brightness-110 contrast-110 saturate-125" 
              priority
            />
          </motion.div>

          {/* Traitement lumineux chaud */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B08] via-transparent to-african-copper/30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A0B08] opacity-90"></div>

          {/* Informations */}
          <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 30 }} transition={{ delay: 1.2, duration: 1.5 }}>
               <h1 className="text-5xl md:text-8xl font-heading text-african-ivory drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">Élisée <span className="text-african-gold mx-2">&</span> Lydia</h1>
               <p className="text-african-gold text-lg md:text-2xl font-sans uppercase tracking-[0.4em] mt-4 mb-2 drop-shadow-md">Samedi 10 Octobre 2026</p>
               <p className="text-african-ivory/90 font-sans tracking-[0.5em] text-sm uppercase font-light">12h00 • Sweetlife Garden, BOUNOUMIN</p>
            </motion.div>
          </div>

        </div>

        {/* Compte à rebours façon bronze/terre */}
        <div className="mt-[-4rem] relative z-20 flex gap-3 md:gap-6 px-4">
          {[{ label: "Jours", value: timeLeft.days }, { label: "Heures", value: timeLeft.hours }, { label: "Minutes", value: timeLeft.minutes }, { label: "Secondes", value: timeLeft.seconds }].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 20 }} transition={{ delay: 1.5 + (idx * 0.1) }}
              className="bg-[#3E2723]/90 backdrop-blur-md border border-african-bronze/50 px-4 py-6 md:px-8 md:py-8 rounded-t-full rounded-b-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center min-w-[70px] md:min-w-[120px] relative overflow-hidden group"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-african-copper/30 rounded-full blur-xl group-hover:bg-african-gold/50 transition-colors duration-500"></div>

              <span className="text-3xl md:text-6xl font-heading font-bold text-african-ivory drop-shadow-[0_2px_4px_rgba(0,0,0,1)] mb-2 relative z-10">
                {item.value.toString().padStart(2, "0")}
              </span>
              <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-african-gold font-bold relative z-10">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Menu d'accès rapide avec finitions artisanales */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 30 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 relative z-20 flex flex-wrap justify-center gap-4 px-4 w-full max-w-4xl"
        >
          <a href="#rsvp" className="group relative w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-african-gold to-african-copper rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#2A1610] border border-african-gold/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-african-ivory font-sans font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
              <CheckCircle size={18} className="text-african-gold" />
              <span>Confirmer présence</span>
            </div>
          </a>

          <a href="#cadeaux" className="group relative w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-african-terra to-african-brown rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#2A1610] border border-african-terra/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-african-ivory font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
              <Gift size={18} className="text-african-terra" />
              <span>Offrandes</span>
            </div>
          </a>

          <a href="#histoire" className="group relative w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-african-bronze to-african-brown rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#2A1610] border border-african-bronze/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-african-ivory font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
              <BookOpen size={18} className="text-african-bronze" />
              <span>Galerie Royale</span>
            </div>
          </a>

          <a href="#pagne" className="group relative w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-african-copper to-african-gold rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#2A1610] border border-african-copper/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-african-ivory font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
              <ShoppingBag size={18} className="text-african-copper" />
              <span>L'Étoffe Royale</span>
            </div>
          </a>
        </motion.div>
      </section>
    </>
  );
}
