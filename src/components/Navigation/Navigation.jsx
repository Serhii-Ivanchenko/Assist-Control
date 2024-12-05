import { NavLink } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import styles from "./Navigation.module.css";
import { BsHouse, BsJournals, BsJournalCheck, BsChatText } from "react-icons/bs";
import { IoVideocamOutline, IoCarSportSharp } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdExpandMore, MdChevronRight } from "react-icons/md";
import AccountingTree from "../AccountingTree/AccountingTree";
import { AnimatedCollapse } from "../sharedComponents/AnimatedCollapse/AnimatedCollapse";

export default function Navigation() {
  const [showAccountingTree, setShowAccountingTree] = useState(false);

  const toggleAccountingTree = () => {
    setShowAccountingTree((prevState) => !prevState);
  };

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
          <NavLink to="/main" className={clsx(styles.navLink)}>
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
          <div
            className={clsx(styles.navLink, styles.expandable)}
            onClick={toggleAccountingTree}
          >
            <div className={styles.iconContainer}>
              <HiOutlineCurrencyDollar className={styles.iconPayment} />
            </div>
            Облік
            <span className={styles.expandIcon}>
              {showAccountingTree ? <MdExpandMore /> : <MdChevronRight />}
            </span>
          </div>
          <AnimatedCollapse inProp={showAccountingTree}>
            <div className={clsx(styles.accountingTreeContainer)}>
              <AccountingTree />
            </div>
          </AnimatedCollapse>
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
