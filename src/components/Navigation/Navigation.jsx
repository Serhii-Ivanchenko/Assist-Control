import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
import ReportsTree from "./ReportsTree/ReportsTree";
import { selectIsChatOpen } from "../../redux/chat/selectors";
import { useSelector } from "react-redux";

export default function Navigation() {
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const chatIsOpen = useSelector(selectIsChatOpen);

  const location = useLocation();

  useEffect(() => {
    if (
      !location.pathname.startsWith("/accounting") &&
      !location.pathname.startsWith("/reports")
    ) {
      setIsAccountingOpen(false);
      setIsReportsOpen(false);
    }
  }, [location.pathname]);

  const accountingAnimationProps = useSpring({
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

  const reportsAnimationProps = useSpring({
    maxHeight: isReportsOpen ? 300 : 0,
    opacity: isReportsOpen ? 1 : 0,
    transform: isReportsOpen ? "translateY(0)" : "translateY(-20px)",
    overflow: "hidden",
    config: {
      mass: 1,
      tension: 170,
      friction: 20,
    },
  });

  const toggleAccounting = () => {
    setIsAccountingOpen((prev) => !prev);
    if (!isAccountingOpen) setIsReportsOpen(false);
  };

  const toggleReports = () => {
    setIsReportsOpen((prev) => !prev);
    if (!isReportsOpen) setIsAccountingOpen(false);
  };

  return (
    <nav
      className={clsx(styles.navigation, {
        [styles.navigationChatOpen]: chatIsOpen,
      })}
    >
      <ul className={styles.topNavContainer}>
        <li className={styles.navItem}>
          <NavLink
            to="/main"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.disabled]: true,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <BsHouse className={styles.iconHome} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
              })}
            >
              Головна
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/video-control"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <IoVideocamOutline className={styles.iconVideo} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                // [styles.visible]: !chatIsOpen
              })}
            >
              Моніторинг
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/crm"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <BsJournals className={styles.iconCrm} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                // [styles.visible]: !chatIsOpen
              })}
            >
              Планувальник
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/connections"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <BsChatText className={styles.iconCrm} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                // [styles.visible]: !chatIsOpen
              })}
            >
              Звернення
            </span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/recommendations"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <IoCarSportSharp className={styles.iconAvto} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                // [styles.visible]: !chatIsOpen
              })}
            >
              Рекомендації
            </span>
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
                [styles.navWithChat]: chatIsOpen,
              })}
            >
              <HiOutlineCurrencyDollar
                className={clsx(styles.iconPayment, {
                  [styles.active]: isAccountingOpen,
                })}
              />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                // [styles.visible]: !chatIsOpen
              })}
            >
              Облік
            </span>
            {isAccountingOpen ? (
              <BiSolidDownArrow
                className={clsx(styles.navArrow, {
                  [styles.smallArrow]: chatIsOpen,
                })}
              />
            ) : (
              <BiSolidRightArrow
                className={clsx(styles.navArrow, {
                  [styles.smallArrow]: chatIsOpen,
                })}
              />
            )}
          </div>
          <animated.div
            style={accountingAnimationProps}
            className={clsx(styles.accountingTreeContainer, {
              [styles.open]: isAccountingOpen,
            })}
          >
            <AccountingTree closeTree={() => setIsAccountingOpen(false)} />
          </animated.div>
        </li>

        <li className={styles.navItem}>
          <div
            onClick={toggleReports}
            className={clsx(styles.navLink, {
              [styles.active]: isReportsOpen,
            })}
          >
            <div
              className={clsx(styles.iconContainer, {
                [styles.active]: isReportsOpen,
                [styles.navWithChat]: chatIsOpen,
              })}
            >
              <BsJournalCheck className={styles.iconBook} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                // [styles.visible]: !chatIsOpen
              })}
            >
              Звіти
            </span>

            {isReportsOpen ? (
              <BiSolidDownArrow
                className={clsx(styles.navArrow, {
                  [styles.smallArrow]: chatIsOpen,
                })}
              />
            ) : (
              <BiSolidRightArrow
                className={clsx(styles.navArrow, {
                  [styles.smallArrow]: chatIsOpen,
                })}
              />
            )}
          </div>
          <animated.div
            style={reportsAnimationProps}
            className={clsx(styles.accountingTreeContainer, {
              [styles.open]: isAccountingOpen,
            })}
          >
            <ReportsTree closeTree={() => setIsReportsOpen(false)} />
          </animated.div>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              clsx(styles.navLink, {
                [styles.active]: isActive,
                [styles.navWithChat]: chatIsOpen,
              })
            }
          >
            <div className={styles.iconContainer}>
              <GiSettingsKnobs className={styles.iconSettings} />
            </div>
            <span
              className={clsx(styles.linkText, {
                [styles.hidden]: chatIsOpen,
                // [styles.visible]: !chatIsOpen
              })}
            >
              Налаштування
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
