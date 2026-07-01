import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-300">
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>B</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
            BLAZE<span className="text-orange-500">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Order CTA */}
        <div className="hidden md:block">
          <a
            href="#menu"
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Order Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
            className="block w-6 h-0.5 bg-white"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-neutral-300 hover:text-orange-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#menu"
                className="mt-2 text-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
