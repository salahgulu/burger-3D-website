import React from 'react';
import { motion } from 'framer-motion';

const FloatingInput = ({ type, id, label, isTextarea }) => {
  return (
    <div className="relative z-0 w-full mb-8 group">
      {isTextarea ? (
        <textarea
          name={id}
          id={id}
          className="block py-3 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-neutral-700 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer resize-none interactive"
          placeholder=" "
          required
          rows="4"
        />
      ) : (
        <input
          type={type}
          name={id}
          id={id}
          className="block py-3 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-neutral-700 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer interactive"
          placeholder=" "
          required
        />
      )}
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-lg text-neutral-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
      >
        {label}
      </label>
    </div>
  );
};

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <span className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Reserve a Table
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Join the <br/>
            <span className="gradient-text-warm italic">Blaze</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-md">
            Whether it's a private event or a late-night craving, we're here to serve you the best burgers in town.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group interactive">
              <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold">123 Culinary Ave</p>
                <p className="text-neutral-500 text-sm">New York, NY 10012</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group interactive">
              <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold">(555) 123-4567</p>
                <p className="text-neutral-500 text-sm">Mon-Sun, 11AM - 11PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Liquid Glass Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form className="liquid-glass rounded-3xl p-10 md:p-12" onSubmit={(e) => e.preventDefault()}>
            <FloatingInput type="text" id="name" label="Your Name" />
            <FloatingInput type="email" id="email" label="Email Address" />
            <FloatingInput type="text" id="subject" label="Subject (Optional)" />
            <FloatingInput id="message" label="Your Message" isTextarea />
            
            <button 
              type="submit"
              className="w-full interactive relative overflow-hidden group bg-orange-500 text-white font-bold text-lg py-4 rounded-xl transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
            >
              <span className="relative z-10">Send Message</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
