import styles from './SideBar.module.css';
import UserInfo from '../UserInfo/UserInfo';
import Navigation from '../Navigation/Navigation';
import LoadStats from '../LoadStats/LoadStats';
import PremiumAd from '../PremiumAd/PremiumAd';
import UserBar from '../UserBar/UserBar';


export default function SideBar() {
    return (
        <div className={styles.sidebar}>
          <div className={styles.topContainer}>
          <UserBar className={styles.userBar}/>
          <UserInfo className={styles.userInfo}/>
          <Navigation />
          </div>
          <div className={styles.bottomContainer}>
          <LoadStats />
          <PremiumAd />
          </div>
        </div>
      );
};
