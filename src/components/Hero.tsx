"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, Gift, BookOpen, ShoppingBag } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-32">
      
      {/* Cadre floral vivant (Transparent to show global background) */}
      <div className="relative w-full max-w-[90vw] md:max-w-4xl h-[60vh] md:h-[75vh] rounded-t-full mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-[#C5A059] border-b-0 overflow-hidden">
        
        {/* Photo des mariés avec effet Dolly lent et traitement lumineux */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src="/couple.jpg" 
            alt="Élisée & Lydia" 
            fill 
            className="object-cover object-top brightness-110 contrast-125 saturate-110" 
            priority
          />
        </motion.div>

        {/* Traitement lumineux sur l'image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-[#C5A059]/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F1C3F] opacity-90"></div>

        {/* Informations incrustées dans l'image */}
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
             <h1 className="text-5xl md:text-8xl font-heading text-[#FFFDF9] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">Élisée <span className="text-[#C5A059] mx-2">&</span> Lydia</h1>
             <p className="text-[#C5A059] text-lg md:text-2xl font-sans uppercase tracking-[0.4em] mt-4 mb-2 drop-shadow-md">Samedi 10 Octobre 2026</p>
             <p className="text-[#FFFDF9]/80 font-sans tracking-[0.5em] text-sm uppercase">12h00 • Sweetlife Garden</p>
          </motion.div>
        </div>

      </div>

      {/* Compte à rebours façon Cristal Royal */}
      <div className="mt-[-4rem] relative z-20 flex gap-3 md:gap-6 px-4">
        {[{ label: "Jours", value: timeLeft.days }, { label: "Heures", value: timeLeft.hours }, { label: "Minutes", value: timeLeft.minutes }, { label: "Secondes", value: timeLeft.seconds }].map((item, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1 + (idx * 0.1) }}
            className="bg-white/10 backdrop-blur-xl border border-white/30 px-4 py-6 md:px-8 md:py-8 rounded-t-full rounded-b-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center min-w-[70px] md:min-w-[120px] relative overflow-hidden group"
          >
            {/* Éclat lumineux */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/50 rounded-full blur-xl group-hover:bg-[#C5A059]/50 transition-colors duration-500"></div>

            <span className="text-3xl md:text-6xl font-heading font-bold text-[#FFFDF9] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 relative z-10">
              {item.value.toString().padStart(2, "0")}
            </span>
            <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold relative z-10">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Menu d'accès rapide */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 relative z-20 flex flex-wrap justify-center gap-4 px-4 w-full max-w-4xl"
      >
        <a href="#rsvp" className="group relative w-full sm:w-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059] to-[#8E6F33] rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#0F1C3F] to-[#1A233A] border border-[#C5A059]/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-[#FFFDF9] font-sans font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
            <CheckCircle size={18} className="text-[#C5A059]" />
            <span>Confirmer présence</span>
          </div>
        </a>

        <a href="#cadeaux" className="group relative w-full sm:w-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D64D8B] to-[#7A0A15] rounded-full blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-md border border-[#D64D8B]/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-[#FFFDF9] font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
            <Gift size={18} className="text-[#D64D8B]" />
            <span>Idées Cadeaux</span>
          </div>
        </a>

        <a href="#histoire" className="group relative w-full sm:w-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#234226] to-[#0F1C3F] rounded-full blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-md border border-[#234226]/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-[#FFFDF9] font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
            <BookOpen size={18} className="text-[#234226]" />
            <span>Notre Histoire</span>
          </div>
        </a>

        <a href="#pagne" className="group relative w-full sm:w-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#E86A17] to-[#F4C430] rounded-full blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-md border border-[#E86A17]/50 px-8 py-4 rounded-full flex items-center justify-center gap-3 text-[#FFFDF9] font-sans uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300">
            <ShoppingBag size={18} className="text-[#E86A17]" />
            <span>Commander le Pagne</span>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
