import React from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Story from './components/Story';
import ScrollExperience from './components/ScrollExperience';
import ScrollMenuExperience from './components/ScrollMenuExperience';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[var(--color-bg-deep)] min-h-screen">
      <CustomCursor />
      <Navbar />
      <ScrollExperience />
      <Hero />
      <Menu />
      <Story />
      <ScrollMenuExperience />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
