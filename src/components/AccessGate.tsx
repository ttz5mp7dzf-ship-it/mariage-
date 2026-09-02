"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, KeyRound, Sparkles } from "lucide-react";

export default function AccessGate({
  onUnlock,
}: {
  onUnlock: (guestInfo: { name: string; code: string }) => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlockedGuest, setUnlockedGuest] = useState<{ name: string; code: string } | null>(null);

  // Vérifier si un code a déjà été validé dans cette session
  useEffect(() => {
    const savedCode = sessionStorage.getItem("royal_access_code");
    const savedName = sessionStorage.getItem("royal_guest_name") || "";
    if (savedCode) {
      onUnlock({ name: savedName, code: savedCode });
    }
  }, [onUnlock]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setError("Veuillez entrer votre code d'accès");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/access-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cleanCode }),
      });

      const data = await res.json();

      if (data.valid) {
        const guestName = data.name || "";
        setUnlockedGuest({ name: guestName, code: cleanCode });

        // Sauvegarder dans la session navigateur
        sessionStorage.setItem("royal_access_code", cleanCode);
        if (guestName) sessionStorage.setItem("royal_guest_name", guestName);

        // Animation de déverrouillage
        setTimeout(() => {
          onUnlock({ name: guestName, code: cleanCode });
        }, 1200);
      } else {
        setError(data.error || "Code invalide. Vérifiez votre invitation.");
        if (typeof window !== "undefined" && navigator.vibrate) {
          navigator.vibrate(200);
        }
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {!unlockedGuest ? (
        <motion.div
          key="gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D0503] overflow-y-auto py-10"
          style={{ WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Motif subtil en fond */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22%23D4AF37%22 fill-rule%3D%22evenodd%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
            }}
          />

          {/* Halo doré central */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full my-auto"
          >
            {/* Sceau de la serrure royale */}
            <motion.div
              animate={{ rotate: [0, -4, 4, -2, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2A1610] to-[#1A0B08] border-4 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.35)] flex items-center justify-center relative">
                <div className="absolute inset-1 border border-dashed border-[#D4AF37]/40 rounded-full" />
                <Lock size={38} className="text-[#D4AF37]" />
              </div>
            </motion.div>

            {/* Titre */}
            <h1 className="text-3xl sm:text-4xl font-heading text-[#D4AF37] mb-2 drop-shadow-md">
              Invitation Royale Privée
            </h1>
            <p className="text-african-sand/80 text-xs sm:text-sm font-sans mb-8 leading-relaxed">
              Ce royaume est réservé aux invités d&apos;Élisée & Lydia.<br />
              Veuillez entrer le <strong className="text-[#D4AF37]">code d&apos;accès personnel</strong> figurant sur votre invitation.
            </p>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
              <div className="w-full relative">
                <KeyRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50"
                />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError("");
                  }}
                  placeholder="VOTRE CODE"
                  autoFocus
                  maxLength={16}
                  className="w-full py-4 pl-12 pr-4 bg-[#1A0B08] border-2 border-[#D4AF37]/40 focus:border-[#D4AF37] text-center text-xl sm:text-2xl font-sans font-bold text-[#D4AF37] placeholder-[#D4AF37]/25 tracking-[0.25em] focus:outline-none transition-colors rounded-sm"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                />
              </div>

              {/* Message d'erreur */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs font-sans font-semibold text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Bouton de validation */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-african-terra via-african-gold to-african-bronze text-[#0D0503] font-sans font-black uppercase tracking-[0.2em] text-xs sm:text-sm shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer rounded-sm"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <ShieldCheck size={20} />
                <span>{loading ? "Vérification..." : "Ouvrir les Portes du Royaume"}</span>
              </button>
            </form>

            {/* Séparateur ornemental */}
            <div className="flex items-center gap-3 mt-10">
              <div className="h-px w-12 bg-[#D4AF37]/30" />
              <div className="w-2.5 h-2.5 bg-[#D4AF37] rotate-45" />
              <div className="h-px w-12 bg-[#D4AF37]/30" />
            </div>
            <p className="text-[10px] text-african-sand/40 font-sans uppercase tracking-[0.3em] mt-3">
              Élisée & Lydia — Samedi 10 Octobre 2026
            </p>
          </motion.div>
        </motion.div>
      ) : (
        /* Animation d'Accueil Personnalisé */
        <motion.div
          key="unlocking"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D0503] px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-5 max-w-md"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2A1610] to-[#1A0B08] border-4 border-green-400 shadow-[0_0_60px_rgba(134,239,172,0.4)] flex items-center justify-center">
              <Sparkles size={40} className="text-green-400 animate-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading text-african-ivory">
              Accès Autorisé 👑
            </h2>
            {unlockedGuest.name ? (
              <p className="text-xl sm:text-2xl font-serif text-[#D4AF37]">
                Bienvenue <strong className="text-white">{unlockedGuest.name}</strong> dans la Cour Royale !
              </p>
            ) : (
              <p className="text-lg font-serif text-[#D4AF37]">
                Bienvenue dans la Cour Royale d&apos;Élisée & Lydia !
              </p>
            )}
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-african-sand/60 animate-pulse mt-2">
              Ouverture des portes du royaume...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
