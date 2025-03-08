
import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "../animations/FadeIn";
import AnimatedNumber from "../ui/AnimatedNumber";
import { Coffee, CreditCard, Home, ShoppingBag, Utensils, Zap } from "lucide-react";

interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
  percentage: number;
}

interface ExpenseCardProps {
  className?: string;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ className }) => {
  const expenses: ExpenseCategory[] = [
    { 
      id: "housing", 
      name: "Housing", 
      amount: 1200, 
      icon: <Home size={18} />, 
      color: "#0071E3", 
      percentage: 35 
    },
    { 
      id: "food", 
      name: "Food & Dining", 
      amount: 520, 
      icon: <Utensils size={18} />, 
      color: "#34C759", 
      percentage: 15 
    },
    { 
      id: "shopping", 
      name: "Shopping", 
      amount: 450, 
      icon: <ShoppingBag size={18} />, 
      color: "#AF52DE", 
      percentage: 13 
    },
    { 
      id: "utilities", 
      name: "Utilities", 
      amount: 280, 
      icon: <Zap size={18} />, 
      color: "#FF9500", 
      percentage: 8 
    },
    { 
      id: "coffee", 
      name: "Coffee & Drinks", 
      amount: 120, 
      icon: <Coffee size={18} />, 
      color: "#FF3B30", 
      percentage: 3 
    },
    { 
      id: "other", 
      name: "Other", 
      amount: 880, 
      icon: <CreditCard size={18} />, 
      color: "#8E8E93", 
      percentage: 26 
    }
  ];

  return (
    <FadeIn className={cn("", className)}>
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Monthly Expenses</h2>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {expenses.map((expense, index) => (
            <FadeIn 
              key={expense.id} 
              delay={0.1 * index} 
              className="card-hover"
            >
              <div className="bg-white/50 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="h-9 w-9 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${expense.color}15` }}
                    >
                      <span className="text-[15px]" style={{ color: expense.color }}>{expense.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium">{expense.name}</div>
                      <div className="text-xs text-muted-foreground">{expense.percentage}% of expenses</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <AnimatedNumber
                      value={expense.amount}
                      prefix="₹"
                      className="font-semibold"
                      formatOptions={{ maximumFractionDigits: 0 }}
                    />
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${expense.percentage}%`, 
                      backgroundColor: expense.color 
                    }}
                  ></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};

export default ExpenseCard;
