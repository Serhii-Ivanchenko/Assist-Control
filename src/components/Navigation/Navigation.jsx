import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";
import { BsHouse, BsJournals, BsJournalCheck } from "react-icons/bs";
import { IoVideocamOutline, IoCarSportSharp } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { GiSettingsKnobs } from "react-icons/gi";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
        <ul className={styles.topNavContainer}>
          <li className={styles.navItem}>
            <NavLink
              to="/main"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive, [styles.disabled]: true })
              }
            >
              <div className={styles.iconContainer}>
                <BsHouse className={styles.iconHome} />
              </div>
              Головна
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/video-control"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive })
              }
            >
              <div className={styles.iconContainer}>
                <IoVideocamOutline className={styles.iconVideo} />
              </div>
              Моніторинг
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/crm"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive })
              }
            >
              <div className={styles.iconContainer}>
                <BsJournals className={styles.iconCrm} />
              </div>
              Планувальник
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/recommendations"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive, [styles.disabled]: true })
              }
            >
              <div className={styles.iconContainer}>
                <IoCarSportSharp className={styles.iconAvto} />
              </div>
              Рекомендації
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/accounting"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive, [styles.disabled]: true })
              }
            >
              <div className={styles.iconContainer}>
                <HiOutlineCurrencyDollar className={styles.iconPayment} />
              </div>
              Облік
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive, [styles.disabled]: true })
              }
            >
              <div className={styles.iconContainer}>
                <BsJournalCheck className={styles.iconBook} />
              </div>
              Звіти
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive })
              }
            >
              <div className={styles.iconContainer}>
                <GiSettingsKnobs className={styles.iconSettings} />
              </div>
              Налаштування
            </NavLink>
          </li>
        </ul>
    </nav>
  );
}
