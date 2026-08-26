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
    <section className="py-32 px-4 bg-[#1A0B08] relative" ref={containerRef}>
      {/* Background motif tribal subtil */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23CD7F32\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>

      <div className="text-center mb-32 relative z-10">
        <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6 drop-shadow-md">Les Mémoires du Royaume</h2>
        <h3 className="text-5xl md:text-7xl font-heading text-african-ivory drop-shadow-xl">Notre Histoire</h3>
      </div>

      <div className="max-w-4xl mx-auto relative flex flex-col items-center">
        {/* Le Chemin Royal (Ligne centrale en pointillés dorés) */}
        <div className="absolute top-0 bottom-0 w-0.5 border-l-4 border-dotted border-african-gold/50 z-0"></div>

        {story.map((event, idx) => (
          <div key={idx} className={`story-arch relative z-10 flex w-full mb-32 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            
            <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'pr-4 md:pr-12' : 'pl-4 md:pl-12'}`}>
              {/* Carte sculptée (Style bois et tissu) */}
              <div className="bg-[#3E2723] p-10 relative overflow-hidden shadow-2xl transition-transform duration-700 hover:shadow-[0_0_50px_rgba(192,74,42,0.6)] hover:-translate-y-2 border border-african-bronze/50 group" style={{ borderRadius: '4px' }}>
                
                {/* Cadre tribal intérieur */}
                <div className="absolute inset-2 border border-african-gold/30"></div>
                {/* Petits losanges aux coins */}
                <div className="absolute top-0 left-0 w-4 h-4 bg-african-gold rotate-45 -translate-x-2 -translate-y-2 opacity-50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-african-gold rotate-45 translate-x-2 -translate-y-2 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-african-gold rotate-45 -translate-x-2 translate-y-2 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-african-gold rotate-45 translate-x-2 translate-y-2 opacity-50"></div>

                {/* Lumière animée au survol */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-african-terra/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="text-center relative z-10">
                  <div className="text-african-gold font-heading text-5xl mb-4 opacity-90 drop-shadow-md">{event.date}</div>
                  <div className="w-16 h-px bg-african-copper mx-auto mb-4"></div>
                  <h4 className="text-lg font-bold font-sans text-african-ivory mb-4 uppercase tracking-[0.2em]">{event.title}</h4>
                  <p className="text-african-ivory/80 font-sans leading-loose text-sm font-light">{event.text}</p>
                </div>
              </div>
            </div>
            
            {/* Point de connexion (Sceau tribal) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A0B08] border-2 border-african-gold rotate-45 shadow-[0_0_20px_rgba(212,175,55,0.8)] z-20 flex items-center justify-center">
              <div className="w-3 h-3 bg-african-copper rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
