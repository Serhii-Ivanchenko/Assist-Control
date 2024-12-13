import css from "./InvoicesPart.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPlusCircleDotted } from "react-icons/bs";

export default function InvoicesPart() {
  const categories = [
    { name: "Діагностика" },
    { name: "Погоджено" },
    { name: "Замовлено" },
    { name: "Отримано" },
    { name: "Продано" },
    { name: "Повернуто" },
    { name: "Переміщено" },
    { name: "Переоцінка" },
    { name: "Інвентарізація" },
    { name: "Списано" },
  ];
  return (
    <div>
      <ul className={css.categoriesList}>
        {categories.map((category, index) => (
          <li key={index} className={css.categoriesItem}>
            <div className={css.titleBox}>
              <p className={css.categoryName}>{category.name}</p>
              <div>
                <span className={css.amount}>16000 грн</span>
                <BsThreeDotsVertical className={css.icon} />
              </div>
            </div>
            <ul></ul>
            <div className={css.addBtn}>
              <BsPlusCircleDotted />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
