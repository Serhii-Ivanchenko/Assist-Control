import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({
  data,
  isEditable,
  onUpdate,
  onEnableEditing,
  containerRef,
}) {
  const handleUpdate = (updatedCategory, idx) => {
    const newData = [...data];
    newData[idx] = updatedCategory;
    onUpdate(newData);
  };
  return (
    <ul className={styles.wrapper} ref={containerRef}>
      {data.map((itemData, idx) => (
        <li key={idx}>
          <AccordionItem
            isEdit={isEditable[idx] || false}
            category={itemData.category}
            items={itemData.items}
            index={idx}
            onUpdate={(updatedCategory) => handleUpdate(updatedCategory, idx)}
            onEnableEditing={() => onEnableEditing(idx)}
            containerRef={containerRef}
          />
        </li>
      ))}
    </ul>
  );
}

export default AccordionList;
