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
  "Médaillons de bœuf au poivre",
  "Filet de bar rôti, sauce agrumes",
  "Risotto aux champignons sauvages",
];
const accompagnements = [
  "Gratin dauphinois revisité",
  "Légumes de saison glacés",
  "Mousseline de patates douces",
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
  "Électronique & High-Tech": [
    "télévision", "vidéoprojecteur", "ordinateur portable", "tablette", "smartphone",
    "enceinte Bluetooth", "système audio", "home cinéma", "casque audio", "écouteurs",
    "montre connectée", "appareil photo", "caméra", "console de jeux",
    "accessoires informatiques", "imprimante", "disque dur", "Autre électronique",
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
// CARTE D'INVITATION ROYALE PERSONNALISÉE HAUT DE GAMME
// ============================
function RoyalInvitationCard({
  data,
  onReset,
}: {
  data: FormData;
  onReset: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 800);
    const t3 = setTimeout(() => setStep(3), 1400);
    const t4 = setTimeout(() => setStep(4), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#1A0B08",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `invitation-royale-${data.name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Erreur génération carte:", e);
    } finally {
      setDownloading(false);
    }
  };

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

  return (
    <div className="w-full flex flex-col items-center gap-10 py-6">
      
      {/* Entête de Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-african-gold/15 border border-african-gold/40 text-african-gold text-xs uppercase tracking-[0.25em] font-bold mb-4">
          <ShieldCheck size={16} /> Inscription Officielle Enregistrée
        </div>
        <h3 className="text-3xl sm:text-5xl font-heading text-african-ivory mb-3">
          Votre Carte Royale Personnalisée
        </h3>
        <p className="text-african-sand/80 font-sans text-sm sm:text-base leading-relaxed">
          Merci pour votre confirmation. Voici votre invitation d'honneur officielle à la célébration d'Élisée & Lydia.
        </p>
      </motion.div>

      {/* ===== LA CARTE D'INVITATION ROYALE (Format d'Artiste Graphiste) ===== */}
      <div
        ref={cardRef}
        className="w-full max-w-xl bg-[#1A0B08] border-4 border-african-gold relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] rounded-sm p-6 sm:p-10"
        style={{ minHeight: "720px" }}
      >
        {/* Texture textile africaine en filigrane */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22%23CD7F32%22 fill-rule%3D%22evenodd%22%3E%3Cpath d%3D%22M30 0L60 30L30 60L0 30L30 0ZM30 10L10 30L30 50L50 30L30 10Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Double Cadre Géométrique Doré */}
        <div className="absolute inset-3 border border-african-copper/60 pointer-events-none" />
        <div className="absolute inset-5 border border-african-gold/30 pointer-events-none" />

        {/* 4 Losanges Sculptés aux Coins */}
        <div className="absolute top-2 left-2 w-5 h-5 bg-african-gold rotate-45 pointer-events-none shadow-md" />
        <div className="absolute top-2 right-2 w-5 h-5 bg-african-gold rotate-45 pointer-events-none shadow-md" />
        <div className="absolute bottom-2 left-2 w-5 h-5 bg-african-gold rotate-45 pointer-events-none shadow-md" />
        <div className="absolute bottom-2 right-2 w-5 h-5 bg-african-gold rotate-45 pointer-events-none shadow-md" />

        {/* CONTENU GRAPHIQUE */}
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Header de la Carte */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -10 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-12 bg-african-gold/60" />
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.4em] text-african-copper font-bold">
                Invitation Royale
              </span>
              <div className="h-px w-12 bg-african-gold/60" />
            </div>
            <h4 className="text-xl sm:text-2xl font-deco uppercase tracking-[0.3em] text-african-gold drop-shadow-md">
              La Cour Royale
            </h4>
          </motion.div>

          {/* ===== PHOTO DES MARIÉS AVEC ARCHITECTURE ROYALE ===== */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: step >= 1 ? 1 : 0.9, opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-t-full border-4 border-african-gold overflow-hidden shadow-2xl my-2 bg-[#2A1610]"
          >
            <Image
              src="/ouverture.jpg"
              alt="Élisée & Lydia"
              fill
              sizes="200px"
              className="object-cover object-top brightness-105 contrast-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B08]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-african-gold rotate-45 border-2 border-[#1A0B08] shadow-md" />
          </motion.div>

          {/* NOMS DES MARIÉS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="my-3"
          >
            <h2 className="text-3xl sm:text-4xl font-heading text-african-ivory font-bold drop-shadow-md">
              Élisée <span className="text-african-gold font-normal font-sans">&</span> Lydia
            </h2>
            <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-african-sand/80 mt-1">
              Uniront leurs destinées devant Dieu et les Hommes
            </p>
          </motion.div>

          {/* SÉPARATEUR GÉOMÉTRIQUE */}
          <div className="flex items-center justify-center gap-2 my-2 w-full max-w-xs">
            <div className="h-px flex-1 bg-african-gold/40" />
            <div className="w-2 h-2 bg-african-copper rotate-45" />
            <div className="w-3 h-3 border border-african-gold rotate-45" />
            <div className="w-2 h-2 bg-african-copper rotate-45" />
            <div className="h-px flex-1 bg-african-gold/40" />
          </div>

          {/* BLOC INVITÉ D'HONNEUR */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 15 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-[#2A1610]/80 border border-african-gold/40 p-4 sm:p-5 rounded-sm my-3 backdrop-blur-sm"
          >
            <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.35em] text-african-copper font-bold block mb-1">
              Invité(e) d'Honneur
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading text-african-gold font-bold uppercase tracking-wider">
              {data.name}
            </h3>

            {/* Statut de présence */}
            <div className="mt-2 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-african-ivory/90 bg-[#1A0B08]/80 px-3 py-1 border border-african-bronze/50 rounded-sm">
              <CheckCircle size={14} className={data.present === "oui" ? "text-green-400" : "text-african-copper"} />
              <span>
                {data.present === "oui"
                  ? `Présence confirmée (${data.groupSize || 1} personne${(data.groupSize || 1) > 1 ? "s" : ""})`
                  : data.present === "non"
                  ? "Absent(e) de cœur"
                  : "Présence à confirmer"}
              </span>
            </div>

            {/* Choix du Menu si présent */}
            {data.present === "oui" && data.mainDish && (
              <div className="mt-3 pt-3 border-t border-african-gold/20 flex flex-col items-center text-xs font-sans text-african-sand/80">
                <span className="text-[9px] uppercase tracking-[0.25em] text-african-copper font-bold mb-0.5">
                  Menu Sélectionné
                </span>
                <p className="text-african-ivory font-medium">{data.mainDish}</p>
                {data.sideDish && <p className="text-african-ivory/60 text-[11px]">{data.sideDish}</p>}
              </div>
            )}

            {/* Offrande choisie */}
            {giftDisplay && (
              <div className="mt-2 pt-2 border-t border-african-gold/15 text-xs font-sans text-african-sand/80">
                <span className="text-[9px] uppercase tracking-[0.25em] text-african-copper font-bold mr-1.5">
                  Offrande :
                </span>
                <span className="text-african-gold font-medium">{giftDisplay}</span>
              </div>
            )}
          </motion.div>

          {/* DÉTAILS PRATIQUES DU MARIAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-2 w-full text-center py-2 px-1 border-t border-b border-african-gold/20 my-2"
          >
            <div className="flex flex-col items-center">
              <Calendar size={14} className="text-african-gold mb-1" />
              <span className="text-[9px] uppercase tracking-wider text-african-copper font-bold">Date</span>
              <span className="text-xs font-sans text-african-ivory font-semibold">10 Oct 2026</span>
            </div>

            <div className="flex flex-col items-center border-l border-r border-african-gold/20">
              <Clock size={14} className="text-african-gold mb-1" />
              <span className="text-[9px] uppercase tracking-wider text-african-copper font-bold">Heure</span>
              <span className="text-xs font-sans text-african-ivory font-semibold">12h00</span>
            </div>

            <div className="flex flex-col items-center">
              <MapPin size={14} className="text-african-gold mb-1" />
              <span className="text-[9px] uppercase tracking-wider text-african-copper font-bold">Lieu</span>
              <span className="text-xs font-sans text-african-ivory font-semibold leading-tight">Sweetlife Garden</span>
              <span className="text-[9px] text-african-sand/60">Bounoumin</span>
            </div>
          </motion.div>

          {/* Sceau de conclusion */}
          <div className="mt-3 flex items-center justify-between w-full text-[9px] font-sans uppercase tracking-[0.3em] text-african-copper/80">
            <span>Sceau Royal Authentique</span>
            <span>Élisée & Lydia 2026</span>
          </div>
        </div>
      </div>

      {/* ===== ACTIONS POST-INSCRIPTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4 max-w-xl w-full px-4"
      >
        {/* Bouton Téléchargement Haute Résolution */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 min-w-[240px] py-4 px-6 bg-gradient-to-r from-african-terra via-african-gold to-african-bronze text-[#1A0B08] font-sans font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-sm shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Download size={18} className={downloading ? "animate-bounce" : ""} />
          <span>{downloading ? "Génération en cours..." : "Télécharger ma Carte"}</span>
        </button>

        {/* Bouton Voir le Pagne */}
        <a
          href="#pagne"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("pagne")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="py-4 px-6 bg-[#3E2723] border border-african-gold text-african-gold font-sans font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-sm hover:bg-african-gold hover:text-[#1A0B08] transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center"
        >
          <ShoppingBag size={17} />
          <span>Voir le Pagne Officiel</span>
        </a>

        {/* Bouton Modifier */}
        <button
          onClick={onReset}
          className="w-full text-center text-xs font-sans text-african-sand/60 hover:text-african-gold underline uppercase tracking-widest transition-colors py-2 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Modifier mon inscription</span>
        </button>
      </motion.div>
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
