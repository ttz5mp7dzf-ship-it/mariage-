"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ShoppingBag, CheckCircle } from "lucide-react";
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

  const handleOrder = () => {
    const phoneNumber = "2250778270621";
    const message = encodeURIComponent(
      `Bonjour Leticia 👑,\n\nJe suis un invité au mariage d'Élisée & Lydia.\nJ'aimerais passer commande pour le pagne officiel de la cérémonie.\n\n📦 *Commande* : ${quantity}x ${selectedFormula.label} — ${selectedFormula.sublabel}\n\nMerci de m'indiquer les modalités de paiement et de récupération. 🙏`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="pagne" className="py-32 px-4 relative flex items-center justify-center min-h-[70vh] overflow-hidden perspective-[1000px] bg-transparent">
      
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

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-sans uppercase tracking-[0.5em] text-african-copper mb-6">Dress Code</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory mb-8">L'Étoffe Royale</h3>
          <p className="text-lg md:text-2xl font-heading text-african-gold font-light max-w-2xl mx-auto leading-relaxed italic">
            Afin de célébrer ensemble cette journée dans l'unité et la beauté, nous avons choisi un pagne spécial.
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
                className={`relative p-8 text-center border-2 transition-all duration-500 group overflow-hidden ${
                  isSelected
                    ? "border-african-gold bg-[#3E2723]/90 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                    : "border-african-bronze/30 bg-[#1A0B08]/80 hover:border-african-bronze"
                }`}
              >
                {/* Motif de fond du bouton */}
                <div
                  className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${isSelected ? "opacity-20" : ""}`}
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width%3D%2240%22 height%3D%2240%22 viewBox%3D%220 0 40 40%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M20 0L40 20L20 40L0 20L20 0ZM20 8L8 20L20 32L32 20L20 8Z%22 fill%3D%22%23CD7F32%22%2F%3E%3C%2Fsvg%3E')",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Ornements aux coins si sélectionné */}
                {isSelected && (
                  <>
                    <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-african-gold" />
                    <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-african-gold" />
                    <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-african-gold" />
                    <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-african-gold" />
                    <CheckCircle className="absolute top-3 right-3 text-african-gold" size={16} />
                  </>
                )}

                <div className="relative z-10">
                  {/* Numéro de pagnes (gros) */}
                  <div
                    className="text-6xl md:text-7xl font-heading mb-1 transition-colors duration-300"
                    style={{ color: isSelected ? formula.accent : "#B87333" }}
                  >
                    {formula.sublabel.split(" ")[0]}
                  </div>

                  <div className="text-[10px] font-sans uppercase tracking-[0.4em] text-african-ivory/60 mb-3">
                    {formula.sublabel.split(" ").slice(1).join(" ")}
                  </div>

                  <div className="h-px bg-african-gold/30 my-3" />

                  <h4
                    className="text-xl font-heading mb-2 transition-colors duration-300"
                    style={{ color: isSelected ? formula.accent : "#FDFBF7" }}
                  >
                    {formula.label}
                  </h4>
                  <p className="text-xs font-sans text-african-ivory/60 leading-relaxed">
                    {formula.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bloc Image + Commande */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-[#3E2723]/80 backdrop-blur-2xl border border-african-gold/50 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row relative"
        >
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-african-gold opacity-50 m-4" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-african-gold opacity-50 m-4" />

          {/* Image du Pagne */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-african-terra/40 to-african-bronze/40 z-0" />
            <Image src="/pagne.jpg" alt="Pagne Royal" fill className="object-cover object-center opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1610] via-transparent to-transparent z-10 md:bg-gradient-to-r md:from-transparent md:to-[#3E2723]/90" />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="bg-african-gold text-[#2A1610] text-xs font-bold uppercase tracking-widest px-4 py-1 shadow-lg border border-african-copper">
                Édition Limitée
              </span>
            </div>
          </div>

          {/* Interface de Commande */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-20">
            <div className="flex items-center gap-3 mb-6 text-african-gold">
              <ShoppingBag size={24} />
              <h4 className="text-2xl font-heading tracking-wide">Commander votre tissu</h4>
            </div>

            {/* Résumé de la sélection */}
            <div className="bg-[#1A0B08]/60 border border-african-gold/30 p-4 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-african-copper mb-1">Votre sélection</p>
              <p className="text-xl font-heading text-african-ivory">
                {selectedFormula.label} — <span className="text-african-gold">{selectedFormula.sublabel}</span>
              </p>
              <p className="text-xs text-african-ivory/60 mt-1">{selectedFormula.description}</p>
            </div>

            {/* Quantité */}
            <div className="mb-10">
              <label className="block text-african-ivory/60 text-xs font-sans uppercase tracking-widest mb-3">Quantité</label>
              <div className="flex items-center gap-6 bg-[#1A0B08] w-fit border border-african-gold/30 p-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-african-gold hover:bg-african-gold/20 transition-colors text-2xl font-bold">−</button>
                <span className="text-2xl font-heading text-african-ivory min-w-[2rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-african-gold hover:bg-african-gold/20 transition-colors text-2xl font-bold">+</button>
              </div>
            </div>

            {/* Informations Leticia */}
            <div className="bg-[#1A0B08]/50 rounded-sm p-4 mb-8 border border-african-bronze/30 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-african-ivory/50 mb-1">Distributrice Officielle</p>
                <p className="text-lg font-heading text-african-ivory">Leticia Gbah</p>
              </div>
              <p className="font-sans text-sm text-african-gold tracking-widest">07 78 27 06 21</p>
            </div>

            {/* Bouton WhatsApp */}
            <button 
              onClick={handleOrder}
              className="w-full relative group block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200 blur-sm opacity-50 group-hover:opacity-100"></div>
              
              <div className="relative bg-[#2A1610] border border-[#25D366]/50 px-8 py-4 rounded-sm flex items-center justify-center gap-4 text-[#25D366] font-sans font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors duration-300">
                <MessageCircle size={20} />
                Réserver via WhatsApp
              </div>
            </button>
            
            <p className="text-center text-[10px] text-african-ivory/40 mt-4 italic">
              Vous serez redirigé vers une conversation pré-remplie avec Leticia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
