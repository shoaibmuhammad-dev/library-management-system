import { Route, Routes } from "react-router-dom";
import Layout from "../components/Global/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import Books from "../pages/books/Books";
import BorrowRequest from "../pages/borrowRequests/BorrowRequest";
import AccountRequests from "../pages/accountRequests/AccountRequests";
import BookDetails from "../components/Books/BookDetails";
import AddBookForm from "../components/Books/AddBookForm";
import LoginPage from "../pages/auth/login/LoginPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import EditBookForm from "../components/Books/EditBookForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <Layout
            page={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/users"
        element={
          <Layout
            page={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/books"
        element={
          <Layout
            page={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/books/add-book"
        element={
          <Layout
            page={
              <PrivateRoute>
                <AddBookForm />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/books/:bookId"
        element={
          <Layout
            page={
              <PrivateRoute>
                <BookDetails />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/books/edit/:bookId"
        element={
          <Layout
            page={
              <PrivateRoute>
                <EditBookForm />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/borrow-requests"
        element={
          <Layout
            page={
              <PrivateRoute>
                <BorrowRequest />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/account-requests"
        element={
          <Layout
            page={
              <PrivateRoute>
                <AccountRequests />
              </PrivateRoute>
            }
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
