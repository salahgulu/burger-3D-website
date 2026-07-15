import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReservationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    guests: '2',
    date: '',
    time: ''
  });

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#141210] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600" />
            
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                    Reserve a <span className="text-orange-500 italic">Table</span>
                  </h2>
                  <p className="text-neutral-400 text-sm mt-2">Experience culinary excellence.</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
                    placeholder="Marcus Chen"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Guests</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-all appearance-none"
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: e.target.value})}
                    >
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n} className="bg-[#1C1917]">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Date</label>
                    <input
                      type="date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-all [color-scheme:dark]"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Time</label>
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-all appearance-none"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="" disabled className="bg-[#1C1917]">Select a time</option>
                    <option value="18:00" className="bg-[#1C1917]">6:00 PM</option>
                    <option value="19:00" className="bg-[#1C1917]">7:00 PM</option>
                    <option value="20:00" className="bg-[#1C1917]">8:00 PM</option>
                    <option value="21:00" className="bg-[#1C1917]">9:00 PM</option>
                    <option value="22:00" className="bg-[#1C1917]">10:00 PM</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-shadow duration-300 transform active:scale-[0.98]"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
