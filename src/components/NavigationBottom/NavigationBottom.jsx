import { NavLink } from "react-router-dom";
import styles from "./NavigationBottom.module.css";
import clsx from "clsx";
import { BsGift } from "react-icons/bs";
import { MdOutlineStarOutline } from "react-icons/md";
import { PiChartLineUp } from "react-icons/pi";
import { selectIsChatOpen } from "../../redux/chat/selectors";
import { useSelector } from "react-redux";

export default function NavigationBottom() {
  const chatIsOpen = useSelector(selectIsChatOpen);

  return (
    <nav
      className={clsx(styles.navigation, {
        [styles.navigationChatOpen]: chatIsOpen,
      })}
    >
      <ul className={styles.bottomNavContainer}>
      <li className={styles.navItem}>
          <NavLink
            to="/proficiency"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.disabled]: true,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <PiChartLineUp className={styles.iconChart} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                [styles.visible]: !chatIsOpen,
              })}
            >
              Маркетинг
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/rating"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.disabled]: true,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <MdOutlineStarOutline className={styles.iconRating} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                [styles.visible]: !chatIsOpen,
              })}
            >
              Рейтинг
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/bonuses"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.disabled]: true,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <BsGift className={styles.iconBonus} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                [styles.visible]: !chatIsOpen,
              })}
            >
              Мій бонус
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
