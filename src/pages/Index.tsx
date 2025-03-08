
import React from "react";
import Header from "@/components/layout/Header";
import Dashboard from "@/components/layout/Dashboard";
import { useTheme } from "@/components/theme/ThemeProvider";

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    }`}>
      <Header />
      <Dashboard />
    </div>
  );
};

export default Index;
