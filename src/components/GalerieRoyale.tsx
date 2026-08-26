"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function GalerieRoyale() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const photos = [
    { src: "/ouverture.jpg", title: "La Royauté", desc: "Vêtus des parures de la cour royale", position: "object-top" },
    { src: "/couple.jpg", title: "L'Alliance Dorée", desc: "Deux âmes unies sous l'or et le pagne", position: "object-center" },
    { src: "/ouverture.jpg", title: "Le Royaume", desc: "Ensemble pour l'éternité", position: "object-center" },
  ];

  return (
    <section id="histoire" className="py-32 px-4 relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Texture de fond : Motifs géométriques subtils */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23CD7F32\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-african-gold/10 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6">Souvenirs Précieux</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory">Galerie Royale</h3>
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
              className="relative w-full max-w-[320px] aspect-[3/4] rounded-t-full border-[6px] border-[#3E2723] p-1 bg-african-bronze/10 backdrop-blur-sm cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              style={{
                boxShadow: hoveredIndex === idx ? `0 20px 40px rgba(192,74,42,0.4)` : '0 10px 20px rgba(0,0,0,0.5)'
              }}
            >
              {/* Ornement bois au sommet */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rotate-45 border-4 border-[#3E2723] bg-african-gold z-20 shadow-md"></div>
              
              <div className="w-full h-full rounded-t-full overflow-hidden relative border-2 border-african-gold/40">
                <Image 
                  src={photo.src} 
                  alt={photo.title} 
                  fill 
                  className={`object-cover ${photo.position} transition-transform duration-[2s] ease-out group-hover:scale-110 sepia-[0.2] group-hover:sepia-0`}
                />
                
                {/* Overlay sombre au hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  className="absolute inset-0 bg-[#2A1610]/80 flex flex-col items-center justify-center p-6 text-center"
                >
                  <Play size={40} className="text-african-gold mb-4 opacity-70" />
                  <h4 className="text-2xl font-heading text-african-gold mb-2">{photo.title}</h4>
                  <p className="text-sm font-sans font-light text-african-ivory/80">{photo.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
