
export type TransactionType = "income" | "expense";

export type TransactionCategory = 
  | "salary" 
  | "investment" 
  | "other_income" 
  | "food" 
  | "housing" 
  | "transportation" 
  | "utilities" 
  | "entertainment" 
  | "shopping" 
  | "healthcare" 
  | "education" 
  | "coffee" 
  | "travel"
  | "personal"
  | "gifts"
  | "subscription"
  | "other";

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  notes?: string;
  tags?: string[];
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  amount: number;
  spent: number;
  period: "monthly" | "yearly" | "weekly";
  lastUpdated?: Date;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: Date | string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface FinancialSnapshot {
  date: Date;
  income: number;
  expenses: number;
  savings: number;
  netWorth: number;
}

// Define the type for category colors properly
export type CategoryColor = {
  [key in TransactionCategory]?: string;
};

export const CATEGORY_COLORS: CategoryColor = {
  salary: "#34C759",
  investment: "#5AC8FA",
  other_income: "#30B0C7",
  food: "#FF9500",
  housing: "#0071E3",
  transportation: "#FF3B30",
  utilities: "#FF9F0A",
  entertainment: "#AF52DE",
  shopping: "#FF2D55",
  healthcare: "#64D2FF",
  education: "#5E5CE6",
  coffee: "#BF5AF2",
  travel: "#FF375F",
  personal: "#FF643B",
  gifts: "#FFD60A",
  subscription: "#C7A4FF",
  other: "#8E8E93"
};

export const getCategoryColor = (category: TransactionCategory): string => {
  return CATEGORY_COLORS[category] || "#8E8E93";
};
