import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import TermsConditions from "./pages/TermsConditions";
import ShippingReturns from "./pages/ShippingReturns";
import Warranty from "./pages/Warranty";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EnergyHub2 from "./pages/EnergyHub2";
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
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogHandle/:articleHandle" element={<BlogArticle />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:handle" element={<Product />} />
          <Route path="/collections/:handle" element={<Collection />} />
          <Route path="/collection/:handle" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/energy-hub-2" element={<EnergyHub2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
