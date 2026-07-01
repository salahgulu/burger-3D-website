import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const menuItems = [
  {
    id: 'truffle',
    name: 'Truffle Royale',
    desc: 'Wagyu beef, black truffle mayo, aged gruyere, gold leaf bun.',
    price: '$28',
    img: '/images/truffle-burger.jpg',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'bacon',
    name: 'Smoky Bacon Blaze',
    desc: 'Double patty, applewood smoked bacon, whiskey BBQ glaze.',
    price: '$18',
    img: '/images/bacon-burger.jpg',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'spicy',
    name: 'Spicy Inferno',
    desc: 'Pepper jack, ghost pepper jam, crispy jalapeños.',
    price: '$16',
    img: '/images/spicy-burger.jpg',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'classic',
    name: 'Classic Cheeseburger',
    desc: 'Smashed patty, American cheese, house pickles, secret sauce.',
    price: '$14',
    img: '/images/classic-cheeseburger.jpg',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'ingredients',
    name: null,
    desc: null,
    price: null,
    img: '/images/ingredients-scatter.jpg',
    className: 'md:col-span-1 md:row-span-1',
    isDecor: true,
    label: 'Only the Finest Ingredients',
  }
];

const TiltCard = ({ item }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [12, -12]);
  const rotateY = useTransform(x, [0, 1], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  if (item.isDecor) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative group overflow-hidden rounded-3xl interactive ${item.className}`}
        style={{ perspective: 800, rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6" style={{ transform: 'translateZ(40px)' }}>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400">{item.label}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group overflow-hidden rounded-3xl liquid-glass interactive cursor-none ${item.className}`}
      style={{ perspective: 800, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(0px)' }}>
        <img 
          src={item.img} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/90 via-[#0C0A09]/30 to-transparent" />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none" style={{ transform: 'translateZ(60px)' }}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {item.name}
            </h3>
            <p className="text-neutral-300 text-sm max-w-sm">{item.desc}</p>
          </div>
          <div className="text-2xl font-black gradient-text-warm shrink-0">{item.price}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Menu() {
  return (
    <section id="menu" className="py-32 px-6 relative z-10 overflow-hidden">
      {/* Full background grill flames image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/grill-flames-bg.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-deep)] via-transparent to-[var(--color-bg-deep)]" />
      </div>

      <div className="w-full px-4 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            The Masterpieces
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Taste the <span className="gradient-text-warm italic">Perfection</span>
          </h2>
        </motion.div>

        {/* Bento Box Grid — no dark gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">
          {menuItems.map((item) => (
            <TiltCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
