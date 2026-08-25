"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const story = [
  { date: "2018", title: "La Première Rencontre", text: "Un regard échangé au milieu de la foule qui a silencieusement changé le cours de nos vies." },
  { date: "2021", title: "Le Premier Baiser", text: "Sous les étoiles, nos coeurs ont su que cette histoire s'écrirait pour l'éternité." },
  { date: "2024", title: "La Demande", text: "Un 'Oui' retentissant, une promesse solennelle devant Dieu et les hommes." },
  { date: "2026", title: "Le Grand Jour", text: "L'ouverture des portes de notre Cour Royale." },
];

export default function NotreHistoire() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = gsap.utils.toArray(".story-arch");
    
    items.forEach((item: any) => {
      gsap.fromTo(item, 
        { opacity: 0, scale: 0.8, filter: "blur(15px)" },
        { 
          opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power4.out",
          scrollTrigger: { trigger: item, start: "top 80%" }
        }
      );
    });
  }, []);

  return (
    <section className="py-32 px-4 bg-luxury-bg relative" ref={containerRef}>
      <div className="text-center mb-32">
        <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-luxury-gold mb-6">Chapitres d'un amour</h2>
        <h3 className="text-5xl md:text-7xl font-heading text-luxury-blue">Notre Histoire</h3>
      </div>

      <div className="max-w-4xl mx-auto relative flex flex-col items-center">
        {/* Le Chemin Pavé */}
        <div className="absolute top-0 bottom-0 w-24 bg-[url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 0L40 20L20 40L0 20L20 0z\\' fill=\\'%23C5A059\\' fill-opacity=\\'0.1\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')] z-0"></div>

        {story.map((event, idx) => (
          <div key={idx} className={`story-arch relative z-10 flex w-full mb-32 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            
            <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'pr-4 md:pr-12' : 'pl-4 md:pl-12'}`}>
              {/* Arche de verre */}
              <div className="glass-premium p-10 relative overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-[0_0_50px_rgba(197,160,89,0.3)] hover:-translate-y-2" style={{ borderRadius: '50% 50% 10px 10px' }}>
                
                {/* Bloom floral simulé en CSS (halo coloré interne) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-luxury-gold/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 border-t border-luxury-gold rounded-full opacity-50"></div>

                <div className="text-center mt-12 relative z-10">
                  <div className="gold-text font-heading text-5xl mb-4">{event.date}</div>
                  <h4 className="text-2xl font-bold font-sans text-luxury-blue mb-4 uppercase tracking-widest text-sm">{event.title}</h4>
                  <p className="text-luxury-blue/70 font-sans leading-loose text-sm">{event.text}</p>
                </div>
              </div>
            </div>
            
            {/* Point de connexion or */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-luxury-bg border-4 border-luxury-gold rounded-full shadow-[0_0_20px_rgba(197,160,89,0.8)] z-20 flex items-center justify-center">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
