"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

  const handleOrder = () => {
    const phoneNumber = "2250778270621";
    const message = encodeURIComponent(
      `Bonjour Leticia 👑,\n\nJe suis un(e) invité(e) au mariage d'Élisée & Lydia.\nJ'aimerais passer commande pour le pagne officiel de la cérémonie.\n\n📦 *Commande* : ${quantity}x Formule ${selectedFormula.label} (${selectedFormula.sublabel})\n\nMerci de m'indiquer les modalités de paiement et de livraison. 🙏`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="pagne" className="py-28 px-4 relative flex items-center justify-center min-h-[70vh] overflow-hidden bg-transparent scroll-mt-20">
      
      {/* Texture de fond imprimé Wax ambré & terracotta */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, var(--color-african-terra) 0px, var(--color-african-terra) 20px, var(--color-african-gold) 20px, var(--color-african-gold) 40px, var(--color-african-copper) 40px, var(--color-african-copper) 60px)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_#351009_90%)] opacity-90 pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-african-gold/15 border border-african-gold/40 text-african-gold text-xs uppercase tracking-[0.25em] font-bold mb-4 shadow-lg">
            <Crown size={14} /> Dress Code & Tenue Officielle
          </div>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory mb-4 drop-shadow-lg">
            Le Pagne Officiel du Mariage
          </h3>
          <p className="text-lg md:text-2xl font-heading text-african-gold font-light max-w-2xl mx-auto leading-relaxed italic">
            Voici l&apos;étoffe royale officielle sélectionnée par Élisée & Lydia pour illuminer la cérémonie.
          </p>
        </div>

        {/* ===== 1. VITRINE DU PAGNE EN PREMIER (GRANDE IMAGE MISE EN AVANT) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-[#4A170E]/90 border-4 border-african-gold p-6 sm:p-10 shadow-[0_30px_90px_rgba(232,93,4,0.3)] rounded-sm relative overflow-hidden"
        >
          {/* Décorations géométriques aux coins */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-african-gold" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-african-gold" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-african-gold" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-african-gold" />

          {/* Banner titre du pagne */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-african-gold/30 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-african-gold animate-pulse" size={20} />
              <span className="text-sm sm:text-base font-heading font-bold text-african-ivory uppercase tracking-[0.2em]">
                Motif Authentique Sélectionné
              </span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="px-4 py-2 bg-african-gold text-[#1A0B08] font-bold text-xs uppercase tracking-widest hover:bg-[#FFE082] transition-colors flex items-center gap-2 shadow-lg cursor-pointer rounded-xs"
            >
              <ZoomIn size={16} />
              <span>Agrandir / Plein écran</span>
            </button>
          </div>

          {/* Cadre photo du pagne officiel (Cliquable pour zoom) */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[500px] bg-[#200A05] border-2 border-african-gold/50 rounded-sm overflow-hidden cursor-pointer group shadow-2xl flex items-center justify-center p-3"
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
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-african-gold font-bold bg-[#200A05]/90 px-4 py-2 rounded-xs border border-african-gold/50 shadow-xl">
                Cliquer pour examiner le motif en haute définition
              </span>
            </div>
          </div>
        </motion.div>

        {/* ===== 2. CHOIX DES FORMULES DE PAGNES ===== */}
        <div className="text-center mb-8">
          <h4 className="text-2xl sm:text-3xl font-heading text-african-gold mb-2">
            Choisissez votre Formule de Pagne
          </h4>
          <p className="text-xs sm:text-sm font-sans text-african-sand/80 uppercase tracking-widest">
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
                    ? "border-african-gold bg-[#4A170E] shadow-[0_0_40px_rgba(255,183,3,0.4)] scale-[1.03]"
                    : "border-african-gold/30 bg-[#250C07]/90 hover:border-african-gold/70 hover:bg-[#351009]"
                }`}
              >
                {/* Check icon si sélectionné */}
                {isSelected && (
                  <>
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-african-gold" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-african-gold" />
                    <CheckCircle className="absolute top-3.5 right-3.5 text-african-gold" size={20} />
                  </>
                )}

                <div className="relative z-10">
                  <div
                    className="text-6xl md:text-7xl font-heading mb-1 font-bold"
                    style={{ color: isSelected ? formula.accent : "#F48C06" }}
                  >
                    {formula.sublabel.split(" ")[0]}
                  </div>

                  <div className="text-xs font-sans uppercase tracking-[0.4em] text-african-ivory/80 mb-3 font-bold">
                    {formula.sublabel.split(" ").slice(1).join(" ")}
                  </div>

                  <div className="h-px bg-african-gold/30 my-4" />

                  <h5
                    className="text-2xl font-heading mb-2 font-bold"
                    style={{ color: isSelected ? formula.accent : "#FFF9F2" }}
                  >
                    {formula.label}
                  </h5>
                  <p className="text-xs font-sans text-african-sand/80 leading-relaxed">
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
          className="bg-[#4A170E]/95 border-2 border-african-gold p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] rounded-sm max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6 text-african-gold">
            <ShoppingBag size={28} />
            <h4 className="text-3xl font-heading tracking-wide text-center">Commander mon Pagne</h4>
          </div>

          {/* Résumé de la formule */}
          <div className="bg-[#200A05] border border-african-gold/40 p-5 mb-6 rounded-sm text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-african-copper mb-1 font-sans font-bold">Formule sélectionnée</p>
            <p className="text-2xl font-heading text-african-ivory">
              Formule {selectedFormula.label} — <span className="text-african-gold font-bold">{selectedFormula.sublabel}</span>
            </p>
            <p className="text-xs text-african-sand/70 mt-1 font-sans">{selectedFormula.description}</p>
          </div>

          {/* Sélecteur de quantité */}
          <div className="mb-8 flex flex-col items-center">
            <label className="block text-african-ivory/80 text-xs font-sans uppercase tracking-[0.25em] mb-3 font-bold">Nombre d&apos;exemplaires</label>
            <div className="flex items-center gap-6 bg-[#200A05] border-2 border-african-gold/50 p-2 rounded-sm">
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
          <div className="bg-[#200A05] rounded-sm p-4 mb-8 border border-african-gold/30 flex flex-wrap items-center justify-between gap-2">
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
          
          <p className="text-center text-xs text-african-sand/60 mt-4 italic font-sans">
            Vous serez redirigé vers WhatsApp avec votre commande pré-remplie auprès de Leticia.
          </p>
        </motion.div>
      </div>

      {/* ===== LIGHTBOX / VUE AGRANDIE EN PLEIN ÉCRAN ===== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Bouton Fermer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 p-3.5 bg-[#200A05] border-2 border-african-gold text-african-gold hover:bg-african-gold hover:text-[#1A0B08] transition-colors rounded-full shadow-2xl cursor-pointer"
              aria-label="Fermer"
            >
              <X size={28} />
            </button>

            {/* Titre Lightbox */}
            <div className="mb-4 text-center z-10">
              <span className="text-xs uppercase tracking-[0.4em] text-african-copper font-sans font-bold">Étoffes Royales</span>
              <h4 className="text-2xl sm:text-4xl font-heading text-african-ivory mt-1">Pagne Officiel du Mariage</h4>
            </div>

            {/* Image Agrandie */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[75vh] aspect-[4/3] sm:aspect-[16/10] bg-[#200A05] border-2 border-african-gold p-3 shadow-[0_0_90px_rgba(255,183,3,0.3)] rounded-sm"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/pagne-officiel.jpg"
                  alt="Pagne Royal Élisée & Lydia Agrandissement"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Légende bas de lightbox */}
            <div className="mt-4 text-center z-10 flex items-center gap-4">
              <p className="text-xs text-african-sand/80 font-sans tracking-widest uppercase font-bold">
                Pagne officiel de la cour royale d&apos;Élisée & Lydia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
