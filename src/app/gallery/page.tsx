'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import MobileGalleryView from './components/MobileGalleryView';

interface EventData {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
  // Fallbacks
  left: number;
  top: number;
  width: number;
  height: number;
}

const EVENTS: EventData[] = [
  {
    id: 1,
    title: "Cybersecurity Workshop",
    desc: "An intensive training session on ethical hacking, network defense, and security fundamentals. Students engaged in hands-on capture-the-flag (CTF) challenges.",
    date: "October 2024",
    image: "/images/gallery/cysec.jpeg",
    left: 100,
    top: 180,
    width: 220,
    height: 180,
  },
  {
    id: 2,
    title: "Expo 2024",
    desc: "Microsoft Innovations Club's annual project expo showcasing cutting-edge student innovations, development projects, and research prototypes to industry experts and peers.",
    date: "April 2024",
    image: "/images/gallery/expo2024.jpeg",
    left: 360,
    top: 150,
    width: 250,
    height: 200,
  },
  {
    id: 3,
    title: "Technical Writing Seminar",
    desc: "A comprehensive seminar on professional technical communication, documentation standards, API reference guide writing, and markdown formatting.",
    date: "September 2024",
    image: "/images/gallery/technical-writing.jpeg",
    left: 650,
    top: 160,
    width: 220,
    height: 180,
  },
  {
    id: 4,
    title: "Story Telling Sprint",
    desc: "A unique event exploring the intersection of creative narrative, product pitching, and user journey mapping to design compelling software solutions.",
    date: "November 2024",
    image: "/images/gallery/story.jpeg",
    left: 910,
    top: 140,
    width: 240,
    height: 190,
  },
  {
    id: 5,
    title: "Clubcon 2025",
    desc: "The flagship annual conference of MIC, bringing together developers, designers, and tech enthusiasts for panels, keynotes, and collaborative networking.",
    date: "January 2025",
    image: "/images/gallery/clubcon1.jpeg",
    left: 1180,
    top: 170,
    width: 230,
    height: 200,
  },
  {
    id: 6,
    title: "Clubcon 2025",
    desc: "The flagship annual conference of MIC, bringing together developers, designers, and tech enthusiasts for panels, keynotes, and collaborative networking.",
    date: "January 2025",
    image: "/images/gallery/clubcon1.jpeg",
    left: 80,
    top: 560,
    width: 240,
    height: 200,
  },
  {
    id: 7,
    title: "Story Telling Sprint",
    desc: "A unique event exploring the intersection of creative narrative, product pitching, and user journey mapping to design compelling software solutions.",
    date: "November 2024",
    image: "/images/gallery/story.jpeg",
    left: 350,
    top: 570,
    width: 220,
    height: 180,
  },
  {
    id: 8,
    title: "Expo 2024",
    desc: "Microsoft Innovations Club's annual project expo showcasing cutting-edge student innovations, development projects, and research prototypes to industry experts and peers.",
    date: "April 2024",
    image: "/images/gallery/expo2024.jpeg",
    left: 620,
    top: 550,
    width: 250,
    height: 200,
  },
  {
    id: 9,
    title: "Cybersecurity Workshop",
    desc: "An intensive training session on ethical hacking, network defense, and security fundamentals. Students engaged in hands-on capture-the-flag (CTF) challenges.",
    date: "October 2024",
    image: "/images/gallery/cysec.jpeg",
    left: 900,
    top: 580,
    width: 230,
    height: 180,
  },
  {
    id: 10,
    title: "Technical Writing Seminar",
    desc: "A comprehensive seminar on professional technical communication, documentation standards, API reference guide writing, and markdown formatting.",
    date: "September 2024",
    image: "/images/gallery/technical-writing.jpeg",
    left: 1170,
    top: 560,
    width: 240,
    height: 200,
  },
];

interface RetroPipeProps {
  height: number;
  top?: string;
  bottom?: string;
  left: string;
  isTop: boolean;
}

function RetroPipe({ height, top, bottom, left, isTop }: RetroPipeProps) {
  return (
    <div
      className="absolute select-none pointer-events-none z-10 w-[52px]"
      style={{
        left,
        top,
        bottom,
        height: `${height}px`,
        transform: isTop ? "none" : "scaleY(-1)",
        borderStyle: "solid",
        borderWidth: "0 0 24px 0",
        borderColor: "transparent",
        borderImageSource: "url(/green_pipe.png)",
        borderImageSlice: "0 0 64 0 fill",
        borderImageRepeat: "stretch",
        imageRendering: "pixelated",
      }}
    />
  );
}

const getLayout = (width: number) => {
  const startX = 210;
  const endX = width - 145;
  const rangeX = endX - startX;
  
  const centers = Array.from({ length: 5 }).map((_, i) => startX + (rangeX * i) / 4);
  
  const c1 = centers[0];
  const c2 = centers[1];
  const c3 = centers[2];
  const c4 = centers[3];
  const c5 = centers[4];

  const frames = [
    // Top Row
    { id: 1, left: c1 - 110, top: 180, width: 220, height: 180 },
    { id: 2, left: c2 - 125, top: 150, width: 250, height: 200 },
    { id: 3, left: c3 - 110, top: 160, width: 220, height: 180 },
    { id: 4, left: c4 - 120, top: 140, width: 240, height: 190 },
    { id: 5, left: c5 - 115, top: 170, width: 230, height: 200 },
    // Bottom Row
    { id: 6, left: c1 - 120, top: 560, width: 240, height: 200 },
    { id: 7, left: c2 - 110, top: 570, width: 220, height: 180 },
    { id: 8, left: c3 - 125, top: 550, width: 250, height: 200 },
    { id: 9, left: c4 - 115, top: 580, width: 230, height: 180 },
    { id: 10, left: c5 - 120, top: 560, width: 240, height: 200 }
  ];
  
  const g1 = (c1 + c2) / 2;
  const g2 = (c2 + c3) / 2;
  const g3 = (c3 + c4) / 2;
  const g4 = (c4 + c5) / 2;
  
  const pipes = [
    { left: g1 - 26, top: 0, height: 380, isTop: true },
    { left: g2 - 26, top: 0, height: 350, isTop: true },
    { left: g3 - 26, top: 0, height: 360, isTop: true },
    { left: g4 - 26, top: 0, height: 370, isTop: true },
    
    { left: g1 - 26, bottom: 99, height: 350, isTop: false },
    { left: g2 - 26, bottom: 99, height: 380, isTop: false },
    { left: g3 - 26, bottom: 99, height: 350, isTop: false },
    { left: g4 - 26, bottom: 99, height: 370, isTop: false }
  ];
  
  return { frames, pipes };
};

const GalleryPage: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(1440);
  const [isMobile, setIsMobile] = useState(false);
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);

  // Game state
  const [gameStatus, setGameStatusState] = useState<"idle" | "playing" | "dead" | "victory">("idle");
  const [score, setScore] = useState(0);

  const birdContainerRef = useRef<HTMLDivElement>(null);
  const gameStatusRef = useRef(gameStatus);
  const passedPipesRef = useRef<Set<number>>(new Set());

  const birdPhysicsRef = useRef({
    x: 100,
    y: 480,
    velocityY: 0,
    rotation: 0,
    time: 0,
    isDead: false,
  });

  const canvasWidthRef = useRef(canvasWidth);

  const setGameStatus = (status: "idle" | "playing" | "dead" | "victory") => {
    gameStatusRef.current = status;
    setGameStatusState(status);
  };

  const playRetroSound = (type: "select" | "open" | "flap" | "point" | "die" | "victory") => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "select") {
        osc.type = "square";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.setValueAtTime(900, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "open") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "flap") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "point") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "die") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "victory") {
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, idx) => {
          const oscN = ctx.createOscillator();
          const gainN = ctx.createGain();
          oscN.connect(gainN);
          gainN.connect(ctx.destination);
          oscN.type = "square";
          oscN.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gainN.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.1);
          gainN.gain.linearRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.15);
          oscN.start(ctx.currentTime + idx * 0.1);
          oscN.stop(ctx.currentTime + idx * 0.1 + 0.15);
        });
      }
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };

  const triggerFlap = useCallback(() => {
    const p = birdPhysicsRef.current;
    if (gameStatusRef.current === "idle") {
      passedPipesRef.current.clear();
      p.x = 100;
      p.y = 480;
      p.velocityY = -8;
      p.isDead = false;
      setGameStatus("playing");
      setScore(0);
      playRetroSound("flap");
    } else if (gameStatusRef.current === "playing") {
      p.velocityY = -8.5;
      playRetroSound("flap");
    } else if (gameStatusRef.current === "dead" || gameStatusRef.current === "victory") {
      passedPipesRef.current.clear();
      p.x = 100;
      p.y = 480;
      p.velocityY = 0;
      p.isDead = false;
      setGameStatus("idle");
      setScore(0);
    }
  }, []);

  // Window Resize & Dynamic Scaling
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (!mobile) {
          const newScale = window.innerHeight / 1024;
          setScale(newScale);
          const computedWidth = window.innerWidth / newScale;
          setCanvasWidth(computedWidth);
          canvasWidthRef.current = computedWidth;
        } else {
          setScale(1);
          setCanvasWidth(1440);
          canvasWidthRef.current = 1440;
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        triggerFlap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerFlap]);

  // Main game physics loop
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const p = birdPhysicsRef.current;
      p.time += 0.045;

      if (gameStatusRef.current === "playing") {
        p.x += 3.5;
        p.y += p.velocityY;
        p.velocityY += 0.55;
        p.rotation = Math.max(-20, Math.min(45, p.velocityY * 3));

        // Canvas Boundary Collision
        if (p.y < 0) {
          p.isDead = true;
          setGameStatus("dead");
          playRetroSound("die");
        }
        const groundLevel = 925 - 72; // bird height is 72px
        if (p.y >= groundLevel) {
          p.y = groundLevel;
          p.isDead = true;
          setGameStatus("dead");
          playRetroSound("die");
        }

        // Pipe Collisions based on dynamic layout
        const layout = getLayout(canvasWidthRef.current);
        const pipes = layout.pipes;

        const birdWidth = 55;
        const birdHeight = 45;
        const bLeft = p.x + 8;
        const bRight = bLeft + birdWidth;
        const bTop = p.y + 13;
        const bBottom = bTop + birdHeight;

        for (let i = 0; i < pipes.length; i++) {
          const pipe = pipes[i];
          const pLeft = pipe.left;
          const pRight = pipe.left + 52; // pipe width

          if (bRight > pLeft && bLeft < pRight) {
            if (pipe.isTop) {
              if (bTop < pipe.height) {
                p.isDead = true;
                setGameStatus("dead");
                playRetroSound("die");
                break;
              }
            } else {
              if (bBottom > (1024 - 99 - pipe.height)) {
                p.isDead = true;
                setGameStatus("dead");
                playRetroSound("die");
                break;
              }
            }
          }
        }

        // Score Update Check
        const uniquePipeLefts = Array.from(new Set(pipes.map(pipe => pipe.left))).sort((a, b) => a - b);
        uniquePipeLefts.forEach((leftVal, index) => {
          if (p.x + 36 > leftVal + 26 && !passedPipesRef.current.has(index)) {
            passedPipesRef.current.add(index);
            setScore((prev) => {
              const newScore = prev + 1;
              playRetroSound("point");
              return newScore;
            });
          }
        });

        // Victory Check
        if (p.x >= canvasWidthRef.current - 100) {
          setGameStatus("victory");
          playRetroSound("victory");
        }
      } else if (gameStatusRef.current === "dead") {
        const groundLevel = 925 - 72;
        if (p.y < groundLevel) {
          p.y += p.velocityY;
          p.velocityY += 1.2;
          p.rotation += 15;
          if (p.y >= groundLevel) {
            p.y = groundLevel;
            p.velocityY = 0;
          }
        }
      } else if (gameStatusRef.current === "idle") {
        p.x = 100;
        p.y = 480 + Math.sin(p.time) * 12;
        p.rotation = 0;
      }

      // Apply transform directly to avoid React rendering cycles lag
      if (birdContainerRef.current) {
        birdContainerRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) rotate(${p.rotation}deg)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleBirdClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerFlap();
  };

  const handleFrameClick = (event: EventData) => {
    if (gameStatus === "playing") return; // don't open details during gameplay
    playRetroSound("open");
    setActiveEvent(event);
  };

  // Get dynamic coordinates
  const layout = getLayout(canvasWidth);

  if (isMobile) {
    return (
      <>
        <style>{`
          body {
            overflow-y: auto !important;
          }
          img[alt="MIC Logo"], img[src*="mic-logo"] { display: none !important; }
          button[aria-label="Open navigation"], .z-\[60\] { display: none !important; }
        `}</style>

        <MobileGalleryView
          events={EVENTS}
          onEventClick={(event) => {
            playRetroSound("open");
            setActiveEvent(event);
          }}
          onSound={playRetroSound}
        />

        {/* ── Event Detail Modal (shared with desktop) ── */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none"
              onClick={() => { playRetroSound("select"); setActiveEvent(null); }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#FFE4D6] border-4 border-black rounded-[8px] max-w-sm w-full max-h-[90dvh] flex flex-col overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.35)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-[#A93710] border-b-4 border-black py-3 px-4 flex justify-between items-center shrink-0">
                  <span className="font-press-start text-[10px] text-black tracking-wider uppercase font-extrabold">
                    Event Details
                  </span>
                  <button
                    onClick={() => { playRetroSound("select"); setActiveEvent(null); }}
                    className="font-press-start text-[10px] text-black border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
                  >
                    X
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 flex flex-col items-center overflow-y-auto flex-grow">
                  <div className="relative w-full h-[160px] border-4 border-black bg-white overflow-hidden mb-4 shrink-0">
                    <Image src={activeEvent.image} fill alt={activeEvent.title} className="object-cover" />
                  </div>
                  <h3 className="font-press-start text-[12px] text-[#A93710] text-center mb-1 leading-snug uppercase font-bold">
                    {activeEvent.title}
                  </h3>
                  <span className="font-ibm-plex-mono text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-3">
                    ★ {activeEvent.date} ★
                  </span>
                  <p className="font-ibm-plex-mono text-[11px] text-black text-center leading-relaxed mb-5">
                    {activeEvent.desc}
                  </p>
                  <button
                    onClick={() => { playRetroSound("select"); setActiveEvent(null); }}
                    className="px-5 py-2 bg-white text-black border-4 border-black font-press-start text-[9px] shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none shrink-0"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div
      className={`h-[100dvh] w-full relative overflow-y-hidden select-none ${
        isMobile ? 'overflow-x-auto' : 'overflow-x-hidden'
      }`}
      style={{
        background: "linear-gradient(180deg, #1188EE 0%, #0E8AEA 25%, #1093EB 35%, #1197EC 46%, #16B6F4 52%, #10CBF1 56%, #0FC6F1 60%, #15DEF0 65%, #15DEF0 81%)",
      }}
    >
      <style>{`
        /* Override body background to be the bright blue sky gradient and remove the grid */
        body {
          background: linear-gradient(180deg, #1188EE 0%, #0E8AEA 25%, #1093EB 35%, #1197EC 46%, #16B6F4 52%, #10CBF1 56%, #0FC6F1 60%, #15DEF0 65%, #15DEF0 81%) !important;
          background-size: 100% 100% !important;
          background-attachment: fixed !important;
          overflow: hidden !important;
        }
        
        /* Hide global navbar elements on the gallery page */
        img[alt="MIC Logo"], img[src*="mic-logo"] {
          display: none !important;
        }
        button[aria-label="Open navigation"], .z-\[60\] {
          display: none !important;
        }
      `}</style>

      {/* Sized Canvas container that matches recruitment portal theme */}
      <div
        className="absolute top-0 left-0 shrink-0 select-none"
        style={{
          width: canvasWidth,
          height: 1024,
          transform: !isMobile ? `scale(${scale})` : 'none',
          transformOrigin: 'top left',
        }}
      >
        {/* Floating Clouds */}
        <img
          src="/cloud_pixel.svg"
          alt="Cloud"
          className="absolute top-[120px] pointer-events-none z-5 opacity-70 animate-retro-float pixelated"
          style={{ left: `${canvasWidth * 0.1}px`, width: "200px", height: "auto" }}
        />
        <img
          src="/cloud_pixel.svg"
          alt="Cloud"
          className="absolute top-[50px] pointer-events-none z-5 opacity-80 animate-retro-float pixelated"
          style={{ left: `${canvasWidth * 0.55}px`, width: "280px", height: "auto", animationDelay: "1s" }}
        />
        <img
          src="/cloud_pixel.svg"
          alt="Cloud"
          className="absolute top-[220px] pointer-events-none z-5 opacity-75 animate-retro-float pixelated"
          style={{ left: `${canvasWidth * 0.8}px`, width: "220px", height: "auto", animationDelay: "1.5s" }}
        />

        {/* Silhouettes & cityscape backgrounds */}
        {Array.from({ length: Math.ceil(canvasWidth / 1440) + 1 }).map((_, idx) => (
          <img
            key={`silhouette-${idx}`}
            src="/big_cloud.svg"
            alt="Skyline Silhouette"
            className="absolute top-[565px] h-[465px] object-cover opacity-25 pointer-events-none select-none z-1 pixelated"
            style={{ left: `${idx * 1440}px`, width: "1500px" }}
          />
        ))}
        
        {Array.from({ length: Math.ceil(canvasWidth / 245) + 1 }).map((_, idx) => (
          <img
            key={`skyline-${idx}`}
            src="/cityscape.svg"
            alt="Skyline"
            className="absolute top-[631px] w-[246px] h-[249px] opacity-40 pointer-events-none select-none z-2 pixelated"
            style={{ left: `${idx * 245}px` }}
          />
        ))}

        {Array.from({ length: Math.ceil(canvasWidth / 1409) + 1 }).map((_, idx) => (
          <img
            key={`bush-${idx}`}
            src="/pixel_bushes.svg"
            alt="Bushes"
            className="absolute top-[739px] w-[1456px] h-[200px] z-3 pointer-events-none select-none pixelated"
            style={{ left: `${idx * 1409}px` }}
          />
        ))}

        {/* Top-Left: MIC Pixel Logo */}
        <Link
          href="/main"
          onClick={() => playRetroSound("select")}
          className="absolute top-8 left-8 z-40 hover:scale-105 transition-transform duration-200"
          style={{ width: 63, height: 63 }}
        >
          <Image
            src="/mic_logo_pixel.svg"
            alt="MIC Pixel Logo"
            width={63}
            height={63}
            className="object-contain pixelated"
            priority
          />
        </Link>

        {/* Top-Right: Close Button */}
        <Link
          href="/main"
          onClick={() => playRetroSound("select")}
          className="absolute top-8 right-8 z-40 hover:scale-105 transition-transform duration-200"
          style={{ width: 48, height: 48 }}
        >
          <Image
            src="/close_button.svg"
            alt="Close"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </Link>

        {/* Centered Heading */}
        <h1 className="absolute top-12 left-1/2 -translate-x-1/2 font-press-start text-3xl md:text-5xl text-black tracking-wider text-center select-none z-30 drop-shadow-[3px_3px_0px_rgba(255,255,255,0.4)]">
          Gallery Wall
        </h1>

        {/* Score display (Only when playing/dead/victory) */}
        {gameStatus !== "idle" && (
          <div className="absolute right-[160px] top-[40px] z-30 bg-black/80 border-4 border-black p-3 text-[12px] text-yellow-400 font-press-start shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            SCORE: {score} / 4
          </div>
        )}

        {/* Green Mario Pipes */}
        {layout.pipes.map((pipe, idx) => (
          <RetroPipe
            key={`pipe-${idx}`}
            left={`${pipe.left}px`}
            top={pipe.top !== undefined ? `${pipe.top}px` : undefined}
            bottom={pipe.bottom !== undefined ? `${pipe.bottom}px` : undefined}
            height={pipe.height}
            isTop={pipe.isTop}
          />
        ))}

        {/* Event Cards (Gallery Frames) */}
        {layout.frames.map((frame) => {
          const event = EVENTS.find(e => e.id === frame.id);
          if (!event) return null;
          return (
            <div
              key={event.id}
              onClick={() => handleFrameClick(event)}
              className={`absolute z-20 flex flex-col bg-[#FFE4D6] border-4 border-black rounded-[6px] shadow-[6px_6px_0px_rgba(0,0,0,0.2)] overflow-hidden ${
                gameStatus === "playing" ? "cursor-not-allowed opacity-90" : "cursor-pointer hover:-translate-y-1 hover:rotate-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,0.3)]"
              } transition-all duration-200`}
              style={{
                left: frame.left,
                top: frame.top,
                width: frame.width,
                height: frame.height,
              }}
            >
              {/* Header */}
              <div className="w-full bg-[#A93710] border-b-4 border-black py-1.5 flex items-center justify-center shrink-0">
                <span className="font-press-start text-[10px] text-black tracking-widest font-extrabold">
                  EVENT
                </span>
              </div>
              {/* Image Box */}
              <div className="flex-1 flex flex-col min-h-0 p-2.5 bg-[#FFE4D6]">
                <div className="relative flex-1 w-full min-h-0 bg-white border-4 border-black overflow-hidden group rounded-[3px]">
                  <Image
                    src={event.image}
                    fill
                    alt={event.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Flappy Bird Character */}
        <div
          ref={birdContainerRef}
          onClick={handleBirdClick}
          className="absolute z-25 cursor-pointer will-change-transform select-none"
          style={{ top: 0, left: 0, width: 72, height: 72 }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/pixel_bird.svg"
              alt="Flappy Bird"
              fill
              className={`pixelated drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)] select-none pointer-events-none ${
                gameStatus === "dead" ? "grayscale brightness-50" : "hover:scale-110 active:scale-95"
              }`}
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          {gameStatus === "idle" && (
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-black/80 text-[7px] text-white px-2 py-1 border border-black rounded-sm text-center animate-pulse whitespace-nowrap uppercase select-none pointer-events-none font-press-start">
              SPACE OR CLICK BIRD TO PLAY
            </div>
          )}
        </div>

        {/* Ground & Scrolling Marquee */}
        <div
          className="absolute top-[925px] left-0 h-[150px] z-30 flex flex-col select-none pointer-events-none"
          style={{ width: canvasWidth }}
        >
          <div className="w-full h-5 bg-[#52AE26] border-t-4 border-b-4 border-black flex flex-col justify-between shrink-0">
            <div className="w-full h-[3px] bg-[#72F418]" />
            <div className="w-full h-[3px] bg-[#3FA70E]" />
          </div>
          <div className="w-full flex-grow bg-[#DD9955] border-b-4 border-black relative overflow-hidden flex items-start pt-3">
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="inline-flex items-center shrink-0 text-[18px] text-[#CC7700] tracking-wider uppercase font-bold font-press-start">
                {Array(Math.max(6, Math.ceil(canvasWidth / 300)))
                  .fill("MICROSOFT INNOVATIONS CLUB TENURE 2026-2027")
                  .map((text, idx) => (
                    <React.Fragment key={idx}>
                      <span>{text}</span>
                      <img
                        src="/mic_logo_pixel.png"
                        alt="MIC"
                        className="w-6 h-6 mx-8 shrink-0 pixelated"
                      />
                    </React.Fragment>
                  ))}
              </span>
              <span className="inline-flex items-center shrink-0 text-[18px] text-[#CC7700] tracking-wider uppercase font-bold font-press-start">
                {Array(Math.max(6, Math.ceil(canvasWidth / 300)))
                  .fill("MICROSOFT INNOVATIONS CLUB TENURE 2026-2027")
                  .map((text, idx) => (
                    <React.Fragment key={idx}>
                      <span>{text}</span>
                      <img
                        src="/mic_logo_pixel.png"
                        alt="MIC"
                        className="w-6 h-6 mx-8 shrink-0 pixelated"
                      />
                    </React.Fragment>
                  ))}
              </span>
            </div>
          </div>
        </div>

        {/* Game End Banner (Game Over or Victory) */}
        {gameStatus === "dead" && (
          <div className="absolute inset-0 bg-black/40 z-40 flex items-center justify-center">
            <div className="bg-[#FFE4D6] border-4 border-black p-8 rounded-[8px] max-w-sm w-[90%] text-center shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
              <h2 className="font-press-start text-[#A93710] text-xl mb-4">GAME OVER</h2>
              <p className="font-press-start text-[10px] text-black mb-6">SCORE: {score} / 4</p>
              <button
                onClick={() => triggerFlap()}
                className="w-full bg-white hover:bg-slate-100 text-black border-4 border-black py-3 px-4 font-press-start text-xs shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-transform"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}

        {gameStatus === "victory" && (
          <div className="absolute inset-0 bg-black/40 z-40 flex items-center justify-center">
            <div className="bg-[#FFE4D6] border-4 border-black p-8 rounded-[8px] max-w-md w-[90%] text-center shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
              <h2 className="font-press-start text-[#52AE26] text-xl mb-2">★ VICTORY ★</h2>
              <p className="font-press-start text-[10px] text-black mb-4">YOU CONQUERED THE WALL!</p>
              <p className="font-press-start text-[8px] text-gray-700 mb-6">SCORE: {score} / 4</p>
              <button
                onClick={() => triggerFlap()}
                className="w-full bg-[#52AE26] hover:bg-[#72F418] text-white border-4 border-black py-3 px-4 font-press-start text-xs shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-transform"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Retro Event Details Modal Popup */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none"
            onClick={() => {
              playRetroSound("select");
              setActiveEvent(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#FFE4D6] border-4 border-black rounded-[8px] max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#A93710] border-b-4 border-black py-3 px-4 flex justify-between items-center shrink-0">
                <span className="font-press-start text-xs md:text-sm text-black tracking-wider uppercase font-extrabold">
                  Event Details
                </span>
                <button
                  onClick={() => {
                    playRetroSound("select");
                    setActiveEvent(null);
                  }}
                  className="font-press-start text-xs text-black border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none hover:bg-slate-100"
                >
                  X
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 flex flex-col items-center overflow-y-auto flex-grow no-scrollbar">
                {/* Event Photo View */}
                <div className="relative w-full h-[180px] sm:h-[240px] border-4 border-black bg-white overflow-hidden mb-4 shrink-0">
                  <Image
                    src={activeEvent.image}
                    fill
                    alt={activeEvent.title}
                    className="object-cover"
                  />
                </div>

                {/* Event Details */}
                <h3 className="font-press-start text-base text-[#A93710] text-center mb-1.5 leading-snug drop-shadow-[1px_1px_0px_#fff] uppercase font-bold">
                  {activeEvent.title}
                </h3>
                <span className="font-ibm-plex-mono text-[11px] font-extrabold text-gray-700 uppercase tracking-widest mb-3">
                  ★ {activeEvent.date} ★
                </span>
                <p className="font-ibm-plex-mono text-sm text-black text-center leading-relaxed font-semibold max-w-md mb-6">
                  {activeEvent.desc}
                </p>

                {/* Close Button */}
                <button
                  onClick={() => {
                    playRetroSound("select");
                    setActiveEvent(null);
                  }}
                  className="px-6 py-2.5 bg-white hover:bg-slate-100 text-black border-4 border-black font-press-start text-xs shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-transform shrink-0"
                >
                  CLOSE WINDOW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;