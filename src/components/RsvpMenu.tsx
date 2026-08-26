"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Users } from "lucide-react";

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

const plats = ["Médaillons de bœuf au poivre", "Filet de bar rôti, sauce agrumes", "Risotto aux champignons sauvages"];
const accompagnements = ["Gratin dauphinois revisité", "Légumes de saison glacés", "Mousseline de patates douces"];

const giftCategories: Record<string, string[]> = {
  "Mobilier": ["canapé", "fauteuil", "table à manger", "chaises", "table basse", "meuble TV", "buffet", "commode", "armoire", "lit", "tête de lit", "table de chevet", "bureau", "bibliothèque", "meuble de rangement", "meuble de cuisine", "meuble de salle de bain", "dressing", "miroir", "console", "pouf", "chaise de bureau", "mobilier extérieur", "salon de jardin", "Autre mobilier"],
  "Électroménager": ["réfrigérateur", "congélateur", "cuisinière", "four", "micro-ondes", "lave-vaisselle", "blender", "mixeur", "robot de cuisine", "machine à café", "bouilloire", "grille-pain", "friteuse", "air fryer", "extracteur de jus", "appareil à raclette", "machine à laver", "sèche-linge", "aspirateur", "fer à repasser", "centrale vapeur", "ventilateur", "climatiseur", "purificateur d’air", "chauffe-eau", "Autre électroménager"],
  "Électronique & High-Tech": ["télévision", "vidéoprojecteur", "ordinateur portable", "tablette", "smartphone", "enceinte Bluetooth", "système audio", "home cinéma", "casque audio", "écouteurs", "montre connectée", "appareil photo", "caméra", "console de jeux", "accessoires informatiques", "imprimante", "disque dur", "Autre électronique"],
  "Expérience": ["voyage", "week-end", "séjour romantique", "dîner gastronomique", "dîner romantique", "spa", "massage", "escapade", "activité culturelle", "activité touristique", "expérience insolite", "séance photo", "activité détente", "Autre expérience"],
  "Don en numéraire": []
};

export default function RsvpMenu() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [claimedGifts, setClaimedGifts] = useState<string[]>([]);
  
  const present = watch("present");
  const giftCategory = watch("giftCategory");
  const giftSubCategory = watch("giftSubCategory");

  useEffect(() => {
    fetch("/api/gifts")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setClaimedGifts(data.claimedGifts);
        }
      })
      .catch(err => console.error("Error fetching gifts:", err));
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    
    // Format the final gift string
    let finalGift = null;
    if (data.present === "oui" && data.giftCategory) {
      if (data.giftCategory === "Don en numéraire") {
        finalGift = "Don en numéraire";
      } else if (data.giftSubCategory?.startsWith("Autre")) {
        finalGift = `${data.giftCategory} - ${data.giftCustom}`;
      } else {
        finalGift = `${data.giftCategory} - ${data.giftSubCategory}`;
      }
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          gift: finalGift
        }),
      });
      
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="rsvp" className="py-32 px-4 bg-[#1A0B08] min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Animated Royal Seal Confirmation */}
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
            ></motion.div>
            <motion.div 
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute inset-2 bg-gradient-to-br from-african-terra to-african-bronze rounded-full shadow-[0_0_50px_rgba(192,74,42,0.6)] flex items-center justify-center"
            >
              {/* Motif géométrique au centre du sceau */}
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

  return (
    <section id="rsvp" className="py-32 px-4 relative overflow-hidden bg-[#2A1610]">
      {/* Texture de fond */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23CD7F32\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-sans uppercase tracking-[0.5em] text-african-copper mb-6">Registre Royal</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-african-ivory">Confirmez votre venue</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* NAME */}
            <div className="relative group">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest">Nom et Prénom</label>
              <div className="relative border-b border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                <input type="text" {...register("name", { required: true })} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold placeholder-african-gold/30" placeholder="Son Excellence..." />
              </div>
            </div>

            {/* PHONE */}
            <div className="relative group">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest">Numéro de Téléphone</label>
              <div className="relative border-b border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                <input type="tel" {...register("phone", { required: true })} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold placeholder-african-gold/30" placeholder="+225 00 00 00 00 00" />
              </div>
            </div>

            {/* PRESENCE */}
            <div className="relative group md:col-span-2 max-w-md mx-auto w-full">
              <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Serez-vous présent ?</label>
              <select {...register("present", { required: true })} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b border-african-gold/50">
                <option value="" className="bg-[#1A0B08]">Sélectionnez...</option>
                <option value="oui" className="bg-[#1A0B08]">Oui, je serai présent</option>
                <option value="non" className="bg-[#1A0B08]">Non, je ne pourrai malheureusement pas être présent</option>
                <option value="peut-etre" className="bg-[#1A0B08]">Je ne suis pas encore certain(e)</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {present === "oui" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-20 overflow-hidden">
                
                <div className="relative group max-w-md mx-auto w-full mb-20">
                  <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Nombre d'invités</label>
                  <div className="flex items-center justify-center border-b border-african-gold/50 group-focus-within:border-african-gold transition-colors">
                    <Users className="text-african-gold mr-4" size={20} />
                    <input type="number" min="1" max="5" {...register("groupSize", { required: true, valueAsNumber: true })} className="w-32 text-center py-4 bg-transparent focus:outline-none text-xl font-sans text-african-ivory" defaultValue={1} />
                  </div>
                </div>

                <div className="text-center mb-16">
                  <UtensilsCrossed size={40} className="mx-auto text-african-gold mb-6" />
                  <h4 className="text-4xl md:text-5xl font-heading text-african-ivory mb-2">Menu Gastronomique</h4>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-[#3E2723]/80 p-8 rounded-sm border border-african-gold/20 shadow-xl backdrop-blur-md relative">
                    {/* Coins décoratifs */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-african-gold m-2"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-african-gold m-2"></div>
                    
                    <h5 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-african-gold mb-8 text-center border-b border-african-gold/30 pb-4">Plats Principaux</h5>
                    <div className="space-y-3">
                      {plats.map((plat) => (
                        <label key={plat} className="flex items-center space-x-4 cursor-pointer group hover:bg-[#1A0B08]/40 p-4 rounded-sm transition-all duration-300">
                          <div className="w-5 h-5 rounded-full border-2 border-african-gold flex items-center justify-center">
                            <input type="radio" value={plat} {...register("mainDish", { required: true })} className="opacity-0 absolute w-0 h-0 peer" />
                            <div className="w-2.5 h-2.5 rounded-full bg-african-gold opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="text-lg font-sans text-african-ivory group-hover:text-african-gold transition-colors">{plat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#3E2723]/80 p-8 rounded-sm border border-african-gold/20 shadow-xl backdrop-blur-md relative">
                    {/* Coins décoratifs */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-african-gold m-2"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-african-gold m-2"></div>
                    
                    <h5 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-african-gold mb-8 text-center border-b border-african-gold/30 pb-4">Accompagnements</h5>
                    <div className="space-y-3">
                      {accompagnements.map((acc) => (
                        <label key={acc} className="flex items-center space-x-4 cursor-pointer group hover:bg-[#1A0B08]/40 p-4 rounded-sm transition-all duration-300">
                          <div className="w-5 h-5 rounded-full border-2 border-african-gold flex items-center justify-center">
                            <input type="radio" value={acc} {...register("sideDish", { required: true })} className="opacity-0 absolute w-0 h-0 peer" />
                            <div className="w-2.5 h-2.5 rounded-full bg-african-gold opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="text-lg font-sans text-african-ivory group-hover:text-african-gold transition-colors">{acc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SECTION CADEAUX INTELLIGENTE */}
                <div className="mt-20 text-center">
                  <h4 className="text-4xl md:text-5xl font-heading text-african-ivory mb-2">Votre Offrande</h4>
                  <p className="text-sm font-sans uppercase tracking-[0.2em] text-african-gold mb-10">Participez à notre joie</p>
                  
                  <div className="max-w-2xl mx-auto bg-[#3E2723]/80 p-8 rounded-sm border border-african-gold/20 shadow-xl backdrop-blur-md relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-african-gold m-4 opacity-50"></div>
                    
                    <p className="text-[10px] text-african-ivory/60 uppercase tracking-widest mb-6 border border-african-bronze p-2 bg-[#1A0B08]/50">
                      Pour éviter les doublons de cadeaux, veuillez sélectionner dans votre inscription le cadeau que vous comptez offrir. Les cadeaux déjà réservés sont grisés.
                    </p>

                    <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center mt-8">Quelle est la nature du cadeau que vous souhaitez offrir ?</label>
                    <select {...register("giftCategory")} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b border-african-gold/30">
                      <option value="" className="bg-[#1A0B08]">Sélectionnez une catégorie...</option>
                      {Object.keys(giftCategories).map(cat => (
                        <option key={cat} value={cat} className="bg-[#1A0B08]">{cat}</option>
                      ))}
                    </select>

                    {/* SOUS CATÉGORIE */}
                    <AnimatePresence>
                      {giftCategory && giftCategories[giftCategory]?.length > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-8">
                          <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Précisez votre choix</label>
                          <select {...register("giftSubCategory")} className="w-full py-4 bg-transparent focus:outline-none text-lg font-sans text-african-ivory text-center border-b border-african-bronze/50">
                            <option value="" className="bg-[#1A0B08]">Sélectionnez un élément...</option>
                            {giftCategories[giftCategory].map(sub => {
                              const uniqueKey = `${giftCategory} - ${sub}`;
                              const isClaimed = claimedGifts.includes(uniqueKey);
                              return (
                                <option key={sub} value={sub} disabled={isClaimed} className={`bg-[#1A0B08] ${isClaimed ? "text-gray-500 line-through" : ""}`}>
                                  {sub} {isClaimed ? "(Déjà réservé)" : ""}
                                </option>
                              );
                            })}
                          </select>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CHAMP LIBRE POUR "AUTRE" */}
                    <AnimatePresence>
                      {giftSubCategory?.startsWith("Autre") && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-8">
                          <label className="block text-african-ivory text-xs font-bold mb-3 uppercase tracking-widest text-center">Lequel ?</label>
                          <input type="text" {...register("giftCustom", { required: true })} className="w-full py-4 bg-transparent focus:outline-none text-xl font-sans text-african-gold text-center border-b border-african-bronze/50 placeholder-african-gold/30" placeholder="Ex: Machine à pain..." />
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-32 pb-16 text-center relative">
            <button type="submit" disabled={status === "loading"} className="relative group inline-block">
              {/* Le Sceau Royal Africain */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-african-terra to-[#3E2723] shadow-[0_10px_30px_rgba(192,74,42,0.6)] flex items-center justify-center border-4 border-african-gold group-hover:scale-95 group-active:scale-90 transition-transform duration-300">
                <div className="absolute inset-2 border-2 border-dashed border-african-gold/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-african-gold/30 rounded-full"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-deco text-african-gold text-3xl md:text-4xl mb-1">E&L</span>
                  <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-african-gold font-bold">
                    {status === "loading" ? "Scellement..." : "Confirmer"}
                  </span>
                </div>
                <div className="absolute top-2 left-2 w-10 h-10 bg-white/10 rounded-full blur-sm"></div>
              </div>
              <div className="absolute inset-0 bg-african-gold/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <p className="mt-8 font-sans text-xs uppercase tracking-widest text-african-gold/80">Apposer votre sceau</p>
          </div>
          {status === "error" && <p className="text-red-500 text-center mt-4 font-sans">Une erreur est survenue lors de l'enregistrement de votre sceau.</p>}
        </form>
      </div>
    </section>
  );
}
