import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./AccordionList.module.css";

function AccordionList({
  data,
  isEditable,
  onUpdate,
  onEnableEditing,
  onSaveChanges,
  containerRef,
  onReset,
  resetPrice,
  resetCategory,
  onLocalSave,
  resetService,
  serviceItemEdit,
  setServiceItemEdit,
}) {
  const handleUpdate = (updatedCategory, idx) => {
    const newData = [...data];
    newData[idx] = updatedCategory;
    onUpdate(newData);
  };

  const handleUnsavedChanges = (unsaved) => {
    onUnsavedChanges(unsaved);
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
            onUpdate={(updatedCategory) => handleUpdate(updatedCategory, idx)} //?
            onEnableEditing={() => onEnableEditing(idx)}
            onSaveChanges={onSaveChanges} //?
            containerRef={containerRef}
            onReset={onReset} //?
            resetPrice={resetPrice}
            resetCategory={resetCategory}
            onLocalSave={onLocalSave}
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
