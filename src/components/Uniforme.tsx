"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, CheckCircle, ZoomIn, X, Sparkles, Crown } from "lucide-react";
import Image from "next/image";

const PAGNE_FORMULAS = [
  {
    id: "complet",
    label: "COMPLET",
    sublabel: "3 Pagnes",
    description: "La tenue complète officielle de la cérémonie royale.",
    accent: "#FFB703",
  },
  {
    id: "deux",
    label: "DEMI",
    sublabel: "2 Pagnes",
    description: "Une présence cérémonielle élégante et harmonieuse.",
    accent: "#F48C06",
  },
  {
    id: "un",
    label: "ESSENTIEL",
    sublabel: "1 Pagne",
    description: "L'ornement de base, symbole d'union avec les mariés.",
    accent: "#E85D04",
  },
];

export default function Uniforme() {
  const [quantity, setQuantity] = useState(1);
  const [selectedFormula, setSelectedFormula] = useState(PAGNE_FORMULAS[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Bloquer le scroll d'arrière-plan quand le plein écran est ouvert
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const handleOrder = () => {
    const phoneNumber = "2250778270621";
    const message = encodeURIComponent(
      `Bonjour Leticia 👑,\n\nJe suis un(e) invité(e) au mariage d'Élisée & Lydia.\nJ'aimerais passer commande pour le pagne officiel de la cérémonie.\n\n📦 *Commande* : ${quantity}x Formule ${selectedFormula.label} (${selectedFormula.sublabel})\n\nMerci de m'indiquer les modalités de paiement et de livraison. 🙏`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="pagne" className="py-28 px-4 relative flex items-center justify-center min-h-[70vh] overflow-hidden bg-transparent scroll-mt-20">
      
      {/* Texture de fond imprimé Wax ambré & terracotta VIF */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #E85D04 0px, #E85D04 20px, #FFB703 20px, #FFB703 40px, #F48C06 40px, #F48C06 60px, #2563EB 60px, #2563EB 70px)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_#4A150B_85%)] opacity-90 pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-african-gold/20 border border-african-gold/50 text-african-gold text-xs uppercase tracking-[0.25em] font-bold mb-4 shadow-xl">
            <Crown size={14} /> Dress Code & Tenue Officielle
          </div>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory mb-3 drop-shadow-lg">
            Le Pagne Officiel du Mariage
          </h3>
          <p className="text-lg md:text-2xl font-heading text-african-gold font-light max-w-2xl mx-auto leading-relaxed italic drop-shadow">
            Découvrez l&apos;étoffe royale aux couleurs éclatantes choisie par Élisée & Lydia.
          </p>
        </div>

        {/* ===== 1. VITRINE DU PAGNE EN PREMIER (GRANDE IMAGE MISE EN AVANT) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 bg-gradient-to-b from-[#5C1B0E] via-[#4A150B] to-[#380E07] border-4 border-african-gold p-5 sm:p-8 shadow-[0_30px_90px_rgba(232,93,4,0.4)] rounded-sm relative overflow-hidden"
        >
          {/* Décorations géométriques aux coins */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-african-gold" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-african-gold" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-african-gold" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-african-gold" />

          {/* Banner titre du pagne */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-african-gold/30 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-african-gold animate-pulse" size={22} />
              <span className="text-sm sm:text-base font-heading font-bold text-african-ivory uppercase tracking-[0.2em]">
                Motif Authentique Sélectionné
              </span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-african-gold to-african-copper text-[#1A0B08] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-xl cursor-pointer rounded-xs"
            >
              <ZoomIn size={18} />
              <span>Agrandir / Plein Écran</span>
            </button>
          </div>

          {/* Cadre photo du pagne officiel (Cliquable pour zoom immédiat sans scroll) */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[520px] bg-[#200A05] border-2 border-african-gold/60 rounded-sm overflow-hidden cursor-pointer group shadow-2xl flex items-center justify-center p-2"
          >
            <Image
              src="/pagne-officiel.jpg"
              alt="Pagne Officiel Mariage Élisée & Lydia"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Overlay Loupe au survol */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
              <div className="w-16 h-16 rounded-full bg-african-gold text-[#1A0B08] flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                <ZoomIn size={32} />
              </div>
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-african-gold font-bold bg-[#200A05]/95 px-5 py-2.5 rounded-xs border border-african-gold/60 shadow-2xl">
                Cliquer pour ouvrir directement en grand écran
              </span>
            </div>
          </div>
        </motion.div>

        {/* ===== 2. CHOIX DES FORMULES DE PAGNES ===== */}
        <div className="text-center mb-8">
          <h4 className="text-2xl sm:text-4xl font-heading text-african-gold mb-2 drop-shadow-md">
            Choisissez votre Formule de Pagne
          </h4>
          <p className="text-xs sm:text-sm font-sans text-african-sand/90 uppercase tracking-widest font-semibold">
            Sélectionnez le nombre de pagnes désiré
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PAGNE_FORMULAS.map((formula, idx) => {
            const isSelected = selectedFormula.id === formula.id;
            return (
              <motion.button
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => setSelectedFormula(formula)}
                className={`relative p-8 text-center border-2 transition-all duration-300 group overflow-hidden cursor-pointer rounded-sm ${
                  isSelected
                    ? "border-african-gold bg-[#5C1B0E] shadow-[0_0_45px_rgba(255,183,3,0.5)] scale-[1.03]"
                    : "border-african-gold/40 bg-[#351009]/90 hover:border-african-gold/80 hover:bg-[#4A150B]"
                }`}
              >
                {/* Check icon si sélectionné */}
                {isSelected && (
                  <>
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-african-gold" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-african-gold" />
                    <CheckCircle className="absolute top-3.5 right-3.5 text-african-gold" size={22} />
                  </>
                )}

                <div className="relative z-10">
                  <div
                    className="text-6xl md:text-7xl font-heading mb-1 font-bold"
                    style={{ color: isSelected ? formula.accent : "#F48C06" }}
                  >
                    {formula.sublabel.split(" ")[0]}
                  </div>

                  <div className="text-xs font-sans uppercase tracking-[0.4em] text-african-ivory mb-3 font-bold">
                    {formula.sublabel.split(" ").slice(1).join(" ")}
                  </div>

                  <div className="h-px bg-african-gold/40 my-4" />

                  <h5
                    className="text-2xl font-heading mb-2 font-bold"
                    style={{ color: isSelected ? formula.accent : "#FFF9F2" }}
                  >
                    {formula.label}
                  </h5>
                  <p className="text-xs font-sans text-african-sand/90 leading-relaxed font-medium">
                    {formula.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ===== 3. BLOC DE COMMANDE DIRECTE WHATSAPP ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-b from-[#5C1B0E] to-[#380E07] border-2 border-african-gold p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] rounded-sm max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6 text-african-gold">
            <ShoppingBag size={30} />
            <h4 className="text-3xl font-heading tracking-wide text-center">Commander mon Pagne</h4>
          </div>

          {/* Résumé de la formule */}
          <div className="bg-[#200A05] border border-african-gold/50 p-5 mb-6 rounded-sm text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-african-copper mb-1 font-sans font-bold">Formule sélectionnée</p>
            <p className="text-2xl font-heading text-african-ivory">
              Formule {selectedFormula.label} — <span className="text-african-gold font-bold">{selectedFormula.sublabel}</span>
            </p>
            <p className="text-xs text-african-sand/80 mt-1 font-sans font-medium">{selectedFormula.description}</p>
          </div>

          {/* Sélecteur de quantité */}
          <div className="mb-8 flex flex-col items-center">
            <label className="block text-african-ivory text-xs font-sans uppercase tracking-[0.25em] mb-3 font-bold">Nombre d&apos;exemplaires</label>
            <div className="flex items-center gap-6 bg-[#200A05] border-2 border-african-gold/60 p-2 rounded-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-african-gold hover:bg-african-gold/20 transition-colors text-3xl font-bold rounded-sm cursor-pointer"
                aria-label="Diminuer la quantité"
              >
                −
              </button>
              <span className="text-3xl font-heading text-african-ivory min-w-[3rem] text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-african-gold hover:bg-african-gold/20 transition-colors text-3xl font-bold rounded-sm cursor-pointer"
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>
          </div>

          {/* Distributrice Officielle */}
          <div className="bg-[#200A05] rounded-sm p-4 mb-8 border border-african-gold/40 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-african-copper font-sans font-bold mb-0.5">Distributrice Officielle</p>
              <p className="text-xl font-heading text-african-ivory font-bold">Leticia Gbah</p>
            </div>
            <p className="font-sans text-base font-bold text-african-gold tracking-widest">+225 07 78 27 06 21</p>
          </div>

          {/* Bouton WhatsApp */}
          <button
            onClick={handleOrder}
            className="w-full relative group block cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200 blur-sm opacity-60 group-hover:opacity-100" />
            
            <div className="relative bg-[#200A05] border-2 border-[#25D366] px-8 py-5 rounded-sm flex items-center justify-center gap-4 text-[#25D366] font-sans font-bold uppercase tracking-[0.2em] text-base group-hover:bg-[#25D366] group-hover:text-[#1A0B08] transition-all duration-300 shadow-2xl">
              <MessageCircle size={24} />
              <span>Passer ma commande sur WhatsApp</span>
            </div>
          </button>
          
          <p className="text-center text-xs text-african-sand/70 mt-4 italic font-sans font-medium">
            Vous serez redirigé vers WhatsApp avec votre commande pré-remplie auprès de Leticia.
          </p>
        </motion.div>
      </div>

      {/* ===== LIGHTBOX / AGRANDISSEMENT PLEIN ÉCRAN IMMÉDIAT SANS SCROLL ===== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 overflow-hidden"
          >
            {/* Bouton Fermer Fixe en haut à droite */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] p-3.5 bg-[#200A05] border-2 border-african-gold text-african-gold hover:bg-african-gold hover:text-[#1A0B08] transition-colors rounded-full shadow-2xl cursor-pointer"
              aria-label="Fermer la vue agrandie"
            >
              <X size={28} />
            </button>

            {/* Container Image Agrandie : 100% VISIBLE DIRECTEMENT DANS LE VIEWPORT SANS AUCUN SCROLL */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[96vw] max-w-5xl h-[88vh] max-h-[88vh] bg-[#200A05] border-2 border-african-gold p-2 shadow-[0_0_100px_rgba(255,183,3,0.4)] rounded-sm flex flex-col items-center justify-center overflow-hidden"
            >
              {/* L'image remplit intelligemment 100% de l'espace disponible */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/pagne-officiel.jpg"
                  alt="Pagne Royal Élisée & Lydia Plein Écran"
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Badge indicatif sous l'image */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-[#200A05]/90 border border-african-gold/60 px-4 py-1.5 rounded-full shadow-2xl">
                <p className="text-[11px] text-african-gold font-sans uppercase tracking-widest font-bold whitespace-nowrap">
                  Pagne Officiel · Élisée & Lydia 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
