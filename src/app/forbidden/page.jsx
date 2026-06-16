"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@heroui/react"; // Assuming HeroUI's package structure
import { gsap } from "gsap";

const ForbiddenPage = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  // Clear elements array on re-render to prevent duplication
  elementsRef.current = [];

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP high-end entry animation
    const ctx = gsap.context(() => {
      // Fade in container background
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
      );

      // Staggered fade up for text, icon, and button
      gsap.fromTo(
        elementsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up GSAP animations context
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans px-5 text-center opacity-0"
    >
      {/* Hand halting sign / lock icon representation */}
      <div
        ref={addToRefs}
        className="text-[80px] mb-4 select-none filter drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]"
      >
        🛑
      </div>

      <h1
        ref={addToRefs}
        className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight selection:bg-red-500/30"
      >
        403: Stop Right There
      </h1>

      <p
        ref={addToRefs}
        className="text-base text-[#a0a0a0] max-w-[440px] leading-relaxed mb-8"
      >
        {`You've hit a digital firewall. Your account lacks the security clearance 
        required to access this directory. If you think this is a mistake, try switching accounts.`}
      </p>

      {/* HeroUI Button with custom Tailwind gradient styling */}
      <div ref={addToRefs}>
        <Button
          onPress={() => window.history.back()}
          radius="md"
          size="lg"
          className="font-semibold text-white border border-[#3a3a3a] bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#555] hover:scale-[1.02] transition-all duration-200"
        >
          Take me back safely
        </Button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
