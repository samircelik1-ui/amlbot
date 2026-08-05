import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Index from "./pages/Index";
import Placeholder from "./pages/Placeholder";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const placeholderRoutes: { path: string; title: string }[] = [
  { path: "/products", title: "Products" },
  { path: "/analysis", title: "Analysis" },
  { path: "/faq", title: "FAQ" },
  { path: "/blog", title: "Blog" },
  { path: "/about-us", title: "About Us" },
  { path: "/demo-checks", title: "Demo Checks" },
  { path: "/transaction-monitoring", title: "Transaction Monitoring" },
  { path: "/kyt", title: "KYT" },
  { path: "/kyc-kyb", title: "KYC/KYB" },
  { path: "/amlbot", title: "AMLBot" },
  { path: "/aml-training", title: "AML Training" },
  { path: "/consulting", title: "Consulting" },
  { path: "/aml-chat-bot", title: "AML Chat Bot" },
  { path: "/investigation", title: "Investigation" },
  { path: "/certifications", title: "Certifications" },
  { path: "/press-kit", title: "Press Kit" },
  { path: "/careers", title: "Careers" },
  { path: "/support", title: "Support" },
  { path: "/user-agreement", title: "User Agreement" },
  { path: "/privacy-policy", title: "Privacy Policy" },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/create-account" element={<Auth mode="signup" />} />
            {placeholderRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<Placeholder title={route.title} />}
              />
            ))}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
