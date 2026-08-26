"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, Gift, BookOpen, ShoppingBag } from "lucide-react";

export default function Hero({ isEntered = false }: { isEntered?: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [doorOverlayVisible, setDoorOverlayVisible] = useState(true);

  useEffect(() => {
    if (isEntered) {
      const openTimer = setTimeout(() => {
        setDoorsOpen(true);
      }, 2000);

      const hideOverlayTimer = setTimeout(() => {
        setDoorOverlayVisible(false);
      }, 3600);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(hideOverlayTimer);
      };
    }
  }, [isEntered]);

  useEffect(() => {
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
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Portes du Royaume (African carved wood doors overlay) */}
      {doorOverlayVisible && (
        <div className="fixed inset-0 z-50 pointer-events-none flex">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: doorsOpen ? "-100%" : 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-1/2 h-full bg-[#2A1610] border-r-[6px] border-african-gold relative overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.8)] z-10"
          >
            {/* Vrai Motif Africain */}
            <div className="absolute inset-0 opacity-60 mix-blend-luminosity bg-cover bg-center" style={{ backgroundImage: "url('/motif-2.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A0B08]/80"></div>
            
            {/* Poignée de porte */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-4 h-40 bg-african-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)] border-2 border-[#1A0B08]"></div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: doorsOpen ? "100%" : 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-1/2 h-full bg-[#2A1610] border-l-[6px] border-african-gold relative overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-10"
          >
            {/* Vrai Motif Africain (mirroir pour la symétrie) */}
            <div className="absolute inset-0 opacity-60 mix-blend-luminosity bg-cover bg-center -scale-x-100" style={{ backgroundImage: "url('/motif-2.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A0B08]/80"></div>

            {/* Poignée de porte */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-4 h-40 bg-african-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)] border-2 border-[#1A0B08]"></div>
          </motion.div>
        </div>
      )}

      <section id="accueil" className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-32 scroll-mt-20">
        
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 20 }} transition={{ delay: 0.3, duration: 0.8 }}>
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
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 20 }} transition={{ delay: 0.4 + (idx * 0.06), duration: 0.6 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: doorsOpen ? 1 : 0, y: doorsOpen ? 0 : 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 relative z-20 flex flex-wrap justify-center gap-4 px-4 w-full max-w-4xl"
        >
          <a
            href="#rsvp"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-african-gold to-african-copper rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#2A1610] border border-african-gold/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-african-ivory font-sans font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
              <CheckCircle size={18} className="text-african-gold" />
              <span>Confirmer présence</span>
            </div>
          </a>

          <a
            href="#cadeaux"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("cadeaux")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-african-terra to-african-brown rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#2A1610] border border-african-terra/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-african-ivory font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
              <Gift size={18} className="text-african-terra" />
              <span>Offrandes</span>
            </div>
          </a>

          <a
            href="#histoire"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("histoire")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-african-bronze to-african-brown rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#2A1610] border border-african-bronze/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-african-ivory font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
              <BookOpen size={18} className="text-african-bronze" />
              <span>Galerie Royale</span>
            </div>
          </a>

          <a
            href="#pagne"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pagne")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative w-full sm:w-auto"
          >
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
