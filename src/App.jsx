import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import ReservationModal from './components/ReservationModal';
import InteractiveBurgerModel from './components/InteractiveBurgerModel';
import LocationMap from './components/LocationMap';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Story from './components/Story';
import ScrollExperience from './components/ScrollExperience';
import ScrollMenuExperience from './components/ScrollMenuExperience';
import ScrollIngredientsExperience from './components/ScrollIngredientsExperience';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (isLoading || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading, isModalOpen]);

  return (
    <div className="bg-[var(--color-bg-deep)] min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CustomCursor />
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <ScrollExperience />
      <Hero />
      <InteractiveBurgerModel />
      <Menu />
      <Story />
      <ScrollIngredientsExperience />
      <ScrollMenuExperience />
      <Testimonials />
      <LocationMap />
      <Footer />
    </div>
  );
}

export default App;
