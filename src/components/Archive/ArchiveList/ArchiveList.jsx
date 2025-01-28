import ArchiveCarItem from "../ArchiveCarItem/ArchiveCarItem";
import styles from "./ArchiveList.module.css";
import { useState, useRef } from "react";

export default function ArchiveList({ carsDataArchive }) {
  const [visiblePopovers, setVisiblePopovers] = useState({});
  const scrollWrapperRef = useRef(null);
  const itemRefs = useRef([]); 
  const scrollHeight = 705;
  const itemHeight = 48; 

  const togglePopover = (popoverName, id, index) => {
    setVisiblePopovers((prevState) => {
      const newState = { ...prevState };
      const popoverKey = `${popoverName}-${id}`;
      newState[popoverKey] = !newState[popoverKey];

      // Закриваємо всі інші поповери на цьому рівні
      Object.keys(newState).forEach((key) => {
        if (key !== popoverKey) newState[key] = false;
      });

      // Перевіряємо, чи потрапляє елемент в зону видимості
      const element = itemRefs.current[index];
      const elementOffset = element.offsetTop;
      const elementBottom = elementOffset + itemHeight;

      // Якщо елемент знаходиться поза видимою зоною, прокручуємо
      if (elementBottom > scrollHeight) {
        const visibleAreaTop = scrollWrapperRef.current.scrollTop;
        const visibleAreaBottom = visibleAreaTop + scrollHeight;

        // Якщо елемент знаходиться поза видимістю (нижня частина елемента за межами видимої зони)
        if (elementBottom > visibleAreaBottom) {          
          setTimeout(() => {
            scrollWrapperRef.current.scrollTo({
              top: elementOffset + itemHeight - scrollHeight + 20,
              behavior: 'smooth',
            });
          }, 100);
        }
      }

      return newState;
    });
  };

  return (
    <div className={styles.listContainer}>
      <div ref={scrollWrapperRef} className={styles.scrollWrapper}>
        <ul className={styles.archiveList}>
          {carsDataArchive?.length > 0 ? (
            carsDataArchive.map((item, index) => (
              <li
                key={`${item.id}-${item.plate}-${item.date}`}
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <ArchiveCarItem
                  id={item.id}
                  visiblePopovers={visiblePopovers}
                  togglePopover={(popoverName) => togglePopover(popoverName, item.id, index)}
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
