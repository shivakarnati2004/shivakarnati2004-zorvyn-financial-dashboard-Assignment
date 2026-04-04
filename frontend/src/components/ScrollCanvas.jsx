import React, { useRef, useEffect, useState } from 'react';
import { useAnimationFrame } from 'framer-motion';

const FRAME_COUNT = 152;

export default function ScrollCanvas({ scrollProgress }) {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bgColor, setBgColor] = useState('transparent');

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const imgArray = [];

    const loadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${frameNum}.png`;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          
          if (loadedCount === FRAME_COUNT) {
            setImages(imgArray);
            setLoading(false);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load /sequence/ezgif-frame-${frameNum}.png`);
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImages(imgArray);
            setLoading(false);
          }
        };
        imgArray.push(img);
      }
    };
    
    loadImages();

    return () => {
      imgArray.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  const extractBgColor = (img) => {
    // Disabled to preserve dark theme aesthetic
  };

  // Safe tracking of last successfully drawn frame index to prevent flashing
  const lastDrawnFrameIndexRef = useRef(0);

  const renderCanvasContext = () => {
    if (loading || images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Map progress (0-1) to frame index (0-151)
    const currentScroll = scrollProgress.get();
    let frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(currentScroll * FRAME_COUNT))
    );
    
    let img = images[frameIndex];

    // If current image is not ready or failed, fallback to the last successfully drawn frame
    // This removes glitches or blank flashes if a frame didn't finish loading
    if (!img || !img.complete || img.width === 0) {
      frameIndex = lastDrawnFrameIndexRef.current;
      img = images[frameIndex];
    }

    if (!img || !img.complete || img.width === 0) return; // double check

    // Update successfully drawn index
    lastDrawnFrameIndexRef.current = frameIndex;

    // Get current theme background color
    const themeBg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#050a12';
    
    ctx.fillStyle = themeBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw image keeping correct ratio (contain logic)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);
    
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;
    
    ctx.drawImage(img, 0, 0, img.width, img.height,
                  centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
  };

  // Run render loop constantly for max synchronization and fluidity
  useAnimationFrame(() => {
    renderCanvasContext();
  });

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderCanvasContext(); 
      }
    };

    if (!loading) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [loading, bgColor]);
  
  return (
    <div className="absolute inset-0 w-full h-full z-[0] overflow-hidden" style={{ backgroundColor: bgColor }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      {/* We apply a themed gradient overlay so text is readable */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/50 to-[var(--bg)]" 
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </div>
  );
}
