import { useEffect, useRef, useState } from "react";
import AccordionList from "./AccordionList/AccordionList";
import { BsFolderPlus } from "react-icons/bs";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "../../Modals/Modal/Modal";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import addIdsToData from "../../../utils/addIdsToData";

import styles from "./PricePart.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectIsModalOpen,
  selectPrices,
} from "../../../redux/settings/selectors";
import { getPrices } from "../../../redux/settings/operations";
import { openModal, closeModal } from "../../../redux/settings/slice";

export default function PricePart() {
  const dispatch = useDispatch();
  const prices = useSelector(selectPrices);
  const isModalOpen = useSelector(selectIsModalOpen);

  const [activeSearch, setActiveSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [originalData, setOriginalData] = useState(prices);
  const [editableData, setEditableData] = useState([...originalData]);
  const [resetCategory, setResetCategory] = useState(false);
  const [resetService, setResetService] = useState(false);
  const [resetPrice, setResetPrice] = useState(false);
  const [serviceItemEdit, setServiceItemEdit] = useState(null);
  const scrollToTheLastItemRef = useRef(null);

  useEffect(() => {
    dispatch(getPrices());
  }, [dispatch]);

  const handleFilter = (searchData) => {
    setFilteredData(searchData);
    setActiveSearch(true);
  };

  const handleNewCategory = (categoryName) => {
    const newCategory = {
      category: categoryName,
      items: [
        {
          id: addIdsToData(),
          item: "Додайте послугу",
          price: { min: null, max: null },
        },
      ],
    };
    const updatedData = [...originalData, newCategory];
    setEditableData(updatedData);
    setOriginalData(updatedData);
  };

  const handleSaveNewData = () => {
    setOriginalData([...editableData]);
    setIsEditable(false);
    setServiceItemEdit(false);
    console.log("saving", editableData);
  };

  const enableEditing = (id) => {
    setIsEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleServiceEditing = (id) => {
    setServiceItemEdit(id);
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleResetSearch = () => {
    setFilteredData(prices);
    setActiveSearch(false);
  };

  const handleResetData = () => {
    setResetPrice((prev) => !prev);
    setResetCategory((prev) => !prev);
    setResetService((prev) => !prev);
    setEditableData(originalData);
    setIsEditable(false);
    setServiceItemEdit(false);
  };

  // Прокрутка до ост. елементу при додаванні

  const prevDataLengthRef = useRef(prices.length); // Зберігаємо попередню довжину даних

  useEffect(() => {
    if (
      prices.length > prevDataLengthRef.current && // Перевіряємо, чи додано новий елемент
      scrollToTheLastItemRef.current
    ) {
      scrollToTheLastItemRef.current.scrollTo({
        top: scrollToTheLastItemRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    // Оновлюємо попередню довжину після виконання ефекту
    prevDataLengthRef.current = prices.length;
  }, [prices]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <SearchBar
          searchData={prices}
          onFilter={handleFilter}
          onReset={handleResetSearch}
        />
        <button type="button" className={styles.btn} onClick={handleOpenModal}>
          <BsFolderPlus size={18} />
          Нова група
        </button>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <AddCategoryModal
              onClose={handleCloseModal}
              title="Введіть назву категорії"
              name="newCategory"
              addNewCategory={handleNewCategory}
            />
          </Modal>
        )}
      </div>
      <AccordionList
        data={activeSearch ? filteredData : prices}
        // data={prices}
        isEditable={isEditable}
        onUpdate={(updatedData) => setEditableData(updatedData)}
        onEnableEditing={enableEditing}
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
