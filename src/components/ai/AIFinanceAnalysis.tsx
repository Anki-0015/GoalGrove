
import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "../animations/FadeIn";
import { ArrowRight, Brain, ChartBarIcon, DollarSign, LineChart, PieChart, Sparkles, Target } from "lucide-react";
import AnimatedNumber from "../ui/AnimatedNumber";

interface AIFinanceAnalysisProps {
  className?: string;
}

export const AIFinanceAnalysis: React.FC<AIFinanceAnalysisProps> = ({ className }) => {
  return (
    <FadeIn className={cn("", className)}>
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-lg font-semibold">AI Financial Analysis</h2>
          </div>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">Powered by AI</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={0.1} className="bg-white/50 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                <Target size={18} className="text-finance-savings" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Budget Efficiency</span>
            </div>
            <div className="mt-2">
              <AnimatedNumber 
                value={78} 
                suffix="%" 
                className="text-2xl font-bold"
                formatOptions={{ maximumFractionDigits: 0 }}
              />
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <Sparkles size={12} className="mr-1" />
              <span>AI suggests optimizing food expenses</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="bg-white/50 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                <PieChart size={18} className="text-purple-500" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Savings Potential</span>
            </div>
            <div className="mt-2">
              <AnimatedNumber 
                value={245} 
                prefix="$" 
                className="text-2xl font-bold"
                formatOptions={{ maximumFractionDigits: 0 }}
              />
            </div>
            <div className="flex items-center text-xs text-blue-500 mt-1">
              <Sparkles size={12} className="mr-1" />
              <span>Additional monthly savings possible</span>
            </div>
          </FadeIn>
        </div>
        
        <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/40 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <LineChart size={16} className="mr-2 text-green-500" />
            Personalized Recommendations
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                <DollarSign size={14} className="text-finance-income" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Automate Monthly Savings</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Setting up automatic transfers of $350 on payday would accelerate your "New Car" goal by 2 months.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                <ChartBarIcon size={14} className="text-finance-savings" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Expense Reduction</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your utility bills are 15% higher than similar households. Consider energy-saving options.
                </p>
              </div>
            </div>
          </div>
          
          <button className="mt-4 w-full flex items-center justify-center text-sm font-medium text-primary p-2 rounded-md hover:bg-primary/5 transition-colors">
            View Detailed Analysis
            <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default AIFinanceAnalysis;
