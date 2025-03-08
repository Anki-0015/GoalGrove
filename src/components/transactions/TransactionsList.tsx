
import React, { useState } from "react";
import { Transaction } from "@/types/finance";
import { format } from "date-fns";
import { ArrowDownCircle, ArrowUpCircle, Coffee, CreditCard, DollarSign, Home, MoreVertical, ShoppingBag, Trash2, Utensils, Zap } from "lucide-react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface TransactionsListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions, 
  onDeleteTransaction 
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (id: string) => {
    setSelectedTransaction(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction);
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
      case "salary":
        return <DollarSign size={18} />;
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
      case "salary":
        return "#30B0C7";
      case "investment":
        return "#66BB6A";
      default:
        return "#8E8E93";
    }
  };

  return (
    <div className="glass-panel p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No transactions recorded yet.</p>
          <p className="text-sm mt-2">Add your first transaction to start tracking your finances!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="bg-white/50 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: `${getCategoryColor(transaction.category)}15` }}
                  >
                    <span style={{ color: getCategoryColor(transaction.category) }}>
                      {getCategoryIcon(transaction.category)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(transaction.date, "MMM d, yyyy")} · {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1).replace("_", " ")}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-right mr-3">
                    <div className="flex items-center justify-end">
                      {transaction.type === "income" ? (
                        <ArrowUpCircle size={16} className="text-finance-income mr-1" />
                      ) : (
                        <ArrowDownCircle size={16} className="text-finance-expense mr-1" />
                      )}
                      <AnimatedNumber
                        value={transaction.amount}
                        prefix="₹"
                        className={`font-semibold ${transaction.type === "income" ? "text-finance-income" : "text-finance-expense"}`}
                      />
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDelete(transaction.id)}>
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this transaction from your records.
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

export default TransactionsList;
