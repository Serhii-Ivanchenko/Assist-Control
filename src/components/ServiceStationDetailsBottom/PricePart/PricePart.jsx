import { useEffect, useState } from "react";
import AccordionList from "./AccordionList/AccordionList";
import { BsFolderPlus } from "react-icons/bs";
import styles from "./PricePart.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "../../Modals/Modal/Modal";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";

export default function PricePart() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  // const [data, setData] = useState([]);

  // Модель хардкодних даних
  const [testData, setTestData] = useState([
    {
      category: "Техобслуговування",
      items: [
        { item: "Заміна моторного масла та фільтра" },
        { item: "Заміна рідини гідропідсилювача з промиванням" },
        { item: "Зняття/встановлення/заміна форсунок високого тиску бензин " },
        { item: "Заміна рідини гідропідсилювача з промиванням " },
        { item: "Заміна рідини гідропідсилювача з промиванням " },
        { item: "Заміна рідини гідропідсилювача з промиванням " },
      ],
    },
    {
      category: "Ремонт паливної системи",
      items: [
        { item: "Заміна паливного фільтра" },
        { item: "Очищення інжектора" },
        { item: "Очищення інжектора" },
        { item: "Очищення інжектора" },
        { item: "Очищення інжектора" },
      ],
    },
    {
      category: "Ремонт електрики та електроустаткування",
      items: [
        { item: "Ремонт генератора" },
        { item: "Діагностика електропроводки" },
        { item: "Діагностика електропроводки" },
        { item: "Діагностика електропроводки" },
      ],
    },
    {
      category: "Ремонт двигуна",
      items: [
        { item: "Капітальний ремонт двигуна" },
        { item: "Заміна поршнів і кільців" },
        { item: "Регулювання клапанів" },
        { item: "Заміна ременя ГРМ" },
        { item: "Заміна ременя ГРМ" },
        { item: "Заміна ременя ГРМ" },
      ],
    },
    {
      category: "Комплексна діагностика автомобіля",
      items: [
        { item: "Діагностика двигуна" },
        { item: "Перевірка ходової частини" },
        { item: "Перевірка ходової частини" },
        { item: "Перевірка ходової частини" },
      ],
    },
  ]);

  useEffect(() => {
    setFilteredData(testData);
  }, [testData]);

  const handleFilter = (data) => {
    setFilteredData(data);
    setActiveSearch(true);
  };

  const handleClearSearch = () => {
    if (!activeSearch) {
      setFilteredData(testData);
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
    setTestData((prev) => [...prev, newCategory]); // тільки оновлюємо testData
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
          searchData={testData}
          onFilter={handleFilter}
          onBlur={handleClearSearch}
        />
        <button type="button" className={styles.btn} onClick={openModal}>
          <BsFolderPlus className={styles.icon} />
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
      <AccordionList data={filteredData} />
    </div>
  );
}
