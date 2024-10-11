import { useEffect, useState } from "react";
import css from "./StatsList.module.css";
export default function StatsList({ cars }) {
  const initValue = {
    all: 0,
    complete: 0,
    repair: 0,
    check_repair: 0,
    new: 0,
  };
  const [valueOfCars, setValueOfCars] = useState(initValue);
  console.log(cars);
  
  useEffect(() => {
    const handleAddItem = () => {
      let obj = initValue;
      for (let i = 0; i < cars.length; i++) {
        const car = cars[i];

        console.log(car.status);
        obj = {
          ...obj,
          all: obj.all + 1,
          [car.status]: ++valueOfCars[car.status],
        };
      }

      setValueOfCars(obj);
    };
    handleAddItem();
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
        <p className={css.statsItemValue}>{valueOfCars.check_repair}</p>
        <p className={css.statsItemTitle}>На діагностиці</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>{valueOfCars.new}</p>
        <p className={css.statsItemTitle}>Нерозібрані</p>
      </li>
    </ul>
  );
}
