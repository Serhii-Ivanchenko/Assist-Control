import { useEffect, useState } from "react";
import css from "./StatsList.module.css";

export default function StatsList({ cars }) {
  const initValue = {
    all: 0,
    complete: 0,
    repair: 0,
    diagnostic: 0,
    new: 0,
  };
  const [valueOfCars, setValueOfCars] = useState(initValue);
  useEffect(() => {
    let obj = { ...initValue }; // Початковий стан має бути копією initValue
    cars.forEach((item) => {
      obj = {
        ...obj,
        all: obj.all + 1,
        [item.status]: (obj[item.status] || 0) + 1, // Додаємо кількість для кожного статусу
      };
    });
    setValueOfCars(obj);
  }, [cars]);
  return (
    <ul className={css.statsList}>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>{valueOfCars.all}</p>
        <p className={css.statsItemTitle}>Всього</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>{valueOfCars.complete}</p>
        <p className={css.statsItemTitle}>Готово</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>{valueOfCars.repair}</p>
        <p className={css.statsItemTitle}>У ремонті</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>{valueOfCars.diagnostic}</p>
        <p className={css.statsItemTitle}>На діагностиці</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>{valueOfCars.new}</p>
        <p className={css.statsItemTitle}>Нерозібрані</p>
      </li>
    </ul>
  );
}
