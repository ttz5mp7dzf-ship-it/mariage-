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
      {/* Splash screen de première entrée (Porte Royale) */}
      <AnimatePresence>
        {showSplash && <Splash onEnter={() => setShowSplash(false)} />}
      </AnimatePresence>

      <main className="min-h-screen relative font-sans text-african-ivory bg-[#3B1209] overflow-hidden">
        <RoyalNavbar />

        {/* ===== FOND FIXE : Coucher de soleil aux couleurs du Pagne (Terracotta, Or & Orange Vif) ===== */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#5C1B0E] via-[#4A150B] to-[#2D0A05]" />

        {/* Halos de lumière chaude, festive et solaire inspirés du pagne */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full opacity-50 animate-pulse-slow"
            style={{
              background: "radial-gradient(circle, rgba(234,88,12,0.65) 0%, rgba(249,115,22,0.3) 45%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[25%] -right-[10%] w-[75vw] h-[75vw] rounded-full opacity-45"
            style={{
              background: "radial-gradient(circle, rgba(255,183,3,0.6) 0%, rgba(234,88,12,0.25) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[60%] -left-[15%] w-[60vw] h-[60vw] rounded-full opacity-35"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(234,88,12,0.15) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-[20%] right-[10%] w-[85vw] h-[85vw] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, rgba(92,27,14,0.3) 55%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full overflow-hidden">
          <Hero isEntered={!showSplash} />

          <AfricanDivider />

          <div className="bg-[#4A150B]/85 backdrop-blur-sm">
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
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-african-gold"></div>
                <div className="w-4 h-4 bg-african-gold rotate-45 animate-diamond-pulse"></div>
                <div className="w-2 h-2 bg-african-copper rotate-45"></div>
                <div className="w-6 h-6 border-2 border-african-gold rotate-45 animate-float-gentle"></div>
                <div className="w-2 h-2 bg-african-copper rotate-45"></div>
                <div className="w-4 h-4 bg-african-gold rotate-45 animate-diamond-pulse" style={{ animationDelay: "2s" }}></div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-african-gold"></div>
              </div>

              <div className="relative z-10 max-w-3xl mx-auto px-4">
                <p className="text-2xl md:text-3xl font-heading font-light mb-8 text-african-ivory leading-relaxed drop-shadow">
                  Merci de traverser ce voyage avec nous.<br />
                  Nous avons hâte de célébrer ce moment précieux à vos côtés.
                </p>
                <div className="text-4xl md:text-6xl font-heading mt-12 text-african-gold drop-shadow-lg animate-glow-pulse font-bold">
                  Élisée & Lydia
                </div>
                <p className="mt-6 text-xs font-sans uppercase tracking-[0.5em] text-african-gold font-bold">
                  Samedi 10 Octobre 2026 · Sweetlife Garden, Bonoumin
                </p>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
