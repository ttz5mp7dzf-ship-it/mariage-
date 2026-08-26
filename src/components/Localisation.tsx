"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Localisation() {
  return (
    <section className="py-32 px-4 relative flex justify-center items-center bg-transparent">
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6 drop-shadow-md">Le Lieu</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory mb-16 drop-shadow-lg">Localisation Royale</h3>
          
          <div className="relative bg-[#1A0B08]/90 backdrop-blur-md p-12 md:p-24 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-4 border-african-gold max-w-2xl mx-auto overflow-hidden">
            
            {/* Texture de fond géométrique (Tissu africain) */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 0L40 20L20 40L0 20L20 0z\\' fill=\\'%23CD7F32\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')" }}></div>
            
            {/* Décorations géométriques aux coins */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-african-copper m-4 opacity-70"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-african-copper m-4 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-african-copper m-4 opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-african-copper m-4 opacity-70"></div>

            <div className="relative z-10">
              <div className="mx-auto w-24 h-24 mb-8 bg-african-terra rounded-full flex items-center justify-center border-2 border-african-gold shadow-[0_0_30px_rgba(192,74,42,0.6)]">
                <MapPin size={40} className="text-african-ivory" />
              </div>
              <h4 className="text-4xl md:text-5xl font-heading text-african-gold mb-4 drop-shadow-md">Sweetlife Garden</h4>
              <p className="text-xl font-sans text-african-ivory/80 font-light mb-16 tracking-widest uppercase text-sm">Bounoumin</p>
              
              <a 
                href="https://maps.app.goo.gl/s9V8ekjjEpuWncrs5?g_st=iwb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block relative group"
              >
                {/* Bouton de localisation façon plaque royale */}
                <div className="relative bg-[#3E2723] text-african-gold px-12 py-5 font-sans text-xs uppercase tracking-[0.4em] font-bold shadow-2xl overflow-hidden transition-all duration-500 group-hover:bg-african-gold group-hover:text-[#1A0B08] border border-african-bronze">
                  
                  {/* Effet lumineux */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  
                  <span className="relative z-10 flex items-center gap-4">
                    Ouvrir la Carte
                  </span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
