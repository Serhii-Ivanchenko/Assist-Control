import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({ data, containerRef, onReset, onUpdateCategory }) {
  return (
    <ul className={styles.wrapper} ref={containerRef}>
      {data.map((item) => (
        <li key={item.category_id}>
          <AccordionItem
            item={item}
            id={item.category_id}
            containerRef={containerRef}
            onReset={onReset}
            onUpdateCategory={onUpdateCategory}
          />
        </li>
      ))}
    </ul>
  );
}

export default AccordionList;
