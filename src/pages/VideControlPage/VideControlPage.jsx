import { useDispatch } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import MainContent from "../../components/MainContent/MainContent.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import styles from './VideControlPage.module.css'
import { useEffect } from "react";
import { getUserData } from "../../redux/auth/operations.js";

export default function VideControlPage() {
    const dispatch = useDispatch();

    useEffect(() => {
      const userData = dispatch(getUserData());
      console.log("userData", userData);
    }, [dispatch]);
  
  return (
    <div className={styles.videoControlMainContainer}>
      <Header />
      <div className={styles.mainContent}>
        <SideBar />
        <MainContent />
      </div>
    </div>
  );
}
