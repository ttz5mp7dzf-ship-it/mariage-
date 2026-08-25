"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InvitationOfficielle() {
  const paperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paperRef.current || !textRef.current) return;
    
    // Le parchemin se déroule
    gsap.fromTo(paperRef.current,
      { height: "20vh" },
      { 
        height: "100%", ease: "none",
        scrollTrigger: { trigger: ".invitation-section", start: "top center", end: "bottom center", scrub: 1 }
      }
    );

    // Le texte apparaît doucement
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 1.5,
        scrollTrigger: { trigger: textRef.current, start: "top 70%" }
      }
    );
  }, []);

  return (
    <section className="invitation-section py-32 px-4 relative flex justify-center items-start min-h-screen overflow-hidden bg-transparent">
      {/* Background motif */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23C5A059\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
      
      {/* Le Rouleau Haut */}
      <div className="absolute top-20 w-full max-w-4xl h-8 bg-gradient-to-b from-[#E8D090] via-[#C5A059] to-[#8E6F33] rounded-full shadow-[0_20px_30px_rgba(0,0,0,0.8)] z-20 flex justify-between items-center px-[-20px]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8D090] to-[#8E6F33] -ml-6 shadow-xl border-2 border-[#fffdf9]/50"></div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8D090] to-[#8E6F33] -mr-6 shadow-xl border-2 border-[#fffdf9]/50"></div>
      </div>

      {/* Le Papier */}
      <div 
        ref={paperRef}
        className="relative z-10 mt-24 max-w-4xl w-full bg-[#FFFDF9] shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        style={{ height: '20vh' }}
      >
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Bordures ornementales latérales */}
        <div className="absolute left-4 top-0 bottom-0 w-1 border-l-2 border-dashed border-luxury-gold/50"></div>
        <div className="absolute right-4 top-0 bottom-0 w-1 border-r-2 border-dashed border-luxury-gold/50"></div>

        <div ref={textRef} className="p-16 md:p-32 text-center">
          <p className="font-heading font-bold text-luxury-red text-2xl md:text-4xl italic mb-12">Chers trésors de nos cœurs,</p>
          
          <div className="space-y-10 text-lg md:text-2xl font-sans font-light text-luxury-blue leading-loose">
            <p>Dieu nous fait la grâce immense de bientôt unir nos vies devant Lui, devant nos parents et devant les hommes.</p>
            
            <p>C’est avec une joie débordante que nous vous convions à fêter cette union sacrée avec nous le <strong className="font-semibold">Samedi 10 octobre à 12h00</strong> à <strong className="font-semibold">Sweetlife Garden, Djorogobité</strong>.</p>
            
            <p>Votre présence sera pour nous un cadeau précieux. Nous vous serons reconnaissants de confirmer votre disponibilité et de choisir votre menu afin que nous puissions vous recevoir avec toute l’attention et l’honneur que vous méritez.</p>
            
            <div className="pt-16 text-center">
              <p className="font-sans text-sm uppercase tracking-[0.4em] text-luxury-gold mb-8">Avec toute notre affection,</p>
              <p className="text-6xl md:text-8xl font-heading text-luxury-blue">Élisée <span className="text-luxury-gold">&</span> Lydia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Le Rouleau Bas */}
      <div className="absolute bottom-20 w-full max-w-4xl h-8 bg-gradient-to-b from-[#E8D090] via-[#C5A059] to-[#8E6F33] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-20 flex justify-between items-center px-[-20px]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8D090] to-[#8E6F33] -ml-6 shadow-xl border-2 border-[#fffdf9]/50"></div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8D090] to-[#8E6F33] -mr-6 shadow-xl border-2 border-[#fffdf9]/50"></div>
      </div>
    </section>
  );
}
