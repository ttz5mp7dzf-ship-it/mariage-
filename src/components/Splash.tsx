"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Splash({ onEnter }: { onEnter: () => void }) {
  const [stage, setStage] = useState(0); 

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1000);
    const t2 = setTimeout(() => setStage(2), 4500);
    const t3 = setTimeout(() => setStage(3), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleEnter = () => {
    setStage(4);
    setTimeout(onEnter, 2000);
  };

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.2 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden bg-black perspective-[1000px]"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: stage >= 1 ? 1.5 : 1, y: stage >= 1 ? "10%" : "0%" }}
            transition={{ duration: 12, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image src="/palais.jpg" alt="Palais Royal" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#C5A059]/20 to-transparent"></div>
          </motion.div>

          {/* PETALES AUX COULEURS DU BOUQUET */}
          <AnimatePresence>
            {stage >= 1 && Array.from({ length: 50 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute top-[-10%] rounded-full z-10"
                style={{
                  backgroundColor: ['#234226', '#7A0A15', '#C5A059', '#0F1C3F', '#E86A17', '#7A4A2D', '#D64D8B'][Math.floor(Math.random() * 7)],
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 15 + 10}px`,
                  height: `${Math.random() * 15 + 10}px`,
                  animation: `fall ${Math.random() * 10 + 5}s linear infinite ${Math.random() * 5}s`,
                  boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.3)",
                  opacity: 0.9
                }}
              />
            ))}
          </AnimatePresence>

          {/* PORTES ROYALES AFRICAINES (Splash) */}
          <motion.div
            initial={{ rotateY: 0 }} animate={{ rotateY: stage >= 1 ? -120 : 0 }} transition={{ duration: 4, ease: "easeInOut" }}
            style={{ transformOrigin: "left center" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#1A0B08] border-r-[6px] border-african-gold flex justify-end items-center z-20 shadow-[20px_0_50px_rgba(0,0,0,0.9)]"
          >
            <div className="absolute inset-0 opacity-80 mix-blend-luminosity bg-cover bg-center" style={{ backgroundImage: "url('/motif-3.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A0B08]/90"></div>
            <div className="absolute right-4 w-6 h-48 bg-african-gold rounded-full shadow-2xl border-2 border-[#1A0B08]"></div>
          </motion.div>

          <motion.div
            initial={{ rotateY: 0 }} animate={{ rotateY: stage >= 1 ? 120 : 0 }} transition={{ duration: 4, ease: "easeInOut" }}
            style={{ transformOrigin: "right center" }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#1A0B08] border-l-[6px] border-african-gold flex justify-start items-center z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.9)]"
          >
            <div className="absolute inset-0 opacity-80 mix-blend-luminosity bg-cover bg-center -scale-x-100" style={{ backgroundImage: "url('/motif-3.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A0B08]/90"></div>
            <div className="absolute left-4 w-6 h-48 bg-african-gold rounded-full shadow-2xl border-2 border-[#1A0B08]"></div>
          </motion.div>

          {/* CONTENU CENTRAL */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="text-center relative p-12"
                >
                  <div className="relative z-10">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-[#FFFDF9] drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] tracking-wide">
                      Élisée <span className="text-[#C5A059] text-4xl md:text-6xl lg:text-7xl align-middle mx-4">&</span> Lydia
                    </h1>
                    <h2 className="mt-8 text-xl md:text-3xl font-deco text-[#C5A059] uppercase tracking-[0.4em] drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
                      La Fête dans la Cour Royale
                    </h2>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 3 && (
                <motion.button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95, y: 5 }}
                  onClick={handleEnter}
                  className="mt-16 pointer-events-auto relative group"
                >
                  {/* Plaque Royale en Métal (L'Objet) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E8D090] via-[#C5A059] to-[#8E6F33] rounded-sm transform translate-y-2 group-hover:translate-y-1 transition-transform duration-200"></div>
                  
                  {/* Face avant de la plaque */}
                  <div className="relative bg-gradient-to-br from-[#1A233A] to-[#0F1C3F] border-2 border-[#C5A059] px-16 py-6 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Reflet métallique dynamique */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg]"
                    ></motion.div>
                    
                    <span className="relative z-10 font-sans text-sm md:text-lg uppercase tracking-[0.3em] font-bold gold-text drop-shadow-md">
                      Entrer dans notre Royaume
                    </span>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
