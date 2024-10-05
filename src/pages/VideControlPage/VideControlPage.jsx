import Header from "../../components/Header/Header.jsx";
import MainContent from "../../components/MainContent/MainContent.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import styles from "./VideControlPage.module.css";

export default function VideControlPage() {
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
