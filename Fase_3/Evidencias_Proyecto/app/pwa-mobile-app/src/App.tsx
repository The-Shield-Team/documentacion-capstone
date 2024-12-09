import { Routes, Route } from "react-router-dom";
import "@mappedin/react-sdk/lib/esm/index.css";
import { RootLayout } from "./components/templates/RootLayout";
import { HomePage } from "./components/pages/HomePage";
import { SearchPage } from "./components/pages/SearchPage";
import { AlertsPage } from "./components/pages/AlertsPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { LoginPage } from "./components/pages/LoginPage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/atoms/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { ReportsPage } from "./components/pages/ReportsPage";
import { RecentPage } from "./components/pages/RecentPage";
import { FavoritesPage } from "./components/pages/FavoritesPage";
import { Toaster } from "@/components/ui/toaster";
import { ResetPasswordPage } from "./components/pages/ResetPasswordPage";
import { UpdatePasswordPage } from "./components/pages/UpdatePasswordPage";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <Routes>
          <Route
            path="/login"
            element={
              <RootLayout showNav={false}>
                <LoginPage />
              </RootLayout>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RootLayout>
                  <HomePage />
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <RootLayout>
                  <SearchPage />
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <RootLayout>
                  <AlertsPage />
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <RootLayout>
                  <SettingsPage />
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <RootLayout>
                  <ReportsPage />
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recent"
            element={
              <ProtectedRoute>
                <RootLayout>
                  <RecentPage />
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <RootLayout>
                  <FavoritesPage />
                </RootLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <RootLayout showNav={false}>
                <ResetPasswordPage />
              </RootLayout>
            }
          />
          <Route
            path="/update-password"
            element={
              <RootLayout showNav={false}>
                <UpdatePasswordPage />
              </RootLayout>
            }
          />
          <Route
            path="*"
            element={
              <RootLayout showNav={false}>
                <NotFoundPage />
              </RootLayout>
            }
          />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
