"use client";

import { motion } from "framer-motion";

/**
 * AfricanDivider — Bande de tissu africain animée entre chaque section.
 * Simule un déploiement de tissu révélant un motif géométrique tribal.
 */
export default function AfricanDivider({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className={`w-full relative overflow-hidden ${inverted ? "py-0" : "py-0"}`} aria-hidden="true">
      {/* Bande principale */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: inverted ? "right" : "left" }}
        className="w-full h-8 relative overflow-hidden"
      >
        {/* Gradient du tissu */}
        <div
          className="absolute inset-0"
          style={{
            background: inverted
              ? "linear-gradient(to left, #C04A2A, #D4AF37, #CD7F32, #B87333, #3E2723)"
              : "linear-gradient(to right, #3E2723, #B87333, #CD7F32, #D4AF37, #C04A2A)",
          }}
        />
        {/* Motif répété en surimpression (losanges SVG) */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width%3D%2240%22 height%3D%2232%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon points%3D%2220%2C2 38%2C16 20%2C30 2%2C16%22 fill%3D%22none%22 stroke%3D%22%23FDFBF7%22 stroke-width%3D%221.5%22%2F%3E%3Ccircle cx%3D%2220%22 cy%3D%2216%22 r%3D%224%22 fill%3D%22%23FDFBF7%22 opacity%3D%220.7%22%2F%3E%3C%2Fsvg%3E')",
            backgroundSize: "40px 32px",
          }}
        />
        {/* Ombres aux bords pour l'effet tissu 3D */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/40 to-transparent" />
      </motion.div>

      {/* Ornement central — losange doré */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 1, ease: "backOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-african-gold rotate-45 shadow-[0_0_20px_rgba(212,175,55,0.7)] z-10 animate-diamond-pulse"
      >
        <div className="absolute inset-[3px] border border-[#1A0B08]" />
      </motion.div>
    </div>
  );
}
