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
  { step: "Sign Up", description: "Create your free Calendra account." },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings.",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues.",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically.",
  },
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
    <div className="grid">
      <div className="flex justify-center items-center p-3">
        <h1 className="text-3xl font-extrabold">How It Works</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {howItWorks.map((item, index) => (
          <Card
            ref={(el) => setCardRef(el, index)}
            key={index}
            className="w-full bg-blue-100"
          >
            <CardHeader className="font-bold ">
              <CardTitle>{item.step}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
