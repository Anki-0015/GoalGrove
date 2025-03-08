
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import FadeIn from "../animations/FadeIn";
import { AlertCircle, Brain, ChevronUp, LightbulbIcon, SendHorizontal, TrendingUp, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIInsightsPanelProps {
  className?: string;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const { toast } = useToast();
  
  // Simulated AI insights (would be replaced by actual AI integration)
  const insights = [
    {
      id: "spend-optimization",
      title: "Spending Optimization",
      description: "Based on your recent expenses, you could save $120 this month by reducing restaurant spending.",
      icon: <TrendingUp size={18} />,
      color: "#0071E3"
    },
    {
      id: "goal-adjustment",
      title: "Goal Feasibility",
      description: "Your 'New Car' goal is on track! Consider increasing monthly contributions by 5% to reach it sooner.",
      icon: <Brain size={18} />,
      color: "#34C759"
    },
    {
      id: "finance-alert",
      title: "Monthly Alert",
      description: "Your housing expenses increased by 8% compared to last month. This might affect your monthly savings.",
      icon: <AlertCircle size={18} />,
      color: "#FF3B30"
    }
  ];

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Here you would integrate with an actual AI API
    // For now, we'll just show a toast notification
    toast({
      title: "Question Received",
      description: "We're analyzing your financial data to provide an answer.",
    });
    
    setQuestion("");
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Collapsed button */}
      {!isExpanded && (
        <FadeIn>
          <button 
            onClick={() => setIsExpanded(true)}
            className="flex items-center justify-center p-4 bg-primary text-primary-foreground rounded-full shadow-elevated hover:brightness-110 transition-all"
          >
            <LightbulbIcon className="h-6 w-6" />
          </button>
        </FadeIn>
      )}
      
      {/* Expanded panel */}
      {isExpanded && (
        <FadeIn className="glass-panel w-80 md:w-96">
          <div className="p-4 border-b border-border">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold flex items-center">
                <Brain size={18} className="mr-2 text-primary" />
                AI Financial Insights
              </h3>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-secondary rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {insights.map((insight) => (
                <div 
                  key={insight.id}
                  className="p-3 bg-background/60 rounded-lg border border-border"
                >
                  <div className="flex items-start">
                    <div 
                      className="h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0"
                      style={{ backgroundColor: `${insight.color}20` }}
                    >
                      <span style={{ color: insight.color }}>{insight.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmitQuestion} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about your finances..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <button 
                  type="submit"
                  className="p-2 bg-primary text-primary-foreground rounded-md hover:brightness-110 transition-all"
                  disabled={!question.trim()}
                >
                  <SendHorizontal size={16} />
                </button>
              </div>
            </form>
          </div>
          
          <div className="p-3 border-t border-border">
            <button 
              onClick={() => setIsExpanded(false)}
              className="flex items-center justify-center w-full p-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronUp size={14} className="mr-1" />
              Minimize
            </button>
          </div>
        </FadeIn>
      )}
    </div>
  );
};

export default AIInsightsPanel;
