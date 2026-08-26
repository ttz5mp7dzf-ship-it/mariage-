"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Users, Download } from "lucide-react";

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
// Composant : Carte d'invitation royale à télécharger
// ============================
function InvitationCard({
  name,
  present,
  mainDish,
  sideDish,
}: {
  name: string;
  present: string;
  mainDish: string;
  sideDish: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 900);
    const t3 = setTimeout(() => setStep(3), 1500);
    const t4 = setTimeout(() => setStep(4), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const presentLabel =
    present === "oui" ? "Présent(e) avec honneur" :
    present === "non" ? "Absent(e) avec regret" :
    "En attente de confirmation";

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
      link.download = `invitation-royale-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Erreur génération carte:", e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* ===== CARTE ELLE-MÊME ===== */}
      <div
        ref={cardRef}
        className="w-full max-w-lg bg-[#1A0B08] relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        style={{ aspectRatio: "3/4", minHeight: "500px" }}
      >
        {/* Motif de fond */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width%3D%2240%22 height%3D%2240%22 viewBox%3D%220 0 40 40%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M20 0L40 20L20 40L0 20L20 0ZM20 8L8 20L20 32L32 20L20 8Z%22 fill%3D%22%23CD7F32%22%2F%3E%3C%2Fsvg%3E')",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Bordure extérieure animée */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-3 border-2 border-african-gold"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute inset-6 border border-african-bronze/50"
        />

        {/* Losanges aux coins */}
        {step >= 1 && [
          "top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
            className={`absolute ${pos} w-6 h-6 bg-african-gold rotate-45`}
          />
        ))}

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center pt-14 pb-6 px-10"
        >
          <p className="text-[10px] font-sans uppercase tracking-[0.5em] text-african-copper mb-3">
            Invitation Royale · Élisée & Lydia
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 bg-african-gold/60" />
            <div className="w-3 h-3 bg-african-gold rotate-45" />
            <div className="h-px flex-1 bg-african-gold/60" />
          </div>
        </motion.div>

        {/* Sceau central animé */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          animate={{ scale: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
          className="relative z-10 mx-auto w-28 h-28 flex items-center justify-center"
        >
          <div className="absolute inset-0 border-4 border-african-gold rounded-full animate-rotate-slow opacity-60" />
          <div className="absolute inset-2 bg-gradient-to-br from-african-terra to-african-bronze rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(192,74,42,0.6)]">
            <svg width="50" height="50" viewBox="0 0 60 60" className="text-african-gold">
              <path fill="currentColor" d="M30 0L60 30L30 60L0 30L30 0ZM30 10L10 30L30 50L50 30L30 10Z" />
              <circle cx="30" cy="30" r="7" fill="currentColor" />
            </svg>
          </div>
        </motion.div>

        {/* Informations de l'invité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-10 mt-6"
        >
          <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-african-copper mb-2">Invité(e)</p>
          <h2 className="text-3xl md:text-4xl font-heading text-african-ivory mb-4 drop-shadow-lg">
            {name}
          </h2>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-px flex-1 bg-african-gold/40" />
            <div className="w-2 h-2 bg-african-copper rotate-45" />
            <div className="h-px flex-1 bg-african-gold/40" />
          </div>

          <p className="text-sm font-sans text-african-gold mb-1 uppercase tracking-widest">
            {presentLabel}
          </p>
        </motion.div>

        {/* Détails du mariage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-8 mt-4 bg-[#3E2723]/60 border border-african-gold/30 p-5 text-center"
        >
          <p className="text-[9px] font-sans uppercase tracking-[0.4em] text-african-copper mb-3">Le Grand Jour</p>
          <p className="text-lg font-heading text-african-ivory mb-1">Samedi 10 Octobre 2026</p>
          <p className="text-xs font-sans text-african-gold uppercase tracking-widest">12h00 · Sweetlife Garden, Bounoumin</p>

          {present === "oui" && mainDish && (
            <>
              <div className="h-px bg-african-gold/20 my-3" />
              <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-african-copper mb-1">Menu choisi</p>
              <p className="text-xs font-sans text-african-ivory/90">{mainDish}</p>
              {sideDish && <p className="text-xs font-sans text-african-ivory/60 mt-0.5">{sideDish}</p>}
            </>
          )}
        </motion.div>

        {/* Bas de carte */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 4 ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center mt-4 pb-10"
        >
          <p className="text-[9px] font-sans uppercase tracking-[0.5em] text-african-copper/60">
            La Fête dans la Cour Royale
          </p>
        </motion.div>
      </div>

      {/* Bouton téléchargement */}
      {step >= 4 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleDownload}
          disabled={downloading}
          className="group relative flex items-center gap-4 px-10 py-4 border-2 border-african-gold bg-[#3E2723] text-african-gold font-sans font-bold uppercase tracking-widest text-sm hover:bg-african-gold hover:text-[#1A0B08] transition-colors duration-300 disabled:opacity-50"
        >
          <Download size={18} className="group-hover:animate-bounce" />
          {downloading ? "Génération en cours..." : "Télécharger ma Carte Royale"}
        </motion.button>
      )}
    </div>
  );
}

// ============================
// Composant principal : RsvpMenu
// ============================
export default function RsvpMenu() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
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

  // ===== ÉCRAN DE SUCCÈS — Sceau royal ou Carte d'invitation =====
  if (status === "success" && submittedData) {
    // Cas 1 : L'invité n'a pas de cadeau → Carte d'invitation
    if (noGiftSelected) {
      return (
        <section id="rsvp" className="py-32 px-4 bg-[#1A0B08] min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 z-10 relative"
          >
            <h3 className="text-3xl md:text-5xl font-heading text-african-gold mb-3">
              Votre Présence est Inscrite
            </h3>
            <p className="text-african-ivory/70 font-sans max-w-md mx-auto">
              Votre attention fait déjà partie de notre célébration. Voici votre carte royale.
            </p>
          </motion.div>

          <InvitationCard
            name={submittedData.name}
            present={submittedData.present}
            mainDish={submittedData.mainDish}
            sideDish={submittedData.sideDish}
          />
        </section>
      );
    }

    // Cas 2 : L'invité a un cadeau → Sceau royal
    return (
      <section id="rsvp" className="py-32 px-4 bg-[#1A0B08] min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10 relative"
        >
          <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[6px] border-dashed border-african-gold rounded-full opacity-60"
            />
            <motion.div
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute inset-2 bg-gradient-to-br from-african-terra to-african-bronze rounded-full shadow-[0_0_50px_rgba(192,74,42,0.6)] flex items-center justify-center"
            >
              <svg width="60" height="60" viewBox="0 0 60 60" className="text-african-gold">
                <path fill="currentColor" d="M30 0L60 30L30 60L0 30L30 0ZM30 10L10 30L30 50L50 30L30 10Z" />
                <circle cx="30" cy="30" r="8" fill="currentColor" />
              </svg>
            </motion.div>
          </div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-4xl md:text-5xl font-heading text-african-gold mb-4"
          >
            VOTRE PRÉSENCE EST INSCRITE
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
            className="text-african-ivory/80 text-lg font-sans max-w-lg mx-auto"
          >
            Votre attention et votre générosité font déjà partie de notre célébration.
          </motion.p>
        </motion.div>
      </section>
    );
  }

  // ===== FORMULAIRE PRINCIPAL =====
  return (
    <section id="rsvp" className="py-32 px-4 relative overflow-hidden bg-[#2A1610]">
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
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6">Registre Royal</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory">Confirmez votre venue</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* NOM */}
            <div className="relative group">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest">Nom et Prénom</label>
              <div className="border-b border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold placeholder-african-gold/30"
                  placeholder="Son Excellence..."
                />
              </div>
            </div>

            {/* TÉLÉPHONE */}
            <div className="relative group">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest">Numéro de Téléphone</label>
              <div className="border-b border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold placeholder-african-gold/30"
                  placeholder="+225 00 00 00 00 00"
                />
              </div>
            </div>

            {/* PRÉSENCE */}
            <div className="relative group md:col-span-2 max-w-md mx-auto w-full">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Serez-vous présent ?</label>
              <select
                {...register("present", { required: true })}
                className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b border-african-gold/50"
              >
                <option value="" className="bg-[#1A0B08]">Sélectionnez...</option>
                <option value="oui" className="bg-[#1A0B08]">Oui, je serai présent(e)</option>
                <option value="non" className="bg-[#1A0B08]">Non, je ne pourrai malheureusement pas être présent(e)</option>
                <option value="peut-etre" className="bg-[#1A0B08]">Je ne suis pas encore certain(e)</option>
              </select>
            </div>
          </div>

          {/* Section conditionnelle si présent */}
          <AnimatePresence>
            {present === "oui" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-20 overflow-hidden">

                {/* NOMBRE D'INVITÉS */}
                <div className="relative group max-w-md mx-auto w-full mb-20">
                  <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Nombre d'invités</label>
                  <div className="flex items-center justify-center border-b border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                    <Users className="text-african-gold mr-4" size={20} />
                    <input
                      type="number" min="1" max="5"
                      {...register("groupSize", { required: true, valueAsNumber: true })}
                      className="w-32 text-center py-4 bg-transparent focus:outline-none text-xl font-sans text-african-ivory"
                      defaultValue={1}
                    />
                  </div>
                </div>

                {/* MENU */}
                <div className="text-center mb-16">
                  <UtensilsCrossed size={40} className="mx-auto text-african-gold mb-6" />
                  <h4 className="text-4xl md:text-5xl font-heading text-african-ivory mb-2">Menu Gastronomique</h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {[
                    { title: "Plats Principaux", items: plats, field: "mainDish" as const },
                    { title: "Accompagnements", items: accompagnements, field: "sideDish" as const },
                  ].map(({ title, items, field }) => (
                    <div key={field} className="bg-[#3E2723]/80 p-8 border border-african-gold/20 shadow-xl backdrop-blur-md relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-african-gold m-2" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-african-gold m-2" />
                      <h5 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-african-gold mb-8 text-center border-b border-african-gold/30 pb-4">{title}</h5>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <label key={item} className="flex items-center space-x-4 cursor-pointer group hover:bg-[#1A0B08]/40 p-4 transition-all duration-300">
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

                {/* SECTION CADEAUX */}
                <div className="mt-20 text-center">
                  <h4 className="text-4xl md:text-5xl font-heading text-african-ivory mb-2">Votre Offrande</h4>
                  <p className="text-sm font-sans uppercase tracking-[0.2em] text-african-gold mb-10">Participez à notre joie</p>

                  <div className="max-w-2xl mx-auto bg-[#3E2723]/80 p-8 border border-african-gold/20 shadow-xl backdrop-blur-md relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-african-gold m-4 opacity-50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-african-gold m-4 opacity-50" />

                    <p className="text-[10px] text-african-ivory/60 uppercase tracking-widest mb-6 border border-african-bronze p-2 bg-[#1A0B08]/50">
                      Pour éviter les doublons, veuillez sélectionner le cadeau que vous comptez offrir. Les cadeaux grisés sont déjà réservés.
                    </p>

                    {/* Catégorie */}
                    <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center mt-8">
                      Nature de votre cadeau
                    </label>
                    <select
                      {...register("giftCategory")}
                      className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b border-african-gold/30"
                    >
                      <option value="" className="bg-[#1A0B08]">Sélectionnez une catégorie...</option>
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
                            className="w-full py-4 bg-transparent focus:outline-none text-lg font-sans text-african-ivory text-center border-b border-african-bronze/50"
                          >
                            <option value="" className="bg-[#1A0B08]">Sélectionnez un élément...</option>
                            {giftCategories[giftCategory].map((sub) => {
                              const uniqueKey = `${giftCategory} - ${sub}`;
                              const isClaimed = claimedGifts.includes(uniqueKey);
                              return (
                                <option key={sub} value={sub} disabled={isClaimed} className={`bg-[#1A0B08] ${isClaimed ? "text-gray-500" : ""}`}>
                                  {sub} {isClaimed ? "(Déjà réservé)" : ""}
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
                          <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Lequel ?</label>
                          <input
                            type="text"
                            {...register("giftCustom", { required: true })}
                            className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b border-african-bronze/50 placeholder-african-gold/30"
                            placeholder="Ex: Machine à pain..."
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
                          className="mt-8 p-4 border border-african-copper/40 bg-[#1A0B08]/50 text-center"
                        >
                          <p className="text-african-ivory/80 font-sans text-sm leading-relaxed">
                            Votre présence est le plus beau des cadeaux. 🙏<br />
                            <span className="text-african-gold text-xs uppercase tracking-widest mt-2 block">
                              Une carte d'invitation royale vous sera générée après confirmation.
                            </span>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOUTON SCEAU ROYAL */}
          <div className="pt-32 pb-16 text-center relative">
            <button type="submit" disabled={status === "loading"} className="relative group inline-block">
              <div className="absolute inset-0 bg-african-gold/20 rounded-full blur-2xl animate-glow-pulse" />
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-african-terra to-[#3E2723] shadow-[0_10px_30px_rgba(192,74,42,0.6)] flex items-center justify-center border-4 border-african-gold group-hover:scale-95 group-active:scale-90 transition-transform duration-300">
                <div className="absolute inset-2 border-2 border-dashed border-african-gold/50 rounded-full animate-rotate-slow" />
                <div className="absolute inset-4 border border-african-gold/30 rounded-full" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-deco text-african-gold text-3xl md:text-4xl mb-1">E&L</span>
                  <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-african-gold font-bold">
                    {status === "loading" ? "Scellement..." : "Confirmer"}
                  </span>
                </div>
              </div>
            </button>
            <p className="mt-8 font-sans text-xs uppercase tracking-widest text-african-gold/80">Apposer votre sceau</p>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-center mt-4 font-sans">Une erreur est survenue. Veuillez réessayer.</p>
          )}
        </form>
      </div>
    </section>
  );
}
