"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function Uniforme() {
  const [quantity, setQuantity] = useState(1);
  const [pagneType, setPagneType] = useState("Complet (3 pagnes)");

  const handleOrder = () => {
    const phoneNumber = "2250778270621"; // Indicatif +225 (Côte d'Ivoire) + numéro
    const message = encodeURIComponent(
      `Bonjour Leticia 👑,\n\nJe suis un invité au mariage d'Élisée & Lydia.\nJ'aimerais passer commande pour le pagne officiel de la cérémonie.\n\n📦 *Commande* : ${quantity}x ${pagneType}\n\nMerci de m'indiquer les modalités de paiement et de récupération. 🙏`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="pagne" className="py-32 px-4 relative flex items-center justify-center min-h-[70vh] overflow-hidden perspective-[1000px] bg-transparent">
      
      {/* Simulation de tissu de pagne flottant */}
      <motion.div 
        animate={{ 
          rotateX: [0, 5, 0, -5, 0], 
          rotateY: [0, -3, 0, 3, 0],
          scale: [1, 1.05, 1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-15 transform-gpu"
        style={{ 
          backgroundImage: "repeating-linear-gradient(45deg, var(--color-luxury-red) 0px, var(--color-luxury-red) 15px, var(--color-luxury-gold) 15px, var(--color-luxury-gold) 30px, var(--color-luxury-green) 30px, var(--color-luxury-green) 45px, var(--color-luxury-orange) 45px, var(--color-luxury-orange) 60px, var(--color-luxury-pink) 60px, var(--color-luxury-pink) 75px, var(--color-luxury-brown) 75px, var(--color-luxury-brown) 90px, var(--color-luxury-blue) 90px, var(--color-luxury-blue) 105px)",
          backgroundSize: "200% 200%",
        }}
      ></motion.div>

      {/* Halo de lumière */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_#0F1C3F_100%)] opacity-80"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-sans uppercase tracking-[0.5em] text-[#C5A059] mb-6">Dress Code</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-[#FFFDF9] mb-8">L'Étoffe Royale</h3>
          <p className="text-lg md:text-2xl font-heading text-[#C5A059] font-light max-w-2xl mx-auto leading-relaxed italic">
            Afin de célébrer ensemble cette journée dans l’unité et la beauté, nous avons choisi un pagne spécial.
          </p>
        </div>

        {/* Le Mini-Shop */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1 }}
          className="bg-[#0F1C3F]/60 backdrop-blur-2xl border border-[#C5A059]/50 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Image du Pagne */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
            {/* Lueur arrière */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7A0A15]/40 to-[#234226]/40 z-0"></div>
            
            <Image 
              src="/pagne.jpg" 
              alt="Pagne Royal" 
              fill 
              className="object-cover object-center opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1C3F] via-transparent to-transparent z-10 md:bg-gradient-to-r md:from-transparent md:to-[#0F1C3F]"></div>
            
            <div className="absolute bottom-6 left-6 z-20">
              <span className="bg-[#C5A059] text-[#0F1C3F] text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                Édition Limitée
              </span>
            </div>
          </div>

          {/* Interface de Commande */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            
            <div className="flex items-center gap-3 mb-6 text-[#C5A059]">
              <ShoppingBag size={24} />
              <h4 className="text-2xl font-heading tracking-wide">Commander votre tissu</h4>
            </div>

            <div className="space-y-8 mb-10">
              {/* Choix du format */}
              <div>
                <label className="block text-[#FFFDF9]/60 text-xs font-sans uppercase tracking-widest mb-3">Format désiré</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {["Complet (3 pagnes)", "Demi (1.5 pagne)"].map((type) => (
                    <button 
                      key={type}
                      onClick={() => setPagneType(type)}
                      className={`flex-1 py-3 px-4 rounded-lg border text-sm font-sans transition-all ${
                        pagneType === type 
                        ? "border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]" 
                        : "border-white/10 text-white/50 hover:border-white/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantité */}
              <div>
                <label className="block text-[#FFFDF9]/60 text-xs font-sans uppercase tracking-widest mb-3">Quantité</label>
                <div className="flex items-center gap-6 bg-white/5 w-fit rounded-full border border-white/10 p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent text-[#C5A059] hover:bg-white/10 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-2xl font-heading text-[#FFFDF9] min-w-[2rem] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent text-[#C5A059] hover:bg-white/10 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Informations Leticia */}
            <div className="bg-black/30 rounded-xl p-4 mb-8 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#FFFDF9]/40 mb-1">Distributrice Officielle</p>
                <p className="text-lg font-heading text-[#FFFDF9]">Leticia Gbah</p>
              </div>
              <p className="font-sans text-sm text-[#C5A059] tracking-widest">07 78 27 06 21</p>
            </div>

            {/* Bouton WhatsApp */}
            <button 
              onClick={handleOrder}
              className="w-full relative group block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200 blur-sm opacity-50 group-hover:opacity-100"></div>
              
              <div className="relative bg-gradient-to-r from-[#1E232A] to-[#0F1C3F] border border-[#25D366]/50 px-8 py-4 rounded-full flex items-center justify-center gap-4 text-[#25D366] font-sans font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors duration-300">
                <MessageCircle size={20} />
                Réserver via WhatsApp
              </div>
            </button>
            
            <p className="text-center text-[10px] text-[#FFFDF9]/40 mt-4 italic">
              Vous serez redirigé vers une conversation pré-remplie avec Leticia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
