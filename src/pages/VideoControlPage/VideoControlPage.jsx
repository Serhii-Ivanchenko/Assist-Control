import { useDispatch } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import MainContent from "../../components/MainContent/MainContent.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./VideoControlPage.module.css";
import { useEffect } from "react";
import { getUserData } from "../../redux/auth/operations.js";
import toast from "react-hot-toast";
import DetailedClientInfo from "../../components/DetailedClientInfo/DetailedClientInfo.jsx";

export default function VideoControlPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(getUserData())
        .unwrap()
        .then(() => {})
        .catch(() => {
          toast.error("Something went wrong. Please, try again");
        });
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <div className={css.videoControlMainContainer}>
      <Header />
      <div className={css.mainContent}>
        <SideBar />
        <MainContent />
        <DetailedClientInfo/>
      </div>
    </div>
  );
}
