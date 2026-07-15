import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';

// A programmatic geometric burger to serve as a stunning placeholder
function PlaceholderBurger(props) {
  const group = useRef();

  // Add a gentle continuous rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 2;
    group.current.rotation.x = Math.cos(t / 4) / 4;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Top Bun */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.6, 32]} />
          <meshStandardMaterial color="#d48c46" roughness={0.6} />
        </mesh>

        {/* Lettuce */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1.5, 1.4, 0.1, 16]} />
          <meshStandardMaterial color="#4ade80" roughness={0.8} />
        </mesh>

        {/* Tomato 1 */}
        <mesh position={[-0.4, 0.65, 0.3]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>
        
        {/* Tomato 2 */}
        <mesh position={[0.4, 0.65, -0.2]} rotation={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>

        {/* Cheese */}
        <mesh position={[0, 0.45, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.2, 0.05, 2.2]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.4} />
        </mesh>

        {/* Patty */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[1.4, 1.35, 0.4, 32]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>

        {/* Bottom Bun */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[1.3, 1.2, 0.4, 32]} />
          <meshStandardMaterial color="#d48c46" roughness={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

export default function InteractiveBurgerModel() {
  return (
    <section className="relative w-full h-[80vh] bg-[var(--color-bg-deep)] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60vw] h-[60vw] bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute top-12 text-center z-10 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
          Interact with the <span className="text-orange-500 italic">Masterpiece</span>
        </h2>
        <p className="text-neutral-400 mt-4 max-w-lg mx-auto px-4">
          Click, drag, and spin to explore every layer of culinary perfection. 
          (Placeholder geometric model loaded until custom GLB is linked).
        </p>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ea580c" />
          
          <PlaceholderBurger />
          
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
          <Environment preset="city" />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={4} 
            maxDistance={12} 
            autoRotate 
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>
    </section>
  );
}
