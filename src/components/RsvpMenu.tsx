"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Users, Download, Sparkles, ShoppingBag, RotateCcw, MapPin, Calendar, Clock, Heart, CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";

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
  rsvpId?: string;
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
// GÉNÉRATION HAUTE DÉFINITION CARTE ROYALE (Zéro compression / format naturel)
// ============================
async function generateCardBlob(data: FormData): Promise<string> {
  const canvas = document.createElement("canvas");
  // Format Haute Définition (1200 x 2000 - ratio 3:5 avec QR code)
  canvas.width = 1200;
  canvas.height = 2000;
  const ctx = canvas.getContext("2d")!;

  // 1. Fond noble terre sombre
  ctx.fillStyle = "#160907";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Motif géométrique subtil en filigrane
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#D4AF37";
  for (let x = 0; x < canvas.width; x += 80) {
    for (let y = 0; y < canvas.height; y += 80) {
      ctx.save();
      ctx.translate(x + 40, y + 40);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-15, -15, 30, 30);
      ctx.restore();
    }
  }
  ctx.restore();

  // 3. Cadres royaux dorés
  // Bordure extérieure or massif
  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  // Bordure intérieure cuivre fin
  ctx.strokeStyle = "#CD7F32";
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Losanges dorés aux 4 coins
  const drawCornerDiamond = (cx: number, cy: number) => {
    ctx.save();
    ctx.fillStyle = "#D4AF37";
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-18, -18, 36, 36);
    ctx.restore();
  };
  drawCornerDiamond(24, 24);
  drawCornerDiamond(canvas.width - 24, 24);
  drawCornerDiamond(24, canvas.height - 24);
  drawCornerDiamond(canvas.width - 24, canvas.height - 24);

  // 4. En-tête : "INVITATION OFFICIELLE"
  ctx.fillStyle = "#CD7F32";
  ctx.font = "bold 26px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("✦  INVITATION OFFICIELLE  ✦", canvas.width / 2, 110);

  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 52px Georgia, serif";
  ctx.fillText("LA COUR ROYALE", canvas.width / 2, 175);

  // Ligne de séparation dorée
  ctx.strokeStyle = "#D4AF37";
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 200);
  ctx.lineTo(canvas.width - 120, 200);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // 5. Photo des Mariés en Arche Royale (SANS COMPRESSION NI ÉTIREMENT)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = document.createElement("img") as HTMLImageElement;
      i.crossOrigin = "anonymous";
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = "/ouverture.jpg";
    });

    const px = (canvas.width - 440) / 2; // centré
    const py = 230;
    const pw = 440;
    const ph = 460;
    const r = pw / 2; // rayon du dôme supérieur

    ctx.save();
    // Découpe en arche royale (dôme arrondi en haut, base rectangulaire)
    ctx.beginPath();
    ctx.arc(px + r, py + r, r, Math.PI, 0);
    ctx.lineTo(px + pw, py + ph);
    ctx.lineTo(px, py + ph);
    ctx.closePath();
    ctx.clip();

    // Rendu en mode "OBJECT-COVER" pour préserver 100% les proportions du visage
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const targetRatio = pw / ph;
    let sx = 0, sy = 0, sWidth = img.naturalWidth, sHeight = img.naturalHeight;

    if (imgRatio > targetRatio) {
      sWidth = img.naturalHeight * targetRatio;
      sx = (img.naturalWidth - sWidth) / 2;
    } else {
      sHeight = img.naturalWidth / targetRatio;
      sy = 0; // ancré en haut pour ne jamais couper les visages
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, px, py, pw, ph);
    ctx.restore();

    // Cadre doré autour de l'arche
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(px + r, py + r, r + 3, Math.PI, 0);
    ctx.lineTo(px + pw + 3, py + ph);
    ctx.lineTo(px - 3, py + ph);
    ctx.closePath();
    ctx.stroke();

    // Ornement losange au sommet de l'arche
    ctx.save();
    ctx.fillStyle = "#D4AF37";
    ctx.translate(canvas.width / 2, py - 4);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-12, -12, 24, 24);
    ctx.restore();
  } catch {
    // Si l'image ne charge pas, continuer sans crash
  }

  // 6. Noms des mariés
  ctx.fillStyle = "#FDFBF7";
  ctx.font = "bold 68px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("Élisée & Lydia", canvas.width / 2, 765);

  ctx.fillStyle = "#CD7F32";
  ctx.font = "24px sans-serif";
  ctx.fillText("Uniront leurs destinées devant Dieu et les Hommes", canvas.width / 2, 810);

  // Séparateur losanges décoratifs
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.fillStyle = "#D4AF37";
    ctx.translate(canvas.width / 2 + (i - 2) * 36, 845);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-7, -7, 14, 14);
    ctx.restore();
  }

  // 7. Bloc Invité d'Honneur (Mise en page royale aérée)
  const boxX = 90;
  const boxY = 880;
  const boxW = canvas.width - 180;
  const boxH = 430;

  ctx.fillStyle = "#220F0B";
  ctx.fillRect(boxX, boxY, boxW, boxH);

  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 2;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Coins du bloc invité
  const drawBoxCorner = (bx: number, by: number) => {
    ctx.save();
    ctx.fillStyle = "#CD7F32";
    ctx.translate(bx, by);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-8, -8, 16, 16);
    ctx.restore();
  };
  drawBoxCorner(boxX, boxY);
  drawBoxCorner(boxX + boxW, boxY);
  drawBoxCorner(boxX, boxY + boxH);
  drawBoxCorner(boxX + boxW, boxY + boxH);

  ctx.fillStyle = "#CD7F32";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("INVITÉ(E) D'HONNEUR", canvas.width / 2, boxY + 50);

  // Nom de l'invité
  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 52px Georgia, serif";
  const guestName = data.name.length > 25 ? data.name.substring(0, 25) + "..." : data.name;
  ctx.fillText(guestName.toUpperCase(), canvas.width / 2, boxY + 120);

  // Statut présence
  const presenceText = data.present === "oui"
    ? `✓  Présence confirmée (${data.groupSize || 1} personne${(data.groupSize || 1) > 1 ? "s" : ""})`
    : data.present === "non"
    ? "✗  Absent(e) de cœur"
    : "Présence à confirmer";
  ctx.fillStyle = data.present === "oui" ? "#86efac" : "#CD7F32";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(presenceText, canvas.width / 2, boxY + 175);

  // Ligne de séparation dans le bloc
  ctx.strokeStyle = "#D4AF37";
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(boxX + 40, boxY + 205);
  ctx.lineTo(boxX + boxW - 40, boxY + 205);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Menu choisi
  if (data.present === "oui" && data.mainDish) {
    ctx.fillStyle = "#CD7F32";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("MENU GASTRONOMIQUE", canvas.width / 2, boxY + 245);

    ctx.fillStyle = "#FDFBF7";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText(data.mainDish, canvas.width / 2, boxY + 285);

    if (data.sideDish) {
      ctx.fillStyle = "#E2D9D2";
      ctx.font = "22px sans-serif";
      ctx.fillText(`Accompagnement : ${data.sideDish}`, canvas.width / 2, boxY + 325);
    }

    ctx.fillStyle = "#CD7F32";
    ctx.globalAlpha = 0.7;
    ctx.font = "italic 20px Georgia, serif";
    ctx.fillText("D'autres plats vous attendent sur place !", canvas.width / 2, boxY + 370);
    ctx.globalAlpha = 1;
  }

  // Note: gift/offrande NOT displayed on card (confidential)

  // 8. QR CODE UNIQUE SCANNABLE PAR SMARTPHONE
  // Encode l'URL officielle du passe-droit invité : quand scanné par un téléphone, ouvre le profil de l'invité !
  const origin = typeof window !== "undefined" ? window.location.origin : "https://mariage-elisee-lydia.vercel.app";
  const qrTargetUrl = data.rsvpId ? `${origin}/guest/${data.rsvpId}` : `${origin}/#rsvp`;

  try {
    const qrDataUrl = await QRCode.toDataURL(qrTargetUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 200,
      color: { dark: "#D4AF37", light: "#160907" },
    });

    const qrImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = document.createElement("img") as HTMLImageElement;
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = qrDataUrl;
    });

    // Cadre doré autour du QR
    const qrSize = 160;
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = boxY + boxH + 30;

    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 3;
    ctx.strokeRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16);

    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    // Label sous le QR
    ctx.fillStyle = "#CD7F32";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCANNEZ POUR VÉRIFIER L'INVITATION", canvas.width / 2, qrY + qrSize + 30);

    ctx.fillStyle = "#FDFBF7";
    ctx.globalAlpha = 0.6;
    ctx.font = "14px sans-serif";
    ctx.fillText("Scannez avec votre appareil photo pour voir le passe-droit", canvas.width / 2, qrY + qrSize + 52);
    ctx.globalAlpha = 1;
  } catch {
    // QR code en erreur — continuer sans
  }

  // 9. Détails pratiques de la cérémonie
  const detY = 1560;
  ctx.fillStyle = "#FDFBF7";
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("📅  Samedi 10 Octobre 2026   •   🕛  12h00 Précises", canvas.width / 2, detY);

  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 28px Georgia, serif";
  ctx.fillText("📍  Sweetlife Garden, BONOUMIN", canvas.width / 2, detY + 50);

  // 10. Ligne de clôture et Sceau royal
  const sealY = 1690;
  ctx.strokeStyle = "#D4AF37";
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(100, sealY);
  ctx.lineTo(canvas.width - 100, sealY);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#CD7F32";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("✦ SCEAU ROYAL AUTHENTIQUE", 100, sealY + 55);

  ctx.textAlign = "right";
  ctx.fillText("ÉLISÉE & LYDIA 2026 ✦", canvas.width - 100, sealY + 55);

  // ✅ Retourner un BLOB URL propre
  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(URL.createObjectURL(blob));
      else resolve(canvas.toDataURL("image/png"));
    }, "image/png", 1.0);
  });
}

// ============================
// CARTE ROYALE — FLOW : Carte → Téléchargement → Pagnes
// ============================
function RoyalInvitationCard({
  data,
  onReset,
}: {
  data: FormData;
  onReset: () => void;
}) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(true);
  const filename = `invitation-royale-${data.name.replace(/\s+/g, "-").toLowerCase()}.png`;

  // Générer le blob immédiatement au montage
  useEffect(() => {
    generateCardBlob(data)
      .then((url) => {
        setBlobUrl(url);
        setGenerating(false);
      })
      .catch(() => setGenerating(false));
  }, [data]);

  // Libérer la mémoire à la destruction
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  return (
    <div className="w-full flex flex-col items-center gap-6 py-8 px-4">

      {/* En-tête de confirmation */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-400/15 border border-green-400/40 text-green-400 text-xs uppercase tracking-[0.25em] font-bold mb-3 shadow-lg">
          <CheckCircle size={15} /> Inscription Confirmée avec Succès 🎉
        </div>
        <h3 className="text-3xl sm:text-5xl font-heading text-african-ivory mb-2">
          Votre Carte d&apos;Invitation Royale 👑
        </h3>
        <p className="text-african-sand/80 font-sans text-sm sm:text-base leading-relaxed">
          {generating
            ? "Génération de votre carte officielle en haute définition..."
            : "Votre carte officielle est prête ci-dessous. Téléchargez-la puis découvrez le pagne officiel de la fête !"}
        </p>
      </motion.div>

      {/* Aperçu de la Carte en Haute Résolution (naturel, sans compression d'aspect) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm sm:max-w-md"
      >
        {generating ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4 bg-[#2A1610]/80 border-2 border-african-gold/50 rounded-sm">
            <div className="w-14 h-14 border-4 border-african-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-african-gold text-sm font-sans uppercase tracking-widest animate-pulse">
              Génération Haute Définition...
            </p>
          </div>
        ) : blobUrl ? (
          <div className="relative group">
            <img
              src={blobUrl}
              alt="Votre carte d'invitation royale"
              className="w-full h-auto object-contain rounded-sm shadow-[0_25px_70px_rgba(0,0,0,0.95)] border-4 border-african-gold"
            />
          </div>
        ) : (
          <p className="text-red-400 text-center py-8">Erreur de chargement. Veuillez recharger la page.</p>
        )}
      </motion.div>

      {/* BOUTONS D'ACTION POST-INSCRIPTION */}
      {!generating && blobUrl && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm sm:max-w-md flex flex-col gap-4"
        >
          {/* BOUTON 1 : TÉLÉCHARGER LA CARTE (Fonctionne 100% sur Chrome, Android, PC, Safari iOS 15+) */}
          <a
            href={blobUrl}
            download={filename}
            className="w-full py-5 px-6 bg-gradient-to-r from-african-terra via-african-gold to-african-bronze text-[#1A0B08] font-sans font-black uppercase tracking-[0.2em] text-sm sm:text-base shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 text-center rounded-sm cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Download size={22} />
            <span>Télécharger ma Carte</span>
          </a>

          {/* Indication utile pour iPhone */}
          <p className="text-center text-[11px] sm:text-xs text-african-sand/60 font-sans leading-relaxed">
            📱 Sur iPhone : si besoin, <span className="text-african-gold font-semibold">appuyez longuement</span> sur le bouton → <span className="text-african-gold font-semibold">&quot;Télécharger le fichier lié&quot;</span> ou enregistrez l&apos;image ci-dessus dans vos Photos.
          </p>

          {/* Séparateur élégant */}
          <div className="flex items-center gap-3 my-1">
            <div className="h-px flex-1 bg-african-gold/30" />
            <span className="text-african-gold text-xs uppercase tracking-widest font-bold">Étape suivante</span>
            <div className="h-px flex-1 bg-african-gold/30" />
          </div>

          {/* BOUTON 2 : COMMANDER LE PAGNE OFFICIEL */}
          <a
            href="#pagne"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pagne")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full py-5 px-6 bg-[#2A1610] border-2 border-african-gold text-african-gold font-sans font-bold uppercase tracking-[0.18em] text-sm sm:text-base hover:bg-african-gold hover:text-[#1A0B08] active:scale-95 transition-all flex items-center justify-center gap-3 text-center rounded-sm shadow-xl cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <ShoppingBag size={20} />
            <span>Commander le Pagne Officiel 👗</span>
          </a>

          {/* Bouton Modifier */}
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
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<FormData>();
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

  // ✅ Remonter automatiquement jusqu'à la carte d'invitation dès la validation
  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        const el = document.getElementById("rsvp");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  }, [status]);

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
        const resJson = await response.json();
        setSubmittedData({ ...data, rsvpId: resJson.rsvp?.id });
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
                  <p className="text-sm font-sans uppercase tracking-[0.2em] text-african-copper">Choisissez vos 2 mets préférés — d'autres plats vous attendent sur place</p>
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

                    {/* Message de remerciement quand un cadeau est choisi */}
                    <AnimatePresence>
                      {giftCategory && giftCategory !== "Je n'ai pas de cadeau" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-8 p-5 border border-african-gold/40 bg-african-gold/5 text-center rounded-sm"
                        >
                          <Heart size={24} className="mx-auto text-african-gold mb-2" />
                          <p className="text-african-gold font-heading text-2xl mb-1">Merci 🙏</p>
                          <p className="text-african-sand/80 font-sans text-xs leading-relaxed">
                            Votre générosité nous touche profondément. Merci du fond du cœur pour cette belle attention.
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
