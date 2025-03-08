
import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "../animations/FadeIn";
import FinanceSummary from "../finance/FinanceSummary";
import ExpenseCard from "../finance/ExpenseCard";
import SavingsGoalCard from "../finance/SavingsGoalCard";
import AIFinanceAnalysis from "../ai/AIFinanceAnalysis";
import { 
  ArrowUpRight, 
  BadgePlus, 
  CreditCard, 
  Landmark, 
  Moon, 
  PieChart, 
  Settings, 
  Sun, 
  Wallet,
  TrendingUp
} from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface DashboardProps {
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleAddTransaction = () => {
    navigate('/transactions');
  };

  return (
    <div className={cn("pt-24 px-6 md:px-8 pb-16", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <FadeIn>
            <h1 className="text-3xl font-bold mb-2">Financial Dashboard</h1>
            <p className="text-muted-foreground">Track your finances, achieve your goals, and make better decisions</p>
          </FadeIn>
          
          <FadeIn delay={0.2} className="mt-4 md:mt-0">
            <div className="flex space-x-3">
              <button 
                className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings size={16} />
                <span>Settings</span>
              </Button>
              <Button onClick={handleAddTransaction} size="sm" className="flex items-center gap-1">
                <BadgePlus size={16} />
                <span>Add Transaction</span>
              </Button>
            </div>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-6 gap-6 mb-8">
          <FadeIn delay={0.1} className="col-span-6 md:col-span-1">
            <div className="glass-panel h-20 flex items-center justify-center card-hover">
              <button className="flex flex-col items-center text-primary">
                <Wallet size={22} className="mb-1" />
                <span className="text-xs font-medium">Accounts</span>
              </button>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.15} className="col-span-6 md:col-span-1">
            <div className="glass-panel h-20 flex items-center justify-center card-hover">
              <button className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                <CreditCard size={22} className="mb-1" />
                <span className="text-xs font-medium">Cards</span>
              </button>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="col-span-6 md:col-span-1">
            <div className="glass-panel h-20 flex items-center justify-center card-hover">
              <button className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                <Landmark size={22} className="mb-1" />
                <span className="text-xs font-medium">Investments</span>
              </button>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.25} className="col-span-6 md:col-span-1">
            <div className="glass-panel h-20 flex items-center justify-center card-hover">
              <button onClick={() => navigate('/budget')} className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                <PieChart size={22} className="mb-1" />
                <span className="text-xs font-medium">Budget</span>
              </button>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3} className="col-span-6 md:col-span-2">
            <div className="glass-panel h-20 flex items-center justify-between px-6 card-hover">
              <div>
                <div className="text-xs text-muted-foreground">Net Worth</div>
                <div className="text-xl font-semibold">$256,320</div>
                <div className="text-xs text-green-500 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  <span>+5.2% this month</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <ArrowUpRight size={18} className="text-finance-income" />
              </div>
            </div>
          </FadeIn>
        </div>
        
        <FinanceSummary className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ExpenseCard />
          <SavingsGoalCard />
        </div>

        <AIFinanceAnalysis className="mb-8" />
      </div>
    </div>
  );
};

export default Dashboard;
