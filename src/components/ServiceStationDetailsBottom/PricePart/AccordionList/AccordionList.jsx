import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({ data }) {
  return (
    <ul className={styles.wrapper}>
      {data.map((item, index) => (
        <li key={item.category_id}>
          <AccordionItem item={item} index={index} />
        </li>
      ))}
    </ul>
  );
}

export default AccordionList;
