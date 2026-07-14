"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface CloudFloatOptions {
    baseTop: number;
    baseLeft: number;
    amplitude?: number;
    speed?: number;
    phase?: number;
}

// Custom hook to handle floating animation for clouds
function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
    const [top, setTop] = useState(baseTop);
    const [left, setLeft] = useState(baseLeft);
    const frame = useRef(0);

    useEffect(() => {
        let running = true;
        function animate() {
            frame.current += 1;
            const t = frame.current / 60;
            setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
            if (running) requestAnimationFrame(animate);
        }
        animate();

        function handleResize() {
            const vw = window.innerWidth;
            const scale = vw / 1920;
            setLeft(baseLeft * scale);
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            running = false;
            window.removeEventListener('resize', handleResize);
        };
    }, [baseTop, baseLeft, amplitude, speed, phase]);

    return { top, left };
}

// Component for the floating clouds
const Clouds = ({ clouds }: { clouds: { top: number; left: number }[] }) => (
    <>
        {clouds.map((cloud, idx) => (
            <Image
                key={idx}
                src={`/images/cloud${(idx % 3) + 1}.png`}
                alt={`Cloud ${idx + 1}`}
                width={idx % 3 === 2 ? 204 : idx % 3 === 1 ? 367 : 355}
                height={idx % 3 === 2 ? 125 : idx % 3 === 1 ? 219 : 228}
                style={{
                    position: 'absolute',
                    top: `${cloud.top}px`,
                    left: `${cloud.left}px`,
                    zIndex: 2,
                }}
                priority
            />
        ))}
    </>
);



// Component for the floating computer SVG
const ComputerGraphic = () => (
    <div className="relative z-10 w-64 md:w-80 lg:w-96 my-8">
        <Image
            src="/computer-icon.svg"
            alt="Desktop computer icon"
            width={300}
            height={200}
            layout="responsive"
            priority
        />
    </div>
);

// Component for the social media icons
const SocialMediaIcons = () => (
    <div className="flex justify-center items-center gap-6 mt-16 z-20">
        <a href="https://www.instagram.com/microsoft.innovations.vitc?igsh=MWdzYW9wYWwxMGdiMQ==" target="_blank" rel="noopener noreferrer" className="w-15 h-15 md:w-17 md:h-17">
            <Image src="/insta.svg" alt="Instagram logo" width={60} height={60} />
        </a>
        <a href="https://www.linkedin.com/company/microsoft-innovations-club-vitc/" target="_blank" rel="noopener noreferrer" className="w-15 h-15 md:w-17 md:h-17">
            <Image src="/linkedin.svg" alt="LinkedIn logo" width={60} height={60} />
        </a>
        <a href="mailto:micvitcc@gmail.com" target="_blank" rel="noopener noreferrer" className="w-15 h-15 md:w-17 md:h-17">
            <Image src="/mail.svg" alt="Mail logo" width={60} height={60} />
        </a>
    </div>
);



// Main landing page component
const LandingPage = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const cloudPositions = [
        { baseTop: 173, baseLeft: 1100, amplitude: 25, speed: 0.8, phase: 0 },
        { baseTop: 300, baseLeft: -400, amplitude: 35, speed: 1.1, phase: 1 },
        { baseTop: 700, baseLeft: -232, amplitude: 30, speed: 0.9, phase: 2 },
        { baseTop: 790, baseLeft: 800, amplitude: 28, speed: 1.2, phase: 3 },
        { baseTop: 500, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 },
        { baseTop: 127.98, baseLeft: 22, amplitude: 27, speed: 1.3, phase: 5 },
        { baseTop: -23, baseLeft: 200, amplitude: 22, speed: 1.05, phase: 6 },
        { baseTop: 604.98, baseLeft: 300, amplitude: 32, speed: 1.0, phase: 4 },
        { baseTop: 100, baseLeft: 1200, amplitude: 27, speed: 1.3, phase: 5 },
    ].map(useCloudFloat);

    const getThemeColors = () => {
        return isDarkMode
          ? {
            background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
            textColor: "text-white",
            gridOpacity: "rgba(255, 255, 255, 0.1)"
          }
          : {
            background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
            textColor: "text-gray-900",
            gridOpacity: "rgba(255, 255, 255, 0.3)"
          };
      };
      const themeColors = getThemeColors();
      useEffect(() => {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDarkMode(mediaQuery.matches);
            const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
          }, []);

    // Disable all scrolling
    useEffect(() => {
        const body = document.body;
        const disableScroll = () => {
            body.style.overflow = "hidden";
            body.style.position = "fixed";
            body.style.width = "100%";
            body.style.height = "100%";
        };

        const enableScroll = () => {
            body.style.overflow = "auto";
            body.style.position = "";
            body.style.width = "";
            body.style.height = "";
        };

        disableScroll();
        return () => enableScroll();
    }, []);

    

    return (
        <div
            className="w-full min-h-screen relative flex flex-col items-center justify-between text-center"
            style={{
                backgroundImage: themeColors.background,
                color: themeColors.textColor,
                fontFamily: "'Press Start 2P', cursive", // Assumes font is loaded
                overflow: 'hidden', // Extra check to ensure no scrolling
            }}
        >
            {/* Background grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
                        linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px",
                }}
            />

            <Clouds clouds={cloudPositions} />

            {/* Main content container */}
            <div className="relative w-full h-full flex flex-col items-center justify-around z-10 p-4 mt-24">
               
                {/* Text and computer are grouped for better vertical centering */}
                <div className="flex flex-col items-center my-8">
                    <ComputerGraphic />
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold leading-snug">
                            Mobile is cool but desktop is always on top
                        </h1>
                        <p 
                            className="mt-4"
                            style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: '20px',
                                lineHeight: '130%',
                                letterSpacing: '0%',
                                textAlign: 'center'
                            }}
                        >
                            Hop over to your laptop for the full experience
                        </p>
                        <p 
                            className="mt-8"
                            style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: '15px',
                                lineHeight: '105%',
                                letterSpacing: '0%',
                                textAlign: 'center'
                            }}
                        >
                            In the meantime go follow us on our social media
                        </p>
                    </div>
                </div>

                {/* Social media links */}
                <div className="flex flex-col items-center mb-8">
                    <SocialMediaIcons />
                    <p 
                        className="mt-4"
                        style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontWeight: 500,
                            fontStyle: 'normal',
                            fontSize: '20px',
                            lineHeight: '105%',
                            letterSpacing: '0%',
                            textAlign: 'center',
                            textTransform: 'capitalize'
                        }}
                    >
                        Connect With Us!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;