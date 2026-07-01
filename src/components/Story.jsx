import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Story() {
  const { scrollYProgress } = useScroll();
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section id="story" className="relative py-40 px-6 overflow-hidden">
      {/* Full background smoke texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/smoke-texture.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-deep)] via-transparent to-[var(--color-bg-deep)]" />
      </div>

      {/* Massive Background Outline Text */}
      <motion.div 
        className="absolute top-1/4 left-0 w-full flex flex-col items-center justify-center opacity-[0.06] pointer-events-none z-0"
        style={{ y: yBg }}
      >
        <span className="text-[20vw] font-black text-outline whitespace-nowrap leading-none">
          BLAZE
        </span>
        <span className="text-[20vw] font-black text-outline-strong whitespace-nowrap leading-none -mt-10">
          BURGER
        </span>
      </motion.div>

      <div className="w-full px-4 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Overlapping Editorial Images — filled, no gaps */}
          <div className="relative h-[700px] w-full">
            {/* Main large image */}
            <motion.div 
              className="absolute top-0 left-0 w-[90%] h-[480px] rounded-3xl overflow-hidden glass-panel z-10"
              initial={{ opacity: 0, x: -50, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, rotate: -1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, type: 'spring' }}
            >
              <img 
                src="/images/truffle-burger.jpg" 
                alt="Gourmet burger preparation" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            
            {/* Overlapping image */}
            <motion.div 
              className="absolute bottom-0 right-0 w-[80%] h-[380px] rounded-3xl overflow-hidden glass-panel border-orange-500/20 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, x: 50, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.2, type: 'spring' }}
              style={{ y: yBg2 }}
            >
              <img 
                src="/images/bacon-burger.jpg" 
                alt="Sizzling bacon burger" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2000ms]"
              />
            </motion.div>

            {/* Small accent image to fill corner */}
            <motion.div
              className="absolute top-[420px] left-0 w-[35%] h-[200px] rounded-2xl overflow-hidden z-30 border border-white/5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
            >
              <img 
                src="/images/burger-assembly.jpg" 
                alt="Burger layers" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          </div>

          {/* Staggered Text Reveal */}
          <div className="flex flex-col justify-center lg:pl-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-6 block"
            >
              The Philosophy
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Born from <br/>
              <span className="gradient-text-warm italic">Fire & Soul</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              We don't just assemble burgers; we engineer experiences. 
              By combining high-end culinary techniques with the primal, 
              raw power of open flame cooking, we've elevated the humble 
              cheeseburger into a <strong className="text-white">gastronomic masterpiece</strong>.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex gap-10 mb-10"
            >
              <div>
                <span className="text-3xl font-black gradient-text-warm block">12+</span>
                <span className="text-neutral-500 text-sm uppercase tracking-wider">Years</span>
              </div>
              <div>
                <span className="text-3xl font-black gradient-text-warm block">50K</span>
                <span className="text-neutral-500 text-sm uppercase tracking-wider">Burgers Served</span>
              </div>
              <div>
                <span className="text-3xl font-black gradient-text-warm block">4.9</span>
                <span className="text-neutral-500 text-sm uppercase tracking-wider">Rating</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button className="interactive group flex items-center gap-4 text-white font-semibold">
                <span className="w-12 h-12 rounded-full border border-orange-500/50 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                  <svg className="w-5 h-5 group-hover:text-white text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="uppercase tracking-widest text-sm group-hover:text-orange-400 transition-colors">
                  Read Our Story
                </span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
