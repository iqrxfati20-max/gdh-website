import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "./context/AppContext";

import { Navbar } from "./components/Navbar";
import { CartSidebar } from "./components/CartSidebar";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/account" component={Account} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <CartSidebar />
              <WhatsAppFloat />
            </div>
          </WouterRouter>
          <Toaster position="bottom-center" richColors />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
