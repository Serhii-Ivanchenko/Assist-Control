import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({ data, isEditable, onUpdate, onEnableEditing }) {
  const handleUpdate = (updatedCategory, idx) => {
    const newData = [...data];
    newData[idx] = updatedCategory;
    onUpdate(newData);
  };
  return (
    <ul className={styles.wrapper}>
      {data
        .filter((itemData) => itemData.items.length > 0)
        .map((itemData, idx) => (
          <li key={idx}>
            <AccordionItem
              isEdit={isEditable[idx] || false} // Передаємо стан для цього елемента
              category={itemData.category}
              items={itemData.items}
              index={idx}
              onUpdate={(updatedCategory) => handleUpdate(updatedCategory, idx)}
              onEnableEditing={() => onEnableEditing(idx)}
            />
          </li>
        ))}
    </ul>
  );
}

export default AccordionList;
