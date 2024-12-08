import { useEffect, useState } from "react";
import AccordionList from "./AccordionList/AccordionList";
import { BsFolderPlus } from "react-icons/bs";
import styles from "./PricePart.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "../../Modals/Modal/Modal";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";

// Модель хардкодних даних
const testData = [
  {
    id: 1,
    category: "Техобслуговування",
    items: [
      { id: 1, item: "Заміна моторного масла та фільтра" },
      { id: 2, item: "Заміна рідини гідропідсилювача з промиванням" },
      {
        id: 3,
        item: "Зняття/встановлення/заміна форсунок високого тиску бензин ",
      },
      { id: 4, item: "Заміна рідини гідропідсилювача з промиванням " },
      { id: 5, item: "Заміна рідини гідропідсилювача з промиванням " },
      { id: 6, item: "Заміна рідини гідропідсилювача з промиванням " },
    ],
  },
  {
    id: 2,
    category: "Ремонт паливної системи",
    items: [
      { id: 7, item: "Заміна паливного фільтра" },
      { id: 8, item: "Очищення інжектора" },
      { id: 9, item: "Очищення інжектора" },
      { id: 10, item: "Очищення інжектора" },
      { id: 11, item: "Очищення інжектора" },
    ],
  },
  {
    id: 3,
    category: "Ремонт електрики та електроустаткування",
    items: [
      { id: 12, item: "Ремонт генератора" },
      { id: 13, item: "Діагностика електропроводки" },
      { id: 14, item: "Діагностика електропроводки" },
      { id: 15, item: "Діагностика електропроводки" },
    ],
  },
  {
    id: 4,
    category: "Ремонт двигуна",
    items: [
      { id: 16, item: "Капітальний ремонт двигуна" },
      { id: 17, item: "Заміна поршнів і кільців" },
      { id: 18, item: "Регулювання клапанів" },
      { id: 19, item: "Заміна ременя ГРМ" },
      { id: 20, item: "Заміна ременя ГРМ" },
      { id: 21, item: "Заміна ременя ГРМ" },
    ],
  },
  {
    id: 5,
    category: "Комплексна діагностика автомобіля",
    items: [
      { id: 22, item: "Діагностика двигуна" },
      { id: 23, item: "Перевірка ходової частини" },
      { id: 24, item: "Перевірка ходової частини" },
      { id: 25, item: "Перевірка ходової частини" },
    ],
  },
];
export default function PricePart() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isEditable, setIsEditable] = useState({});
  const [originalData, setOriginalData] = useState(testData);
  const [editableData, setEditableData] = useState(testData);

  useEffect(() => {
    setFilteredData(editableData);
  }, [editableData]);

  const handleFilter = (searchData) => {
    setFilteredData(searchData);
    setActiveSearch(true);
  };

  const handleClearSearch = () => {
    if (!activeSearch) {
      setFilteredData(originalData);
      setActiveSearch(false);
    }
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

  // Логіка для фільтрації даних за stationId, коли вони будуть приходити з беку
  // useEffect(() => {
  //   if (stationId) {
  //     const filteredData = testData;
  //     setData(filteredData);
  //   }
  // }, [stationId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <SearchBar
          searchData={originalData}
          onFilter={handleFilter}
          onBlur={handleClearSearch}
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
        data={filteredData}
        isEditable={isEditable}
        onUpdate={(updatedData) => setEditableData(updatedData)}
        onEnableEditing={enableEditing}
      />

      <button onClick={handleSaveNewData} className={styles.btn}>
        Зберегти
      </button>
    </div>
  );
}
