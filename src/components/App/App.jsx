import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import { lazy, Suspense, useEffect, useState } from "react";
import RestrictedRoute from "../RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute.jsx";
import Loader from "../Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "../../redux/auth/selectors.js";
import { Toaster } from "react-hot-toast";
import ValidateEmailPage from "../../pages/ValidateEmailPage/ValidateEmailPage.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import ChangePasswordWithEmailPage from "../../pages/ChangePasswordWithEmailPage/ChangePasswordWithEmailPage.jsx";
import { Navigate } from "react-router-dom";
import firstPage from "../../utils/firstPage.js";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage.jsx")
);
const VideoControlPage = lazy(() =>
  import("../../pages/VideoControlPage/VideoControlPage.jsx")
);
const CRMPage = lazy(() => import("../../pages/CRMPage/CRMPage.jsx"));
const ReportPage = lazy(() => import("../../pages/ReportPage/ReportPage.jsx"));
const SettingsPage = lazy(() =>
  import("../../pages/SettingsPage/SettingsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const refreshUserData = async () => {
      await dispatch(refreshUser());
      setIsAuthChecked(true);
    };
    refreshUserData();
  }, [dispatch]);

  const userData = useSelector(selectUser);
  const renderPage = firstPage(userData);

  return isRefreshing || !isAuthChecked ? (
    <Loader />
  ) : (
    <Layout>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to={renderPage} replace /> : <HomePage />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo={renderPage}
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo={renderPage}
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/video-control"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<VideoControlPage />}
              />
            }
          />
          <Route
            path="/crm"
            element={
              <PrivateRoute redirectTo="/login" component={<CRMPage />} />
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute redirectTo="/login" component={<ReportPage />} />
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute redirectTo="/login" component={<SettingsPage />} />
            }
          />

          <Route
            path="/validate-email/:api_key"
            element={
              <RestrictedRoute
                redirectTo="/video-control"
                component={<ValidateEmailPage />}
              />
            }
          />

          <Route
            path="/reset-password/:api_key"
            element={<ChangePasswordWithEmailPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
