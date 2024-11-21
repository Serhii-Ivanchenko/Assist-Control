import styles from './SideBar.module.css';
import UserInfo from '../UserInfo/UserInfo';
import Navigation from '../Navigation/Navigation';
import UserBar from '../UserBar/UserBar';
import NavigationBottom from '../NavigationBottom/NavigationBottom';


export default function SideBar() {
    return (
        <div className={styles.sidebar}>
          <div className={styles.topContainer}>
          <UserBar className={styles.userBar}/>
          <UserInfo className={styles.userInfo}/>
          </div>
          <div className={styles.bottomContainer}>
          <Navigation />
          <NavigationBottom />
          </div>
        </div>
      );
};
