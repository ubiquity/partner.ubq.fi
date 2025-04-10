"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  initial: string;
  name: string;
  title: string;
  quote: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoRotateInterval?: number; // in milliseconds
}

export function TestimonialCarousel({ 
  testimonials, 
  autoRotateInterval = 5000 
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const totalTestimonials = testimonials.length;
  
  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % totalTestimonials);
  }, [totalTestimonials]);
  
  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + totalTestimonials) % totalTestimonials);
  }, [totalTestimonials]);
  
  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, autoRotateInterval);
    
    return () => clearInterval(interval);
  }, [goToNext, autoRotateInterval, isPaused]);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Testimonials */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="flex items-center mb-4">
                  <div className="bg-[#00FFFF] h-10 w-10 rounded-full flex items-center justify-center text-[#06061A] font-bold">
                    {testimonial.initial}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-[#00FFFF] text-[#06061A] rounded-full p-2 shadow-md hover:bg-[#00FFFF]/80 transition-colors md:-translate-x-0"
        onClick={goToPrevious}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-[#00FFFF] text-[#06061A] rounded-full p-2 shadow-md hover:bg-[#00FFFF]/80 transition-colors md:translate-x-0"
        onClick={goToNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Indicator Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#00FFFF]" : "bg-gray-300"
            }`}
            onClick={() => goToIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
