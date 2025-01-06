import { useSelector } from "react-redux";
import styles from "./SideBar.module.css";
import UserInfo from "../UserInfo/UserInfo";
import Navigation from "../Navigation/Navigation";
import UserBar from "../UserBar/UserBar";
import NavigationBottom from "../NavigationBottom/NavigationBottom";
import { useLocation } from "react-router-dom";
import { selectIsChatOpen } from "../../redux/chat/selectors";

export default function SideBar() {
  const location = useLocation();
  const chatIsOpen = useSelector(selectIsChatOpen);

  const sideBarOnLogin = location.pathname === "/login";
  const sideBarOnRegister = location.pathname === "/register";
  const sideBarOnMain = location.pathname === "/";

  if (sideBarOnLogin || sideBarOnRegister || sideBarOnMain) {
    return null; // не відображати Header
  }

  return (
    <div className={`${styles.sidebar} ${chatIsOpen ? styles.chatOpen : ""}`}>
      <div className={styles.topContainer}>
        <UserBar className={styles.userBar} />
        <UserInfo className={styles.userInfo} />
      </div>
      <div className={styles.bottomContainer}>
        <Navigation />
        <NavigationBottom />
      </div>
    </div>
  );
}
