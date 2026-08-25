"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function GalerieRoyale() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const photos = [
    { src: "/couple.jpg", title: "L'Étincelle", desc: "Le commencement de notre éternité" },
    { src: "/palais.jpg", title: "La Promesse", desc: "Un oui murmuré dans le vent" },
    { src: "/couple.jpg", title: "Le Couronnement", desc: "Notre marche vers l'autel" },
  ];

  return (
    <section id="histoire" className="py-32 px-4 relative overflow-hidden bg-transparent">
      {/* Texture de fond */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23C5A059\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M0 40L40 0H20L0 20M40 40V20L20 40\\'/ %3E%3C/g%3E%3C/svg%3E')" }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-luxury-gold mb-6">Souvenirs Précieux</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-luxury-bg">Galerie Royale</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {photos.map((photo, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1 }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative w-full max-w-[320px] aspect-[3/4] rounded-t-full border border-luxury-gold/40 p-4 bg-white/5 backdrop-blur-sm cursor-pointer group"
              style={{
                boxShadow: hoveredIndex === idx ? `0 20px 40px ${['#7A0A15', '#234226', '#E86A17', '#D64D8B', '#F4C430'][idx % 5]}40` : '0 10px 20px rgba(0,0,0,0.1)'
              }}
            >
              <div className="w-full h-full rounded-t-full overflow-hidden relative border border-luxury-gold/20">
                <Image 
                  src={photo.src} 
                  alt={photo.title} 
                  fill 
                  className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-110" 
                />
                
                {/* Overlay sombre au hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  className="absolute inset-0 bg-luxury-blue/60 flex flex-col items-center justify-center p-6 text-center"
                >
                  <Play size={40} className="text-luxury-gold mb-4 opacity-50" />
                  <h4 className="text-2xl font-heading text-luxury-gold mb-2">{photo.title}</h4>
                  <p className="text-sm font-sans font-light text-luxury-bg/80">{photo.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
