import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupCitizen from "./pages/SignupCitizen";
import SignupShop from "./pages/SignupShop";
import AdminPortal from "./pages/AdminPortal";
import CitizenPortal from "./pages/CitizenPortal";
import ShopPortal from "./pages/ShopPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/citizen" element={<SignupCitizen />} />
          <Route path="/signup/shop" element={<SignupShop />} />
          <Route path="/admin-portal" element={<AdminPortal />} />
          <Route path="/citizen-portal" element={<CitizenPortal />} />
          <Route path="/shop-portal" element={<ShopPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
