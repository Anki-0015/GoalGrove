
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Budget, TransactionCategory } from "@/types/finance";
import { DollarSign } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BudgetFormProps {
  onAddBudget: (budget: Omit<Budget, "id" | "spent">) => void;
  existingCategories: TransactionCategory[];
}

const formSchema = z.object({
  category: z.string(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  period: z.enum(["monthly", "yearly"] as const)
});

const BudgetForm: React.FC<BudgetFormProps> = ({ onAddBudget, existingCategories }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "food",
      amount: "",
      period: "monthly"
    },
  });
  
  const categories: TransactionCategory[] = [
    "food", "housing", "transportation", "utilities", 
    "entertainment", "shopping", "healthcare", 
    "education", "coffee", "other"
  ];
  
  const availableCategories = categories.filter(
    category => !existingCategories.includes(category)
  );
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onAddBudget({
      category: data.category as TransactionCategory,
      amount: Number(data.amount),
      period: data.period
    });
    
    form.reset({
      category: availableCategories[0] || "food",
      amount: "",
      period: "monthly"
    });
  };

  return (
    <div className="glass-panel p-6">
      <h2 className="text-lg font-semibold mb-4">Create Budget</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="0.00" 
                      className="pl-9" 
                      {...field} 
                      type="text"
                      inputMode="decimal"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Period</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Set Budget</Button>
        </form>
      </Form>
    </div>
  );
};

export default BudgetForm;
