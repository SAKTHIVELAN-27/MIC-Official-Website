"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface EventData {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

// ─── Coin Dot Component ─────────────────────────────────────────────────────────
const Coin = ({ size = 13, eaten = false }: { size?: number; eaten?: boolean }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#FFE57F",
      border: "1.5px solid #CC8800",
      boxShadow: eaten ? "none" : "0 1px 2px rgba(0,0,0,0.25)",
      flexShrink: 0,
      opacity: eaten ? 0 : 1,
      transform: eaten ? "scale(0)" : "scale(1)",
      transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
  />
);

// ─── Pixel Cherry Sprite Component ──────────────────────────────────────────────
const PixelCherry = () => (
  <div className="relative w-8 h-8 pointer-events-none select-none drop-shadow-[1px_1px_0_#000]">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M14 4H18V6H16V10H20V12H18V16H16V12H14V6H12V4H14Z" fill="#402000" />
      <path d="M18 4H22V6H18V4Z" fill="#1C5E00" />
      {/* Left Cherry */}
      <rect x="4" y="14" width="10" height="10" rx="3" fill="#D80000" stroke="#000" strokeWidth="1.5" />
      <rect x="6" y="16" width="3" height="3" fill="#FFAAAA" />
      {/* Right Cherry */}
      <rect x="14" y="16" width="10" height="10" rx="3" fill="#D80000" stroke="#000" strokeWidth="1.5" />
      <rect x="16" y="18" width="3" height="3" fill="#FFAAAA" />
    </svg>
  </div>
);

// ─── Event Card (Matching Reference Screenshot) ─────────────────────────────────
const EventCard = ({
  event,
  onClick,
}: {
  event: EventData | null;
  onClick: (e: EventData) => void;
}) => {
  if (!event) return null;
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(event)}
      className="w-full cursor-pointer relative"
      style={{
        background: "#FFC9B9",
        border: "3.5px solid #000",
        borderRadius: 12,
        boxShadow: "4px 4px 0px rgba(0,0,0,0.35)",
      }}
    >
      {/* Cherry attached to top-left corner */}
      <div className="absolute -top-3.5 -left-2.5 z-20">
        <PixelCherry />
      </div>

      {/* Header */}
      <div
        style={{
          background: "#A93710",
          borderBottom: "3.5px solid #000",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          padding: "5px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          className="font-press-start"
          style={{
            fontSize: 11,
            color: "#000",
            letterSpacing: "0.18em",
            fontWeight: 900,
          }}
        >
          EVENT
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          background: "#FFE4D6",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          padding: "10px",
          position: "relative",
        }}
      >
        {/* Screws in 4 inner corners */}
        <div style={{ position: "absolute", top: 4, left: 4, width: 3, height: 3, background: "#888", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: 4, right: 4, width: 3, height: 3, background: "#888", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: 4, left: 4, width: 3, height: 3, background: "#888", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: 4, right: 4, width: 3, height: 3, background: "#888", borderRadius: "50%" }} />

        <div
          style={{
            width: "100%",
            height: 115,
            background: "#fff",
            border: "3.5px solid #000",
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src={event.image}
            fill
            alt={event.title}
            className="object-cover"
          />
        </div>
        <div style={{ marginTop: 6, textAlign: "center" }}>
          <span
            className="font-press-start"
            style={{ fontSize: 9, color: "#000", display: "block", marginBottom: 2 }}
          >
            {event.title}
          </span>
          <span
            className="font-press-start"
            style={{ fontSize: 7.5, color: "#A93710" }}
          >
            ★ {event.date} ★
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────
const MobileGalleryView = ({
  events,
  onEventClick,
  onSound,
}: {
  events: EventData[];
  onEventClick: (event: EventData) => void;
  onSound: (type: "select" | "open" | "flap" | "point" | "die" | "victory") => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<"down" | "up">("down");

  // Automatic Pac-Man eating timer state
  const dotsPerRow = 6;
  const totalDots = events.length * dotsPerRow;
  const [pacmanDotIndex, setPacmanDotIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPacmanDotIndex((prev) => (prev >= totalDots + 2 ? 0 : prev + 1));
    }, 320); // Moves & eats 1 dot every 320ms

    return () => clearInterval(timer);
  }, [totalDots]);

  const handleScrollClick = () => {
    onSound("select");
    if (containerRef.current) {
      if (scrollState === "down") {
        containerRef.current.scrollBy({ top: 380, behavior: "smooth" });
      } else {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleScrollEvent = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 60) {
        setScrollState("up");
      } else {
        setScrollState("down");
      }
    }
  };

  const ghostList = ["/yellowghost.png", "/pinkghost (1).png", "/greenghost.png"];
  let globalDotCount = 0;

  return (
    <div
      className="w-full h-[100dvh] overflow-hidden relative flex flex-col select-none"
      style={{
        background:
          "linear-gradient(180deg, #1188EE 0%, #0E8AEA 20%, #16B6F4 52%, #15DEF0 75%, #10D5EE 100%)",
      }}
    >
      {/* ── Floating cloud top-right ────────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 4, right: 48, zIndex: 5 }}
      >
        <Image
          src="/cloud_pixel.svg"
          alt=""
          width={90}
          height={56}
          style={{ imageRendering: "pixelated" }}
          priority
        />
      </div>

      {/* ── TOP BAR ────────────────────────────────────────────────── */}
      <div
        className="relative z-40 flex items-center justify-between px-3 pt-3 pb-1 shrink-0"
      >
        {/* MIC logo */}
        <Link href="/main" onClick={() => onSound("select")}>
          <Image
            src="/mic_logo_pixel.svg"
            alt="MIC"
            width={44}
            height={44}
            style={{ imageRendering: "pixelated" }}
            priority
          />
        </Link>

        {/* Title */}
        <h1
          className="font-press-start text-black"
          style={{ fontSize: 22, letterSpacing: "0.04em", textShadow: "2px 2px 0 rgba(255,255,255,0.35)" }}
        >
          Gallery
        </h1>

        {/* Right buttons */}
        <div className="flex items-center gap-2">
          {/* D avatar */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#7B48CC",
              border: "2px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 2px 0 #000",
            }}
          >
            <span
              className="font-press-start text-white"
              style={{ fontSize: 13, fontWeight: 900 }}
            >
              D
            </span>
          </div>
          {/* Close X */}
          <Link href="/main" onClick={() => onSound("select")}>
            <Image
              src="/close_button.svg"
              alt="Close"
              width={36}
              height={36}
              priority
            />
          </Link>
        </div>
      </div>

      {/* ── SCROLLABLE CONTAINER FOR ALL EVENTS ──────────────────────── */}
      <div
        ref={containerRef}
        onScroll={handleScrollEvent}
        className="flex-1 overflow-y-auto px-3 pt-1 pb-16 relative z-10 scroll-smooth"
      >
        {events.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          const ghostImg = ghostList[idx % ghostList.length];

          // Determine dot numbers along snake path
          const dotV1 = globalDotCount++;
          const dotV2 = globalDotCount++;

          const dotH1 = globalDotCount++;
          const dotH2 = globalDotCount++;
          const dotH3 = globalDotCount++;
          const dotH4 = globalDotCount++;

          // Check Pac-Man step in this row
          const stepOffset =
            pacmanDotIndex === dotH1
              ? 0
              : pacmanDotIndex === dotH2
              ? 24
              : pacmanDotIndex === dotH3
              ? 48
              : pacmanDotIndex === dotH4
              ? 72
              : null;

          const isPacManActiveInRow = stepOffset !== null;

          return (
            <React.Fragment key={event.id ?? idx}>
              {/* Event Card Row with Ghost Side Decoration */}
              <div className="flex items-start gap-2 mt-4">
                {isLeft ? (
                  <>
                    {/* Left Card */}
                    <div className="flex-1">
                      <EventCard event={event} onClick={onEventClick} />
                    </div>
                    {/* Right Side: Ghost + Vertical Food Dots */}
                    <div className="flex flex-col items-center gap-2.5 pt-3 shrink-0 pr-1 relative">
                      <Image
                        src={ghostImg}
                        alt=""
                        width={42}
                        height={48}
                        style={{ imageRendering: "pixelated" }}
                      />
                      <Coin size={13} eaten={dotV1 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotV2 < pacmanDotIndex} />

                      {/* Pac-Man eating vertical dots */}
                      {pacmanDotIndex === dotV1 && (
                        <div className="absolute top-[58px] left-1/2 -translate-x-1/2 z-30">
                          <Image src="/PacMan.gif" alt="" width={28} height={28} style={{ transform: "rotate(90deg)" }} unoptimized />
                        </div>
                      )}
                      {pacmanDotIndex === dotV2 && (
                        <div className="absolute top-[82px] left-1/2 -translate-x-1/2 z-30">
                          <Image src="/PacMan.gif" alt="" width={28} height={28} style={{ transform: "rotate(90deg)" }} unoptimized />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left Side: Ghost + Vertical Food Dots */}
                    <div className="flex flex-col items-center gap-2.5 pt-3 shrink-0 pl-1 relative">
                      <Image
                        src={ghostImg}
                        alt=""
                        width={42}
                        height={48}
                        style={{ imageRendering: "pixelated" }}
                      />
                      <Coin size={13} eaten={dotV1 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotV2 < pacmanDotIndex} />

                      {/* Pac-Man eating vertical dots */}
                      {pacmanDotIndex === dotV1 && (
                        <div className="absolute top-[58px] left-1/2 -translate-x-1/2 z-30">
                          <Image src="/PacMan.gif" alt="" width={28} height={28} style={{ transform: "rotate(90deg)" }} unoptimized />
                        </div>
                      )}
                      {pacmanDotIndex === dotV2 && (
                        <div className="absolute top-[82px] left-1/2 -translate-x-1/2 z-30">
                          <Image src="/PacMan.gif" alt="" width={28} height={28} style={{ transform: "rotate(90deg)" }} unoptimized />
                        </div>
                      )}
                    </div>
                    {/* Right Card */}
                    <div className="flex-1">
                      <EventCard event={event} onClick={onEventClick} />
                    </div>
                  </>
                )}
              </div>

              {/* Interstitial Dots Trail (Connecting Cards in Snake Path) */}
              {idx < events.length - 1 && (
                <div
                  className={`flex items-center gap-[11px] my-3 relative h-9 ${
                    isLeft ? "justify-end pr-6" : "justify-start pl-3"
                  }`}
                >
                  {isLeft ? (
                    <div className="relative flex items-center gap-[11px]">
                      <Coin size={13} eaten={dotH1 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotH2 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotH3 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotH4 < pacmanDotIndex} />

                      {/* Pac-Man Character gliding dot by dot leftwards */}
                      <AnimatePresence>
                        {isPacManActiveInRow && (
                          <motion.div
                            key="pacman-glider-left"
                            initial={{ x: 0 }}
                            animate={{ x: -stepOffset! }}
                            transition={{ duration: 0.28, ease: "linear" }}
                            className="absolute right-[-10px] z-30 pointer-events-none"
                          >
                            <Image
                              src="/PacMan.gif"
                              alt="Pac-Man"
                              width={32}
                              height={32}
                              style={{ imageRendering: "pixelated", transform: "scaleX(-1)" }}
                              unoptimized
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="relative flex items-center gap-[11px]">
                      {/* Red Ghost leading the path */}
                      <Image
                        src="/yellowghost.png"
                        alt=""
                        width={38}
                        height={44}
                        style={{ imageRendering: "pixelated", filter: "hue-rotate(180deg)" }}
                      />
                      <Coin size={13} eaten={dotH1 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotH2 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotH3 < pacmanDotIndex} />
                      <Coin size={13} eaten={dotH4 < pacmanDotIndex} />

                      {/* Pac-Man Character gliding dot by dot rightwards */}
                      <AnimatePresence>
                        {isPacManActiveInRow && (
                          <motion.div
                            key="pacman-glider-right"
                            initial={{ x: 0 }}
                            animate={{ x: stepOffset! }}
                            transition={{ duration: 0.28, ease: "linear" }}
                            className="absolute left-[42px] z-30 pointer-events-none"
                          >
                            <Image
                              src="/PacMan.gif"
                              alt="Pac-Man"
                              width={32}
                              height={32}
                              style={{ imageRendering: "pixelated" }}
                              unoptimized
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Bottom spacer before bushes */}
        <div className="h-10" />
      </div>

      {/* ── BOTTOM SECTION: Pixel Bushes + Embedded Scroll Button + Marquee ── */}
      <div className="w-full shrink-0 relative z-30">
        {/* Pixel Bushes */}
        <div className="relative w-full h-[55px] overflow-hidden">
          <Image
            src="/pixel_bushes.svg"
            alt=""
            fill
            className="object-cover object-bottom"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Scroll Button (Embedded right in center peak of green bushes like image) */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-40">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleScrollClick}
            aria-label="Scroll button"
            style={{
              width: 44,
              height: 44,
              background: "#D9D9D9",
              border: "3.5px solid #000",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 2px 0px rgba(0,0,0,0.4)",
              cursor: "pointer",
            }}
          >
            <motion.svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: scrollState === "up" ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <polygon
                points="4,7 20,7 12,18"
                fill="#525252"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="miter"
              />
            </motion.svg>
          </motion.button>
        </div>

        {/* Marquee Ticker */}
        <div
          style={{
            width: "100%",
            background: "#DD9955",
            borderTop: "4px solid #000",
            height: 42,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            className="animate-marquee"
            style={{
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              gap: 0,
            }}
          >
            {[0, 1, 2, 3].map((r) => (
              <span
                key={r}
                className="font-press-start"
                style={{
                  fontSize: 9,
                  color: "#CC7700",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  paddingRight: 32,
                }}
              >
                MICROSOFT INNOVATIONS CLUB TENURE 2026-2027 &nbsp;✦&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee CSS ────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MobileGalleryView;
