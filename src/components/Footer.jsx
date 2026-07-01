import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  return (
    <footer className="relative bg-black pt-32 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/embers-footer.jpg" 
          alt="Glowing embers" 
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 to-transparent" />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32 text-neutral-400">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ fontFamily: 'var(--font-display)' }}>
              BLAZE BURGER
            </h3>
            <p className="max-w-md text-lg leading-relaxed text-neutral-300">
              Elevating the American classic through culinary excellence, premium ingredients, and the primal power of fire.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-[0.2em] uppercase text-sm drop-shadow-md">Explore</h4>
            <ul className="space-y-4">
              {['Menu', 'Our Story', 'Locations', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="group flex items-center gap-2 hover:text-white transition-colors interactive">
                    <span className="w-0 h-0.5 bg-orange-500 group-hover:w-4 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-[0.2em] uppercase text-sm drop-shadow-md">Socials</h4>
            <ul className="space-y-4">
              {['Instagram', 'Twitter (X)', 'TikTok', 'Facebook'].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center gap-2 hover:text-orange-400 transition-colors interactive">
                    {item}
                    <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 relative z-20">
          <p>© {new Date().getFullYear()} Blaze Burger. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-400 transition-colors interactive">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors interactive">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Massive Glowing Logo Reveal */}
      <motion.div 
        className="w-full flex justify-center items-end mt-10 overflow-hidden pointer-events-none relative z-10"
        style={{ scale, opacity, y }}
      >
        <span 
          className="text-[25vw] font-black leading-[0.75] select-none"
          style={{ 
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(to bottom, #fff, #f97316, #991b1b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 -10px 50px rgba(249,115,22,0.4))'
          }}
        >
          BLAZE
        </span>
      </motion.div>
    </footer>
  );
}
