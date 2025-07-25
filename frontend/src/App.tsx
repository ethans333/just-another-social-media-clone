import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import AppSidebar from "./components/AppSidebar";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="p-4 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <AppSidebar>
                  <Home />
                </AppSidebar>
              }
            />
            <Route
              path="/profile"
              element={
                <AppSidebar>
                  <Profile />
                </AppSidebar>
              }
            />
            <Route
              path="/account/:id"
              element={
                <AppSidebar>
                  <Account />
                </AppSidebar>
              }
            />
            <Route
              path="/settings"
              element={
                <AppSidebar>
                  <Settings />
                </AppSidebar>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
