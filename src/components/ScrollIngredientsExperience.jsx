import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollIngredientsExperience() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload all frames sequentially
  useEffect(() => {
    const loadedImages = [];
    const maxFrames = 240;
    let loaded = 0;
    let consecutiveFails = 0;

    const loadNext = (index) => {
      if (index > maxFrames || consecutiveFails > 5) {
        setImages(loadedImages.filter(Boolean));
        setLoading(false);
        return;
      }

      const img = new Image();
      const padded = String(index).padStart(4, '0');
      img.src = `/frames-ingredients/frame_${padded}.jpg`;

      img.onload = () => {
        consecutiveFails = 0;
        loaded++;
        loadedImages[index - 1] = img;
        setLoadProgress(Math.min(100, Math.round((loaded / maxFrames) * 100)));

        // Draw first frame immediately
        if (index === 1 && canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          drawCover(canvasRef.current.getContext('2d'), img, canvasRef.current);
        }

        loadNext(index + 1);
      };

      img.onerror = () => {
        consecutiveFails++;
        loadNext(index + 1);
      };
    };

    loadNext(1);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drive canvas frame from scroll position
  useEffect(() => {
    if (images.length === 0) return;
    return scrollYProgress.on('change', (latest) => {
      if (!canvasRef.current) return;
      const frameIndex = Math.min(
        Math.max(0, Math.floor((latest / 0.85) * images.length)),
        images.length - 1
      );
      if (images[frameIndex]) {
        drawCover(canvasRef.current.getContext('2d'), images[frameIndex], canvasRef.current);
      }
    });
  }, [scrollYProgress, images]);

  const drawCover = (ctx, img, canvas) => {
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const cx = (canvas.width - img.width * ratio) / 2;
    const cy = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
  };

  // Overlay text animations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0]);
  const titleY      = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const endOpacity  = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);
  const endY        = useTransform(scrollYProgress, [0.78, 0.95], [40, 0]);

  return (
    <section className="relative h-[400vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frame canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--color-bg-deep)]">
            <div className="relative w-20 h-20 mb-6">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#333" strokeWidth="4" />
                <circle
                  cx="40" cy="40" r="36" fill="none"
                  stroke="url(#grad-ing)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - loadProgress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
                <defs>
                  <linearGradient id="grad-ing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                {loadProgress}%
              </span>
            </div>
            <p className="text-neutral-400 text-sm tracking-widest uppercase">Building the Burger…</p>
          </div>
        )}

        {/* Opening title — fades out as you scroll */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <span className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
            Crafted with Precision
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-8xl font-black text-white drop-shadow-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Every <span className="gradient-text-warm italic">Ingredient</span>
            <br />Matters
          </h2>
        </motion.div>

        {/* End title — fades in near the end */}
        <motion.div
          style={{ opacity: endOpacity, y: endY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <span className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
            The Result
          </span>
          <h3
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A <span className="gradient-text-warm italic">Masterpiece</span>
            <br />in Every Bite
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
