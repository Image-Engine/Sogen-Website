import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ShopifyCustomerProvider } from "@/contexts/ShopifyCustomerContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
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
import RVCampers from "./pages/RVCampers";
import SolarSystems from "./pages/SolarSystems";
import HomeBackup from "./pages/HomeBackup";
import Industrial from "./pages/Industrial";
import Accessories from "./pages/Accessories";
import Victron from "./pages/Victron";
import VideoReviews from "./pages/VideoReviews";
import NotFound from "./pages/NotFound";
import Login from "./pages/account/Login";
import Callback from "./pages/auth/Callback";
import Dashboard from "./pages/account/Dashboard";
import Orders from "./pages/account/Orders";
import OrderDetail from "./pages/account/OrderDetail";
import Addresses from "./pages/account/Addresses";
import Profile from "./pages/account/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ShopifyCustomerProvider>
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
            <Route path="/rv-campers" element={<RVCampers />} />
            <Route path="/solar-systems" element={<SolarSystems />} />
            <Route path="/home-backup" element={<HomeBackup />} />
            <Route path="/industrial" element={<Industrial />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/victron" element={<Victron />} />
            <Route path="/video-reviews" element={<VideoReviews />} />
            {/* Auth */}
            <Route path="/account/login" element={<Login />} />
            <Route path="/auth/callback" element={<Callback />} />
            {/* Protected account routes */}
            <Route path="/account" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/account/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path="/account/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
            <Route path="/account/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ShopifyCustomerProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
