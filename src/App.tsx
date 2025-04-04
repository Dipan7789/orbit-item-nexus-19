
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import StorageMap from "./pages/StorageMap";
import ImportExport from "./pages/ImportExport";
import Categories from "./pages/Categories";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import IssGuidelines from "./pages/IssGuidelines";

// Doraemon-inspired feature pages
import InstantNavigation from "./pages/InstantNavigation";
import SpoilageSimulation from "./pages/SpoilageSimulation";
import SmartTagging from "./pages/SmartTagging";

// Future Features Pages
import ZoomableView from "./pages/ZoomableView";
import Translator from "./pages/Translator";
import TransferAssistant from "./pages/TransferAssistant";
import EventPredictor from "./pages/EventPredictor";

// Auth Provider
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Create a client
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="text-lg font-medium">Loading...</div>
        <div className="text-sm text-muted-foreground">Please wait</div>
      </div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Routes>
                {/* Auth routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Protected app routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/storage-map" element={<StorageMap />} />
                  <Route path="/import-export" element={<ImportExport />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/iss-guidelines" element={<IssGuidelines />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* Doraemon-inspired Feature Routes - Implemented */}
                  <Route path="/instant-navigation" element={<InstantNavigation />} />
                  <Route path="/spoilage-simulation" element={<SpoilageSimulation />} />
                  <Route path="/smart-tagging" element={<SmartTagging />} />
                  
                  {/* Future Feature Routes */}
                  <Route path="/zoomable-view" element={<ZoomableView />} />
                  <Route path="/translator" element={<Translator />} />
                  <Route path="/transfer-assistant" element={<TransferAssistant />} />
                  <Route path="/event-predictor" element={<EventPredictor />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
