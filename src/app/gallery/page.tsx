'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudFloatOptions {
  baseTop: string | number;
  baseLeft: string | number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

const page1Images = {
  left: {
    pink: '/images/gallery/cysec.jpeg',
    green: '/images/gallery/expo2024.jpeg',
    blue: '/images/gallery/technical-writing.jpeg',
    yellow: '/images/gallery/story.jpeg',
  },
  right: {
    top: '/images/gallery/clubcon1.jpeg',
    collage: [
      '/images/gallery/cysec.jpeg',
      '/images/gallery/expo2024.jpeg',
      '/images/gallery/technical-writing.jpeg',
      '/images/gallery/story.jpeg',
    ],
  },
  filmStrip: [
    '/images/gallery/expo2024.jpeg',
    '/images/gallery/technical-writing.jpeg',
    '/images/gallery/story.jpeg',
    '/images/gallery/clubcon1.jpeg',
  ],
};

const page2Images = {
  left: {
    top: '/images/gallery/expo2024.jpeg',
  },
  right: {
    vertical: [
      '/images/gallery/cysec.jpeg',
      '/images/gallery/technical-writing.jpeg',
    ],
    bottom: [
      '/images/gallery/story.jpeg',
      '/images/gallery/clubcon1.jpeg',
    ],
  },
};

const page3Images = {
  left: {
    grid: [
      '/images/gallery/cysec.jpeg',
      '/images/gallery/expo2024.jpeg',
      '/images/gallery/technical-writing.jpeg',
      '/images/gallery/story.jpeg',
    ],
    polaroids: [
      '/images/gallery/clubcon1.jpeg',
      '/images/gallery/cysec.jpeg',
      '/images/gallery/expo2024.jpeg',
      '/images/gallery/technical-writing.jpeg',
    ],
  },
  right: {
    top: '/images/gallery/story.jpeg',
    bottom: '/images/gallery/clubcon1.jpeg',
    strip: [
      '/images/gallery/cysec.jpeg',
      '/images/gallery/expo2024.jpeg',
      '/images/gallery/technical-writing.jpeg',
      '/images/gallery/story.jpeg',
    ],
  },
};

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(Number(baseTop) + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

const GalleryPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;

  const cloudPositions = [
    useCloudFloat({ baseTop: 100, baseLeft: -50, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 300, baseLeft: 1200, amplitude: 30, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 600, baseLeft: 100, amplitude: 35, speed: 0.9, phase: 2 }),
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const pageVariants = {
    initial: {
      rotateY: -90,
      opacity: 0,
      transformOrigin: "center left",
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring" as const, stiffness: 50 }
    },
    exit: {
      rotateY: 90,
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  const renderDoublePageSpread = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="flex w-full h-full">
            <div className="w-1/2 h-full relative p-4 flex flex-col items-center">
              <h1 className="font-press-start text-3xl md:text-4xl text-center mb-4 tracking-widest text-gray-800 mt-4">
                GALLERY
              </h1>
              <div className="relative w-full h-full">
                <div className="absolute top-10 left-0 w-40 h-52 z-10 hover:z-50 hover:scale-105 transition-all duration-300 group">
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/gallery/frame1.png" fill alt="frame" className="object-contain" />
                  </div>
                  <div className="absolute top-[8%] left-[10%] w-[80%] h-[65%] bg-gray-200 z-10 overflow-hidden">
                    <Image src={page1Images.left.pink} fill alt="img" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="absolute top-12 right-16 w-40 h-52 z-10 hover:z-50 hover:scale-105 transition-all duration-300 group">
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/gallery/frame2.png" fill alt="frame" className="object-contain" />
                  </div>
                  <div className="absolute top-[8%] left-[10%] w-[80%] h-[65%] bg-gray-200 z-10 overflow-hidden">
                    <Image src={page1Images.left.green} fill alt="img" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="absolute bottom-12 left-4 w-44 h-56 z-20 hover:z-50 hover:scale-105 transition-all duration-300 group">
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/gallery/frame3.png" fill alt="frame" className="object-contain" />
                  </div>
                  <div className="absolute top-[8%] left-[10%] w-[80%] h-[65%] bg-gray-200 z-10 overflow-hidden">
                    <Image src={page1Images.left.blue} fill alt="img" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="absolute bottom-7 right-10 w-44 h-56 z-20 hover:z-50 hover:scale-105 transition-all duration-300 group">
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/gallery/frame4.png" fill alt="frame" className="object-contain" />
                  </div>
                  <div className="absolute top-[8%] left-[10%] w-[80%] h-[65%] bg-gray-200 z-10 overflow-hidden">
                    <Image src={page1Images.left.yellow} fill alt="img" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <div className="absolute top-[8%] right-[12%] w-16 h-8 z-20 hover:scale-110 transition-transform">
                  <Image src="/images/gallery/flag.png" fill alt="flag" className="object-contain" />
                </div>

                <div className="absolute bottom-[8%] right-[41%] w-10 h-10 z-20 hover:scale-110 transition-transform hover:rotate-12">
                  <Image src="/images/gallery/heart.png" fill alt="heart" className="object-contain" />
                </div>

                <div className="absolute top-[40%] left-[3%] w-12 h-12 z-20 hover:scale-110 transition-transform hover:-rotate-12">
                  <Image src="/images/gallery/star.png" fill alt="star" className="object-contain" />
                </div>
              </div>
            </div>

            <div className="w-1/2 h-full relative">
              <div className="absolute top-[6%] left-[12%] w-[42%] aspect-square z-20">
                <div className="absolute top-[3%] left-[73%] w-10 h-10 z-40 rotate-[-12deg] hover:scale-110 transition-transform">
                  <Image
                    src="/starIcon.png"
                    fill
                    alt="star"
                    className="object-contain"
                  />
                </div>
                <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-black p-[8px] overflow-hidden cut-edges">
                  <div className="relative w-full h-full overflow-hidden cut-edges">
                    <Image
                      src={page1Images.right.top}
                      fill
                      alt="img"
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[6%] left-[15%] w-[68%] h-[38%] z-20">
                <div className="absolute bottom-[4%] left-[93%] w-12 h-12 z-40 rotate-[8deg] hover:rotate-[14deg] transition-transform">
                  <Image
                    src="/mushroom.svg"
                    fill
                    alt="mushroom"
                    className="object-contain"
                  />
                </div>
                <div className="w-full h-full bg-black p-[4px] overflow-hidden cut-edges">
                  <div className="relative w-full h-full bg-black p-[3px] cut-edges">
                    <div className="absolute top-0 left-0 w-[55%] h-[48%] bg-black p-[2px] cut-edges">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image src={page1Images.right.collage[0]} fill className="object-cover" alt="" />
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-[42%] h-[48%] bg-black p-[2px] cut-edges">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image src={page1Images.right.collage[1]} fill className="object-cover" alt="" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-black p-[2px] cut-edges">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image src={page1Images.right.collage[2]} fill className="object-cover" alt="" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-[55%] h-[52%] bg-black p-[2px] cut-edges">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image src={page1Images.right.collage[3]} fill className="object-cover" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-[25%] left-[65%] w-[42%] h-[115%] rotate-[6deg] z-30">
                <div className="absolute top-[68%] right-[2%] w-16 h-16 z-40 rotate-[18deg] hover:translate-x-3 hover:-translate-y-2 transition-transform duration-700">
                  <Image
                    src="/plane.svg"
                    fill
                    alt="plane"
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <Image
                    src="/images/gallery/static.png"
                    fill
                    alt="film strip"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex w-full h-full">
            <div className="w-1/2 h-full relative">
              <div className="relative w-[80%] h-[55%] right-[5%]">
                <div className="relative w-full h-full bg-black p-[4px] cut-edges">
                  <div className="relative w-full h-full bg-gray-300 overflow-hidden cut-edges">
                    <Image src={page2Images.left.top} fill alt="event-main" className="object-cover" />
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-14 h-14 z-40 rotate-[-12deg]">
                  <Image src="/plane.svg" fill alt="plane" className="object-contain" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 z-40 rotate-[8deg]">
                  <Image src="/mushroom.svg" fill alt="mushroom" className="object-contain" />
                </div>
              </div>

              <div className="relative mt-4 w-full h-[48%]">
                <div className="absolute top-[7%] left-[40%] -translate-x-1/2 w-[150%] p-[4px] cut-edges">
                  <div className="relative w-full overflow-hidden cut-edges aspect-[3/1]">
                    <Image src="/images/gallery/static2.png" fill alt="event-collage" className="object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-[30px] right-[98%] w-16 h-10 z-40">
                  <Image src="/flag.png" fill alt="flag" className="object-contain" />
                </div>
              </div>
            </div>

            <div className="w-1/2 h-full relative p-6">
              <h1 className="font-press-start text-3xl text-center mb-6 tracking-widest text-black">
                GALLERY
              </h1>
              <div className="relative w-full h-[52%] flex gap-6 left-[12%]">
                <div className="w-[58%] h-full flex flex-col gap-4">
                  <div className="relative flex-1 bg-black p-[4px] cut-edges">
                    <div className="relative w-full h-full overflow-hidden cut-edges">
                      <Image src={page2Images.right.vertical[0]} fill className="object-cover" alt="" />
                    </div>
                  </div>
                  <div className="relative flex-1 bg-black p-[4px] cut-edges">
                    <div className="relative w-full h-full overflow-hidden cut-edges">
                      <Image src={page2Images.right.vertical[1]} fill className="object-cover" alt="" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-[-18px] top-[42%] w-10 h-10 z-40 rotate-[-8deg]">
                  <Image
                    src="/leafIcon.png"
                    fill
                    alt="clover"
                    className="object-contain"
                  />
                </div>
                <div className="relative w-[38%] h-full z-30">
                  <Image
                    src="/images/gallery/filmstrip1.png"
                    fill
                    className="object-contain"
                    alt="film"
                  />
                </div>
              </div>

              <div className="relative w-full h-[26%] mt-8 left-[12%]">
                <div className="relative w-full h-full bg-black p-[4px] cut-edges flex gap-[4px]">
                  <div className="relative w-1/2 h-full overflow-hidden cut-edges">
                    <Image src={page2Images.right.bottom[0]} fill className="object-cover" alt="" />
                  </div>
                  <div className="relative w-1/2 h-full overflow-hidden cut-edges">
                    <Image src={page2Images.right.bottom[1]} fill className="object-cover" alt="" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 z-40 rotate-[12deg]">
                  <Image
                    src="/starIcon.png"
                    fill
                    alt="star"
                    className="object-contain"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 z-40">
                  <Image src="/heart.svg" fill className="object-contain" alt="heart" />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex w-full h-full">
            <div className="w-1/2 h-full relative p-6">
              <h1 className="font-press-start text-3xl text-center mb-8 tracking-widest text-black translate-x-[-6%]">
                GALLERY
              </h1>
              <div className="relative w-full h-[70%] grid grid-cols-2 grid-rows-2 gap-6 px-6 top-[6%] translate-x-[-10%]">
                {page3Images.left.grid.map((src, i) => (
                  <div key={i} className="relative bg-black p-[4px] cut-edges">
                    <div className="relative w-full h-full overflow-hidden cut-edges">
                      <Image
                        src={src}
                        fill
                        alt={`gallery-${i}`}
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-[18%] right-[9%] w-[26%] h-[80%]">
                {page3Images.left.polaroids.map((src, i) => (
                  <div
                    key={i}
                    className={`absolute rotate-[${[-8, 4, -6, 7][i]}deg]`}
                    style={{ top: `${i * 18}%`, right: i % 2 === 0 ? '6%' : '-2%' }}
                  >
                    <div className="bg-white p-2 pb-7 shadow-lg">
                      <div className="relative w-[115px] aspect-square overflow-hidden">
                        <Image
                          src={src}
                          fill
                          alt={`polaroid-${i}`}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute left-[1%] w-12 h-12 z-40 hover:scale-110 transition-transform">
                <Image
                  src="/images/gallery/image.png"
                  fill
                  alt="camera"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="w-1/2 h-full relative p-6">
              <div className="absolute top-[8%] left-[15%] w-[88%] h-[44%] bg-black p-[4px]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={page3Images.right.top}
                    fill
                    alt="top-big"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-[4%] left-[15%] w-[88%] h-[42%] bg-black p-[4px]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={page3Images.right.bottom}
                    fill
                    alt="bottom-big"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-[7%] left-[95%] w-12 h-8 z-40 hover:scale-110 transition-transform">
                <Image
                  src="/flag.png"
                  fill
                  alt="flag"
                  className="object-contain"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none left-[16%]">
                <div className="bg-white shadow-xl px-3 py-6">
                  <div className="flex flex-col gap-3">
                    {page3Images.right.strip.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-[180px] aspect-[2.6/1] overflow-hidden"
                      >
                        <Image
                          src={src}
                          fill
                          alt={`center-${i}`}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-[2%] left-[-5%] w-12 h-8 z-40 hover:scale-110 transition-transform">
                  <Image
                    src="/flag.png"
                    fill
                    alt="flag"
                    className="object-contain"
                  />
                </div>
                <div className="absolute bottom-[4%] right-[-5%] w-12 h-12 z-40 rotate-[6deg] hover:rotate-[12deg] transition-transform">
                  <Image
                    src="/mushroom.svg"
                    fill
                    alt="mushroom"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  const themeColors = isDarkMode
    ? {
      background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
      gridOpacity: "rgba(255, 255, 255, 0.1)",
    }
    : {
      background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
      gridOpacity: "rgba(255, 255, 255, 0.3)",
    };

  return (
    <div
      className="h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
          ${themeColors.background}
        `,
        backgroundSize: "30px 30px, 30px 30px, 100% 100%",
        backgroundRepeat: "repeat, repeat, no-repeat",
        backgroundPosition: "top left, top left, center",
        userSelect: "none",
      }}
    >

      {cloudPositions.map((pos, i) => (
        <motion.div key={i} animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: pos.top, left: pos.left, pointerEvents: 'none', zIndex: 5 }}>
          <Image src="/images/cloud1.png" width={200} height={120} alt="cloud" className="opacity-80" />
        </motion.div>
      ))}

      <div className="relative z-10 flex items-center justify-center h-full w-full perspective-1000">
        <div
          className="
            origin-center
            transition-transform
            duration-300
            scale-[0.5]
            sm:scale-[0.6]
            md:scale-[0.7]
            [@media(min-width:900px)]:scale-[0.9]
            [@media(min-width:850px)]:scale-[0.8]
            lg:scale-[1]
            xl:scale-[1.05]
            "
        >
          <div
            className="relative"
            style={{ width: 1000, height: 700 }}
          >
            <div className="absolute right-0 translate-x-[55%] top-[12%] flex flex-col gap-4 z-0">
              {[1, 2, 3].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`relative w-24 h-24 transition-transform duration-300 ${currentPage === pageNum ? 'translate-x-4' : 'hover:translate-x-2'
                    }`}
                >
                  <Image
                    src="/images/gallery/arrow.png"
                    fill
                    alt={`Tab ${pageNum}`}
                    className="object-contain"
                  />
                </button>
              ))}
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none">
              <Image
                src="/images/gallery/notebook.png"
                fill
                alt="Notebook Background"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            <div className="absolute inset-0 z-20 pt-[5%] pb-[5%] px-[6%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-full"
                >
                  {renderDoublePageSpread()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;