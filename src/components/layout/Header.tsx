
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 py-4",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-subtle dark:bg-gray-900/80" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/" className="flex items-center space-x-1">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-semibold text-sm">GG</span>
            </div>
            <h1 className="text-lg font-semibold tracking-tight">
              <span className="text-primary">Goal</span>Grove
            </h1>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/") 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Dashboard
            </Link>
            <Link 
              to="/transactions" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/transactions") 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Transactions
            </Link>
            <Link 
              to="/budget" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/budget") 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Budget
            </Link>
            <Link 
              to="/goals" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/goals") 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Goals
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary">
            <Search size={18} />
          </button>
          <button className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary">
            <Bell size={18} />
          </button>
          <Link to="/profile">
            <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
              <AvatarFallback className="bg-secondary">JD</AvatarFallback>
            </Avatar>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="h-9 w-9 rounded-full flex md:hidden items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary">
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="py-6 space-y-6">
                <Link to="/" className="flex items-center space-x-1">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">GG</span>
                  </div>
                  <h1 className="text-lg font-semibold tracking-tight">
                    <span className="text-primary">Goal</span>Grove
                  </h1>
                </Link>
                
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/" 
                    className={cn(
                      "text-sm font-medium transition-colors rounded-md px-3 py-2",
                      isActive("/") 
                        ? "bg-secondary text-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/transactions" 
                    className={cn(
                      "text-sm font-medium transition-colors rounded-md px-3 py-2",
                      isActive("/transactions") 
                        ? "bg-secondary text-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                    )}
                  >
                    Transactions
                  </Link>
                  <Link 
                    to="/budget" 
                    className={cn(
                      "text-sm font-medium transition-colors rounded-md px-3 py-2",
                      isActive("/budget") 
                        ? "bg-secondary text-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                    )}
                  >
                    Budget
                  </Link>
                  <Link 
                    to="/goals" 
                    className={cn(
                      "text-sm font-medium transition-colors rounded-md px-3 py-2",
                      isActive("/goals") 
                        ? "bg-secondary text-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                    )}
                  >
                    Goals
                  </Link>
                  <Link 
                    to="/profile" 
                    className={cn(
                      "text-sm font-medium transition-colors rounded-md px-3 py-2",
                      isActive("/profile") 
                        ? "bg-secondary text-primary" 
                        : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                    )}
                  >
                    Profile
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
