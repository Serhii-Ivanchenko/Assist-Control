import styles from "./ArchiveList.module.css";
import ArchiveCarItem from "../ArchiveCarItem/ArchiveCarItem";
import { useState } from "react";

export default function ArchiveList({ carsDataArchive }) {
  const [visiblePopovers, setVisiblePopovers] = useState({});

  const togglePopover = (popoverName, id) => {
    setVisiblePopovers((prevState) => {
      const newState = { ...prevState };
      const popoverKey = `${popoverName}-${id}`;
      newState[popoverKey] = !newState[popoverKey];

      // Закриваємо всі інші поповери на цьому рівні
      Object.keys(newState).forEach((key) => {
        if (key !== popoverKey) newState[key] = false;
      });
      return newState;
    });
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.scrollWrapper}>
        <ul className={styles.archiveList}>
          {carsDataArchive?.length > 0 ? (
            carsDataArchive.map((item) => (
              <li key={`${item.id}-${item.plate}-${item.date}`}>
                <ArchiveCarItem
                  data={item}
                  visiblePopovers={visiblePopovers}
                  togglePopover={togglePopover}
                />
              </li>
            ))
          ) : (
            <p className={styles.message}>В архіві відсутні дані</p>
          )}
        </ul>
      </div>
    </div>
  );
}
