import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoginForm from "../components/auth/LoginForm";
import HomePage from "../pages/Home/HomePage";
import SearchPage from "../pages/Search/SearchPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RegistrationForm from "../components/auth/RegistrationForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* login page route */}
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <AuthLayout>
              <LoginForm />
            </AuthLayout>
          </PublicRoutes>
        }
      />

      {/* sign up page route */}
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <AuthLayout>
              <RegistrationForm />
            </AuthLayout>
          </PublicRoutes>
        }
      />

      {/* home page */}
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <DashboardLayout>
              <HomePage />
            </DashboardLayout>
          </PrivateRoutes>
        }
      />

      {/* search page */}
      <Route
        path="/search"
        element={
          <PrivateRoutes>
            <DashboardLayout>
              <SearchPage />
            </DashboardLayout>
          </PrivateRoutes>
        }
      />

      {/* profile page route */}
      <Route
        path="/profile"
        element={
          <PrivateRoutes>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
