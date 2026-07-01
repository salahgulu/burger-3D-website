import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[var(--color-bg-deep)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Floating Embers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-500 rounded-full opacity-60"
          style={{
            left: `${20 + i * 12}%`,
            bottom: '10%',
          }}
          animate={{
            y: [-20, -200 - i * 40],
            x: [0, (i % 2 === 0 ? 30 : -30)],
            opacity: [0.6, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut',
          }}
        />
      ))}

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-orange-400 tracking-widest uppercase">
            Premium Craft Burgers
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-white">Flame</span>
          <br />
          <span className="gradient-text-warm">Grilled</span>
          <br />
          <span className="text-white italic">Perfection</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Hand-crafted with premium ingredients, smoked over open flame, and 
          assembled with obsessive attention to every layer.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#menu"
            className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full text-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Explore Menu
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#experience"
            className="px-8 py-4 border border-white/20 text-white font-medium rounded-full text-lg hover:bg-white/5 transition-all duration-300 hover:border-orange-500/40"
          >
            3D Experience
          </a>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-3 bg-orange-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
