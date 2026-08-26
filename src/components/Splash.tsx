"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

// ============================
// Formes géométriques africaines pour remplacer les confettis
// ============================
type ShapeType = "diamond" | "triangle" | "ring" | "cross" | "zigzag";

function AfricanShape({ type, color, size }: { type: ShapeType; color: string; size: number }) {
  if (type === "diamond") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <polygon points="10,0 20,10 10,20 0,10" fill={color} opacity="0.85" />
        <polygon points="10,4 16,10 10,16 4,10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }
  if (type === "triangle") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <polygon points="10,1 19,18 1,18" fill={color} opacity="0.85" />
      </svg>
    );
  }
  if (type === "ring") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="2.5" opacity="0.85" />
        <circle cx="10" cy="10" r="4" fill={color} opacity="0.5" />
      </svg>
    );
  }
  if (type === "cross") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <rect x="8" y="1" width="4" height="18" fill={color} opacity="0.85" />
        <rect x="1" y="8" width="18" height="4" fill={color} opacity="0.85" />
      </svg>
    );
  }
  // zigzag
  return (
    <svg width={size * 2} height={size / 2} viewBox="0 0 40 10">
      <polyline points="0,8 8,2 16,8 24,2 32,8 40,2" fill="none" stroke={color} strokeWidth="2.5" opacity="0.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PAGNE_COLORS = ["#D4AF37", "#CD7F32", "#B87333", "#C04A2A", "#E4D5B7", "#8B4513", "#A0522D"];
const PAGNE_TYPES: ShapeType[] = ["diamond", "triangle", "ring", "cross", "zigzag"];

export default function Splash({ onEnter }: { onEnter: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 4000);
    const t3 = setTimeout(() => setStage(3), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleEnter = () => {
    setStage(4);
    onEnter();
  };

  // Génération stable des motifs de pagne (pas de Math.random() dans le render)
  const pagneShapes = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    type: PAGNE_TYPES[i % PAGNE_TYPES.length],
    color: PAGNE_COLORS[i % PAGNE_COLORS.length],
    size: 10 + (i % 5) * 5,
    left: `${(i * 2.5) % 100}%`,
    duration: 8 + (i % 7) * 2,
    delay: (i % 10) * 0.8,
    rotateEnd: 120 + (i % 5) * 60,
    drift: -30 + (i % 7) * 10,
  })), []);

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden bg-[#1A0B08]"
        >
          {/* Photo de fond avec zoom lent */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: stage >= 1 ? 1.5 : 1, y: stage >= 1 ? "10%" : "0%" }}
            transition={{ duration: 12, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image src="/ouverture.jpg" alt="Élisée & Lydia — La Cour Royale" fill className="object-cover object-top" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#3E2723]/40 to-black/30"></div>
          </motion.div>

          {/* ===== MOTIFS DE PAGNE AFRICAINS (Remplacement des confettis) ===== */}
          <AnimatePresence>
            {stage >= 1 && pagneShapes.map((shape) => (
              <motion.div
                key={shape.id}
                initial={{ y: "-10vh", opacity: 0 }}
                animate={{
                  y: "110vh",
                  opacity: [0, 0.85, 0.85, 0],
                  x: [0, shape.drift, shape.drift * 0.5, 0],
                  rotate: [0, shape.rotateEnd],
                }}
                transition={{
                  duration: shape.duration,
                  delay: shape.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute pointer-events-none z-10"
                style={{ left: shape.left, top: 0 }}
              >
                <AfricanShape type={shape.type} color={shape.color} size={shape.size} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ===== PORTES ROYALES AFRICAINES ===== */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: stage >= 1 ? -120 : 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            style={{ transformOrigin: "left center", perspective: "1000px" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#1A0B08] border-r-[6px] border-african-gold flex justify-end items-center z-20 shadow-[20px_0_50px_rgba(0,0,0,0.9)]"
          >
            <div className="absolute inset-0 opacity-80 mix-blend-luminosity bg-cover bg-center" style={{ backgroundImage: "url('/motif-3.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A0B08]/90"></div>
            {/* Ornements dorés sur la porte */}
            <div className="absolute right-4 w-6 h-48 bg-african-gold rounded-full shadow-2xl border-2 border-[#1A0B08]"></div>
            <div className="absolute top-8 right-10 w-8 h-8 bg-african-gold rotate-45 opacity-60"></div>
            <div className="absolute bottom-8 right-10 w-8 h-8 bg-african-gold rotate-45 opacity-60"></div>
          </motion.div>

          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: stage >= 1 ? 120 : 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            style={{ transformOrigin: "right center", perspective: "1000px" }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#1A0B08] border-l-[6px] border-african-gold flex justify-start items-center z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.9)]"
          >
            <div className="absolute inset-0 opacity-80 mix-blend-luminosity bg-cover bg-center -scale-x-100" style={{ backgroundImage: "url('/motif-3.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A0B08]/90"></div>
            <div className="absolute left-4 w-6 h-48 bg-african-gold rounded-full shadow-2xl border-2 border-[#1A0B08]"></div>
            <div className="absolute top-8 left-10 w-8 h-8 bg-african-gold rotate-45 opacity-60"></div>
            <div className="absolute bottom-8 left-10 w-8 h-8 bg-african-gold rotate-45 opacity-60"></div>
          </motion.div>

          {/* ===== CONTENU CENTRAL ===== */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="text-center relative px-6 md:px-12"
                >
                  {/* Cadre décoratif géométrique autour du titre */}
                  <div className="absolute inset-0 border border-african-gold/40 pointer-events-none">
                    {/* Losanges aux 4 coins */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-african-gold rotate-45 animate-diamond-pulse"></div>
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-african-gold rotate-45 animate-diamond-pulse" style={{ animationDelay: "1s" }}></div>
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-african-gold rotate-45 animate-diamond-pulse" style={{ animationDelay: "2s" }}></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-african-gold rotate-45 animate-diamond-pulse" style={{ animationDelay: "0.5s" }}></div>
                  </div>

                  <div className="relative z-10 py-8 px-6">
                    {/* Noms */}
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading text-[#FDFBF7] drop-shadow-[0_4px_24px_rgba(0,0,0,1)] tracking-wide">
                      Élisée <span className="text-african-gold text-3xl md:text-6xl lg:text-7xl align-middle mx-3">&</span> Lydia
                    </h1>

                    {/* ===== TEXTE CLÉ — LISIBILITÉ MAXIMALE ===== */}
                    <div className="mt-6 relative inline-block">
                      {/* Voile de contraste derrière le texte */}
                      <div className="absolute inset-0 bg-[#1A0B08]/70 blur-sm rounded-sm -mx-4 -my-2"></div>
                      <h2 className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-deco text-[#FDFBF7] uppercase tracking-[0.3em] md:tracking-[0.5em] drop-shadow-[0_2px_12px_rgba(0,0,0,1)] px-4 py-2">
                        La Fête dans la{" "}
                        <span className="text-african-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                          Cour Royale
                        </span>
                      </h2>
                    </div>

                    {/* Ligne décorative africaine sous le titre */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <div className="h-px flex-1 max-w-16 bg-african-gold/60"></div>
                      <div className="w-3 h-3 bg-african-copper rotate-45"></div>
                      <div className="h-px flex-1 max-w-8 bg-african-gold/40"></div>
                      <div className="w-5 h-5 border-2 border-african-gold rotate-45"></div>
                      <div className="h-px flex-1 max-w-8 bg-african-gold/40"></div>
                      <div className="w-3 h-3 bg-african-copper rotate-45"></div>
                      <div className="h-px flex-1 max-w-16 bg-african-gold/60"></div>
                    </div>

                    <p className="mt-4 text-sm md:text-base font-sans uppercase tracking-[0.4em] text-african-sand/90 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                      Samedi 10 Octobre 2026 · Sweetlife Garden, Bounoumin
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bouton d'entrée */}
            <AnimatePresence>
              {stage >= 3 && (
                <motion.button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnter}
                  className="mt-12 md:mt-16 pointer-events-auto relative group"
                >
                  {/* Halo doré animé */}
                  <div className="absolute inset-0 bg-african-gold/40 blur-2xl animate-glow-pulse rounded-sm"></div>

                  {/* Socle en relief */}
                  <div className="absolute inset-0 bg-gradient-to-b from-african-gold to-african-bronze rounded-sm transform translate-y-2 group-hover:translate-y-1 transition-transform duration-200"></div>

                  {/* Face du bouton */}
                  <div className="relative bg-[#1A0B08] border-2 border-african-gold px-12 md:px-16 py-5 md:py-6 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Shimmer animé */}
                    <motion.div
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                      className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                    ></motion.div>

                    {/* Motifs décoratifs aux coins du bouton */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-african-gold/60"></div>
                    <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-african-gold/60"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-african-gold/60"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-african-gold/60"></div>

                    <span className="relative z-10 font-sans text-sm md:text-lg uppercase tracking-[0.3em] font-bold text-african-gold drop-shadow-md">
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
