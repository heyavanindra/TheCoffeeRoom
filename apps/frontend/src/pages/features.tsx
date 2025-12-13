import { features } from "@/constants/constants";
import React from "react";

const Features = ({
  activeFeature,
  setActiveFeature,
}: {
  activeFeature: number;
  setActiveFeature: (a:number) => void;
}) => {
  return (
    <section id="features" className="relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Built for Modern Teams
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to bring your team&apos;s creativity to life,
            all in one powerful platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer ${
                activeFeature === index
                  ? "ring-2 ring-primary/50 shadow-xl scale-105"
                  : ""
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>

              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-chart-2/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
