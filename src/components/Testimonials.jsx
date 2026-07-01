import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Marcus Chen',
    role: 'Food Critic — NY Times',
    text: "The Truffle Royale isn't just a burger; it's a culinary revelation. The balance of wagyu and black truffle is simply flawless.",
    rating: 5,
    img: '/images/avatar-marcus.jpg',
    postImg: '/images/truffle-burger.jpg'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Local Guide ★★★',
    text: "I've traveled across the country looking for the perfect smash burger. The Classic here ends that search permanently.",
    rating: 5,
    img: '/images/avatar-sarah.jpg',
    postImg: '/images/classic-cheeseburger.jpg'
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'Michelin Chef',
    text: "The char they achieve on these patties while keeping them juicy is a masterclass in fire control. Absolute perfection.",
    rating: 5,
    img: '/images/avatar-david.jpg',
    postImg: '/images/burger-assembly.jpg'
  },
  {
    id: 4,
    name: 'Emily Weiss',
    role: 'Food Blogger — 2M Followers',
    text: "The Smoky Bacon Blaze is dangerous. Once you've had that whiskey BBQ glaze, no other burger will ever satisfy you.",
    rating: 5,
    img: '/images/avatar-emily.jpg',
    postImg: '/images/bacon-burger.jpg'
  },
  {
    id: 5,
    name: 'James Walker',
    role: 'Burger Enthusiast',
    text: "Every element is thought out. The bun holds up, the sauce is incredible, and the meat is top-tier. Best in the city, period.",
    rating: 5,
    img: '/images/avatar-james.jpg',
    postImg: '/images/spicy-burger.jpg'
  },
];

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// 3D Tilt Wrapper Component
const TiltWrapper = ({ children, className, tiltIntensity = 10, index = 0 }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(x, [0, 1], [-tiltIntensity, tiltIntensity]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', bounce: 0.4 }}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FloatingInput = ({ type, id, label, isTextarea }) => (
  <div className="relative z-0 w-full mb-6 group" style={{ transform: 'translateZ(30px)' }}>
    {isTextarea ? (
      <textarea
        name={id} id={id} rows="4"
        className="block py-4 px-5 w-full text-base text-white bg-white/5 rounded-2xl border border-white/10 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 peer resize-none transition-all duration-300 interactive backdrop-blur-sm"
        placeholder=" " required
      />
    ) : (
      <input
        type={type} name={id} id={id}
        className="block py-4 px-5 w-full text-base text-white bg-white/5 rounded-2xl border border-white/10 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 peer transition-all duration-300 interactive backdrop-blur-sm"
        placeholder=" " required
      />
    )}
    <label
      htmlFor={id}
      className="absolute text-neutral-400 text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-orange-400"
    >
      {label}
    </label>
  </div>
);

export default function TestimonialsContact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const floatY1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative overflow-hidden mt-32 md:mt-48 lg:mt-64">
      {/* ─── TESTIMONIALS ─── */}
      <div className="relative py-40 px-6">
        {/* Ambient 3D Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110 origin-top">
          <img src="/images/restaurant-interior.jpg" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-deep)] via-[#0a0807]/80 to-[#0a0807]" />
        </motion.div>

        <div className="w-full px-4 md:px-12 lg:px-24 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring' }}
            className="text-center mb-24"
          >
            <span className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4 block drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              The Verdict
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white" style={{ fontFamily: 'var(--font-display)', transform: 'translateZ(50px)' }}>
              What They <span className="gradient-text-warm italic">Say</span>
            </h2>
          </motion.div>

          {/* Giant Feature Review as a massive "Post" */}
          <motion.div style={{ y: floatY1 }} className="relative z-20">
            <TiltWrapper tiltIntensity={5} className="mb-16">
              <div className="relative liquid-glass rounded-[2rem] group hover:border-orange-500/40 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_40px_80px_rgba(249,115,22,0.15)] overflow-hidden flex flex-col lg:flex-row items-center">
                
                {/* Post Featured Image (Left side) */}
                <div className="w-full lg:w-2/5 h-[400px] lg:h-[500px] relative overflow-hidden">
                  <img src={testimonials[0].postImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 lg:bg-gradient-to-l lg:from-black/90 to-transparent" />
                </div>

                {/* Review Content (Right side) */}
                <div className="w-full lg:w-3/5 p-10 md:p-16 relative z-10 -mt-20 lg:mt-0" style={{ transform: 'translateZ(40px)' }}>
                  <div className="absolute top-8 right-8 md:right-16 transition-transform duration-700 group-hover:scale-110" style={{ transform: 'translateZ(20px)' }}>
                    <svg className="w-16 h-16 md:w-24 md:h-24 text-orange-500/10 drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform duration-500 shrink-0">
                      <img src={testimonials[0].img} alt={testimonials[0].name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-2xl drop-shadow-md">{testimonials[0].name}</h4>
                      <p className="text-orange-400/80 text-sm tracking-wider uppercase mt-1 mb-2">{testimonials[0].role}</p>
                      <StarRating />
                    </div>
                  </div>
                  
                  <p className="text-3xl md:text-4xl text-white font-light italic leading-tight max-w-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    "{testimonials[0].text}"
                  </p>
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

          {/* Smaller Reviews Grid as "Posts" */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {testimonials.slice(1).map((review, index) => (
              <TiltWrapper key={review.id} tiltIntensity={8} index={index + 1}>
                <div className="liquid-glass rounded-[1.5rem] h-full group hover:border-orange-500/40 transition-all duration-500 flex flex-col shadow-2xl hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] overflow-hidden">
                  
                  {/* Post Featured Image */}
                  <div className="w-full h-48 relative overflow-hidden">
                    <img src={review.postImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 to-transparent" />
                  </div>

                  <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col h-full relative z-10 p-6 -mt-8">
                    {/* Avatar & Header */}
                    <div className="flex items-end gap-4 mb-5 pb-5 border-b border-white/5 group-hover:border-orange-500/20 transition-colors">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500/40 shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0 relative z-20">
                        <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="mb-1">
                        <h4 className="text-white font-semibold text-base leading-tight drop-shadow-md">{review.name}</h4>
                        <div className="mt-1"><StarRating /></div>
                      </div>
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-neutral-300 text-sm italic leading-relaxed flex-grow" style={{ fontFamily: 'var(--font-display)' }}>
                      "{review.text}"
                    </p>
                  </div>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      </div>
      {/* ─── CONTACT ─── */}
      <div className="relative py-32 px-6 overflow-hidden">
        {/* Glow orbs */}
        <motion.div style={{ y: floatY2 }} className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
        <motion.div style={{ y: floatY1 }} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-4 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Left: Info + 3D Image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4 block drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                Reserve a Table
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-xl" style={{ fontFamily: 'var(--font-display)' }}>
                Join the <br/>
                <span className="gradient-text-warm italic">Blaze</span>
              </h2>
              <p className="text-neutral-400 text-lg mb-10 max-w-md leading-relaxed">
                Whether it's a private event or a late-night craving, we're here to serve you the best burgers in town.
              </p>

              {/* 3D Restaurant Image */}
              <TiltWrapper tiltIntensity={8} className="mb-12">
                <div className="rounded-3xl overflow-hidden liquid-glass border border-orange-500/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                  <div style={{ transform: 'translateZ(20px)' }}>
                    <img 
                      src="/images/restaurant-interior.jpg" 
                      alt="Restaurant Interior" 
                      className="w-full h-72 object-cover hover:scale-110 transition-transform duration-[3000ms]"
                    />
                  </div>
                </div>
              </TiltWrapper>

              {/* Contact Info */}
              <div className="space-y-6">
                {[
                  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text1: "123 Culinary Ave", text2: "New York, NY 10012" },
                  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text1: "(555) 123-4567", text2: "Mon-Sun, 11AM — 11PM" },
                  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text1: "hello@blazeburger.com", text2: "We reply within 24 hours" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 group interactive cursor-none"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300">
                      <svg className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{item.text1}</p>
                      <p className="text-neutral-500 text-sm group-hover:text-orange-400/80 transition-colors">{item.text2}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: 3D Form */}
            <motion.div
              style={{ y: floatY2 }}
              className="relative z-20 perspective-1000"
            >
              <TiltWrapper tiltIntensity={5}>
                <form className="liquid-glass rounded-[2.5rem] p-10 md:p-14 border-orange-500/20 shadow-[0_40px_80px_rgba(0,0,0,0.6)] group hover:shadow-[0_40px_100px_rgba(249,115,22,0.15)] transition-shadow duration-700" onSubmit={(e) => e.preventDefault()}>
                  <div style={{ transform: 'translateZ(40px)' }} className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-md" style={{ fontFamily: 'var(--font-display)' }}>
                      Get in Touch
                    </h3>
                    <p className="text-neutral-400 text-base mb-10">We'd love to hear from you.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FloatingInput type="text" id="name" label="Your Name" />
                      <FloatingInput type="email" id="email" label="Email" />
                    </div>
                    <FloatingInput type="text" id="subject" label="Subject" />
                    <FloatingInput id="message" label="Your Message" isTextarea />
                    
                    <motion.button 
                      type="submit"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full interactive mt-4 relative overflow-hidden group py-5 rounded-2xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-[0_10px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.6)]"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Send Message
                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.button>
                  </div>
                </form>
              </TiltWrapper>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
