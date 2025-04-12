
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cases from "./pages/Cases";
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import TimeTracking from "./pages/TimeTracking";
import Tasks from "./pages/Tasks";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import LienCalculator from "./pages/LienCalculator";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/time" element={<TimeTracking />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/lien-calculator" element={<LienCalculator />} />
          <Route path="/reports" element={<Reports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
