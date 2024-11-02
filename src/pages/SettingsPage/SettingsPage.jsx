import Header from "../../components/Header/Header.jsx";
import SettingMainComponent from "../../components/SettingMainComponent/SettingMainComponent.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.contentContainer}>
        <SideBar />
        <SettingMainComponent />
      </div>
    </div>
  );
}
