"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";

interface Testimonials {
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonials[] = [
  {
    name: "Laura Martinez",
    role: "Project Coordinator",
    content:
      "Schedulrr keeps our project timelines on track. Coordinating with multiple teams is now seamless and efficient!",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "James Carter",
    role: "Small Business Owner",
    content:
      "Running a business is hectic, but Schedulrr simplifies scheduling client consultations. It’s a lifesaver!",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Priya Sharma",
    role: "HR Specialist",
    content:
      "Onboarding new hires is so much smoother with Schedulrr. Candidates can pick slots that work for them effortlessly.",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Thomas Evans",
    role: "Software Developer",
    content:
      "I use Schedulrr to schedule code reviews and team syncs. It’s simple, reliable, and integrates perfectly with my workflow.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Rachel Kim",
    role: "Event Planner",
    content:
      "Planning events requires precision, and Schedulrr ensures every stakeholder meeting happens without a hitch!",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Alex Turner",
    role: "Consultant",
    content:
      "Schedulrr’s flexibility lets me manage client calls across time zones. My productivity has soared!",
    image: "https://i.pravatar.cc/150?img=10",
  },
  {
    name: "Sophie Bennett",
    role: "Teacher",
    content:
      "Scheduling parent-teacher conferences used to be a nightmare. Schedulrr makes it quick and stress-free!",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Omar Hassan",
    role: "Customer Support Lead",
    content:
      "Our support team uses Schedulrr to book follow-ups with clients. It’s boosted our response time significantly!",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Nina Patel",
    role: "Nonprofit Director",
    content:
      "Schedulrr helps us coordinate volunteer sessions and donor meetings. It’s been a blessing for our organization!",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Ethan Brooks",
    role: "Fitness Coach",
    content:
      "My clients book sessions with me directly through Schedulrr. It’s professional and keeps my schedule packed!",
    image: "https://i.pravatar.cc/150?img=14",
  },
];
const TestimonialsCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full mx-auto p-8"
    >
      <CarouselContent>
        {testimonials.map((testimonial: Testimonials, index: number) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardContent className="flex flex-col justify-between h-full p-6">
                <p className="text-gray-600 mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center mt-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TestimonialsCarousel;
