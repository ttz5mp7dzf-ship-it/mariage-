"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Splash from "@/components/Splash";
import Hero from "@/components/Hero";
import GalerieRoyale from "@/components/GalerieRoyale";
import InvitationOfficielle from "@/components/InvitationOfficielle";
import RsvpMenu from "@/components/RsvpMenu";
import Uniforme from "@/components/Uniforme";
import Cadeaux from "@/components/Cadeaux";
import Localisation from "@/components/Localisation";
import AfricanDivider from "@/components/AfricanDivider";
import RoyalNavbar from "@/components/RoyalNavbar";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <Splash onEnter={() => setShowSplash(false)} />}
      </AnimatePresence>

      <main className="min-h-screen relative font-sans text-african-ivory bg-[#2A1610] overflow-hidden">
        <RoyalNavbar />

        {/* ===== FOND FIXE : Coucher de soleil africain ===== */}
          <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#3E2723] via-[#2A1610] to-[#1A0B08]" />

          {/* Halos de lumière chaude haute performance (compatible 100% Safari & tous navigateurs) */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, rgba(192,74,42,0.4) 0%, rgba(192,74,42,0.1) 40%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-[25%] -right-[10%] w-[70vw] h-[70vw] rounded-full opacity-25"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(184,115,51,0.1) 45%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-[20%] left-[10%] w-[80vw] h-[80vw] rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(205,127,50,0.3) 0%, rgba(62,39,35,0.1) 50%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative z-10 w-full overflow-hidden">
            <Hero isEntered={!showSplash} />

            <AfricanDivider />

            <div className="bg-[#2A1610]/80 backdrop-blur-sm">
              <InvitationOfficielle />

              <AfricanDivider inverted />

              <GalerieRoyale />

              <AfricanDivider />

              <Cadeaux />

              <AfricanDivider inverted />

              <RsvpMenu />

              <AfricanDivider />

              <Uniforme />

              <AfricanDivider inverted />

              <Localisation />

              <footer className="py-24 text-center text-african-ivory relative overflow-hidden">
                {/* Séparateur ornemental final */}
                <div className="flex items-center justify-center gap-3 mb-16 px-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-african-gold/60"></div>
                  <div className="w-4 h-4 bg-african-gold rotate-45 animate-diamond-pulse"></div>
                  <div className="w-2 h-2 bg-african-copper rotate-45"></div>
                  <div className="w-6 h-6 border-2 border-african-gold rotate-45 animate-float-gentle"></div>
                  <div className="w-2 h-2 bg-african-copper rotate-45"></div>
                  <div className="w-4 h-4 bg-african-gold rotate-45 animate-diamond-pulse" style={{ animationDelay: "2s" }}></div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-african-gold/60"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4">
                  <p className="text-2xl md:text-3xl font-heading font-light mb-8 text-african-ivory/90 leading-relaxed">
                    Merci de traverser ce voyage avec nous.<br />
                    Nous avons hâte de célébrer ce moment précieux à vos côtés.
                  </p>
                  <div className="text-4xl md:text-6xl font-heading mt-12 text-african-gold drop-shadow-lg animate-glow-pulse">
                    Élisée & Lydia
                  </div>
                  <p className="mt-6 text-xs font-sans uppercase tracking-[0.5em] text-african-ivory/50">
                    Samedi 10 Octobre 2026 · Sweetlife Garden, Bounoumin
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </main>
    </>
  );
}
