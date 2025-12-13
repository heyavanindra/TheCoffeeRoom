import { ArrowRight, Palette, Play, Users, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative z-10 pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Collaborate with you friends
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent leading-tight">
            Where Ideas Come
            <br />
            <span className="relative">
              to Life
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full" />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            The ultimate collaborative whiteboard that transforms your ideas
            into reality. Draw, brainstorm, and create together in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href={"/dashboard"}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-101 hover:shadow-xl ease-in-out flex items-center"
            >
              <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl relative overflow-hidden">
              <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <Palette className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Your canvas awaits</p>
                </div>
              </div>

              <div className="absolute top-8 left-8 w-12 h-12 bg-chart-1/30 rounded-full animate-pulse" />
              <div className="absolute top-16 right-12 w-8 h-8 bg-chart-2/40 rounded-full animate-pulse delay-500" />
              <div className="absolute bottom-12 left-16 w-10 h-10 bg-chart-3/35 rounded-full animate-pulse delay-1000" />
            </div>
          </div>

          <div className="absolute -top-4 -left-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg p-3 shadow-lg animate-float">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg p-3 shadow-lg animate-float delay-1000">
            <Zap className="w-5 h-5 text-chart-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
