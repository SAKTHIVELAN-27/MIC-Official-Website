'use client';

import React, { useState } from 'react';

interface LeaderboardEntry {
  name: string;
  points: number;
}

const FFCS_DATA: LeaderboardEntry[] = [
  { name: 'Gowreesh V T', points: 980 },
  { name: 'Surya', points: 950 },
  { name: 'Sakthivelan', points: 920 },
];

const NON_FFCS_DATA: LeaderboardEntry[] = [
  { name: 'Dhakshini', points: 940 },
  { name: 'Akash Vishnu', points: 910 },
  { name: 'Rahul K', points: 880 },
];

// Custom pixel art Gold Trophy SVG (with flexShrink and explicit sizing to prevent collapse)
const TrophyIcon = () => (
  <svg 
    width="38" 
    height="38" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    style={{ imageRendering: 'pixelated', flexShrink: 0, width: 38, height: 38 }}
  >
    {/* Handles outline */}
    <rect x="1" y="3" width="2" height="5" fill="#4D2304" />
    <rect x="13" y="3" width="2" height="5" fill="#4D2304" />
    <rect x="3" y="7" width="1" height="1" fill="#4D2304" />
    <rect x="12" y="7" width="1" height="1" fill="#4D2304" />

    {/* Handles fill */}
    <rect x="2" y="4" width="1" height="3" fill="#E5A039" />
    <rect x="13" y="4" width="1" height="3" fill="#E5A039" />

    {/* Cup Body Outline */}
    <rect x="4" y="2" width="8" height="6" fill="#4D2304" />
    
    {/* Cup Body Fill */}
    <rect x="5" y="3" width="6" height="4" fill="#E5A039" />
    <rect x="6" y="3" width="4" height="4" fill="#FCD722" />
    <rect x="7" y="3" width="2" height="4" fill="#FFE27A" />

    {/* Stem Outline */}
    <rect x="6" y="8" width="4" height="4" fill="#4D2304" />
    {/* Stem Fill */}
    <rect x="7" y="8" width="2" height="4" fill="#E5A039" />
    <rect x="8" y="8" width="1" height="4" fill="#FFE27A" />

    {/* Stand Outline */}
    <rect x="4" y="12" width="8" height="2" fill="#4D2304" />
    {/* Stand Fill */}
    <rect x="5" y="13" width="6" height="1" fill="#E5A039" />
    <rect x="6" y="13" width="4" height="1" fill="#FFE27A" />
  </svg>
);

// Custom Inline SVG for Medals (Ribbon + Medal Circle)
interface MedalProps {
  rank: 1 | 2 | 3;
}

const MedalIcon: React.FC<MedalProps> = ({ rank }) => {
  const getMedalColors = () => {
    switch (rank) {
      case 1:
        return { fill: '#FCD722', border: '#B87B21' };
      case 2:
        return { fill: '#DCDCDC', border: '#9E9E9E' };
      case 3:
        return { fill: '#C58B58', border: '#8C5D33' };
    }
  };

  const colors = getMedalColors();

  return (
    <svg 
      width="38" 
      height="38" 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ imageRendering: 'pixelated', flexShrink: 0, width: 38, height: 38 }}
    >
      {/* V-shaped Ribbon (Blue on Left, Red on Right) with black borders */}
      <path d="M8 2 L18 18 H14 L4 2 Z" fill="#4B69FF" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 2 L18 18 H22 L32 2 Z" fill="#FF4B4B" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Medal Body Circle */}
      <circle cx="18" cy="22" r="9" fill="#000000" />
      <circle cx="18" cy="22" r="7" fill={colors.fill} />
      <circle cx="18" cy="22" r="4" fill={colors.fill} stroke={colors.border} strokeWidth="1.5" />
      
      {/* Text Number */}
      <text
        x="18"
        y="25.5"
        fontFamily="'Press Start 2P', monospace"
        fontSize="9"
        fontWeight="bold"
        fill="#000000"
        textAnchor="middle"
      >
        {rank}
      </text>
    </svg>
  );
};

export function LeaderboardSignboard() {
  const [tab, setTab] = useState<'ffcs' | 'non-ffcs'>('ffcs');

  const currentData = tab === 'ffcs' ? FFCS_DATA : NON_FFCS_DATA;

  // Row background colors matching Image 2
  const getRowBg = (index: number) => {
    switch (index) {
      case 0:
        return '#CBE2FB'; // Light Blue
      case 1:
        return '#D2FBD2'; // Light Green
      case 2:
        return '#FBECD2'; // Light Yellow
      default:
        return '#FFFFFF';
    }
  };

  return (
    <div 
      className="relative w-full pointer-events-auto animate-fadeIn" 
      style={{ 
        aspectRatio: '895 / 455',
        backgroundImage: "url('/signboard.svg')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 1. Header Title */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 font-press-start pointer-events-none select-none"
        style={{ 
          top: '5.5%',
          textShadow: '3px 3px 0 #4D2304, -1px -1px 0 #4D2304, 1px -1px 0 #4D2304, -1px 1px 0 #4D2304, 1px 1px 0 #4D2304',
          whiteSpace: 'nowrap',
          zIndex: 10,
        }}
      >
        <TrophyIcon />
        <h2
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 2.2rem)',
            color: '#E5A039', // Gold text color
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            margin: 0,
            lineHeight: 1,
          }}
        >
          LEADERBOARD
        </h2>
      </div>

      {/* 2. Inner Scoreboard Container */}
      <div
        className="absolute border-[4px] border-black rounded-[12px] flex flex-col items-center pointer-events-none select-none"
        style={{
          top: '20%',
          left: '9%',
          width: '82%',
          height: '63%',
          background: '#FBE4DF', // Correct pink/beige tone
          padding: '2% 3%',
          boxSizing: 'border-box',
          zIndex: 5,
        }}
      >
        {/* Members Badge */}
        <div
          className="absolute border-[3px] border-black rounded-[16px] flex items-center justify-center font-press-start"
          style={{
            top: '-7%',
            width: '52%',
            height: '13%',
            background: '#9B3D24', // Red-brown background
            color: '#000000', // Black text
            fontSize: 'clamp(7px, 1.1vw, 11px)',
            fontWeight: 'bold',
            boxShadow: '0 3px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          {tab === 'ffcs' ? 'FFCS MEMBERS' : 'NON-FFCS MEMBERS'}
        </div>

        {/* Table Headers */}
        <div
          className="w-full flex justify-between font-press-start text-black font-bold"
          style={{
            fontSize: 'clamp(8px, 1.2vw, 13px)',
            marginTop: '3%',
            paddingBottom: '1.5%',
            borderBottom: '2px dashed rgba(0, 0, 0, 0.15)',
          }}
        >
          <span className="w-[20%] text-left">RANK</span>
          <span className="w-[50%] text-center">NAME</span>
          <span className="w-[30%] text-right text-black/80">POINTS</span>
        </div>

        {/* Table Body / Leaderboard Rows */}
        <div className="w-full flex-1 flex flex-col justify-around mt-1.5">
          {currentData.map((entry, index) => (
            <div
              key={entry.name + index}
              className="w-full flex items-center justify-between border-[3px] border-black rounded-[8px] px-4 font-press-start text-black font-bold"
              style={{
                height: '27%',
                background: getRowBg(index),
                fontSize: 'clamp(9px, 1.3vw, 15px)',
                boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Medal Icon & Rank */}
              <div className="w-[20%] flex items-center justify-start">
                <div className="-ml-1 flex items-center">
                  <MedalIcon rank={(index + 1) as 1 | 2 | 3} />
                </div>
              </div>

              {/* Name */}
              <span className="w-[50%] text-center truncate">{entry.name}</span>

              {/* Points */}
              <span className="w-[30%] text-right font-mono">{entry.points}</span>
            </div>
          ))}
        </div>

      </div>

      {/* 3. Bottom Tabs */}
      <div 
        className="absolute inset-x-0 pointer-events-none" 
        style={{ 
          bottom: '4.5%', 
          height: '11%',
          zIndex: 10,
        }}
      >
        {/* FFCS Tab Button */}
        <button
          onClick={() => setTab('ffcs')}
          className="absolute pointer-events-auto font-press-start rounded-[6px] border-[3px] border-black flex items-center justify-center font-bold transition-all duration-100 active:scale-95"
          style={{
            left: '9%',
            width: '38%',
            height: '100%',
            background: '#DCA348',
            color: '#000000',
            fontSize: 'clamp(8px, 1.2vw, 12px)',
            boxShadow: tab === 'ffcs' 
              ? 'inset 0 3px 0 rgba(0,0,0,0.2)' 
              : '0 4px 0 #000000',
            transform: tab === 'ffcs' ? 'translateY(3px)' : 'translateY(0px)',
            cursor: 'pointer',
          }}
        >
          ffcs
        </button>

        {/* Non-FFCS Tab Button */}
        <button
          onClick={() => setTab('non-ffcs')}
          className="absolute pointer-events-auto font-press-start rounded-[6px] border-[3px] border-black flex items-center justify-center font-bold transition-all duration-100 active:scale-95"
          style={{
            right: '9%',
            width: '38%',
            height: '100%',
            background: '#DCA348',
            color: '#000000',
            fontSize: 'clamp(8px, 1.2vw, 12px)',
            boxShadow: tab === 'non-ffcs' 
              ? 'inset 0 3px 0 rgba(0,0,0,0.2)' 
              : '0 4px 0 #000000',
            transform: tab === 'non-ffcs' ? 'translateY(3px)' : 'translateY(0px)',
            cursor: 'pointer',
          }}
        >
          non-ffcs
        </button>
      </div>

    </div>
  );
}
