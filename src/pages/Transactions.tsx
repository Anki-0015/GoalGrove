
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { useTheme } from "@/components/theme/ThemeProvider";
import FadeIn from "@/components/animations/FadeIn";
import TransactionsList from "@/components/transactions/TransactionsList";
import TransactionForm from "@/components/transactions/TransactionForm";
import { Transaction } from "@/types/finance";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Transactions = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([
    { 
      id: "t1", 
      date: new Date(2023, 9, 15), 
      description: "Salary", 
      amount: 3200, 
      type: "income",
      category: "salary" 
    },
    { 
      id: "t2", 
      date: new Date(2023, 9, 16), 
      description: "Grocery shopping", 
      amount: 120, 
      type: "expense",
      category: "food" 
    },
    { 
      id: "t3", 
      date: new Date(2023, 9, 18), 
      description: "Internet bill", 
      amount: 60, 
      type: "expense",
      category: "utilities" 
    },
    { 
      id: "t4", 
      date: new Date(2023, 9, 20), 
      description: "Freelance work", 
      amount: 450, 
      type: "income",
      category: "other_income" 
    },
    { 
      id: "t5", 
      date: new Date(2023, 9, 22), 
      description: "Coffee shop", 
      amount: 15, 
      type: "expense",
      category: "coffee" 
    }
  ]);

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction = {
      ...newTransaction,
      id: `t${Date.now()}`
    };
    setTransactions([transaction, ...transactions]);
    toast({
      title: "Transaction added",
      description: `${transaction.type === "income" ? "Income" : "Expense"} of $${transaction.amount} successfully recorded.`
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed from your records."
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
            <h1 className="text-3xl font-bold mb-2">Transactions</h1>
            <p className="text-muted-foreground mb-8">Record and manage your financial activities</p>
          </FadeIn>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FadeIn delay={0.1} className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Transaction</CardTitle>
                    <CardDescription>Record a new financial transaction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionForm onAddTransaction={addTransaction} />
                  </CardContent>
                </Card>
              </FadeIn>
              
              <FadeIn delay={0.2} className="lg:col-span-2">
                <TabsContent value="all" className="mt-0">
                  <TransactionsList 
                    transactions={transactions} 
                    onDeleteTransaction={deleteTransaction} 
                  />
                </TabsContent>
                <TabsContent value="income" className="mt-0">
                  <TransactionsList 
                    transactions={transactions.filter(t => t.type === "income")} 
                    onDeleteTransaction={deleteTransaction}
                  />
                </TabsContent>
                <TabsContent value="expense" className="mt-0">
                  <TransactionsList 
                    transactions={transactions.filter(t => t.type === "expense")} 
                    onDeleteTransaction={deleteTransaction}
                  />
                </TabsContent>
              </FadeIn>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
