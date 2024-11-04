import { redirect, Route, Routes} from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import { lazy, Suspense, useEffect, useState } from "react";
import RestrictedRoute from "../RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute.jsx";
import Loader from "../Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing, selectUser } from "../../redux/auth/selectors.js";
import { Toaster } from "react-hot-toast";
import ValidateEmailPage from "../../pages/ValidateEmailPage/ValidateEmailPage.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import ChangePasswordWithEmailPage from "../../pages/ChangePasswordWithEmailPage/ChangePasswordWithEmailPage.jsx";
import { getUserData } from "../../redux/auth/operations.js";
import { setSelectedServiceId } from "../../redux/auth/slice.js";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

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

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

 
  
 const [loadingUserData, setLoadingUserData] = useState(true)
  const userData = useSelector(selectUser);
  // const userFirstPage = userData.first_page;
  

  useEffect(() => {
    const fetchUserData = async () => {
      try{
      const userData = await dispatch(getUserData()).unwrap()
       
          const serviceId = userData.services?.[0]?.id;

          if (serviceId) {
            dispatch(setSelectedServiceId(serviceId));
          }
        }catch(error) {
      toast.error("Something went wrong. Please, try again");
    }finally{
        setLoadingUserData(false)
      }
    };

    if (!userData) { 
      fetchUserData();
    } else {
      setLoadingUserData(false);
  };
  }, [dispatch, userData]);

  // useEffect(() => {
  //  const fetchUserData = async () => {
     
  //       await dispatch(getUserData()).unwrap();
      
  //  };
   
//  if (!userData) { 
//       fetchUserData();
//     } else {
//       setLoadingUserData(false);
//   }
//   }, [dispatch, userData]);

 
  
 
  const firstPage = () => {
    const userFirstPage = userData.first_page;
      console.log("firstPage", userFirstPage);

    switch (userFirstPage) {
      case "crm":
        return "/crm";
      case "carReport":
        return "/report";
      case "Settings":
        return"/settings";
      case "v-c":
        return "/video-control";
      case "default":
       default:
         return "/video-control";
      

    }
  };
  
 
// if (userData) {
//     return <Navigate to={firstPage()} replace />;
//   }


  return (isRefreshing || loadingUserData) ?(
    <Loader />
  ) : (
    <Layout>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
            <Route path="/" element={userData ? <Navigate to={firstPage()} replace /> : <HomePage />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo={firstPage()}
                component={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo={firstPage()}
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
