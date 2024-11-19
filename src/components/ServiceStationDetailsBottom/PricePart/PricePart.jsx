// import { useEffect, useState } from "react";
import AccordionList from "./AccordionList/AccordionList";
import { MdDone } from "react-icons/md";
import styles from "./PricePart.module.css";

export default function PricePart() {
  // const [data, setData] = useState([]);

  // Модель хардкодних даних
  const testData = [
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
  ];

  // Логіка для фільтрації даних за stationId, коли вони будуть приходити з беку
  // useEffect(() => {
  //   if (stationId) {
  //     const filteredData = testData;
  //     setData(filteredData);
  //   }
  // }, [stationId]);

  return (
    <div className={styles.wrapper}>
      <AccordionList data={testData} />
      <button className={styles.saveBtn} type="button">
        <MdDone />
        Зберегти
      </button>
    </div>
  );
}
