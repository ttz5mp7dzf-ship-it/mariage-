"use client";

import { useState } from "react";
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
      {showSplash && <Splash onEnter={() => setShowSplash(false)} />}

      {!showSplash && (
        <main className="min-h-screen relative font-sans text-african-ivory bg-[#2A1610] overflow-hidden">
          <RoyalNavbar />

          {/* ===== FOND FIXE : Coucher de soleil africain ===== */}
          <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#3E2723] via-[#2A1610] to-[#1A0B08]" />

          {/* Halos de lumière chaude animés */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-african-copper/15 blur-[150px] mix-blend-screen animate-pulse-slow" />
            <div className="absolute top-[20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-african-terra/12 blur-[180px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-[-20%] left-[10%] w-[80vw] h-[80vw] rounded-full bg-african-gold/8 blur-[160px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: "4s" }} />

            {/* Motif géométrique africain subtil en fond global */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22%23CD7F32%22 fill-rule%3D%22evenodd%22%3E%3Cpath d%3D%22M30 0L60 30L30 60L0 30L30 0ZM30 10L10 30L30 50L50 30L30 10Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 w-full overflow-hidden">
            <Hero />

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
      )}
    </>
  );
}
