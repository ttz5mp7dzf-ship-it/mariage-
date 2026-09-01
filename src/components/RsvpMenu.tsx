"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Users, Download, Sparkles, ShoppingBag, RotateCcw, MapPin, Calendar, Clock, Heart, CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";

type FormData = {
  name: string;
  phone: string;
  present: string;
  groupSize: number;
  mainDish: string;
  sideDish: string;
  giftCategory: string;
  giftSubCategory: string;
  giftCustom: string;
};

const plats = [
  "Sauce Kôpê",
  "Sauce Foufou",
  "Kplé",
  "Soupe de pâte de bœuf",
  "Tchep blanc viande / poisson",
  "Sauce tomate",
  "Poulet braisé",
  "Poisson braisé",
];

const accompagnements = [
  "Alloco",
  "Pommes de terre sautées",
  "Riz blanc",
  "Attiéké blanc",
  "Attiéké rouge",
  "Foufou",
  "Foutou banane",
  "Placali",
  "Abolo",
];

const giftCategories: Record<string, string[]> = {
  "Mobilier": [
    "canapé", "fauteuil", "table à manger", "chaises", "table basse", "meuble TV",
    "buffet", "commode", "armoire", "lit", "tête de lit", "table de chevet", "bureau",
    "bibliothèque", "meuble de rangement", "meuble de cuisine", "meuble de salle de bain",
    "dressing", "miroir", "console", "pouf", "chaise de bureau", "mobilier extérieur",
    "salon de jardin", "Autre mobilier",
  ],
  "Électroménager": [
    "réfrigérateur", "congélateur", "cuisinière", "four", "micro-ondes", "lave-vaisselle",
    "blender", "mixeur", "robot de cuisine", "machine à café", "bouilloire", "grille-pain",
    "friteuse", "air fryer", "extracteur de jus", "appareil à raclette", "machine à laver",
    "sèche-linge", "aspirateur", "fer à repasser", "centrale vapeur", "ventilateur",
    "climatiseur", "purificateur d'air", "chauffe-eau", "Autre électroménager",
  ],
  "Expérience": [
    "voyage", "week-end", "séjour romantique", "dîner gastronomique", "dîner romantique",
    "spa", "massage", "escapade", "activité culturelle", "activité touristique",
    "expérience insolite", "séance photo", "activité détente", "Autre expérience",
  ],
  "Don en numéraire": [],
  "Je n'ai pas de cadeau": [],
};

// ============================
// GÉNÉRATION RAPIDE CARTE EN CANVAS NATIF (sans html2canvas)
// ============================
async function generateCardCanvas(data: FormData): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1300;
  const ctx = canvas.getContext("2d")!;

  // Fond sombre
  ctx.fillStyle = "#1A0B08";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Motif géométrique en filigrane
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.fillStyle = "#CD7F32";
  for (let x = 0; x < canvas.width; x += 60) {
    for (let y = 0; y < canvas.height; y += 60) {
      ctx.save();
      ctx.translate(x + 30, y + 30);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-10, -10, 20, 20);
      ctx.restore();
    }
  }
  ctx.restore();

  // Bordure extérieure or
  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  // Bordure intérieure cuivre
  ctx.strokeStyle = "#CD7F32";
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  // Losanges dorés aux 4 coins
  const drawDiamond = (cx: number, cy: number) => {
    ctx.save();
    ctx.fillStyle = "#D4AF37";
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-14, -14, 28, 28);
    ctx.restore();
  };
  drawDiamond(12, 12);
  drawDiamond(canvas.width - 12, 12);
  drawDiamond(12, canvas.height - 12);
  drawDiamond(canvas.width - 12, canvas.height - 12);

  // En-tête : "INVITATION ROYALE"
  ctx.fillStyle = "#CD7F32";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "8px";
  ctx.fillText("✦  INVITATION ROYALE  ✦", canvas.width / 2, 90);

  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 44px Georgia, serif";
  ctx.fillText("La Cour Royale", canvas.width / 2, 148);

  // Ligne séparatrice
  ctx.strokeStyle = "#D4AF37";
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 168); ctx.lineTo(820, 168);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Photo des mariés (arche royale)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = document.createElement("img") as HTMLImageElement;
      i.crossOrigin = "anonymous";
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = "/ouverture.jpg";
    });
    // Clip en arche (rectangle + demi-cercle)
    const px = 330, py = 188, pw = 240, ph = 320, r = pw / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(px + r, py + r, r, Math.PI, 0);
    ctx.lineTo(px + pw, py + ph);
    ctx.lineTo(px, py + ph);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, px, py, pw, ph);
    ctx.restore();

    // Cadre or sur la photo
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(px + r, py + r, r + 2, Math.PI, 0);
    ctx.lineTo(px + pw + 2, py + ph);
    ctx.lineTo(px - 2, py + ph);
    ctx.closePath();
    ctx.stroke();
  } catch {
    // Photo non chargée – continuer sans
  }

  // Noms des mariés
  ctx.fillStyle = "#FDFBF7";
  ctx.font = "bold 56px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("Élisée & Lydia", canvas.width / 2, 570);

  ctx.fillStyle = "#CD7F32";
  ctx.font = "18px sans-serif";
  ctx.fillText("Uniront leurs destinées devant Dieu et les Hommes", canvas.width / 2, 605);

  // Séparateur losanges
  ctx.fillStyle = "#CD7F32";
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.translate(canvas.width / 2 + (i - 2) * 26, 630);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-5, -5, 10, 10);
    ctx.restore();
  }

  // Bloc invité d'honneur
  ctx.fillStyle = "#2A1610";
  ctx.fillRect(60, 655, canvas.width - 120, 250);
  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.5;
  ctx.strokeRect(60, 655, canvas.width - 120, 250);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#CD7F32";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("INVITÉ(E) D'HONNEUR", canvas.width / 2, 688);

  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 46px Georgia, serif";
  ctx.fillText(data.name.toUpperCase(), canvas.width / 2, 742);

  // Statut présence
  const presenceText = data.present === "oui"
    ? `✓  Présence confirmée — ${data.groupSize || 1} personne${(data.groupSize || 1) > 1 ? "s" : ""}`
    : data.present === "non" ? "✗  Absent(e) de cœur" : "?  Présence à confirmer";
  ctx.fillStyle = data.present === "oui" ? "#86efac" : "#CD7F32";
  ctx.font = "18px sans-serif";
  ctx.fillText(presenceText, canvas.width / 2, 778);

  // Menu
  if (data.present === "oui" && data.mainDish) {
    ctx.fillStyle = "#CD7F32";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("MENU SÉLECTIONNÉ", canvas.width / 2, 812);
    ctx.fillStyle = "#FDFBF7";
    ctx.font = "20px sans-serif";
    ctx.fillText(data.mainDish, canvas.width / 2, 840);
    if (data.sideDish) {
      ctx.fillStyle = "#FDFBF7";
      ctx.globalAlpha = 0.65;
      ctx.font = "17px sans-serif";
      ctx.fillText(data.sideDish, canvas.width / 2, 866);
      ctx.globalAlpha = 1;
    }
  }

  // Ligne détails
  ctx.strokeStyle = "#D4AF37";
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 935); ctx.lineTo(820, 935);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Détails pratiques
  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("📅  10 Octobre 2026   •   🕛  12h00   •   📍  Sweetlife Garden, Bounoumin", canvas.width / 2, 975);

  // Bas de carte
  ctx.strokeStyle = "#D4AF37";
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 1010); ctx.lineTo(820, 1010);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#CD7F32";
  ctx.font = "bold 14px sans-serif";
  ctx.globalAlpha = 0.75;
  ctx.fillText("SCEAU ROYAL AUTHENTIQUE", 200, 1050);
  ctx.textAlign = "right";
  ctx.fillText("ÉLISÉE & LYDIA 2026", 730, 1050);
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/png");
}

// ============================
// CARTE D'INVITATION ROYALE — COMPATIBLE SAFARI iOS
// ============================
function RoyalInvitationCard({
  data,
  onReset,
}: {
  data: FormData;
  onReset: () => void;
}) {
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(true);
  const [isIOS, setIsIOS] = useState(false);

  const giftDisplay =
    data.giftCategory === "Don en numéraire"
      ? "Don en numéraire"
      : data.giftCategory === "Je n'ai pas de cadeau" || !data.giftCategory
      ? null
      : data.giftSubCategory?.startsWith("Autre")
      ? `${data.giftCategory} — ${data.giftCustom}`
      : data.giftSubCategory
      ? `${data.giftCategory} — ${data.giftSubCategory}`
      : data.giftCategory;

  // Détecter iOS Safari
  useEffect(() => {
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as Record<string, unknown>).MSStream;
    setIsIOS(ios);
  }, []);

  // Générer la carte immédiatement au montage
  useEffect(() => {
    setGenerating(true);
    generateCardCanvas(data)
      .then((url) => {
        setCardImageUrl(url);
        setGenerating(false);
      })
      .catch((e) => {
        console.error("Erreur génération carte:", e);
        setGenerating(false);
      });
  }, [data]);

  const handleDownload = () => {
    if (!cardImageUrl) return;
    if (isIOS) {
      // iOS Safari : ouvrir l'image dans un nouvel onglet pour permettre "Enregistrer l'image"
      window.open(cardImageUrl, "_blank");
    } else {
      // Desktop / Android : téléchargement direct
      const link = document.createElement("a");
      link.download = `invitation-${data.name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = cardImageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-6 px-4">

      {/* Badge confirmation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-african-gold/15 border border-african-gold/40 text-african-gold text-xs uppercase tracking-[0.25em] font-bold mb-4">
          <ShieldCheck size={16} /> Inscription Officielle Enregistrée
        </div>
        <h3 className="text-3xl sm:text-4xl font-heading text-african-ivory mb-2">
          Votre Carte Royale 👑
        </h3>
        <p className="text-african-sand/80 font-sans text-sm leading-relaxed">
          Votre invitation personnalisée est prête. Appuyez sur le bouton ci-dessous pour la télécharger.
        </p>
      </motion.div>

      {/* ===== CARTE GÉNÉRÉE EN IMAGE (affiché instantanément) ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {generating ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-african-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-african-gold text-sm font-sans uppercase tracking-widest">Génération de la carte…</p>
          </div>
        ) : cardImageUrl ? (
          <img
            src={cardImageUrl}
            alt="Votre carte d'invitation royale"
            className="w-full rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-african-gold"
            style={{ imageRendering: "auto" }}
          />
        ) : (
          <p className="text-red-400 text-center text-sm">Erreur de génération. Veuillez réessayer.</p>
        )}
      </motion.div>

      {/* ===== BOUTON TÉLÉCHARGEMENT PRINCIPAL ===== */}
      {!generating && cardImageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          {/* iOS : lien direct sur l'image (l'utilisateur appuie puis "Enregistrer l'image") */}
          {isIOS ? (
            <a
              href={cardImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 px-6 bg-gradient-to-r from-african-terra via-african-gold to-african-bronze text-[#1A0B08] font-sans font-black uppercase tracking-[0.2em] text-sm rounded-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 text-center"
            >
              <Download size={20} />
              <span>Appuyer pour télécharger</span>
            </a>
          ) : (
            <button
              onClick={handleDownload}
              className="w-full py-5 px-6 bg-gradient-to-r from-african-terra via-african-gold to-african-bronze text-[#1A0B08] font-sans font-black uppercase tracking-[0.2em] text-sm rounded-sm shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Download size={20} />
              <span>Télécharger ma Carte</span>
            </button>
          )}

          {/* Instruction contextuelle pour iPhone */}
          {isIOS && (
            <p className="text-center text-xs text-african-sand/70 font-sans leading-relaxed px-2">
              📱 Sur iPhone : l&apos;image s&apos;ouvrira dans Safari. <strong className="text-african-gold">Appuyez longuement dessus</strong> puis <strong className="text-african-gold">«&nbsp;Enregistrer dans Photos&nbsp;»</strong>
            </p>
          )}

          {/* Séparateur */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-african-gold/20" />
            <span className="text-african-copper/60 text-xs uppercase tracking-widest">ou</span>
            <div className="h-px flex-1 bg-african-gold/20" />
          </div>

          {/* Bouton Voir le Pagne */}
          <a
            href="#pagne"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pagne")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full py-4 px-6 bg-[#3E2723] border border-african-gold text-african-gold font-sans font-bold uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-african-gold hover:text-[#1A0B08] transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center"
          >
            <ShoppingBag size={17} />
            <span>Voir le Pagne Officiel</span>
          </a>

          {/* Modifier */}
          <button
            onClick={onReset}
            className="w-full text-center text-xs font-sans text-african-sand/50 hover:text-african-gold underline uppercase tracking-widest transition-colors py-2 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Modifier mon inscription</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ============================
// COMPOSANT PRINCIPAL : REGISTRE RSVP
// ============================
export default function RsvpMenu() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [claimedGifts, setClaimedGifts] = useState<string[]>([]);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const present = watch("present");
  const giftCategory = watch("giftCategory");
  const giftSubCategory = watch("giftSubCategory");

  const noGiftSelected = giftCategory === "Je n'ai pas de cadeau";

  useEffect(() => {
    fetch("/api/gifts")
      .then((res) => res.json())
      .then((data) => { if (data.success) setClaimedGifts(data.claimedGifts); })
      .catch(console.error);
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    let finalGift: string | null = null;
    if (data.present === "oui" && data.giftCategory && data.giftCategory !== "Je n'ai pas de cadeau") {
      if (data.giftCategory === "Don en numéraire") {
        finalGift = "Don en numéraire";
      } else if (data.giftSubCategory?.startsWith("Autre")) {
        finalGift = `${data.giftCategory} - ${data.giftCustom}`;
      } else if (data.giftSubCategory) {
        finalGift = `${data.giftCategory} - ${data.giftSubCategory}`;
      }
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, gift: finalGift }),
      });

      if (response.ok) {
        setSubmittedData(data);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
    setSubmittedData(null);
  };

  // ===== ÉCRAN DE SUCCÈS — CARTE ROYALE POUR TOUS LES INVITÉS =====
  if (status === "success" && submittedData) {
    return (
      <section id="rsvp" className="py-24 px-4 bg-[#1A0B08] min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden scroll-mt-20">
        <RoyalInvitationCard data={submittedData} onReset={handleResetForm} />
      </section>
    );
  }

  // ===== FORMULAIRE D'INSCRIPTION PRINCIPAL =====
  return (
    <section id="rsvp" className="py-32 px-4 relative overflow-hidden bg-[#2A1610] scroll-mt-20">
      {/* Texture de fond géométrique */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22%23CD7F32%22 fill-rule%3D%22evenodd%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
        }}
      />

      {/* Ornements flottants en arrière-plan */}
      <div className="absolute top-20 left-8 w-12 h-12 border-2 border-african-gold/20 rotate-45 animate-float-gentle pointer-events-none" />
      <div className="absolute top-40 right-12 w-8 h-8 bg-african-copper/10 rotate-45 animate-float-gentle pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-african-terra/20 rotate-45 animate-float-gentle pointer-events-none" style={{ animationDelay: "4s" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6 drop-shadow-md">Registre Royal</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory drop-shadow-lg">Confirmez votre venue</h3>
          <p className="mt-4 text-african-sand/80 font-sans text-sm max-w-md mx-auto">
            Remplissez ce formulaire pour recevoir instantanément votre carte d'invitation officielle personnalisée.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* NOM */}
            <div className="relative group">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest">
                Nom et Prénom <span className="text-african-gold">*</span>
              </label>
              <div className="border-b-2 border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold placeholder-african-gold/30"
                  placeholder="Ex: Kouassi Jean..."
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1 font-sans">Ce champ est requis</p>}
            </div>

            {/* TÉLÉPHONE */}
            <div className="relative group">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest">
                Numéro de Téléphone <span className="text-african-gold">*</span>
              </label>
              <div className="border-b-2 border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold placeholder-african-gold/30"
                  placeholder="+225 07 00 00 00 00"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1 font-sans">Ce champ est requis</p>}
            </div>

            {/* PRÉSENCE */}
            <div className="relative group md:col-span-2 max-w-md mx-auto w-full">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">
                Serez-vous présent(e) ? <span className="text-african-gold">*</span>
              </label>
              <select
                {...register("present", { required: true })}
                className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b-2 border-african-gold/50 cursor-pointer"
              >
                <option value="" className="bg-[#1A0B08]">Sélectionnez votre réponse...</option>
                <option value="oui" className="bg-[#1A0B08]">Oui, je serai présent(e) avec joie</option>
                <option value="non" className="bg-[#1A0B08]">Non, je ne pourrai malheureusement pas être présent(e)</option>
                <option value="peut-etre" className="bg-[#1A0B08]">Je ne suis pas encore certain(e)</option>
              </select>
              {errors.present && <p className="text-red-400 text-xs mt-1 font-sans text-center">Veuillez indiquer votre présence</p>}
            </div>
          </div>

          {/* Section conditionnelle si présent */}
          <AnimatePresence>
            {present === "oui" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-20 overflow-hidden">

                {/* NOMBRE D'INVITÉS */}
                <div className="relative group max-w-md mx-auto w-full mb-20">
                  <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">
                    Nombre de personnes
                  </label>
                  <div className="flex items-center justify-center border-b-2 border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                    <Users className="text-african-gold mr-4" size={20} />
                    <input
                      type="number" min="1" max="5"
                      {...register("groupSize", { required: true, valueAsNumber: true })}
                      className="w-32 text-center py-4 bg-transparent focus:outline-none text-2xl font-sans text-african-gold font-bold"
                      defaultValue={1}
                    />
                  </div>
                </div>

                {/* MENU GASTRONOMIQUE */}
                <div className="text-center mb-16">
                  <UtensilsCrossed size={40} className="mx-auto text-african-gold mb-6" />
                  <h4 className="text-4xl md:text-5xl font-heading text-african-ivory mb-2">Menu Gastronomique</h4>
                  <p className="text-sm font-sans uppercase tracking-[0.2em] text-african-copper">Veuillez choisir votre met royal</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {[
                    { title: "Plats Principaux", items: plats, field: "mainDish" as const },
                    { title: "Accompagnements", items: accompagnements, field: "sideDish" as const },
                  ].map(({ title, items, field }) => (
                    <div key={field} className="bg-[#3E2723]/90 p-8 border-2 border-african-gold/40 shadow-xl backdrop-blur-md relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-african-gold m-2" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-african-gold m-2" />
                      <h5 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-african-gold mb-8 text-center border-b border-african-gold/30 pb-4">{title}</h5>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <label key={item} className="flex items-center space-x-4 cursor-pointer group hover:bg-[#1A0B08]/60 p-4 transition-all duration-300 rounded-sm">
                            <div className="w-5 h-5 rounded-full border-2 border-african-gold flex items-center justify-center shrink-0">
                              <input type="radio" value={item} {...register(field, { required: true })} className="opacity-0 absolute w-0 h-0 peer" />
                              <div className="w-2.5 h-2.5 rounded-full bg-african-gold opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-lg font-sans text-african-ivory group-hover:text-african-gold transition-colors">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* SECTION CADEAUX & OFFRANDES */}
                <div className="mt-20 text-center">
                  <h4 className="text-4xl md:text-5xl font-heading text-african-ivory mb-2">Votre Offrande</h4>
                  <p className="text-sm font-sans uppercase tracking-[0.2em] text-african-gold mb-10">Participez à notre joie</p>

                  <div className="max-w-2xl mx-auto bg-[#3E2723]/90 p-8 border-2 border-african-gold/40 shadow-xl backdrop-blur-md relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-african-gold m-4 opacity-50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-african-gold m-4 opacity-50" />

                    <p className="text-[11px] text-african-sand/80 uppercase tracking-widest mb-6 border border-african-bronze/50 p-3 bg-[#1A0B08]/70">
                      Pour éviter les doublons, sélectionnez l'offrande que vous souhaitez offrir. Les cadeaux grisés sont déjà réservés.
                    </p>

                    {/* Catégorie */}
                    <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center mt-8">
                      Nature de votre offrande
                    </label>
                    <select
                      {...register("giftCategory")}
                      className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b-2 border-african-gold/40 cursor-pointer"
                    >
                      <option value="" className="bg-[#1A0B08]">Sélectionnez une catégorie (ou sans cadeau)...</option>
                      {Object.keys(giftCategories).map((cat) => (
                        <option key={cat} value={cat} className="bg-[#1A0B08]">{cat}</option>
                      ))}
                    </select>

                    {/* Sous-catégorie */}
                    <AnimatePresence>
                      {giftCategory && giftCategories[giftCategory]?.length > 0 && !noGiftSelected && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-8">
                          <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Précisez votre choix</label>
                          <select
                            {...register("giftSubCategory")}
                            className="w-full py-4 bg-transparent focus:outline-none text-lg font-sans text-african-ivory text-center border-b border-african-bronze/50 cursor-pointer"
                          >
                            <option value="" className="bg-[#1A0B08]">Sélectionnez un élément...</option>
                            {giftCategories[giftCategory].map((sub) => {
                              const uniqueKey = `${giftCategory} - ${sub}`;
                              const isClaimed = claimedGifts.includes(uniqueKey);
                              return (
                                <option key={sub} value={sub} disabled={isClaimed} className={`bg-[#1A0B08] ${isClaimed ? "text-gray-500 line-through" : ""}`}>
                                  {sub} {isClaimed ? "— (Déjà réservé)" : ""}
                                </option>
                              );
                            })}
                          </select>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Champ "Autre" */}
                    <AnimatePresence>
                      {giftSubCategory?.startsWith("Autre") && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-8">
                          <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Précisez la nature de l'objet</label>
                          <input
                            type="text"
                            {...register("giftCustom", { required: true })}
                            className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b border-african-bronze/50 placeholder-african-gold/30"
                            placeholder="Ex: Machine à café spéciale..."
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message si pas de cadeau */}
                    <AnimatePresence>
                      {noGiftSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-8 p-4 border border-african-copper/50 bg-[#1A0B08]/70 text-center rounded-sm"
                        >
                          <p className="text-african-ivory/90 font-sans text-sm leading-relaxed">
                            Votre présence et votre bienveillance sont les plus précieux des trésors. 🙏
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOUTON DE SOUMISSION AVEC SCEAU ROYAL */}
          <div className="pt-24 pb-12 text-center relative">
            <button
              type="submit"
              disabled={status === "loading"}
              className="relative group inline-block cursor-pointer focus:outline-none"
            >
              <div className="absolute inset-0 bg-african-gold/30 rounded-full blur-2xl animate-glow-pulse" />
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-african-terra via-[#3E2723] to-[#1A0B08] shadow-[0_15px_40px_rgba(192,74,42,0.7)] flex items-center justify-center border-4 border-african-gold group-hover:scale-105 active:scale-95 transition-transform duration-300">
                <div className="absolute inset-2 border-2 border-dashed border-african-gold/50 rounded-full animate-rotate-slow" />
                <div className="absolute inset-4 border border-african-gold/40 rounded-full" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-deco text-african-gold text-3xl md:text-4xl mb-1 font-bold">E&L</span>
                  <span className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-african-gold font-bold">
                    {status === "loading" ? "Scellement..." : "Générer Ma Carte"}
                  </span>
                </div>
              </div>
            </button>
            <p className="mt-8 font-sans text-xs uppercase tracking-[0.3em] text-african-gold font-bold">
              {status === "loading" ? "Inscription en cours..." : "Apposer votre sceau & obtenir l'invitation"}
            </p>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-center font-sans text-sm">
              Une erreur est survenue lors de l'enregistrement. Veuillez vérifier votre connexion et réessayer.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
