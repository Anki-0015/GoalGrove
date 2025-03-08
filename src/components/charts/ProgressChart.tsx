
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  bgColor?: string;
  progressColor?: string;
  className?: string;
  animate?: boolean;
  showPercentage?: boolean;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  bgColor = "#E8E8ED",
  progressColor = "#0071E3",
  className,
  animate = true,
  showPercentage = true,
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setProgress(percentage);
    }
  }, [percentage, animate]);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: animate ? "stroke-dashoffset 1s ease-in-out" : "none",
          }}
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;
