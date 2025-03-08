
import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "../animations/FadeIn";
import ProgressChart from "../charts/ProgressChart";
import AnimatedNumber from "../ui/AnimatedNumber";
import { Car, Heart, Home, Smartphone } from "lucide-react";

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  icon: React.ReactNode;
  color: string;
}

interface SavingsGoalCardProps {
  className?: string;
}

export const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ className }) => {
  const goals: SavingsGoal[] = [
    {
      id: "home",
      name: "Down Payment",
      targetAmount: 50000,
      currentAmount: 35000,
      dueDate: "Dec 2023",
      icon: <Home size={18} />,
      color: "#0071E3"
    },
    {
      id: "car",
      name: "New Car",
      targetAmount: 25000,
      currentAmount: 12500,
      dueDate: "Jun 2024",
      icon: <Car size={18} />,
      color: "#34C759"
    },
    {
      id: "phone",
      name: "iPhone 14 Pro",
      targetAmount: 1299,
      currentAmount: 900,
      dueDate: "Oct 2023",
      icon: <Smartphone size={18} />,
      color: "#AF52DE"
    },
    {
      id: "vacation",
      name: "Vacation",
      targetAmount: 5000,
      currentAmount: 2200,
      dueDate: "Aug 2024",
      icon: <Heart size={18} />,
      color: "#FF3B30"
    }
  ];

  return (
    <FadeIn className={cn("", className)}>
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Savings Goals</h2>
          <button className="text-sm text-primary font-medium">Add Goal</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {goals.map((goal, index) => {
            const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            
            return (
              <FadeIn 
                key={goal.id} 
                delay={0.1 * index}
                className="card-hover"
              >
                <div className="bg-white/50 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <div 
                          className="h-8 w-8 rounded-full flex items-center justify-center mr-2"
                          style={{ backgroundColor: `${goal.color}15` }}
                        >
                          <span style={{ color: goal.color }}>{goal.icon}</span>
                        </div>
                        <h3 className="font-medium">{goal.name}</h3>
                      </div>
                      <div className="mt-3">
                        <div className="text-sm text-muted-foreground mb-1">Current</div>
                        <AnimatedNumber
                          value={goal.currentAmount}
                          prefix="$"
                          className="text-lg font-semibold"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          of <span className="font-medium">${goal.targetAmount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs">
                        <span className="text-muted-foreground">Due by </span>
                        <span className="font-medium">{goal.dueDate}</span>
                      </div>
                    </div>
                    
                    <ProgressChart
                      percentage={percentage}
                      size={90}
                      strokeWidth={8}
                      progressColor={goal.color}
                    />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};

export default SavingsGoalCard;
