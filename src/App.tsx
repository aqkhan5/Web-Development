import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import MemberDashboard from "./components/MemberDashboard";

export default function App() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [viewState, setViewState] = useState<"landing" | "auth">("landing");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Synchronize dynamic dark mode state onto the root document elements
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setViewState("landing"); // Landing state turns into Dashboard automatically once userEmail is bound
  };

  const handleLogout = () => {
    setUserEmail("");
    setViewState("landing");
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // If a user is registered/logged in, load the Elite Athletic Dashboard directly
  if (userEmail) {
    return (
      <MemberDashboard
        userEmail={userEmail}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // If viewState is "auth", show the split-screen authentication screen
  if (viewState === "auth") {
    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        onClose={() => setViewState("landing")}
      />
    );
  }

  // Default: Show the public marketing landing page
  return (
    <LandingPage
      onAuthTrigger={() => setViewState("auth")}
      isDarkMode={isDarkMode}
      onToggleTheme={handleToggleTheme}
    />
  );
}
