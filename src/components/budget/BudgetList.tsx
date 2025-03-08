
import React, { useState } from "react";
import { Budget } from "@/types/finance";
import { AlertCircle, Coffee, CreditCard, Home, MoreVertical, ShoppingBag, Trash2, Utensils, Zap } from "lucide-react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface BudgetListProps {
  budgets: Budget[];
  onDeleteBudget: (id: string) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({ 
  budgets, 
  onDeleteBudget 
}) => {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (id: string) => {
    setSelectedBudget(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedBudget) {
      onDeleteBudget(selectedBudget);
      setShowDeleteDialog(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Utensils size={18} />;
      case "housing":
        return <Home size={18} />;
      case "utilities":
        return <Zap size={18} />;
      case "shopping":
        return <ShoppingBag size={18} />;
      case "coffee":
        return <Coffee size={18} />;
      default:
        return <CreditCard size={18} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food":
        return "#34C759";
      case "housing":
        return "#0071E3";
      case "utilities":
        return "#FF9500";
      case "shopping":
        return "#AF52DE";
      case "coffee":
        return "#FF3B30";
      default:
        return "#8E8E93";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return "#34C759";
    if (percentage < 75) return "#FF9500";
    return "#FF3B30";
  };

  return (
    <div className="glass-panel p-6">
      <h2 className="text-lg font-semibold mb-4">Your Budgets</h2>
      
      {budgets.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No budgets created yet.</p>
          <p className="text-sm mt-2">Create your first budget to start managing your spending!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = Math.min(Math.round((budget.spent / budget.amount) * 100), 100);
            const isOverBudget = budget.spent > budget.amount;
            return (
              <div 
                key={budget.id}
                className="bg-white/50 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${getCategoryColor(budget.category)}15` }}
                    >
                      <span style={{ color: getCategoryColor(budget.category) }}>
                        {getCategoryIcon(budget.category)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">
                        {budget.category.charAt(0).toUpperCase() + budget.category.slice(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} budget
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDelete(budget.id)}>
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-sm font-medium">
                      <AnimatedNumber
                        value={budget.spent}
                        prefix="$"
                        formatOptions={{ maximumFractionDigits: 0 }}
                      />
                    </span>
                    <span className="text-sm text-muted-foreground"> of </span>
                    <span className="text-sm font-medium">
                      <AnimatedNumber
                        value={budget.amount}
                        prefix="$"
                        formatOptions={{ maximumFractionDigits: 0 }}
                      />
                    </span>
                  </div>
                  
                  <div className="text-sm font-medium">
                    {isOverBudget ? (
                      <div className="flex items-center text-finance-expense">
                        <AlertCircle size={14} className="mr-1" />
                        Over budget
                      </div>
                    ) : (
                      <span>{percentage}%</span>
                    )}
                  </div>
                </div>
                
                <Progress 
                  value={percentage} 
                  className="h-2"
                  indicatorClassName={isOverBudget ? "bg-finance-expense" : ""}
                />
              </div>
            );
          })}
        </div>
      )}
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this budget from your plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BudgetList;
