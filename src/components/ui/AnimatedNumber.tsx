
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  formatOptions = {},
  className,
  prefix = "",
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const defaultFormatOptions: Intl.NumberFormatOptions = {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...formatOptions,
  };

  useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;
    const changeInValue = endValue - startValue;
    
    const animateNumber = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      setDisplayValue(startValue + changeInValue * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };
    
    requestAnimationFrame(animateNumber);
    
    return () => {
      // Cleanup if needed
    };
  }, [value, duration]);

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };

  const formattedValue = new Intl.NumberFormat(
    "en-US", 
    defaultFormatOptions
  ).format(displayValue);

  return (
    <span className={cn("inline-block", className)}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedNumber;
