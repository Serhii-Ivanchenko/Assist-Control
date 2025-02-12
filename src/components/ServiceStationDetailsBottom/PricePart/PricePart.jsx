import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditedServices,
  selectIsModalOpen,
  selectPrices,
} from "../../../redux/settings/selectors";
import {
  createCategory,
  editServiceNameOrPrices,
  getPrices,
  updateCategory,
} from "../../../redux/settings/operations";
import {
  openModal,
  closeModal,
  resetEditedServices,
} from "../../../redux/settings/slice";
import AccordionList from "./AccordionList/AccordionList";
import { BsFolderPlus } from "react-icons/bs";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "../../Modals/Modal/Modal";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";

import styles from "./PricePart.module.css";
import toast from "react-hot-toast";

export default function PricePart() {
  const dispatch = useDispatch();
  const prices = useSelector(selectPrices);
  const isModalOpen = useSelector(selectIsModalOpen);
  const editedServices = useSelector(selectEditedServices);

  const [activeSearch, setActiveSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const scrollToTheLastItemRef = useRef(null);

  const handleFilter = (searchData) => {
    setFilteredData(searchData);
    setActiveSearch(true);
  };

  const handleCategoryEditing = (isEditing) => {
    setIsCategoryEditing(isEditing);
  };

  const handleServiceEditing = (serviceId) => {
    setEditingServiceId(serviceId);
  };

  const handleNewCategory = (newCategoryName) => {
    setIsCategoryEditing(true);
    if (newCategoryName.trim() === "") {
      console.log("Please enter a category name.");
      return;
    }
    dispatch(createCategory({ category_name: newCategoryName }))
      .unwrap()
      .then(() => dispatch(getPrices()))
      .catch((err) => console.log("Error creating new category", err));
  };

  const handleSaveNewData = async () => {
    setIsCategoryEditing(false);
    setEditingServiceId(null);

    try {
      await Promise.all(
        editedServices.map((service) => {
          if (service.service_id) {
            return dispatch(editServiceNameOrPrices(service)).unwrap();
          } else if (service.category_id) {
            return dispatch(updateCategory(service)).unwrap();
          }
          return Promise.resolve();
        })
      );

      await dispatch(getPrices()).unwrap();
      dispatch(resetEditedServices());

      toast.success("Дані успішно оновлено", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)",
        },
      });
    } catch (error) {
      toast.error(`Помилка оновлення: ${error}`, {
        position: "top-center",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)",
        },
      });
    }
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleResetSearch = () => {
    setFilteredData([...prices]);
    setActiveSearch(false);
  };

  const handleResetData = () => {
    setIsCategoryEditing(false);
    dispatch(resetEditedServices());
  };

  // Прокрутка до ост. елементу при додаванні
  const prevDataLengthRef = useRef(prices.length); // Зберігаємо попередню довжину даних

  useEffect(() => {
    if (
      prices.length > prevDataLengthRef.current &&
      scrollToTheLastItemRef.current
    ) {
      requestAnimationFrame(() => {
        scrollToTheLastItemRef.current.scrollTo({
          top: scrollToTheLastItemRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
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
        containerRef={scrollToTheLastItemRef}
        onReset={handleResetData}
        onCategoryEditing={handleCategoryEditing}
        isCategoryEditing={isCategoryEditing}
        onServiceEditing={handleServiceEditing}
        editingServiceId={editingServiceId}
      />
      {(editedServices.length > 0 || isCategoryEditing) && (
        <div className={styles.btnGroup}>
          {console.log("editedServices in btn group:", editedServices)}
          <button onClick={handleResetData} className={styles.resetBtn}>
            Відміна
          </button>
          <button
            onClick={handleSaveNewData}
            className={styles.btn}
            // disabled={editedServices.length === 0}
          >
            Зберегти
          </button>
        </div>
      )}
    </div>
  );
}
