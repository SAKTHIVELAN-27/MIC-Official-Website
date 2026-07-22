'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CARDS = [
  {
    id: 1,
    title: "About MIC",
    desc: "The MIC at VIT Chennai is a student-led tech community under the (MLSA) program. It's a space where students explore and innovate with technologies like AI, Azure, and GitHub. Whether you're a beginner or a builder, we offer an inclusive platform for collaboration, curiosity, and hands-on learning through real-world experiences.",
    bg: "/images/about_us_assets/aboutusaqua.png",
  },
  {
    id: 2,
    title: "What we do!",
    desc: "We host hands-on workshops, speaker sessions, and hackathons focused on Microsoft technologies like Azure, Power Platform, and Copilot. These events help students build skills, explore emerging tech, and grow into confident, well-rounded tech leaders.",
    bg: "/images/about_us_assets/aboutusyellow.png",
  },
  {
    id: 3,
    title: "What you get!",
    desc: "We focus on leadership, teamwork, and communication alongside coding. Our club supports personal and professional growth, helping members build confidence and strong networks. No matter your background, you'll find a welcoming community that learns, creates, and grows together.",
    bg: "/images/about_us_assets/aboutuspink.png",
  },
];

// Fixed card dimensions in 1024-tall canvas units — all cards sit at the SAME top (parallel)
const CARD_W      = 330;
const CARD_H      = 290;
const CARD_GAP    = 70;
const CARD_TOP    = 210;   // same for all three cards — no stagger

function MysteryCard({
  title, desc, bg, left,
}: {
  title: string; desc: string; bg: string; left: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute cursor-pointer"
      style={{ left, top: CARD_TOP, width: CARD_W, height: CARD_H }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pixel card background */}
      <img
        src={bg} alt=""
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />

      {/* Cherry decoration (top-left, slightly outside card) */}
      <img
        src="/images/about_us_assets/cherry.svg" alt="Cherry"
        className="absolute pointer-events-none"
        style={{ width: 68, height: 68, top: -28, left: -20, imageRendering: "pixelated" }}
        draggable={false}
      />

      {/* Question mark — shown when NOT hovered */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <span
          className="font-press-start font-extrabold text-white select-none"
          style={{ fontSize: 80, lineHeight: 1, textShadow: "4px 4px 0 rgba(0,0,0,0.25)" }}
        >
          ?
        </span>
      </div>

      {/* Content — revealed on hover */}
      <div
        className="absolute z-10 flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, inset: 0, padding: "22px 18px 16px" }}
      >
        <h2
          className="font-press-start text-black font-extrabold tracking-wide uppercase text-center mb-3"
          style={{ fontSize: 15, lineHeight: 1.4 }}
        >
          {title}
        </h2>
        <div className="flex-grow overflow-y-auto w-full" style={{ scrollbarWidth: "none" }}>
          <p
            className="font-ibm-plex-mono text-black font-semibold text-center"
            style={{ fontSize: 13.5, lineHeight: 1.6 }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

const PacmanIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsOpen(prev => !prev);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 75 75" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Outline */}
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 56.7075 0)" fill="black"/>
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.8779 69.6426)" fill="black"/>
      <rect width="9.14634" height="5.35714" transform="matrix(-1 0 0 1 25.6094 5.35742)" fill="black"/>
      <rect width="7.31707" height="5.35714" transform="matrix(-1 0 0 1 23.7803 64.2852)" fill="black"/>
      <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 16.4634 58.9287)" fill="black"/>
      <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 17.3779 10.7148)" fill="black"/>
      <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 63.1094 5.35742)" fill="black"/>
      <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 69.5122 10.7148)" fill="black"/>
      <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 69.5122 58.9287)" fill="black"/>
      <rect width="8.23171" height="5.35714" transform="matrix(-1 0 0 1 63.1094 64.2852)" fill="black"/>
      <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 10.9756 16.0713)" fill="black"/>
      <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 75 16.0713)" fill="black"/>
      <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 75 50)" fill="black"/>
      <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 10.0611 50)" fill="black"/>
      <rect width="5.4878" height="25" transform="matrix(-1 0 0 1 5.48781 25)" fill="black"/>

      {/* Yellow Fill Body */}
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 56.7075 5.35742)" fill="#F8EB39"/>
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.8779 64.2861)" fill="#F8EB39"/>
      <rect width="46.6463" height="5.35714" transform="matrix(-1 0 0 1 63.1094 10.7148)" fill="#F8EB39"/>
      <rect width="46.6463" height="5.35714" transform="matrix(-1 0 0 1 63.1094 58.9287)" fill="#F8EB39"/>
      <rect width="49.3902" height="5.35714" transform="matrix(-1 0 0 1 54.8779 25)" fill="#F8EB39"/>
      <rect width="49.3902" height="5.35714" transform="matrix(-1 0 0 1 54.8779 44.6436)" fill="#F8EB39"/>
      <rect width="58.5366" height="8.92857" transform="matrix(-1 0 0 1 69.5122 16.0723)" fill="#F8EB39"/>
      <rect width="59.4512" height="8.92857" transform="matrix(-1 0 0 1 69.5122 50)" fill="#F8EB39"/>

      {/* Mouth Area - Toggled between open (black) and closed (yellow) */}
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 42.0733 34.8213)" fill={isOpen ? "black" : "#F8EB39"}/>
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.8779 39.2852)" fill={isOpen ? "black" : "#F8EB39"}/>
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.8779 30.3574)" fill={isOpen ? "black" : "#F8EB39"}/>

      {/* Inside Mouth Fill - Toggled */}
      <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 42.0733 30.3574)" fill="#F8EB39"/>
      <rect width="20.122" height="5.35714" transform="matrix(-1 0 0 1 25.6094 35.7148)" fill="#F8EB39"/>
      <rect width="36.5854" height="5.35714" transform="matrix(-1 0 0 1 42.0733 39.2861)" fill="#F8EB39"/>

      {/* When mouth is closed, we need to show the outline of the right side, otherwise it's just black outline when open */}
      {isOpen ? (
        <>
          <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 69.5122 25)" fill="black"/>
          <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 69.5122 44.6426)" fill="black"/>
        </>
      ) : (
        <>
          <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 69.5122 25)" fill="#F8EB39"/>
          <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 69.5122 44.6426)" fill="#F8EB39"/>
          {/* Closed mouth right border */}
          <rect width="5.4878" height="25" transform="matrix(-1 0 0 1 75 25)" fill="black"/>
        </>
      )}
    </svg>
  );
};

const AboutUsPage: React.FC = () => {
  const [scale, setScale]           = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(1440);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (typeof window === "undefined") return;
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (!mobile) {
        const s = window.innerHeight / 1024;
        setScale(s);
        setCanvasWidth(window.innerWidth / s);
      } else {
        setScale(1);
        setCanvasWidth(window.innerWidth);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ───────── layout geometry (1024px-tall canvas) ───────── */
  const groupW    = 3 * CARD_W + 2 * CARD_GAP;
  const groupLeft = (canvasWidth - groupW) / 2;

  const cardLefts = [
    groupLeft,
    groupLeft + CARD_W + CARD_GAP,
    groupLeft + 2 * (CARD_W + CARD_GAP),
  ];

  // Animation strip between cards bottom and contact banner
  const cardsBottom = CARD_TOP + CARD_H;          // e.g. 500
  const ANIM_Y      = cardsBottom + 45;            // y for running characters ≈ 545

  // Contact banner: smaller, hugging the scrolling ground
  const GROUND_TOP  = 920;
  const bannerW     = Math.min(700, canvasWidth * 0.48);
  const bannerH     = bannerW * (177 / 871);
  const bannerLeft  = (canvasWidth - bannerW) / 2;
  const bannerTop   = GROUND_TOP - bannerH - 20;  // sit just above the ground

  /* ───────── mobile ───────── */
  if (isMobile) {
    return (
      <div
        className="w-full min-h-[100dvh] overflow-x-hidden overflow-y-auto flex flex-col items-center select-none"
        style={{ background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%)" }}
      >
        <style>{`
          body { background:linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%) !important; overflow-y:auto !important; }
          img[alt="MIC Logo"],img[src*="mic-logo"]{ display:none !important; }
          button[aria-label="Open navigation"],.z-\[60\]{ display:none !important; }
        `}</style>
        
        {/* Content wrapper with px-4, flex-grow to push footer down */}
        <div className="w-full flex-grow flex flex-col items-center pt-8 px-4 pb-8 gap-6">
          <div className="w-full flex justify-between items-center z-40 px-2 shrink-0">
            <Link href="/main"><img src="/mic_logo_pixel.svg" alt="MIC Pixel Logo" className="w-12 h-12" style={{ imageRendering:"pixelated" }} /></Link>
            <Link href="/main"><img src="/close_button.svg" alt="Close" className="w-10 h-10" /></Link>
          </div>
          <h1 className="font-press-start text-2xl text-black tracking-wider text-center drop-shadow-[3px_3px_0px_rgba(255,255,255,0.4)]">About Us</h1>
          {CARDS.map(card => (
            <div key={card.id} className="relative flex flex-col items-center justify-start text-center shrink-0 w-full max-w-[320px]"
              style={{ height:275, backgroundImage:`url(${card.bg})`, backgroundSize:"100% 100%", backgroundRepeat:"no-repeat", imageRendering:"pixelated", padding:"22px 16px 14px" }}
            >
              <img src="/images/about_us_assets/cherry.svg" alt="Cherry" className="absolute" style={{ width:58,height:58,top:-20,left:-14,imageRendering:"pixelated" }} />
              <h2 className="font-press-start text-black font-extrabold uppercase text-center mb-2" style={{ fontSize:13, lineHeight:1.5 }}>{card.title}</h2>
              <div className="flex-grow overflow-y-auto w-full" style={{ scrollbarWidth:"none" }}>
                <p className="font-ibm-plex-mono text-black font-semibold text-center" style={{ fontSize:12.5, lineHeight:1.55 }}>{card.desc}</p>
              </div>
            </div>
          ))}
          <div className="relative w-full max-w-[320px] shrink-0 mb-2">
            <img src="/images/about_us_assets/contact_details.svg" alt="Contact Us" className="w-full h-auto" />
            <div className="absolute flex items-center justify-center gap-5" style={{ top:"54%", left:"50%", transform:"translate(-50%,0)" }}>
              {[
                { href:"https://www.instagram.com/microsoft.innovations.vitc/?hl=en", src:"/images/about_us_assets/Frame 112.svg", alt:"Instagram" },
                { href:"https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in", src:"/images/about_us_assets/Frame 114.svg", alt:"LinkedIn" },
                { href:"mailto:micvitcc@gmail.com", src:"/images/about_us_assets/Frame 116.svg", alt:"Mail" },
              ].map(icon => (
                <a key={icon.alt} href={icon.href} target={icon.href.startsWith("http")?"_blank":undefined} rel={icon.href.startsWith("http")?"noopener noreferrer":undefined}
                  className="w-11 h-11 hover:scale-110 transition-transform">
                  <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" style={{ imageRendering:"pixelated" }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer attached directly to screen bottom without padding */}
        <div className="w-full h-14 border-t-4 border-black bg-[#DD9955] overflow-hidden flex items-center shrink-0 mt-auto">
          <div className="flex whitespace-nowrap animate-marquee">
            {[0,1].map(r => (
              <span key={r} className="inline-flex items-center shrink-0 text-[11px] text-[#CC7700] uppercase font-bold font-press-start">
                {Array(4).fill("MICROSOFT INNOVATIONS CLUB TENURE 2026-2027").map((t,i) => (
                  <React.Fragment key={i}><span>{t}</span><img src="/images/about_us_assets/cherry.svg" alt="" className="w-3.5 h-3.5 mx-3" style={{ imageRendering:"pixelated" }} /></React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ───────── DESKTOP ───────── */
  return (
    <div
      className="h-[100dvh] w-full relative overflow-hidden select-none"
      style={{ background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%)" }}
    >
      <style>{`
        body { background:linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%) !important; overflow:hidden !important; }
        img[alt="MIC Logo"],img[src*="mic-logo"]{ display:none !important; }
        button[aria-label="Open navigation"],.z-\[60\]{ display:none !important; }

        /* Ghost floating and side to side animations */
        .ghost-bob {
          animation: ghost-bob-anim 2.5s ease-in-out infinite;
        }
        .ghost-look-right {
          animation: ghost-look-right-anim 4s steps(1) infinite;
          transform-origin: center;
        }
        .ghost-look-left {
          animation: ghost-look-left-anim 4s steps(1) infinite;
          transform-origin: center;
        }
        
        @keyframes ghost-bob-anim {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes ghost-look-right-anim {
          0%, 100% {
            transform: scaleX(-1);
          }
          50% {
            transform: scaleX(1);
          }
        }
        @keyframes ghost-look-left-anim {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(-1);
          }
        }
      `}</style>

      {/* Canvas scaled to fill viewport */}
      <div
        className="absolute top-0 left-0"
        style={{ width: canvasWidth, height: 1024, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {/* Clouds */}
        {[
          { pct:0.03, top:55, w:170, delay:"0s" },
          { pct:0.79, top:48, w:185, delay:"0.8s" },
          { pct:0.56, top:530, w:155, delay:"1.5s" },
          { pct:0.88, top:630, w:165, delay:"0.3s" },
          { pct:0.06, top:710, w:140, delay:"2s" },
        ].map((c,i) => (
          <img key={i} src="/cloud_pixel.svg" alt="" draggable={false}
            className="absolute pointer-events-none z-0 opacity-70 animate-retro-float"
            style={{ left:canvasWidth*c.pct, top:c.top, width:c.w, imageRendering:"pixelated", animationDelay:c.delay }}
          />
        ))}

        {/* Nav */}
        <Link href="/main" className="absolute top-8 left-8 z-40 hover:scale-105 transition-transform">
          <img src="/mic_logo_pixel.svg" alt="MIC Pixel Logo" className="w-16 h-16" style={{ imageRendering:"pixelated" }} draggable={false} />
        </Link>
        <Link href="/main" className="absolute top-8 right-8 z-40 hover:scale-105 transition-transform">
          <img src="/close_button.svg" alt="Close" className="w-12 h-12" draggable={false} />
        </Link>

        {/* Title */}
        <h1
          className="absolute left-1/2 -translate-x-1/2 font-press-start text-black text-center select-none z-30 whitespace-nowrap"
          style={{ top:40, fontSize:46, textShadow:"3px 3px 0 rgba(255,255,255,0.4)" }}
        >
          About Us
        </h1>

        {/* ── Three parallel Mystery Cards ── */}
        {CARDS.map((card, i) => (
          <MysteryCard
            key={card.id}
            title={card.title}
            desc={card.desc}
            bg={card.bg}
            left={cardLefts[i]}
          />
        ))}

        {/* ── Pacman & Ghost Figma Layout & Animations ── */}
        {(() => {
          const pacmanLeft = groupLeft + 1.5 * CARD_W + CARD_GAP - 36;
          const pacmanTop = CARD_TOP + CARD_H + (bannerTop - (CARD_TOP + CARD_H) - 72) / 2;

          const characters = [
            {
              id: "blue-ghost",
              src: "/images/about_us_assets/ghostb.png",
              left: groupLeft + CARD_W + (CARD_GAP - 60) / 2,
              top: CARD_TOP + CARD_H - 105,
              cloudLeft: groupLeft + CARD_W + (CARD_GAP - 110) / 2,
              cloudTop: CARD_TOP + CARD_H - 65,
              cloudWidth: 110,
              class: "ghost-look-right",
              delay: "0s",
            },
            {
              id: "orange-ghost",
              src: "/images/about_us_assets/ghosto.svg",
              left: groupLeft + 2 * CARD_W + CARD_GAP + (CARD_GAP - 60) / 2,
              top: CARD_TOP + 65,
              cloudLeft: groupLeft + 2 * CARD_W + CARD_GAP + (CARD_GAP - 110) / 2,
              cloudTop: CARD_TOP + 110,
              cloudWidth: 110,
              class: "ghost-look-left",
              delay: "1s",
            },
            {
              id: "pink-ghost",
              src: "/images/about_us_assets/ghost.svg",
              left: bannerLeft - 100,
              top: bannerTop - 35,
              cloudLeft: bannerLeft - 125,
              cloudTop: bannerTop + 10,
              cloudWidth: 110,
              class: "ghost-look-right",
              delay: "0.5s",
            },
            {
              id: "red-ghost",
              src: "/images/about_us_assets/ghostr.svg",
              left: bannerLeft + bannerW + 35,
              top: bannerTop - 35,
              cloudLeft: bannerLeft + bannerW + 10,
              cloudTop: bannerTop + 10,
              cloudWidth: 110,
              class: "ghost-look-left",
              delay: "1.5s",
            },
          ];

          return (
            <>
              {/* Clouds under ghosts */}
              {characters.map((char) => (
                <img
                  key={`cloud-${char.id}`}
                  src="/cloud_pixel.svg"
                  alt=""
                  draggable={false}
                  className="absolute pointer-events-none z-10 opacity-70 pixelated"
                  style={{
                    left: char.cloudLeft,
                    top: char.cloudTop,
                    width: char.cloudWidth,
                    imageRendering: "pixelated",
                  }}
                />
              ))}

              {/* Pacman moving horizontally back & forth */}
              <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: 0,
                  top: pacmanTop,
                  width: 72,
                  height: 72,
                }}
                animate={{
                  x: [groupLeft + 20, groupLeft + groupW - 92, groupLeft + 20],
                  scaleX: [1, 1, -1, -1, 1],
                }}
                transition={{
                  x: { repeat: Infinity, duration: 14, ease: "linear" },
                  scaleX: { repeat: Infinity, duration: 14, ease: "linear", times: [0, 0.499, 0.5, 0.999, 1] }
                }}
              >
                <PacmanIcon style={{ width: "100%", height: "100%" }} />
              </motion.div>

              {/* Ghosts */}
              {characters.map((char) => (
                <div
                  key={char.id}
                  className="absolute z-20 pointer-events-none ghost-bob"
                  style={{
                    left: char.left,
                    top: char.top,
                    width: 60,
                    height: 64,
                    animationDelay: char.delay,
                  }}
                >
                  <img
                    src={char.src}
                    alt={char.id}
                    className={`w-full h-full ${char.class}`}
                    style={{
                      imageRendering: "pixelated",
                      animationDelay: char.delay,
                    }}
                    draggable={false}
                  />
                </div>
              ))}
            </>
          );
        })()}

        {/* ── Contact Us Banner — small, close to ground ── */}
        <div
          className="absolute z-20"
          style={{ left: bannerLeft, top: bannerTop, width: bannerW, height: bannerH }}
        >
          <img
            src="/images/about_us_assets/contact_details.svg"
            alt="Contact Us"
            className="w-full h-full"
            style={{ objectFit: "fill" }}
            draggable={false}
          />
          {/* Social icons in lower half */}
          <div
            className="absolute flex items-center justify-center gap-6"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, 0)", height: bannerH * 0.5 }}
          >
            {[
              { href:"https://www.instagram.com/microsoft.innovations.vitc/?hl=en", src:"/images/about_us_assets/Frame 112.svg", alt:"Instagram" },
              { href:"https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in", src:"/images/about_us_assets/Frame 114.svg", alt:"LinkedIn" },
              { href:"mailto:micvitcc@gmail.com", src:"/images/about_us_assets/Frame 116.svg", alt:"Mail" },
            ].map(icon => (
              <a key={icon.alt} href={icon.href}
                target={icon.href.startsWith("http")?"_blank":undefined}
                rel={icon.href.startsWith("http")?"noopener noreferrer":undefined}
                className="hover:scale-110 hover:-translate-y-1 transition-all duration-200"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", width:bannerH*0.44, height:bannerH*0.44 }}
              >
                <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" style={{ imageRendering:"pixelated" }} draggable={false} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Ground + Marquee ── */}
        <div
          className="absolute z-30 pointer-events-none select-none border-t-4 border-black bg-[#DD9955] overflow-hidden flex items-center"
          style={{ top: GROUND_TOP, left: 0, width: canvasWidth, height: 1024 - GROUND_TOP }}
        >
          <div className="flex whitespace-nowrap animate-marquee">
            {[0, 1].map(r => (
              <span key={r} className="inline-flex items-center shrink-0 text-[18px] text-[#CC7700] tracking-wider uppercase font-bold font-press-start">
                {Array(Math.max(5, Math.ceil(canvasWidth / 295))).fill("MICROSOFT INNOVATIONS CLUB TENURE 2026-2027").map((t, i) => (
                  <React.Fragment key={i}>
                    <span>{t}</span>
                    <img src="/images/about_us_assets/cherry.svg" alt="" className="w-6 h-6 mx-8" style={{ imageRendering:"pixelated" }} draggable={false} />
                  </React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
