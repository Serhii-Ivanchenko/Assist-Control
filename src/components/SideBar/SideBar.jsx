import { useSelector } from "react-redux";
import styles from "./SideBar.module.css";
import UserInfo from "../UserInfo/UserInfo";
import Navigation from "../Navigation/Navigation";
import UserBar from "../UserBar/UserBar";
import NavigationBottom from "../NavigationBottom/NavigationBottom";
import { useLocation } from "react-router-dom";
import { selectIsChatOpen } from "../../redux/chat/selectors";
import clsx from "clsx";

export default function SideBar() {
  const location = useLocation();
  const chatIsOpen = useSelector(selectIsChatOpen);

  const sideBarOnLogin = location.pathname === "/login";
  const sideBarOnRegister = location.pathname === "/register";
  const sideBarOnMain = location.pathname === "/";

  const shouldRender = !(sideBarOnLogin || sideBarOnRegister || sideBarOnMain);

  return (
    shouldRender && (
      <div className={clsx(styles.sidebar, { [styles.chatOpen]: chatIsOpen })}>
        <div
          className={
            clsx(styles.topContainer,
            { [styles.topContainerChatOpen]: chatIsOpen })
          }
        >
          <UserBar className={styles.userBar} />
          <UserInfo className={styles.userInfo} />
        </div>
        <div
          className={clsx(styles.bottomContainer, {
            [styles.bottomContainerWithChat]: chatIsOpen,
          })}
        >
          <Navigation />
          <NavigationBottom />
        </div>
      </div>
    )
  );
}
