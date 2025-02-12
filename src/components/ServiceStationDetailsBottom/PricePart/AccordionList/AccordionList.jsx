import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({ data, containerRef, onCategoryEditing }) {
  return (
    <ul className={styles.wrapper} ref={containerRef}>
      {data.map((item) => (
        <li key={item.category_id}>
          <AccordionItem
            item={item}
            id={item.category_id}
            containerRef={containerRef}
            onCategoryEditing={onCategoryEditing}
          />
        </li>
      ))}
    </ul>
  );
}

export default AccordionList;
