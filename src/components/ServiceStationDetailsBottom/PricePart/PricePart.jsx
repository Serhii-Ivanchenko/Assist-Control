import { useEffect, useRef, useState } from "react";
import AccordionList from "./AccordionList/AccordionList";
import { BsFolderPlus } from "react-icons/bs";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "../../Modals/Modal/Modal";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import { testData } from "./testData";

import styles from "./PricePart.module.css";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

export default function PricePart() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [originalData, setOriginalData] = useState(testData);
  const [editableData, setEditableData] = useState(testData);
  const [resetData, setResetData] = useState({
    category: false,
    service: false,
    price: false,
  });
  const [isLocalSave, setIsLocalSave] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState({});
  const [hasUnsavedToastShown, setHasUnsavedToastShown] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("priceData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setEditableData([...parsedData]);
    }
  }, []);

  const handleFilter = (searchData) => {
    setFilteredData(searchData);
    setActiveSearch(true);
  };

  const handleNewCategory = (categoryName) => {
    const newCategory = {
      category: categoryName,
      items: [
        {
          item: "Додайте послугу",
        },
      ],
    };
    const updatedData = [...originalData, newCategory];
    setOriginalData(updatedData);
    setEditableData(updatedData);

    localStorage.setItem("priceData", JSON.stringify(updatedData));
  };

  const handleLocalSaveChange = (newState) => {
    setIsLocalSave(newState);
  };

  const handleSaveNewData = () => {
    if (!isLocalSave) {
      toast.error(
        "Є незбережені зміни послуг. Будь ласка, збережіть їх перед оновленням даних."
      );
      return;
    }

    handleSaveChanges(editableData);
    setIsEditable(false);
    toast.success("Дані успішно оновлено!");
  };

  const handleChildUnsavedChanges = (unsaved) => {
    setUnsavedChanges(unsaved);
    if (!unsaved) {
      setHasUnsavedToastShown(false);
    }
  };

  const handleSaveChanges = (updatedData) => {
    setOriginalData(updatedData);
    setEditableData(updatedData);

    localStorage.setItem("priceData", JSON.stringify(updatedData));
    localStorage.removeItem("priceData");
  };

  const enableEditing = (idx) => {
    setIsEditable((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleResetSearch = () => {
    setFilteredData(originalData);
    setActiveSearch(false);
  };

  const handleResetData = () => {
    setResetData((prev) => ({
      ...prev,
      category: !prev.category,
      service: !prev.service,
      price: !prev.price,
    }));
    setEditableData([...originalData]);
    setIsEditable(false);
    localStorage.removeItem("priceData");
  };

  // Прокрутка до ост. елементу при додаванні
  const scrollToTheLastItemRef = useRef(null);
  const prevDataLengthRef = useRef(filteredData.length); // Зберігаємо попередню довжину даних

  useEffect(() => {
    if (
      filteredData.length > prevDataLengthRef.current && // Перевіряємо, чи додано новий елемент
      scrollToTheLastItemRef.current
    ) {
      scrollToTheLastItemRef.current.scrollTo({
        top: scrollToTheLastItemRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    // Оновлюємо попередню довжину після виконання ефекту
    prevDataLengthRef.current = filteredData.length;
  }, [filteredData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <SearchBar
          searchData={originalData}
          onFilter={handleFilter}
          onReset={handleResetSearch}
        />
        <button type="button" className={styles.btn} onClick={openModal}>
          <BsFolderPlus size={18} />
          Нова група
        </button>
        {isModal && (
          <Modal isOpen={isModal} onClose={closeModal}>
            <AddCategoryModal
              onClose={closeModal}
              title="Введіть назву категорії"
              name="newCategory"
              addNewCategory={handleNewCategory}
            />
          </Modal>
        )}
      </div>
      <AccordionList
        data={activeSearch ? filteredData : originalData}
        isEditable={isEditable}
        onUpdate={(updatedData) => setEditableData(updatedData)}
        onEnableEditing={enableEditing}
        onSaveChanges={handleSaveChanges}
        containerRef={scrollToTheLastItemRef}
        onReset={handleResetData}
        resetPrice={resetData.price}
        resetCategory={resetData.category}
        onLocalSave={handleLocalSaveChange}
        resetService={resetData.service}
        onUnsavedChanges={handleChildUnsavedChanges}
      />

      <div className={styles.btnGroup}>
        {(isEditable || !isLocalSave) && (
          <button onClick={handleResetData} className={styles.resetBtn}>
            Відміна
          </button>
        )}
        <button onClick={handleSaveNewData} className={styles.btn}>
          Зберегти
        </button>
      </div>
    </div>
  );
}
