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
  selectLoading,
  selectUser,
} from "../../redux/auth/selectors.js";
import { Toaster } from "react-hot-toast";
import { refreshUser } from "../../redux/auth/operations.js";
import { Navigate } from "react-router-dom";
import firstPage from "../../utils/firstPage.js";
import css from "./App.module.css";
import Header from "../Header/Header.jsx";
import SideBar from "../SideBar/SideBar.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage.jsx")
);
const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const VideoControlPage = lazy(() =>
  import("../../pages/VideoControlPage/VideoControlPage.jsx")
);
const CRMPage = lazy(() => import("../../pages/CRMPage/CRMPage.jsx"));
const ConnectionsPage = lazy(() =>
  import("../../pages/ConnectionsPage/ConnectionsPage.jsx")
);
const RecommendationsPage = lazy(() =>
  import("../../pages/RecommendationsPage/RecommendationsPage.jsx")
);
// const AccountingPage = lazy(() =>
//   import("../../pages/AccountingPage/AccountingPage.jsx")
// );
const ClientsPage = lazy(() =>
  import("../../pages/AccountingPage/ClientsPage/ClientsPage.jsx")
);
// const GeneralClientsListPage = lazy(() =>
//   import(
//     "../../pages/AccountingPage/ClientsPage/GeneralClientsListPage/GeneralClientsListPage.jsx"
//   )
// );
// const ClientsListInWork = lazy(() =>
//   import(
//     "../../pages/AccountingPage/ClientsPage/ClientsListInWork/ClientsListInWork.jsx"
//   )
// );
const DistributorsPage = lazy(() =>
  import("../../pages/AccountingPage/DistributorsPage/DistributorsPage.jsx")
);
const InvoicesPage = lazy(() =>
  import("../../pages/AccountingPage/InvoicesPage/InvoicesPage.jsx")
);
const Goods = lazy(() =>
  import("../../pages/AccountingPage/InvoicesPage/Goods/Goods.jsx")
);
const Services = lazy(() =>
  import("../../pages/AccountingPage/InvoicesPage/Services/Services.jsx")
);
const Funds = lazy(() =>
  import("../../pages/AccountingPage/InvoicesPage/Funds/Funds.jsx")
);
const Equipment = lazy(() =>
  import("../../pages/AccountingPage/InvoicesPage/Equipment/Equipment.jsx")
);
// const ReportsPage = lazy(() =>
//   import("../../pages/ReportsPage/ReportsPage.jsx")
// );

const ReportsClientsPage = lazy(() => import('../../pages/ReportsPage/ReportsClientsPage/ReportsClientsPage.jsx'))

const SettingsPage = lazy(() =>
  import("../../pages/SettingsPage/SettingsPage.jsx")
);
const BonusesPage = lazy(() =>
  import("../../pages/BonusesPage/BonusesPage.jsx")
);
const RatingPage = lazy(() => import("../../pages/RatingPage/RatingPage.jsx"));
const ProficiencyPage = lazy(() =>
  import("../../pages/ProficiencyPage/ProficiencyPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const ChangePasswordWithEmailPage = lazy(() =>
  import(
    "../../pages/ChangePasswordWithEmailPage/ChangePasswordWithEmailPage.jsx"
  )
);
const ValidateEmailPage = lazy(() =>
  import("../../pages/ValidateEmailPage/ValidateEmailPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
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

  return (
    <Layout>
      <div className={css.wrapper}>
        <Header />
        <div className={css.pagesContent}>
          <SideBar />
          <Toaster position="top-right" reverseOrder={false} />
          {isLoading || isRefreshing || !isAuthChecked ? (
            <Loader />
          ) : (
            <>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      isLoggedIn ? (
                        <Navigate to={renderPage} replace />
                      ) : (
                        <HomePage />
                      )
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
                    path="/main"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<MainPage />}
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
                      <PrivateRoute
                        redirectTo="/login"
                        component={<CRMPage />}
                      />
                    }
                  />
                  <Route
                    path="/connections"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<ConnectionsPage />}
                      />
                    }
                  />
                  <Route
                    path="/recommendations"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<RecommendationsPage />}
                      />
                    }
                  />
                  {/* <Route
                    path="/accounting"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<AccountingPage />}
                      />
                    }
                  /> */}
                  <Route
                    path="/accounting/clients"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<ClientsPage />}
                      />
                    }
                  />
                  {/* <Route
                    path="/accounting/clients/clients-list-general"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<GeneralClientsListPage />}
                      />
                    }
                  /> */}
                  {/* <Route
                    path="/accounting/clients/clients-list-in-work"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<ClientsListInWork />}
                      />
                    }
                  /> */}
                  <Route
                    path="/accounting/documents"
                    element={
                      <PrivateRoute
                      redirectTo="/login"
                      component={<InvoicesPage />}
                      />
                    }
                  >
                    <Route path="goods" element={<Goods />} />
                    <Route path="services" element={<Services />} />
                    <Route path="funds" element={<Funds />} />
                    <Route path="equipment" element={<Equipment />} />
                  </Route>
                  {/* <Route
                    path="/reports"
                    element={
                      <PrivateRoute
                      redirectTo="/login"
                      component={<ReportsPage />}
                      />
                      }
                      /> */}
                  <Route
                    path="/reports/clients"
                    element={
                      <PrivateRoute
                      redirectTo="/login"
                      component={<ReportsClientsPage />}
                      />
                    }
                  />
                    <Route
                      path="/reports/distributors"
                      element={
                        <PrivateRoute
                          redirectTo="/login"
                          component={<DistributorsPage />}
                        />
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
                  <Route
                    path="/bonuses"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<BonusesPage />}
                      />
                    }
                  />
                  <Route
                    path="/rating"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<RatingPage />}
                      />
                    }
                  />
                  <Route
                    path="/proficiency"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<ProficiencyPage />}
                      />
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
