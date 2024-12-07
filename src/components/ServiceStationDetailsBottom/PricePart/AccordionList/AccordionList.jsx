import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({ data }) {
  return (
    <ul className={styles.wrapper}>
      {data
        .filter((itemData) => itemData.items.length > 0)
        .map((itemData, index) => (
          <li key={index}>
            <AccordionItem
              category={itemData.category}
              items={itemData.items}
              index={index}
            />
          </li>
        ))}
    </ul>
  );
}

export default AccordionList;
