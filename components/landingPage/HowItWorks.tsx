"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 


gsap.registerPlugin(ScrollTrigger);

interface HowItWorksItem {
  step: string;
  description: string;
}

const howItWorks: HowItWorksItem[] = [
  { step: "Step 1", description: "Create an account." },
  { step: "Step 2", description: "Set your availability." },
  { step: "Step 3", description: "Share your link." },
  { step: "Step 4", description: "Schedule meetings." },
];

const HowItWorksSection: React.FC = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardRefs.current[index] = el;
  };

  useEffect(() => {
    if (cardRefs.current.length > 0) {
      cardRefs.current.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {howItWorks.map((item, index) => (
          <Card
            ref={(el) => setCardRef(el, index)}
            key={index}
            className="w-full"
          >
            <CardHeader>
              <CardTitle>{item.step}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
