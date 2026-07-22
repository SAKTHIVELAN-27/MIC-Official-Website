"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ─── Floating cloud hook ──────────────────────────────────────────────── */
interface CloudFloatOptions {
  baseTopVh: number;
  baseLeftVw: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({
  baseTopVh, baseLeftVw, amplitude = 10, speed = 0.4, phase = 0,
}: CloudFloatOptions) {
  const [offset, setOffset] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    let running = true;
    const animate = () => {
      frameRef.current += 1;
      setOffset(Math.sin((frameRef.current / 60) * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => { running = false; };
  }, [amplitude, speed, phase]);

  return {
    top: `calc(${baseTopVh}vh + ${offset}px)`,
    left: `${baseLeftVw}vw`,
  };
}

/* ─── Cloud configs — larger, 2 left + 2 right ─────────────────────────── */
const CLOUD_CONFIGS = [
  { src: "/images/cloud1.png", w: 270, h: 174, floatOpts: { baseTopVh: 4,  baseLeftVw: 1,  amplitude: 8,  speed: 0.4,  phase: 0   } },
  { src: "/images/cloud2.png", w: 320, h: 192, floatOpts: { baseTopVh: 19, baseLeftVw: 4,  amplitude: 12, speed: 0.5,  phase: 1.5 } },
  { src: "/images/cloud1.png", w: 250, h: 160, floatOpts: { baseTopVh: 5,  baseLeftVw: 66, amplitude: 8,  speed: 0.35, phase: 3   } },
  { src: "/images/cloud2.png", w: 300, h: 180, floatOpts: { baseTopVh: 21, baseLeftVw: 74, amplitude: 10, speed: 0.45, phase: 4.5 } },
] as const;

function FloatingCloud({ src, w, h, floatOpts }: (typeof CLOUD_CONFIGS)[number]) {
  const pos = useCloudFloat(floatOpts);
  return (
    <div className="absolute pointer-events-none select-none" style={{ top: pos.top, left: pos.left, zIndex: 6 }}>
      <Image src={src} alt="Cloud" width={w} height={h} priority style={{ height: "auto" }} />
    </div>
  );
}

/* ─── Menu items (all pages) ───────────────────────────────────────────── */
const MENU_ITEMS = [
  { label: "Home",        href: "/main"        },
  { label: "About Us",   href: "/about-us"    },
  { label: "Board",      href: "/leads"       },
  { label: "Gallery",    href: "/gallery"     },
  { label: "Events",     href: "/events"      },
  { label: "Projects",   href: "/projects"    },
  { label: "Leaderboard",href: "/leaderboard" },
];

const VISIBLE = 5; // how many items to show at once

/* ─── Retro selector arrow — blinks only on the active item ───────────── */
const RetroArrow = ({ active }: { active: boolean }) => (
  <motion.span
    aria-hidden
    animate={active ? { opacity: [1, 0.05, 1, 0.05, 1] } : { opacity: 0 }}
    transition={
      active
        ? { opacity: { duration: 0.7, repeat: Infinity, repeatDelay: 0.3 } }
        : { duration: 0 }
    }
    style={{
      display: "inline-block",
      width: "1.2em",
      flexShrink: 0,
      color: "#fff700",
      textShadow: "1px 1px 0 #886600",
    }}
  >▶</motion.span>
);

/* ─── Page ─────────────────────────────────────────────────────────────── */
const LandingPage = () => {
  const router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const enableHoverTemporarily = useCallback(() => {
    setIsHoverEnabled(false);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoverEnabled(true);
    }, 200);
  }, []);

  // Measure a single item's rendered height so the scroll animation is pixel-perfect
  const firstItemRef = useRef<HTMLDivElement>(null);
  const [itemH, setItemH] = useState(36); // fallback px

  useEffect(() => {
    const measure = () => {
      if (firstItemRef.current) {
        setItemH(firstItemRef.current.getBoundingClientRect().height);
      }
    };
    // Small delay to let layout settle after fonts load
    const id = setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Slide the window whenever selectedIdx goes out of the visible range
  useEffect(() => {
    setWindowStart(prev => {
      if (selectedIdx >= prev + VISIBLE) return selectedIdx - VISIBLE + 1;
      if (selectedIdx < prev)            return selectedIdx;
      return prev;
    });
  }, [selectedIdx]);

  /* ── Keyboard navigation ─────────────────────────────────────────────── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      enableHoverTemporarily();
      setSelectedIdx(i => (i + 1) % MENU_ITEMS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      enableHoverTemporarily();
      setSelectedIdx(i => (i - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(MENU_ITEMS[selectedIdx].href);
    }
  }, [selectedIdx, router, enableHoverTemporarily]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── Scroll and Swipe navigation ───────────────────────────────────────── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (MENU_ITEMS.length <= VISIBLE) return;
    enableHoverTemporarily();
    if (e.deltaY > 0) {
      setSelectedIdx(i => Math.min(i + 1, MENU_ITEMS.length - 1));
    } else if (e.deltaY < 0) {
      setSelectedIdx(i => Math.max(i - 1, 0));
    }
  }, [enableHoverTemporarily]);

  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = touchStartY.current - currentY;

    if (Math.abs(diff) > 30) {
      enableHoverTemporarily();
      if (diff > 0) {
        setSelectedIdx(i => Math.min(i + 1, MENU_ITEMS.length - 1));
      } else {
        setSelectedIdx(i => Math.max(i - 1, 0));
      }
      touchStartY.current = currentY;
    }
  }, [enableHoverTemporarily]);

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null;
  }, []);

  const canScrollUp   = windowStart > 0;
  const canScrollDown = windowStart + VISIBLE < MENU_ITEMS.length;

  return (
    <div
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 24.52%,#1093EB 35.07%,#1197EC 45.67%,#16B6F4 52.35%,#10CBF1 56.04%,#0FC6F1 59.73%,#15DEF0 64.76%,#15DEF0 81.25%)",
      }}
    >

      {/* Social icons */}
      <div className="absolute top-4 right-5 z-50 flex items-center gap-2">
        {[
          { href: "https://www.instagram.com/microsoft.innovations.vitc/",            src: "/insta_pixel.svg",    alt: "Instagram" },
          { href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/", src: "/linkedin_pixel.svg", alt: "LinkedIn"  },
          { href: "mailto:mic.vit.chennai@gmail.com",                                  src: "/mail_pixel.svg",    alt: "Email"     },
        ].map(({ href, src, alt }) => (
          <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}
            className="Animated-Logo flex items-center justify-center"
            style={{ background: "transparent", width: "clamp(36px,4.5vw,50px)", height: "clamp(36px,4.5vw,50px)", padding: "2px" }}
          >
            <Image src={src} alt={`${alt} Logo`} width={48} height={48}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} priority />
          </a>
        ))}
      </div>

      {/* Floating clouds */}
      {CLOUD_CONFIGS.map((cfg, i) => <FloatingCloud key={i} {...cfg} />)}

      {/* Big cloud backdrop */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "40vh", backgroundImage: "url('/big_cloud.svg')", backgroundRepeat: "repeat-x", backgroundPosition: "bottom", backgroundSize: "auto 100%", zIndex: 2 }} />

      {/* Cityscape */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "28vh", backgroundImage: "url('/cityscape.svg')", backgroundRepeat: "repeat-x", backgroundPosition: "bottom", backgroundSize: "auto 100%", zIndex: 3 }} />

      {/* Bushes */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "62px",           
          height: "16vh",
          backgroundImage: "url('/pixel_bushes.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 4,
        }} />

      {/* Bobbing bird */}
      <motion.div className="absolute pointer-events-none select-none"
        style={{ right: "12%", top: "20%", width: 56, height: 45, zIndex: 8 }}
        animate={{ y: [0, -14, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/pixel_bird.svg" alt="Pixel Bird" fill className="object-contain" style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* ── CENTRAL COLUMN: ropes → signboard → scrolling nav ─────────── */}
      <div
        className="central-column absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none"
        style={{ top: 0, width: "clamp(320px, 54vw, 700px)", zIndex: 29 }}
      >
        {/* Ropes */}
        <div className="rope-container relative w-full flex justify-between px-[8%]" style={{ height: "clamp(80px, 11vh, 130px)" }}>
          <div className="relative" style={{ width: 14, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Left rope" fill className="object-top object-contain" />
          </div>
          <div className="relative" style={{ width: 14, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Right rope" fill className="object-top object-contain" />
          </div>
        </div>

        {/* Signboard */}
        <div className="relative w-full pointer-events-auto" style={{ aspectRatio: "895 / 455" }}>
          <Image src="/signboard.svg" alt="Signboard" fill className="object-contain" priority />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <h1
              className="text-[#FCD7CE] font-bold uppercase leading-snug font-press-start"
              style={{
                fontSize: "clamp(1rem, 3.8vw, 3.2rem)",
                textShadow: "4px 4px 0 #4d2304,-2px -2px 0 #4d2304,2px -2px 0 #4d2304,-2px 2px 0 #4d2304,2px 2px 0 #4d2304",
                letterSpacing: "0.05em",
              }}
            >
              M!CROSOFT<br />!NNOVAT!ONS<br />CLUB.
            </h1>
          </div>
        </div>

        {/* ── Scrolling navigation window ────────────────────────────────
            Shows VISIBLE=5 items. Slides when cursor moves beyond range.
        ─────────────────────────────────────────────────────────────── */}
        <nav
          aria-label="Main navigation"
          className="font-press-start pointer-events-auto w-full flex flex-col items-center select-none"
          style={{ marginTop: "clamp(6px, 1vh, 16px)", touchAction: "none" }}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Up scroll indicator — only shown when items above are hidden */}
          <motion.div
            animate={{ opacity: canScrollUp ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="font-press-start text-center"
            style={{
              fontSize: "clamp(8px, 1vw, 12px)",
              color: "#fff",
              textShadow: "1px 1px 0 #003399",
              marginBottom: "2px",
              userSelect: "none",
              pointerEvents: "none",
              height: "1.2em",
              lineHeight: 1,
            }}
          >▲ more</motion.div>

          {/* Clipping window — exactly VISIBLE items tall */}
          <div
            style={{
              height: itemH * VISIBLE,
              overflow: "hidden",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {/* Sliding inner list — animates translateY to reveal correct slice */}
            <motion.div
              animate={{ y: -windowStart * itemH }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
            >
              {MENU_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  ref={idx === 0 ? firstItemRef : undefined}
                  style={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    paddingTop: "clamp(3px, 0.5vh, 6px)",
                    paddingBottom: "clamp(3px, 0.5vh, 6px)",
                  }}
                >
                  <motion.div
                    animate={selectedIdx === idx ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, repeat: selectedIdx === idx ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => {
                        if (isHoverEnabled) setSelectedIdx(idx);
                      }}
                      className="nav-item-link flex items-center gap-1"
                      style={{
                        fontSize: "clamp(11px, 1.5vw, 19px)",
                        color: selectedIdx === idx ? "#fff" : "#1a5ce0",
                        textShadow: selectedIdx === idx
                          ? "1px 1px 0 #003399,-1px -1px 0 #003399,0 0 8px rgba(255,255,100,0.4)"
                          : "1px 1px 0 rgba(255,255,255,0.8),-1px -1px 0 rgba(255,255,255,0.5)",
                        fontWeight: 700,
                        transition: "color 0.15s, text-shadow 0.15s",
                      }}
                    >
                      <RetroArrow active={selectedIdx === idx} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Down scroll indicator — only shown when items below are hidden */}
          <motion.div
            animate={{ opacity: canScrollDown ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="font-press-start text-center"
            style={{
              fontSize: "clamp(8px, 1vw, 12px)",
              color: "#fff",
              textShadow: "1px 1px 0 #003399",
              marginTop: "2px",
              userSelect: "none",
              pointerEvents: "none",
              height: "1.2em",
              lineHeight: 1,
            }}
          >▼ more</motion.div>
        </nav>
      </div>

      {/* Ground ticker */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{ height: "72px", background: "#CC9339", borderTop: "8px solid #589B00", zIndex: 40 }}
      >
        <div className="relative flex overflow-x-hidden w-full pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex uppercase tracking-widest font-press-start"
            style={{ color: "#5E3A00", fontSize: "clamp(10px,1.3vw,14px)" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
