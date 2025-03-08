
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedNumber from "../ui/AnimatedNumber";
import FadeIn from "../animations/FadeIn";
import { ArrowDown, ArrowUp, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface FinanceSummaryProps {
  className?: string;
}

export const FinanceSummary: React.FC<FinanceSummaryProps> = ({ className }) => {
  return (
    <FadeIn className={cn("", className)}>
      <div className="glass-panel p-6">
        <h2 className="text-lg font-semibold mb-4">Finance Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0.1}>
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <DollarSign size={18} className="text-finance-savings" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
                </div>
                <div className="mt-2">
                  <AnimatedNumber 
                    value={42500} 
                    prefix="₹" 
                    className="text-2xl font-bold"
                    formatOptions={{ maximumFractionDigits: 0 }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Last updated today
                </div>
              </div>
            </Card>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    <ArrowUp size={18} className="text-finance-income" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Monthly Income</span>
                </div>
                <div className="mt-2">
                  <AnimatedNumber 
                    value={8200} 
                    prefix="₹" 
                    className="text-2xl font-bold"
                    formatOptions={{ maximumFractionDigits: 0 }}
                  />
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp size={12} className="mr-1" />
                  <span>5.2% from last month</span>
                </div>
              </div>
            </Card>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-red-500/10 to-red-500/5 p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center mr-3">
                    <ArrowDown size={18} className="text-finance-expense" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Monthly Expenses</span>
                </div>
                <div className="mt-2">
                  <AnimatedNumber 
                    value={3450} 
                    prefix="₹" 
                    className="text-2xl font-bold"
                    formatOptions={{ maximumFractionDigits: 0 }}
                  />
                </div>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <TrendingDown size={12} className="mr-1" />
                  <span>2.4% from last month</span>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </FadeIn>
  );
};

export default FinanceSummary;
