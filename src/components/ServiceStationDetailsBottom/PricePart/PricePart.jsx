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
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

export default function PricePart() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [originalData, setOriginalData] = useState(testData);
  const [editableData, setEditableData] = useState(testData);
  const [resetCategory, setResetCategory] = useState(false);
  const [resetService, setResetService] = useState(false);
  const [resetPrice, setResetPrice] = useState(false);
  const [serviceItemEdit, setServiceItemEdit] = useState(null);

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
    if (!isLocalSave) {
      toast.error(
        "Є незбережені зміни послуг. Будь ласка, збережіть їх перед оновленням даних."
      );
      return;
    }

    handleSaveChanges(editableData);
    setIsEditable(false);
    setServiceItemEdit(false);
  };

  const enableEditing = (idx) => {
    setIsEditable((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleServiceEditing = (id) => {
    setServiceItemEdit(id);
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
    setResetData((prev) => ({
      ...prev,
      category: !prev.category,
      service: !prev.service,
      price: !prev.price,
    }));
    setEditableData([...originalData]);
    setIsEditable(false);
    setServiceItemEdit(false);
  };

  // Прокрутка до ост. елементу при додаванні
  const scrollToTheLastItemRef = useRef(null);
  const prevDataLengthRef = useRef(originalData.length); // Зберігаємо попередню довжину даних

  useEffect(() => {
    if (
      originalData.length > prevDataLengthRef.current && // Перевіряємо, чи додано новий елемент
      scrollToTheLastItemRef.current
    ) {
      scrollToTheLastItemRef.current.scrollTo({
        top: scrollToTheLastItemRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    // Оновлюємо попередню довжину після виконання ефекту
    prevDataLengthRef.current = originalData.length;
  }, [originalData]);

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
        onSaveChanges={handleSaveChanges}
        containerRef={scrollToTheLastItemRef}
        onReset={handleResetData}
        resetPrice={resetPrice}
        resetCategory={resetCategory}
        resetService={resetService}
        serviceItemEdit={serviceItemEdit}
        setServiceItemEdit={handleServiceEditing}
      />

      {(isEditable || serviceItemEdit) && (
        <div className={styles.btnGroup}>
          <button onClick={handleResetData} className={styles.resetBtn}>
            Відміна
          </button>
          <button onClick={handleSaveNewData} className={styles.btn}>
            Зберегти
          </button>
        </div>
      )}
    </div>
  );
}
