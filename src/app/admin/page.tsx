"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, CheckCircle, XCircle, Gift, UtensilsCrossed,
  Lock, Eye, EyeOff, Download, RefreshCw, Crown,
} from "lucide-react";

type Rsvp = {
  id: string;
  name: string;
  phone: string;
  present: boolean;
  groupSize: number;
  mainDish: string | null;
  sideDish: string | null;
  gift: string | null;
  createdAt: string;
};

type AdminData = {
  stats: { total: number; present: number; absent: number; totalGuests: number };
  menuStats: Record<string, number>;
  gifts: string[];
  rsvps: Rsvp[];
};

// ===== ÉCRAN DE CONNEXION =====
function LoginScreen({ onLogin, error }: { onLogin: (pwd: string) => void; error: boolean }) {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.trim()) onLogin(pwd.trim());
  };

  return (
    <div className="min-h-screen bg-[#1A0B08] flex items-center justify-center px-4">
      <div
        className="fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M30 0L60 30L30 60L0 30L30 0ZM30 10L10 30L30 50L50 30L30 10Z%22 fill%3D%22%23CD7F32%22%2F%3E%3C%2Fsvg%3E')",
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#D4AF37] rotate-45 shadow-[0_0_30px_rgba(212,175,55,0.5)] z-10">
          <div className="absolute inset-[4px] border border-[#1A0B08]" />
        </div>
        <div className="relative bg-[#2A1610] border-2 border-[#D4AF37] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/50" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/50" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/50" />

          <div className="text-center mt-4 mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Crown size={24} className="text-[#D4AF37]" />
              <h1 className="text-2xl font-serif text-[#D4AF37] tracking-[0.3em] uppercase">Espace Royal</h1>
              <Crown size={24} className="text-[#D4AF37]" />
            </div>
            <p className="text-xs font-sans text-[#FDFBF7]/40 uppercase tracking-widest">Élisée & Lydia · Administration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#FDFBF7]/50 text-xs uppercase tracking-widest mb-3">
                <Lock size={11} className="inline mr-2" />Mot de passe
              </label>
              <div className="flex items-center border-b-2 border-[#D4AF37]/30 focus-within:border-[#D4AF37] transition-colors">
                <input
                  type={show ? "text" : "password"}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="flex-1 py-4 bg-transparent text-xl font-sans text-[#D4AF37] placeholder-[#D4AF37]/20 focus:outline-none"
                  placeholder="••••••••"
                  autoFocus
                />
                <button type="button" onClick={() => setShow(!show)} className="text-[#D4AF37]/40 hover:text-[#D4AF37] p-2 transition-colors">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs mt-2 font-sans">Mot de passe incorrect. Réessayez.</p>}
            </div>
            <button type="submit" className="w-full group relative mt-2">
              <div className="relative bg-[#3E2723] border border-[#D4AF37]/50 py-4 text-[#D4AF37] font-sans font-bold uppercase tracking-[0.3em] text-sm hover:bg-[#D4AF37] hover:text-[#1A0B08] transition-all duration-300 text-center">
                Entrer dans le Registre
              </div>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ===== TABLEAU DE BORD =====
function Dashboard({ data, secret, onRefresh }: { data: AdminData; secret: string; onRefresh: () => void }) {
  const [tab, setTab] = useState<"all" | "present" | "absent" | "gifts">("all");
  const [search, setSearch] = useState("");

  const filtered = data.rsvps.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search);
    if (tab === "present") return r.present && matchSearch;
    if (tab === "absent") return !r.present && matchSearch;
    if (tab === "gifts") return !!r.gift && matchSearch;
    return matchSearch;
  });

  const exportCSV = () => {
    const headers = ["Nom", "Téléphone", "Présent", "Nb Invités", "Plat", "Accompagnement", "Cadeau", "Date"];
    const rows = data.rsvps.map((r) => [
      r.name, r.phone, r.present ? "Oui" : "Non", r.groupSize,
      r.mainDish || "", r.sideDish || "", r.gift || "",
      new Date(r.createdAt).toLocaleDateString("fr-FR"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `rsvp-elisee-lydia-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const statCards = [
    { label: "Réponses reçues", value: data.stats.total, icon: Users, color: "#D4AF37" },
    { label: "Présents confirmés", value: data.stats.present, icon: CheckCircle, color: "#4CAF50" },
    { label: "Absents", value: data.stats.absent, icon: XCircle, color: "#CD7F32" },
    { label: "Invités attendus", value: data.stats.totalGuests, icon: Crown, color: "#B87333" },
  ];

  return (
    <div className="min-h-screen bg-[#1A0B08] text-[#FDFBF7]">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width%3D%2240%22 height%3D%2240%22 viewBox%3D%220 0 40 40%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M20 0L40 20L20 40L0 20L20 0Z%22 fill%3D%22%23CD7F32%22%2F%3E%3C%2Fsvg%3E')", backgroundSize: "40px 40px" }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-[#D4AF37]/20 bg-[#2A1610]/90 backdrop-blur-md px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#D4AF37] rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Crown size={16} className="text-[#1A0B08] -rotate-45" />
          </div>
          <div>
            <h1 className="text-xl font-serif text-[#D4AF37] tracking-[0.2em] uppercase">Registre Royal</h1>
            <p className="text-[10px] text-[#FDFBF7]/40 tracking-widest">Élisée & Lydia · Samedi 10 Octobre 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onRefresh} className="flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37]/60 text-xs uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
            <RefreshCw size={13} /> Actualiser
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#1A0B08] font-bold text-xs uppercase tracking-widest hover:bg-[#B87333] transition-colors">
            <Download size={13} /> Export CSV
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
              className="relative p-6 border border-[#D4AF37]/20 bg-[#2A1610] overflow-hidden">
              <div className="absolute top-1 right-1 w-4 h-4 border-t border-r opacity-30" style={{ borderColor: card.color }} />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l opacity-30" style={{ borderColor: card.color }} />
              <card.icon size={22} className="mb-3" style={{ color: card.color }} />
              <div className="text-4xl font-serif mb-1" style={{ color: card.color }}>{card.value}</div>
              <div className="text-[10px] text-[#FDFBF7]/40 uppercase tracking-widest">{card.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menus */}
          <div className="border border-[#D4AF37]/20 bg-[#2A1610] p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-[#D4AF37]/10 pb-4">
              <UtensilsCrossed size={16} className="text-[#D4AF37]" />
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#D4AF37]">Plats Choisis</h3>
            </div>
            {Object.keys(data.menuStats).length === 0 ? (
              <p className="text-xs text-[#FDFBF7]/20 italic">Aucun choix encore</p>
            ) : (
              <div className="space-y-5">
                {Object.entries(data.menuStats).sort((a, b) => b[1] - a[1]).map(([dish, count]) => {
                  const pct = Math.round((count / Math.max(data.stats.present, 1)) * 100);
                  return (
                    <div key={dish}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[#FDFBF7]/70 truncate max-w-[150px]" title={dish}>{dish}</span>
                        <span className="text-[#D4AF37] font-bold shrink-0 ml-2">{count} <span className="text-[#FDFBF7]/30">({pct}%)</span></span>
                      </div>
                      <div className="h-1.5 bg-[#1A0B08] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#C04A2A] to-[#D4AF37]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cadeaux */}
          <div className="lg:col-span-2 border border-[#D4AF37]/20 bg-[#2A1610] p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-[#D4AF37]/10 pb-4">
              <Gift size={16} className="text-[#D4AF37]" />
              <h3 className="text-xs font-sans uppercase tracking-widest text-[#D4AF37]">
                Cadeaux Réservés <span className="text-[#FDFBF7]/30">({data.gifts.length})</span>
              </h3>
            </div>
            {data.gifts.length === 0 ? (
              <p className="text-xs text-[#FDFBF7]/20 italic">Aucun cadeau réservé pour l'instant</p>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-2">
                {data.gifts.map((gift, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 border border-[#CD7F32]/40 bg-[#3E2723] text-[#CD7F32]">{gift}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Liste des invités */}
        <div className="border border-[#D4AF37]/20 bg-[#2A1610]">
          <div className="p-5 border-b border-[#D4AF37]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
              <Users size={14} /> Registre des Invités
              <span className="text-[#FDFBF7]/30 ml-1">({filtered.length})</span>
            </h3>
            <div className="flex items-center gap-1 flex-wrap">
              {(["all", "present", "absent", "gifts"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${tab === t ? "bg-[#D4AF37] text-[#1A0B08] font-bold" : "text-[#FDFBF7]/30 hover:text-[#D4AF37]"}`}>
                  {t === "all" ? "Tous" : t === "present" ? "✓ Présents" : t === "absent" ? "✗ Absents" : "🎁 Cadeaux"}
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 py-3 border-b border-[#D4AF37]/10">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un invité (nom ou téléphone)..."
              className="w-full bg-transparent text-[#FDFBF7] placeholder-[#FDFBF7]/20 border-b border-[#D4AF37]/20 pb-2 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#D4AF37]/10">
                  {["Nom", "Téléphone", "Présence", "Groupe", "Plat", "Cadeau", "Inscrit le"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-[#FDFBF7]/25 font-normal whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-[#FDFBF7]/15 text-xs uppercase tracking-widest">Aucun résultat</td></tr>
                ) : (
                  filtered.map((r, idx) => (
                    <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }}
                      className="border-b border-[#D4AF37]/5 hover:bg-[#3E2723]/20 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#FDFBF7] whitespace-nowrap">{r.name}</td>
                      <td className="px-5 py-4 text-[#FDFBF7]/40 font-mono text-xs">{r.phone}</td>
                      <td className="px-5 py-4">
                        {r.present
                          ? <span className="flex items-center gap-1 text-green-400 text-xs font-bold"><CheckCircle size={11} /> Oui</span>
                          : <span className="flex items-center gap-1 text-[#CD7F32] text-xs font-bold"><XCircle size={11} /> Non</span>}
                      </td>
                      <td className="px-5 py-4 text-center text-[#D4AF37] font-serif text-lg">{r.groupSize}</td>
                      <td className="px-5 py-4 text-[#FDFBF7]/50 text-xs max-w-[160px] truncate" title={r.mainDish || ""}>{r.mainDish || "—"}</td>
                      <td className="px-5 py-4">
                        {r.gift
                          ? <span className="text-xs px-2 py-1 border border-[#CD7F32]/30 text-[#CD7F32] max-w-[180px] block truncate" title={r.gift}>{r.gift}</span>
                          : <span className="text-[#FDFBF7]/15 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-4 text-[#FDFBF7]/25 text-xs whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}{" "}
                        <span className="text-[#FDFBF7]/15">{new Date(r.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== PAGE PRINCIPALE =====
export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  const fetchData = useCallback(async (pwd: string) => {
    setLoading(true);
    setAuthError(false);
    try {
      const res = await fetch(`/api/admin?secret=${encodeURIComponent(pwd)}`);
      if (res.status === 401) {
        setAuthError(true);
        setData(null);
        setSecret("");
      } else {
        const json = await res.json();
        if (json.success) { setData(json); setSecret(pwd); }
      }
    } catch {
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A0B08] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[#D4AF37]/50 text-xs uppercase tracking-widest">Ouverture du registre...</p>
        </div>
      </div>
    );
  }

  if (!data) return <LoginScreen onLogin={fetchData} error={authError} />;
  return <Dashboard data={data} secret={secret} onRefresh={() => fetchData(secret)} />;
}
