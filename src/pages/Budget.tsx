
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { useTheme } from "@/components/theme/ThemeProvider";
import FadeIn from "@/components/animations/FadeIn";
import BudgetForm from "@/components/budget/BudgetForm";
import BudgetList from "@/components/budget/BudgetList";
import { Budget } from "@/types/finance";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BudgetPage = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>([
    { 
      id: "b1", 
      category: "food", 
      amount: 600, 
      spent: 320, 
      period: "monthly" 
    },
    { 
      id: "b2", 
      category: "housing", 
      amount: 1200, 
      spent: 1200, 
      period: "monthly" 
    },
    { 
      id: "b3", 
      category: "entertainment", 
      amount: 200, 
      spent: 80, 
      period: "monthly" 
    },
    { 
      id: "b4", 
      category: "utilities", 
      amount: 300, 
      spent: 285, 
      period: "monthly" 
    },
    { 
      id: "b5", 
      category: "transportation", 
      amount: 400, 
      spent: 350, 
      period: "monthly" 
    },
    { 
      id: "b6", 
      category: "healthcare", 
      amount: 250, 
      spent: 125, 
      period: "monthly" 
    }
  ]);

  const addBudget = (newBudget: Omit<Budget, "id" | "spent">) => {
    const budget = {
      ...newBudget,
      id: `b${Date.now()}`,
      spent: 0
    };
    
    // Check if budget for this category already exists
    const existingBudgetIndex = budgets.findIndex(b => b.category === budget.category);
    
    if (existingBudgetIndex >= 0) {
      // Update existing budget
      const updatedBudgets = [...budgets];
      updatedBudgets[existingBudgetIndex] = {
        ...updatedBudgets[existingBudgetIndex],
        amount: budget.amount,
        period: budget.period
      };
      setBudgets(updatedBudgets);
      toast({
        title: "Budget updated",
        description: `Budget for ${budget.category} has been updated to $${budget.amount}.`
      });
    } else {
      // Add new budget
      setBudgets([...budgets, budget]);
      toast({
        title: "Budget created",
        description: `New budget for ${budget.category} has been set at $${budget.amount}.`
      });
    }
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
    toast({
      title: "Budget deleted",
      description: "The budget has been removed from your plan."
    });
  };
  
  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    }`}>
      <Header />
      <div className="pt-24 px-6 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl font-bold mb-2">Budget Planner</h1>
            <p className="text-muted-foreground mb-8">Set spending limits and track your progress</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeIn delay={0.1} className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Create Budget</CardTitle>
                  <CardDescription>Set a budget for specific categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetForm onAddBudget={addBudget} existingCategories={budgets.map(b => b.category)} />
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={0.2} className="lg:col-span-2">
              <BudgetList budgets={budgets} onDeleteBudget={deleteBudget} />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
