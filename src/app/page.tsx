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
        <main className="min-h-screen relative font-sans text-african-ivory bg-[#2A1610] overflow-hidden">
          {/* Texture de fond : Terre/Bois subtil avec effet coucher de soleil */}
          <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#3E2723] via-[#2A1610] to-[#1A0B08]" />
          
          {/* Poussière lumineuse / Lumière chaude du coucher de soleil */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-african-copper/10 blur-[120px] mix-blend-screen" />
            <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-african-terra/10 blur-[150px] mix-blend-screen" />
            <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-african-gold/10 blur-[130px] mix-blend-screen" />
            
            {/* Subtil motif géométrique africain en overlay (SVG pattern) */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23CD7F32\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg\\'%3E')" }} />
          </div>

          <div className="relative z-10 w-full overflow-hidden">
            <Hero />
            
            {/* Transition douce entre Hero et la suite */}
            <div className="w-full h-32 bg-gradient-to-b from-transparent to-[#2A1610]/80"></div>
            
            <div className="bg-[#2A1610]/80 backdrop-blur-sm">
              <InvitationOfficielle />
              <GalerieRoyale />
              <Cadeaux />
              <RsvpMenu />
              <Uniforme />
              <Localisation />
              
              <footer className="py-24 text-center text-african-ivory relative overflow-hidden">
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
