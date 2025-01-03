import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSpring, animated } from "react-spring";
import styles from "./Navigation.module.css";
import {
  BsHouse,
  BsJournals,
  BsJournalCheck,
  BsChatText,
} from "react-icons/bs";
import { IoVideocamOutline, IoCarSportSharp } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { GiSettingsKnobs } from "react-icons/gi";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import AccountingTree from "./AccountingTree/AccountingTree";

export default function Navigation() {
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);

  const animationProps = useSpring({
    maxHeight: isAccountingOpen ? 300 : 0,
    opacity: isAccountingOpen ? 1 : 0,
    transform: isAccountingOpen ? "translateY(0)" : "translateY(-20px)",
    overflow: "hidden",
    config: {
      mass: 1,
      tension: 170,
      friction: 20,
    },
  });

  const toggleAccounting = () => {
    setIsAccountingOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.topNavContainer}>
        <li className={styles.navItem}>
          <NavLink
            to="/main"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.disabled]: true,
              })
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
            to="/connections"
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
          >
            <div className={styles.iconContainer}>
              <BsChatText className={styles.iconCrm} />
            </div>
            Звернення
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/recommendations"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.disabled]: true,
              })
            }
          >
            <div className={styles.iconContainer}>
              <IoCarSportSharp className={styles.iconAvto} />
            </div>
            Рекомендації
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <div
            onClick={toggleAccounting}
            className={clsx(styles.navLink, {
              [styles.active]: isAccountingOpen,
            })}
          >
            <div
              className={clsx(styles.iconContainer, {
                [styles.active]: isAccountingOpen,
              })}
            >
              <HiOutlineCurrencyDollar
                className={clsx(styles.iconPayment, {
                  [styles.active]: isAccountingOpen,
                })}
              />
            </div>
            Облік
            {isAccountingOpen ? (
              <BiSolidDownArrow className={styles.navArrow} />
            ) : (
              <BiSolidRightArrow className={styles.navArrow} />
            )}
          </div>
          <animated.div
            style={animationProps}
            className={clsx(styles.accountingTreeContainer, {
              [styles.open]: isAccountingOpen,
            })}
          >
            <AccountingTree />
          </animated.div>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.disabled]: true,
              })
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
