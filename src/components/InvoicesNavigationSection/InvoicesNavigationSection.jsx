import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./InvoicesNavigationSection.module.css";

export default function InvoicesNavigationSection() {
  const [selected, setSelected] = useState(null); 
  const navigate = useNavigate();

  const options = [
    { name: "Товар", path: "goods" },
    { name: "Послуги", path: "services" },
    { name: "Каса", path: "funds" },
    { name: "Обладнання", path: "equipment" },
  ];

  const handleClick = (index, path) => {
    setSelected(index);
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      {options.map((option, index) => (
        <div
          key={index}
          className={clsx(styles.navContainer, {
            [styles.active]: index === selected,
          })}
          onClick={() => handleClick(index, option.path)}
        >
          <p className={styles.navText}>{option.name}</p>
        </div>
      ))}
    </div>
  );
}
