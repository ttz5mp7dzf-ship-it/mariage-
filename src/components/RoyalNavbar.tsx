"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crown, Calendar, Gift, ShoppingBag, MapPin, CheckCircle, Image as ImageIcon, Heart } from "lucide-react";

const NAV_ITEMS = [
  { label: "Accueil", href: "#accueil", icon: Crown },
  { label: "Invitation", href: "#invitation", icon: Heart },
  { label: "Galerie", href: "#histoire", icon: ImageIcon },
  { label: "Offrandes", href: "#cadeaux", icon: Gift },
  { label: "Présence", href: "#rsvp", icon: CheckCircle },
  { label: "L'Étoffe", href: "#pagne", icon: ShoppingBag },
  { label: "Lieu", href: "#localisation", icon: MapPin },
];

export default function RoyalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Section spy
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (href === "#accueil") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#1A0B08]/95 backdrop-blur-md border-b border-african-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
            : "bg-gradient-to-b from-[#1A0B08]/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Monogramme */}
          <a
            href="#accueil"
            onClick={(e) => scrollTo(e, "#accueil")}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-african-terra to-[#3E2723] border border-african-gold rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform">
              <span className="font-deco text-african-gold text-sm -rotate-45 font-bold">E&L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-african-ivory text-base sm:text-xl font-bold tracking-wide">
                Élisée <span className="text-african-gold">&</span> Lydia
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-african-gold/80 font-sans">
                Cour Royale
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`relative px-3.5 py-2 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 rounded-sm ${
                    isActive
                      ? "text-african-gold font-bold bg-african-gold/10 border-b-2 border-african-gold"
                      : "text-african-ivory/80 hover:text-african-gold hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-african-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Desktop */}
          <div className="hidden md:block">
            <a
              href="#rsvp"
              onClick={(e) => scrollTo(e, "#rsvp")}
              className="relative group inline-block"
            >
              <div className="absolute inset-0 bg-african-gold/30 rounded-sm blur-sm group-hover:blur-md transition-all opacity-60 group-hover:opacity-100" />
              <div className="relative px-5 py-2 bg-[#3E2723] border border-african-gold text-african-gold text-xs uppercase tracking-[0.25em] font-bold hover:bg-african-gold hover:text-[#1A0B08] transition-colors rounded-sm">
                Confirmer
              </div>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="md:hidden p-2 text-african-gold hover:text-african-ivory focus:outline-none"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#1A0B08]/98 border-b-2 border-african-gold shadow-2xl p-6 md:hidden backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-sm text-sm uppercase tracking-[0.2em] transition-colors ${
                      isActive
                        ? "bg-african-gold/15 text-african-gold font-bold border-l-4 border-african-gold"
                        : "text-african-ivory/80 hover:bg-white/5 hover:text-african-gold"
                    }`}
                  >
                    <Icon size={18} className="text-african-gold" />
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-african-gold/20">
                <a
                  href="#rsvp"
                  onClick={(e) => scrollTo(e, "#rsvp")}
                  className="block text-center py-3.5 bg-gradient-to-r from-african-terra to-[#3E2723] border border-african-gold text-african-gold font-bold uppercase tracking-[0.25em] text-sm shadow-lg rounded-sm"
                >
                  Confirmer Présence
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
