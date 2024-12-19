import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./InvoicesNavigationSection.module.css";

export default function InvoicesNavigationSection() {
  // const [selected, setSelected] = useState(null);
  // const navigate = useNavigate();

  // const options = [
  //   { name: "Товар", path: "goods" },
  //   { name: "Послуги", path: "services" },
  //   { name: "Каса", path: "funds" },
  //   { name: "Обладнання", path: "equipment" },
  // ];

  // const handleClick = (index, path) => {
  //   setSelected(index);
  //   navigate(path);
  // };
  const navLinkClass = ({ isActive }) => {
    return clsx(styles.navText, isActive && styles.active);
  };

  return (
    // <div className={styles.wrapper}>
    //   {options.map((option, index) => (
    //     <div
    //       key={index}
    //       className={clsx(styles.navContainer, {
    //         [styles.active]: index === selected,
    //       })}
    //       onClick={() => handleClick(index, option.path)}
    //     >
    //       <p className={styles.navText}>{option.name}</p>
    //     </div>
    //   ))}
    // </div>
    <nav className={styles.wrapper}>
      <NavLink to="goods" className={navLinkClass}>
        Товар
      </NavLink>

      <NavLink to="services" className={navLinkClass}>
        Послуги
      </NavLink>

      <NavLink to="funds" className={navLinkClass}>
        Каса
      </NavLink>

      <NavLink to="equipment" className={navLinkClass}>
        Обладнання
      </NavLink>
    </nav>
  );
}
