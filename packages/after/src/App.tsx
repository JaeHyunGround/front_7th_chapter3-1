import React from "react";
import { ManagementPage } from "./pages/ManagementPage";
import { Header } from "./components/ui/header";
import { ThemeProvider } from "./contexts/ThemeContext";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
