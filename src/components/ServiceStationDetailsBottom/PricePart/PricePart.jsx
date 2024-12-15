import { useEffect, useRef, useState } from "react";
import AccordionList from "./AccordionList/AccordionList";
import { BsFolderPlus } from "react-icons/bs";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "../../Modals/Modal/Modal";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import { testData } from "./testData";

import styles from "./PricePart.module.css";

export default function PricePart() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isEditable, setIsEditable] = useState({});
  const [originalData, setOriginalData] = useState(testData);
  const [editableData, setEditableData] = useState(testData);
  const [resetCategory, setResetCategory] = useState(false);
  const [resetService, setResetService] = useState(false);
  const [resetPrice, setResetPrice] = useState(false);

  const handleFilter = (searchData) => {
    console.log("searchData", searchData);

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
  };

  const handleSaveNewData = () => {
    setOriginalData([...editableData]);
    setIsEditable(false);
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
    setResetPrice((prev) => !prev);
    setResetCategory((prev) => !prev);
    setResetService((prev) => !prev);
    setEditableData([...originalData]);
    setIsEditable(false);
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
        containerRef={scrollToTheLastItemRef}
        onReset={handleResetData}
        resetPrice={resetPrice}
        resetCategory={resetCategory}
        resetService={resetService}
      />

      <div className={styles.btnGroup}>
        <button onClick={handleResetData} className={styles.resetBtn}>
          Відміна
        </button>
        <button onClick={handleSaveNewData} className={styles.btn}>
          Зберегти
        </button>
      </div>
    </div>
  );
}
