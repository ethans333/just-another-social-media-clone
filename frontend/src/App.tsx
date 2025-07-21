import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import Home from "./pages/Home";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";

function App() {
  return (
    <SidebarProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </main>
      </ThemeProvider>
    </SidebarProvider>
  );
}

export default App;
