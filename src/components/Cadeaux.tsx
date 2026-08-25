"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cadeauxList = [
  { 
    title: "Mobilier", 
    desc: "Pour aménager et embellir notre futur foyer avec amour et confort.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Électroménager", 
    desc: "Pour équiper notre maison et faciliter notre quotidien à deux.",
    image: "/electromenager.jpg" 
  },
  { 
    title: "Décoration", 
    desc: "Pour créer une ambiance chaleureuse, élégante et qui nous ressemble.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Enveloppe", 
    desc: "Une participation libre pour nous aider à bâtir nos projets d'avenir.",
    image: "/enveloppe.jpg" 
  },
  { 
    title: "Voyage", 
    desc: "Pour nous offrir des souvenirs inoubliables lors de notre lune de miel.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Expériences", 
    desc: "Des moments de complicité, dîners ou spas pour célébrer notre amour.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80" 
  },
];

export default function Cadeaux() {
  return (
    <section id="cadeaux" className="py-32 px-4 relative bg-transparent">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-[#C5A059] mb-6 drop-shadow-md">Participer à notre joie</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-[#FFFDF9] mb-8 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">Liste de Cadeaux</h3>
          <p className="text-lg md:text-2xl font-heading text-[#C5A059] font-light max-w-3xl mx-auto leading-relaxed italic">
            Votre présence est notre plus beau cadeau. Toutefois, si vous souhaitez marquer l'événement, voici ce qui nous tient à cœur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {cadeauxList.map((cadeau, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative bg-[#0F1C3F]/60 backdrop-blur-xl border border-[#C5A059]/30 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col hover:border-[#C5A059] transition-colors duration-500"
            >
              {/* Image en haut */}
              <div className="relative w-full h-64 overflow-hidden">
                <div className="absolute inset-0 bg-[#0F1C3F]/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <Image 
                  src={cadeau.image} 
                  alt={cadeau.title} 
                  fill 
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                />
              </div>

              {/* Contenu en bas */}
              <div className="p-8 flex flex-col flex-grow relative z-20">
                <h4 className="text-2xl font-heading text-[#FFFDF9] mb-4">{cadeau.title}</h4>
                <p className="text-sm font-sans text-[#FFFDF9]/70 leading-relaxed mb-8 flex-grow">
                  {cadeau.desc}
                </p>
                
                <a 
                  href="#rsvp" 
                  className="inline-block text-center w-full py-4 rounded-full border border-[#C5A059] text-[#C5A059] font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] hover:text-[#0F1C3F] transition-colors duration-300"
                >
                  Choisir ce don
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
