"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cadeauxList = [
  { 
    title: "Maison & mobilier", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Électronique & électroménager", 
    image: "/electromenager.jpg" 
  },
  { 
    title: "Don en numéraire", 
    image: "/enveloppe.jpg" 
  },
  { 
    title: "Expériences", 
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80" 
  },
];

export default function Cadeaux() {
  return (
    <section id="cadeaux" className="py-32 px-4 relative bg-transparent">
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6 drop-shadow-md">Les offrandes</h2>
          <h3 className="text-4xl md:text-6xl font-heading text-african-ivory mb-8 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">Voici ce qui nous ferait plaisir</h3>
          
          <div className="max-w-3xl mx-auto bg-[#3E2723]/80 border border-african-gold/50 p-6 rounded-lg shadow-xl relative overflow-hidden">
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-african-gold m-2"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-african-gold m-2"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-african-gold m-2"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-african-gold m-2"></div>
            
            <p className="text-base md:text-lg font-sans text-african-ivory/90 leading-relaxed font-light">
              <span className="text-african-gold font-bold">Important :</span> Pour éviter les doublons de cadeaux, veuillez sélectionner ce que vous comptez offrir lors de votre inscription.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cadeauxList.map((cadeau, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative bg-[#1A0B08] border-2 border-[#3E2723] rounded-sm overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col hover:border-african-gold transition-colors duration-500"
            >
              {/* Image en haut avec texture bois/bronze */}
              <div className="relative w-full h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B08] to-transparent z-10"></div>
                <Image 
                  src={cadeau.image} 
                  alt={cadeau.title} 
                  fill 
                  className="object-cover object-center group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 opacity-60" 
                />
                
                {/* Titre centré sur l'image */}
                <div className="absolute inset-0 z-20 flex items-end justify-center p-6 text-center">
                  <h4 className="text-xl md:text-2xl font-heading text-african-ivory tracking-wide">{cadeau.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#rsvp" 
            className="inline-block text-center px-12 py-5 bg-[#3E2723] border border-african-gold text-african-ivory font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-african-gold hover:text-[#1A0B08] transition-colors duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            Faire une offrande
          </a>
        </div>
      </div>
    </section>
  );
}
