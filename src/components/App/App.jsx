import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import { lazy, Suspense } from "react";
import RestrictedRoute from "../RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute.jsx";
import Loader from "../Loader/Loader.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage.jsx")
);
const VideControlPage = lazy(() =>
  import("../../pages/VideControlPage/VideControlPage.jsx")
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
  return (
    <>
      <Layout>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/video-control"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/video-control"
                  component={<RegistrationPage />}
                />
              }
            />
            <Route
              path="/video-control"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<VideControlPage />}
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
                <PrivateRoute
                  redirectTo="/login"
                  component={<SettingsPage />}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
