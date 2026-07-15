import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create a custom glowing marker using HTML/Tailwind
const customIcon = L.divIcon({
  className: 'custom-map-marker',
  html: `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>
      <div class="relative w-4 h-4 bg-orange-600 border-2 border-white rounded-full shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function LocationMap() {
  const position = [40.7128, -74.0060]; // New York coordinates

  return (
    <section className="relative w-full bg-[#0a0807] py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Details */}
        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Find the <span className="text-orange-500 italic">Flame.</span>
          </h2>
          
          <div className="space-y-6 text-neutral-400">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Location</h3>
              <p>123 Culinary Avenue<br/>Meatpacking District, NY 10014</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Hours</h3>
              <p>Mon - Thu: 5:00 PM - 11:00 PM<br/>
                 Fri - Sat: 5:00 PM - 1:00 AM<br/>
                 Sunday: Closed</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Contact</h3>
              <p>reservations@blaze.com<br/>+1 (555) 123-4567</p>
            </div>
          </div>
          
          <button className="mt-10 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors shadow-lg shadow-black/50">
            Get Directions
          </button>
        </div>

        {/* Right Side: Map */}
        <div className="w-full lg:w-2/3 h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
          {/* Map Container needs explicit height */}
          <MapContainer 
            center={position} 
            zoom={14} 
            scrollWheelZoom={false}
            className="w-full h-full bg-[#1c1917]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup className="custom-popup">
                <div className="text-center p-1">
                  <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>BLAZE</h4>
                  <p className="text-sm text-gray-600 m-0">The finest burgers in NY.</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
      </div>
    </section>
  );
}
