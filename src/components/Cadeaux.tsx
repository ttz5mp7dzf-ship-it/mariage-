"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gift, Home, Wallet, Plane } from "lucide-react";

const cadeauxList = [
  { 
    title: "Mobilier",
    icon: Home,
    desc: "Pour construire notre cocon royal.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Électroménager",
    icon: Gift,
    desc: "L'équipement pour notre quotidien.",
    image: "/electromenager.jpg" 
  },
  { 
    title: "Expériences",
    icon: Plane,
    desc: "Des souvenirs inoubliables.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Don numéraire",
    icon: Wallet,
    desc: "Une participation libre.",
    image: "/enveloppe.jpg" 
  },
];

export default function Cadeaux() {
  return (
    <section id="cadeaux" className="py-32 px-4 relative bg-transparent scroll-mt-20">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6 drop-shadow-md">Les offrandes</h2>
          <h3 className="text-4xl md:text-6xl font-heading text-african-ivory mb-8 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">Voici ce qui nous ferait plaisir</h3>
          
          <div className="max-w-3xl mx-auto bg-[#3E2723]/80 border-2 border-african-gold p-6 shadow-xl relative overflow-hidden">
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-african-gold m-2"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-african-gold m-2"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-african-gold m-2"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-african-gold m-2"></div>
            
            <p className="text-base md:text-lg font-sans text-african-ivory/90 leading-relaxed font-light">
              <span className="text-african-gold font-bold">Important :</span> Pour éviter les doublons de cadeaux, veuillez sélectionner ce que vous comptez offrir lors de votre inscription.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cadeauxList.map((cadeau, idx) => {
            const Icon = cadeau.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group relative bg-[#1A0B08] p-2 flex flex-col hover:-translate-y-2 transition-transform duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Bordure tribale complexe */}
                <div className="absolute inset-0 border border-african-bronze m-2 opacity-50 z-0"></div>
                <div className="absolute inset-0 border-2 border-dashed border-african-gold/30 m-4 opacity-50 z-0 group-hover:border-african-gold transition-colors"></div>
                
                {/* Motif losange/cercle tribal SVG (Bordure décorative en haut) */}
                <div className="absolute top-0 inset-x-0 h-4 bg-repeat-x opacity-40 group-hover:opacity-100 transition-opacity z-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'10\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpolygon points=\\'5,0 10,5 5,10 0,5\\' fill=\\'%23CD7F32\\'/%3E%3Ccircle cx=\\'20\\' cy=\\'5\\' r=\\'4\\' fill=\\'none\\' stroke=\\'%23D4AF37\\' stroke-width=\\'1\\'/%3E%3Cpolygon points=\\'30,0 35,5 30,10 25,5\\' fill=\\'%23CD7F32\\'/%3E%3C/svg%3E')" }}></div>

                <div className="relative w-full h-48 overflow-hidden z-10 border-b-2 border-african-gold/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B08] via-transparent to-[#1A0B08]/40 z-10"></div>
                  <Image 
                    src={cadeau.image} 
                    alt={cadeau.title} 
                    fill 
                    className="object-cover object-center group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 opacity-60 mix-blend-luminosity sepia-[0.3]" 
                  />
                  <div className="absolute top-4 left-4 z-20 bg-[#1A0B08] p-3 border border-african-gold/50 shadow-lg">
                    <Icon className="text-african-gold" size={24} />
                  </div>
                </div>

                <div className="relative z-10 p-6 flex flex-col flex-grow text-center items-center justify-center bg-[#1A0B08]/90 backdrop-blur-md">
                  <h4 className="text-xl font-heading text-african-ivory tracking-wide mb-2">{cadeau.title}</h4>
                  <p className="text-xs font-sans text-african-ivory/60 mb-6 italic">{cadeau.desc}</p>
                  
                  <a href="#rsvp" className="mt-auto px-6 py-3 w-full border border-african-bronze text-african-gold text-xs uppercase tracking-widest font-bold group-hover:bg-african-gold group-hover:text-[#1A0B08] transition-colors duration-300">
                    Offrir ce cadeau
                  </a>
                </div>

                {/* Motif losange/cercle tribal SVG (Bordure décorative en bas) */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-repeat-x opacity-40 group-hover:opacity-100 transition-opacity z-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'10\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpolygon points=\\'5,0 10,5 5,10 0,5\\' fill=\\'%23CD7F32\\'/%3E%3Ccircle cx=\\'20\\' cy=\\'5\\' r=\\'4\\' fill=\\'none\\' stroke=\\'%23D4AF37\\' stroke-width=\\'1\\'/%3E%3Cpolygon points=\\'30,0 35,5 30,10 25,5\\' fill=\\'%23CD7F32\\'/%3E%3C/svg%3E')" }}></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
