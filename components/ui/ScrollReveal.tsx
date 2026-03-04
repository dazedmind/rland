"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.05,
  rootMargin = "0px 0px -40px 0px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? "scroll-reveal--visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
