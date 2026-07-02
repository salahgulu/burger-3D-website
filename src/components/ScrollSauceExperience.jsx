import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollSauceExperience() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    const maxFrames = 240; // The sauce explosion video has 240 frames
    let loaded = 0;

    const loadNext = (index) => {
      if (index > maxFrames) {
        setImages(loadedImages.filter(Boolean));
        setLoading(false);
        return;
      }

      const img = new Image();
      const paddedIndex = String(index).padStart(4, '0');
      img.src = `/frames-sauce/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        loaded++;
        loadedImages[index - 1] = img;
        setLoadProgress(Math.min(100, Math.round((loaded / maxFrames) * 100)));

        if (index === 1 && canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          drawCover(canvasRef.current.getContext('2d'), img, canvasRef.current);
        }

        loadNext(index + 1);
      };

      img.onerror = () => {
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

  // Update canvas on scroll
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

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const endOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  return (
    <section className="relative h-[400vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover' }}
        />

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--color-bg-deep)]">
            <div className="relative w-20 h-20 mb-6">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#333" strokeWidth="4" />
                <circle
                  cx="40" cy="40" r="36" fill="none"
                  stroke="url(#gradient-sauce)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - loadProgress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
                <defs>
                  <linearGradient id="gradient-sauce" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                {loadProgress}%
              </span>
            </div>
            <p className="text-neutral-400 text-sm">Preparing the Sauce...</p>
          </div>
        )}

        {/* Opening Title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <span className="text-orange-500 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Signature Flavor
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Dive into the
            <br />
            <span className="gradient-text-warm italic">Sauce</span>
          </h2>
        </motion.div>

        {/* End Text */}
        <motion.div
          style={{ opacity: endOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h3
            className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            An Explosion of
            <br />
            <span className="gradient-text-warm italic">Taste</span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
