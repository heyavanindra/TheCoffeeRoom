import { ArrowRight, Play } from "lucide-react";
import React from "react";

const CTASection = () => {
  return (
    <section className="relative z-10 py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20 rounded-3xl p-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of teams already collaborating on TheCoffeeRoom.
            Start your free trial today, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
              <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-border hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-muted/50">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
