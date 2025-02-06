import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({ data, containerRef }) {
  return (
    <ul className={styles.wrapper}>
      {data.map((item) => (
        <li key={item.category_id}>
          <AccordionItem
            item={item}
            id={item.category_id}
            containerRef={containerRef}
          />
        </li>
      ))}
    </ul>
  );
}

export default AccordionList;
