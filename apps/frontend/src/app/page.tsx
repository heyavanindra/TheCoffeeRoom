"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/pages/hero";
import Features from "@/pages/features";
import Testimonials from "@/pages/testimonials";
import CTASection from "@/pages/cta-section";
import Footer from "@/pages/footer";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-chart-2/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-chart-3/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <Navbar />
      <HeroSection />
      <Features
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      ></Features>
      <Testimonials />
      <CTASection />
      <Footer />

      <style jsx>{`
        
      `}</style>
    </div>
  );
};

export default Landing;
