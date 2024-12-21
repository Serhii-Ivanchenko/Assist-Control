import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({
  data,
  isEditable,
  onUpdate,
  onEnableEditing,
  containerRef,
  onReset,
  resetPrice,
  resetCategory,
  resetService,
  serviceItemEdit,
  setServiceItemEdit,
}) {
  const handleUpdate = (updatedCategory, idx) => {
    const newData = [...data];
    newData[idx] = updatedCategory;
    onUpdate(newData);
  };
  return (
    <ul className={styles.wrapper} ref={containerRef}>
      {data.map((itemData, id) => (
        <li key={id}>
          <AccordionItem
            isEdit={isEditable[id] || false}
            category={itemData.category}
            items={itemData.items}
            onUpdate={(updatedCategory) => handleUpdate(updatedCategory, id)}
            onEnableEditing={() => onEnableEditing(id)}
            containerRef={containerRef}
            onReset={onReset}
            resetPrice={resetPrice}
            resetCategory={resetCategory}
            resetService={resetService}
            serviceItemEdit={serviceItemEdit}
            setServiceItemEdit={setServiceItemEdit}
          />
        </li>
      ))}
    </ul>
  );
}

export default AccordionList;
