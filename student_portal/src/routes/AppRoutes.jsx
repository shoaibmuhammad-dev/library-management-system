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
import RequestsPage from "../pages/Requests/RequestsPage";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import OtpVerificationForm from "../components/auth/OtpVerificationForm";
import ResetPasswordForm from "../components/auth/ResetPasswordPage";

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

      {/* forgot password page */}
      <Route
        path="/forgot-password"
        element={
          <PublicRoutes>
            <AuthLayout>
              <ForgotPasswordForm />
            </AuthLayout>
          </PublicRoutes>
        }
      />

      {/* verify OTP + email page */}
      <Route
        path="/verify-email"
        element={
          <PublicRoutes>
            <AuthLayout>
              <OtpVerificationForm />
            </AuthLayout>
          </PublicRoutes>
        }
      />

      {/* reset pasword page */}
      <Route
        path="/reset-password"
        element={
          <PublicRoutes>
            <AuthLayout>
              <ResetPasswordForm />
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

      {/* my submitted requests route */}
      <Route
        path="/requests"
        element={
          <PrivateRoutes>
            <DashboardLayout>
              <RequestsPage />
            </DashboardLayout>
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
