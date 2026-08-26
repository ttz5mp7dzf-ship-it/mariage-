"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { MessageCircle, ShoppingBag, CheckCircle, ZoomIn, X, Upload, RotateCcw, Sparkles } from "lucide-react";
import Image from "next/image";

const PAGNE_FORMULAS = [
  {
    id: "complet",
    label: "COMPLET",
    sublabel: "3 Pagnes",
    description: "La tenue complète officielle de la cérémonie royale.",
    accent: "#D4AF37",
  },
  {
    id: "deux",
    label: "DEMI",
    sublabel: "2 Pagnes",
    description: "Une présence cérémonielle élégante.",
    accent: "#CD7F32",
  },
  {
    id: "un",
    label: "ESSENTIEL",
    sublabel: "1 Pagne",
    description: "L'ornement de base, le symbole de l'union.",
    accent: "#B87333",
  },
];

export default function Uniforme() {
  const [quantity, setQuantity] = useState(1);
  const [selectedFormula, setSelectedFormula] = useState(PAGNE_FORMULAS[0]);
  const [pagneImageSrc, setPagneImageSrc] = useState("/pagne.jpg");
  const [isCustomImage, setIsCustomImage] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOrder = () => {
    const phoneNumber = "2250778270621";
    const message = encodeURIComponent(
      `Bonjour Leticia 👑,\n\nJe suis un invité au mariage d'Élisée & Lydia.\nJ'aimerais passer commande pour le pagne officiel de la cérémonie.\n\n📦 *Commande* : ${quantity}x ${selectedFormula.label} — ${selectedFormula.sublabel}\n\nMerci de m'indiquer les modalités de paiement et de récupération. 🙏`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPagneImageSrc(event.target.result as string);
          setIsCustomImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setPagneImageSrc("/pagne.jpg");
    setIsCustomImage(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="pagne" className="py-32 px-4 relative flex items-center justify-center min-h-[70vh] overflow-hidden perspective-[1000px] bg-transparent scroll-mt-20">
      
      {/* Tissu de pagne ondulant en fond */}
      <motion.div
        animate={{ rotateX: [0, 5, 0, -5, 0], rotateY: [0, -3, 0, 3, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-20 transform-gpu animate-fabric-wave"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, var(--color-african-terra) 0px, var(--color-african-terra) 15px, var(--color-african-gold) 15px, var(--color-african-gold) 30px, var(--color-african-bronze) 30px, var(--color-african-bronze) 45px, var(--color-african-copper) 45px, var(--color-african-copper) 60px, var(--color-african-brown) 60px, var(--color-african-brown) 75px)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_#2A1610_100%)] opacity-90" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-sans uppercase tracking-[0.5em] text-african-copper mb-6 drop-shadow-md">Dress Code & Tenue Officielle</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory mb-8 drop-shadow-lg">L'Étoffe Royale</h3>
          <p className="text-lg md:text-2xl font-heading text-african-gold font-light max-w-2xl mx-auto leading-relaxed italic">
            Afin de célébrer ensemble cette journée dans l'unité et la splendeur de notre culture, découvrez le pagne officiel de notre union.
          </p>
        </div>

        {/* ===== 3 FORMULES DE PAGNES ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PAGNE_FORMULAS.map((formula, idx) => {
            const isSelected = selectedFormula.id === formula.id;
            return (
              <motion.button
                key={formula.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                onClick={() => setSelectedFormula(formula)}
                className={`relative p-8 text-center border-2 transition-all duration-500 group overflow-hidden cursor-pointer ${
                  isSelected
                    ? "border-african-gold bg-[#3E2723]/95 shadow-[0_0_35px_rgba(212,175,55,0.35)] scale-[1.02]"
                    : "border-african-bronze/30 bg-[#1A0B08]/85 hover:border-african-bronze hover:bg-[#2A1610]"
                }`}
              >
                {/* Motif de fond */}
                <div
                  className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${isSelected ? "opacity-25" : ""}`}
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width%3D%2240%22 height%3D%2240%22 viewBox%3D%220 0 40 40%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M20 0L40 20L20 40L0 20L20 0ZM20 8L8 20L20 32L32 20L20 8Z%22 fill%3D%22%23CD7F32%22%2F%3E%3C%2Fsvg%3E')",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Ornements aux coins */}
                {isSelected && (
                  <>
                    <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-african-gold" />
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-african-gold" />
                    <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-african-gold" />
                    <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-african-gold" />
                    <CheckCircle className="absolute top-3.5 right-3.5 text-african-gold" size={18} />
                  </>
                )}

                <div className="relative z-10">
                  <div
                    className="text-6xl md:text-7xl font-heading mb-1 transition-colors duration-300 font-bold"
                    style={{ color: isSelected ? formula.accent : "#B87333" }}
                  >
                    {formula.sublabel.split(" ")[0]}
                  </div>

                  <div className="text-[10px] font-sans uppercase tracking-[0.4em] text-african-ivory/70 mb-3">
                    {formula.sublabel.split(" ").slice(1).join(" ")}
                  </div>

                  <div className="h-px bg-african-gold/30 my-3" />

                  <h4
                    className="text-xl font-heading mb-2 transition-colors duration-300"
                    style={{ color: isSelected ? formula.accent : "#FDFBF7" }}
                  >
                    {formula.label}
                  </h4>
                  <p className="text-xs font-sans text-african-ivory/70 leading-relaxed">
                    {formula.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ===== CONTENEUR DU PAGNE & COMMANDE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-[#3E2723]/90 backdrop-blur-2xl border-2 border-african-gold shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col lg:flex-row relative"
        >
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-african-gold opacity-50 m-4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-african-gold opacity-50 m-4 pointer-events-none" />

          {/* ===== SECTION APERÇU COMPLET DU PAGNE (OBJECT-CONTAIN & SANS RECADRAGE) ===== */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col items-center justify-center bg-[#1A0B08]/90 border-b lg:border-b-0 lg:border-r border-african-gold/30 relative">
            
            {/* Badge Titre */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="bg-african-gold text-[#1A0B08] text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm shadow-md flex items-center gap-1.5">
                <Sparkles size={12} /> Motif Officiel du Mariage
              </span>
              {isCustomImage && (
                <button
                  onClick={resetImage}
                  className="text-xs text-african-copper hover:text-african-gold flex items-center gap-1 uppercase tracking-wider transition-colors"
                  title="Revenir au pagne officiel"
                >
                  <RotateCcw size={13} /> Réinitialiser
                </button>
              )}
            </div>

            {/* Conteneur d'image entier sans coupure */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[380px] bg-[#2A1610] rounded-sm border-2 border-african-gold/40 overflow-hidden cursor-pointer group shadow-2xl flex items-center justify-center p-3"
            >
              {/* Texture de fond */}
              <div className="absolute inset-0 bg-gradient-to-br from-african-terra/20 to-black/60 pointer-events-none" />

              {/* L'image du pagne en object-contain : TOUT LE MOTIF EST VISIBLE */}
              <div className="relative w-full h-full">
                <Image
                  src={pagneImageSrc}
                  alt="Pagne Royal Élisée & Lydia"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Overlay Loupe au survol */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-african-gold text-[#1A0B08] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn size={24} />
                </div>
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-african-gold font-bold bg-[#1A0B08]/80 px-3 py-1 rounded-sm border border-african-gold/40">
                  Cliquer pour agrandir
                </span>
              </div>
            </div>

            {/* Options d'Upload personnalisée */}
            <div className="w-full mt-4 flex items-center justify-between gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="pagne-upload-input"
              />
              <label
                htmlFor="pagne-upload-input"
                className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2 px-3 border border-african-bronze/40 hover:border-african-gold bg-[#3E2723]/60 hover:bg-[#3E2723] text-african-gold/80 hover:text-african-gold text-xs uppercase tracking-widest transition-all rounded-sm text-center"
              >
                <Upload size={14} />
                <span>{isCustomImage ? "Changer votre photo" : "Ajouter votre photo de pagne"}</span>
              </label>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="px-4 py-2 bg-african-gold/15 border border-african-gold/40 text-african-gold hover:bg-african-gold hover:text-[#1A0B08] text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 rounded-sm"
              >
                <ZoomIn size={14} />
                <span>Plein écran</span>
              </button>
            </div>
          </div>

          {/* ===== SECTION COMMANDE ===== */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center relative z-20">
            <div className="flex items-center gap-3 mb-6 text-african-gold">
              <ShoppingBag size={26} />
              <h4 className="text-2xl sm:text-3xl font-heading tracking-wide">Commander votre pagne</h4>
            </div>

            {/* Résumé de la formule */}
            <div className="bg-[#1A0B08]/80 border border-african-gold/40 p-5 mb-6 rounded-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-african-copper mb-1 font-sans">Formule choisie</p>
              <p className="text-2xl font-heading text-african-ivory">
                {selectedFormula.label} — <span className="text-african-gold font-bold">{selectedFormula.sublabel}</span>
              </p>
              <p className="text-xs text-african-ivory/70 mt-1 font-sans">{selectedFormula.description}</p>
            </div>

            {/* Sélecteur de quantité */}
            <div className="mb-8">
              <label className="block text-african-ivory/70 text-xs font-sans uppercase tracking-[0.25em] mb-3">Nombre d'exemplaires</label>
              <div className="flex items-center gap-6 bg-[#1A0B08] w-fit border border-african-gold/40 p-2 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-african-gold hover:bg-african-gold/20 transition-colors text-2xl font-bold rounded-sm"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="text-2xl font-heading text-african-ivory min-w-[2.5rem] text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-african-gold hover:bg-african-gold/20 transition-colors text-2xl font-bold rounded-sm"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>

            {/* Distributrice Officielle */}
            <div className="bg-[#1A0B08]/60 rounded-sm p-4 mb-8 border border-african-bronze/40 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-african-copper font-sans mb-0.5">Distributrice Officielle</p>
                <p className="text-lg font-heading text-african-ivory font-bold">Leticia Gbah</p>
              </div>
              <p className="font-sans text-sm font-bold text-african-gold tracking-widest">+225 07 78 27 06 21</p>
            </div>

            {/* Bouton WhatsApp */}
            <button
              onClick={handleOrder}
              className="w-full relative group block cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200 blur-sm opacity-50 group-hover:opacity-100" />
              
              <div className="relative bg-[#1A0B08] border-2 border-[#25D366] px-8 py-4 rounded-sm flex items-center justify-center gap-4 text-[#25D366] font-sans font-bold uppercase tracking-[0.2em] text-sm group-hover:bg-[#25D366] group-hover:text-[#1A0B08] transition-all duration-300 shadow-xl">
                <MessageCircle size={22} />
                <span>Commander via WhatsApp</span>
              </div>
            </button>
            
            <p className="text-center text-[11px] text-african-ivory/50 mt-4 italic font-sans">
              Vous serez dirigé vers WhatsApp avec votre commande pré-remplie auprès de Leticia.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ===== LIGHTBOX / VUE AGRANDIE DU PAGNE (PLEIN ÉCRAN RESPONSIVE) ===== */}
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
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 p-3 bg-[#1A0B08] border-2 border-african-gold text-african-gold hover:bg-african-gold hover:text-[#1A0B08] transition-colors rounded-full shadow-2xl cursor-pointer"
              aria-label="Fermer la vue agrandie"
            >
              <X size={28} />
            </button>

            {/* Titre Lightbox */}
            <div className="mb-4 text-center z-10">
              <span className="text-xs uppercase tracking-[0.4em] text-african-copper font-sans">Étoffes Royales</span>
              <h4 className="text-2xl sm:text-3xl font-heading text-african-ivory mt-1">Motif du Pagne de Mariage</h4>
            </div>

            {/* Image Agrandie en object-contain sans recadrage */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[75vh] aspect-[4/3] sm:aspect-[16/10] bg-[#1A0B08] border-2 border-african-gold p-2 sm:p-4 shadow-[0_0_80px_rgba(212,175,55,0.2)] rounded-sm"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={pagneImageSrc}
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
              <p className="text-xs text-african-sand/70 font-sans tracking-widest uppercase">
                {isCustomImage ? "Motif personnalisé chargé" : "Pagne authentique de la cour royale"}
              </p>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-xs text-african-gold underline uppercase tracking-wider hover:text-white transition-colors"
              >
                Fermer (Échap)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
