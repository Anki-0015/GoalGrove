
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { useTheme } from "@/components/theme/ThemeProvider";
import FadeIn from "@/components/animations/FadeIn";
import { SavingsGoal, getCategoryColor } from "@/types/finance";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Goals = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: "g1",
      name: "Down Payment",
      targetAmount: 50000,
      currentAmount: 35000,
      dueDate: "Dec 2023",
      priority: "high"
    },
    {
      id: "g2",
      name: "New Car",
      targetAmount: 25000,
      currentAmount: 12500,
      dueDate: "Jun 2024",
      priority: "medium"
    },
    {
      id: "g3",
      name: "Vacation",
      targetAmount: 5000,
      currentAmount: 2200,
      dueDate: "Aug 2024",
      priority: "low"
    },
    {
      id: "g4",
      name: "Emergency Fund",
      targetAmount: 15000,
      currentAmount: 7500,
      dueDate: "Mar 2024",
      priority: "high"
    }
  ]);

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    toast({
      title: "Goal deleted",
      description: "The savings goal has been removed."
    });
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Helper function to format the date for display
  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') return date;
    return date.toLocaleDateString();
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
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Savings Goals</h1>
                <p className="text-muted-foreground">Track and achieve your financial targets</p>
              </div>
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                <span>Add New Goal</span>
              </Button>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => {
              const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
              
              return (
                <FadeIn delay={0.1 * index} key={goal.id}>
                  <Card className="overflow-hidden">
                    <div className={`h-2 ${
                      goal.priority === "high" ? "bg-red-500" :
                      goal.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="mr-2 p-2 rounded-full bg-primary/10">
                            <Target size={20} className="text-primary" />
                          </div>
                          <CardTitle>{goal.name}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => deleteGoal(goal.id)}>
                          <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                      <CardDescription>Target: ₹{goal.targetAmount.toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">₹{goal.currentAmount.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" indicatorClassName={getProgressColor(percentage)} />
                      </div>
                      <div className="text-sm text-muted-foreground mt-4">
                        <span className="font-medium">Due: </span>
                        {formatDate(goal.dueDate)}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Add Funds
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
