import { NavLink } from "react-router-dom";
import styles from "./NavigationBottom.module.css";
import clsx from "clsx";
import { BsGift } from "react-icons/bs";
import { MdOutlineStarOutline } from "react-icons/md";
import { PiChartLineUp } from "react-icons/pi";

export default function NavigationBottom() {
  return (
    <nav className={styles.navigation}>
        <ul className={styles.bottomNavContainer}>
          <li className={styles.navItem}>
            <NavLink
              to="/bonuses"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive, [styles.disabled]: true })
              }
            >
              <div className={styles.iconContainer}>
                <BsGift className={styles.iconBonus} />
              </div>
              Мій бонус
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/rating"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive, [styles.disabled]: true })
              }
            >
              <div className={styles.iconContainer}>
                <MdOutlineStarOutline className={styles.iconRating} />
              </div>
              Рейтинг
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/proficiency"
              className={({ isActive }) =>
                clsx(styles.navLink, { [styles.active]: isActive, [styles.disabled]: true })
              }
            >
              <div className={styles.iconContainer}>
                <PiChartLineUp className={styles.iconChart} />
              </div>
              Кваліфікація
            </NavLink>
          </li>
        </ul>
    </nav>
  );
}
