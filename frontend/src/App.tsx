import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import AppSidebar from "./components/AppSidebar";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppSidebar />
        <main className="p-4 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
