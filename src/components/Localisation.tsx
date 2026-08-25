"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Localisation() {
  return (
    <section className="py-32 px-4 relative flex justify-center items-center bg-transparent">
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-[#C5A059] mb-6">Le Lieu</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-[#FFFDF9] mb-16">Localisation</h3>
          
          <div className="relative bg-[#FFFDF9] p-12 md:p-24 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-4 border-[#C5A059] max-w-2xl mx-auto">
            
            {/* Effet Marbre en CSS */}
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.65\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')", mixBlendMode: 'multiply' }}></div>
            
            {/* Décorations Florales aux coins (simulées via CSS) */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#7A0A15] rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#C5A059] rounded-full blur-2xl opacity-60"></div>

            <div className="relative z-10">
              <MapPin size={48} className="mx-auto text-[#C5A059] mb-8" />
              <h4 className="text-4xl md:text-5xl font-heading text-[#0F1C3F] mb-4">Sweetlife Garden</h4>
              <p className="text-xl font-sans text-[#0F1C3F]/70 font-light mb-16 tracking-widest uppercase text-sm">Djorogobité</p>
              
              <a 
                href="https://maps.app.goo.gl/s9V8ekjjEpuWncrs5?g_st=iwb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block relative group"
              >
                {/* Animation parchemin se dépliant (bouton) */}
                <div className="relative bg-[#E8D090] text-[#0F1C3F] px-16 py-6 font-sans text-xs uppercase tracking-[0.4em] font-bold shadow-2xl overflow-hidden origin-center transition-all duration-500 group-hover:scale-105 border-y-4 border-[#8E6F33]">
                  
                  {/* Effet papier plié */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 opacity-50"></div>
                  <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-black/10"></div>
                  <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-black/10"></div>
                  
                  <span className="relative z-10">Ouvrir la Carte</span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
