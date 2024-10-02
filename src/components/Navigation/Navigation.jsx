import { NavLink } from "react-router-dom";
import styles from './Navigation.module.css';
import ellipseImage from '../../assets/images/ellipse_nav.png';
import clsx from 'clsx';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink 
            to="/video-control" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <img src={ellipseImage} alt="Ellipse" className={styles.ellipse} />
            Відеоконтроль
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/crm" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <img src={ellipseImage} alt="Ellipse" className={styles.ellipse} />
            CRM
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/report" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <img src={ellipseImage} alt="Ellipse" className={styles.ellipse} />
            Звіт по авто
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            <img src={ellipseImage} alt="Ellipse" className={styles.ellipse} />
            Налаштування
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
