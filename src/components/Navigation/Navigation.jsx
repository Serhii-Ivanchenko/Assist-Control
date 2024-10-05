import { NavLink } from "react-router-dom";
import styles from './Navigation.module.css';
import clsx from 'clsx';
import { IoVideocamOutline } from "react-icons/io5";
import { PiTableThin } from "react-icons/pi";
import { IoCarSportSharp } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink 
            to="/video-control" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <div className={styles.iconContainer}>
            <IoVideocamOutline className={styles.videoIcon} />
            </div>
            Відеоконтроль
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/crm" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <div className={styles.iconContainer}>
              <PiTableThin className={styles.iconCrm}/>
            </div>
            CRM
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/report" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <div className={styles.iconContainer}>
              <IoCarSportSharp className={styles.iconAvto}/>
            </div>
            Звіт по авто
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <div className={styles.iconContainer}>
              <GiSettingsKnobs className={styles.iconSettinds}/>
            </div>
            Налаштування
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
