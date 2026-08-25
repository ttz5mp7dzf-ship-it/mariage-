"use client";

import { useState } from "react";
import Image from "next/image";
import Splash from "@/components/Splash";
import Hero from "@/components/Hero";
import GalerieRoyale from "@/components/GalerieRoyale";
import InvitationOfficielle from "@/components/InvitationOfficielle";
import RsvpMenu from "@/components/RsvpMenu";
import Uniforme from "@/components/Uniforme";
import Cadeaux from "@/components/Cadeaux";
import Localisation from "@/components/Localisation";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <Splash onEnter={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <main className="w-full relative min-h-screen">
          {/* FOND FIXE UNIFIÉ POUR TOUT LE SITE (L'allée royale) */}
          <div className="fixed inset-0 z-[-1] bg-[#0F1C3F]">
            <Image 
              src="/palais.jpg" 
              alt="Jardin Royal" 
              fill 
              className="object-cover object-center opacity-70 mix-blend-screen" 
              priority
            />
            {/* Brume et vignettage constants */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#0F1C3F_100%)]"></div>
            
            {/* LUEURS FLORALES (Couleurs du mariage: Vert, Rouge, Jaune, Bleu, Orange, Marron, Rose) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#7A0A15] rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse-slow"></div>
            <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#D64D8B] rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-[#E86A17] rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-[50%] left-[-20%] w-[40vw] h-[40vw] bg-[#234226] rounded-full mix-blend-screen filter blur-[130px] opacity-40"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] bg-[#F4C430] rounded-full mix-blend-screen filter blur-[150px] opacity-20" style={{ animationDelay: '4s' }}></div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A2E15]/30 to-[#0F1C3F]/90"></div>
          </div>

          <div className="relative z-10 w-full overflow-hidden">
            <Hero />
            
            {/* Transition douce entre Hero et la suite */}
            <div className="w-full h-32 bg-gradient-to-b from-transparent to-[#0F1C3F]/80"></div>
            
            <div className="bg-[#0F1C3F]/80 backdrop-blur-sm">
              <InvitationOfficielle />
              <GalerieRoyale />
              <Cadeaux />
              <RsvpMenu />
              <Uniforme />
              <Localisation />
              
              <footer className="py-24 text-center text-[#FFFDF9] relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                  <p className="text-2xl md:text-3xl font-sans font-light mb-8 italic">
                    Merci de traverser ce voyage avec nous.<br/>
                    Nous avons hâte de célébrer ce moment précieux à vos côtés.
                  </p>
                  <div className="text-4xl md:text-6xl font-heading gold-text mt-12">
                    Élisée & Lydia
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
