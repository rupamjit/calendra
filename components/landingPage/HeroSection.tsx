"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { gsap } from "gsap";
import { SignInButton } from "@clerk/nextjs";

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        ease: "elastic.out(1, 0.5)",
      }
    );
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-amber-300 p-3 md:p-6">
      <div className="w-full md:w-1/2 p-4 md:p-5 text-center md:text-left">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 px-2 md:px-5"
        >
          The better way{" "}
          <span className="text-black">to schedule your meetings</span>
        </h1>
        <p
          ref={textRef}
          className="text-gray-700 text-sm sm:text-base md:text-lg px-2 md:px-5 py-2 md:py-4"
        >
          A fully customizable scheduling experience for individuals, businesses
          taking calls, and developers building scheduling platforms where users
          meet users.
        </p>
        <div className="flex justify-center md:justify-start m-2 px-2 md:px-5">
          <SignInButton forceRedirectUrl="/dashboard">
            <Button
              ref={buttonRef}
              className="cursor-pointer text-sm sm:text-base px-4 py-2"
            >
              Get Started
            </Button>
          </SignInButton>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-4 md:p-5 flex justify-center md:justify-end">
        <Image
          ref={imageRef}
          src="/landingimage.png"
          width={600}
          height={600}
          alt="Image"
          className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto"
        />
      </div>
    </div>
  );
};

export default HeroSection;
