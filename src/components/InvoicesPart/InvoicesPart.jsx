import css from "./InvoicesPart.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPlusCircleDotted } from "react-icons/bs";
import InvoicesList from "./InvoicesList/InvoicesList";
import car from "../../assets/images/carsItem.png";

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
    { name: "Інвентаризація" },
    { name: "Списано" },
  ];

  const invoices = [
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
    },
    {
      photo: car,
      date: "19.12.24",
      plate: "CA 6864 CO",
      name: "ПІБ Клієнт",
    },
  ];

  const invoicesMoney = [
    {
      date: "19.12.28",
      distributorName: "Elit",
      amount: "8000 грн",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
    },
    {
      date: "19.12.24",
      distributorName: "Elit",
      amount: "8000 грн",
    },
  ];

  const sold = [
    { photo: "", date: "19.12.24", name: "Клієнт 1", amount: "8000 грн" },
    { photo: "", date: "19.12.24", name: "Клієнт 1", amount: "8000 грн" },
    { photo: car, date: "19.12.24", name: "Клієнт 1", amount: "8000 грн" },
    { photo: "", date: "19.12.24", name: "Клієнт 1", amount: "8000 грн" },
    { photo: car, date: "19.12.24", name: "Клієнт 1", amount: "8000 грн" },
    { photo: car, date: "19.12.24", name: "Клієнт 1", amount: "8000 грн" },
  ];

  const replacedAndothers = [
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "7000 ",
      currency: "грн",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "7000",
      currency: "грн",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "10000",
      currency: "грн",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "7000",
      currency: "грн",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "9000",
      currency: "грн",
    },
    {
      date: "19.12.24",
      warehouse: "Склад 1",
      amount: "8000",
      amount2: "9000",
      currency: "грн",
    },
  ];

  const categoryMap = {
    Діагностика: invoices,
    Погоджено: invoices,
    Замовлено: invoicesMoney,
    Отримано: invoicesMoney,
    Продано: sold,
    Повернуто: invoicesMoney,
    Переміщено: replacedAndothers,
    Переоцінка: replacedAndothers,
    Інвентаризація: replacedAndothers,
    Списано: replacedAndothers,
  };

  return (
    <div>
      <ul className={css.categoriesList}>
        {categories.map((category, index) => {
          const list = categoryMap[category.name] || [];

          return (
            <li key={index} className={css.categoriesItem}>
              <div className={css.titleBox}>
                <p className={css.categoryName}>{category.name}</p>
                <div className={css.amountAndBtnMore}>
                  <span className={css.amount}>16000 грн</span>
                  <BsThreeDotsVertical className={css.icon} />
                </div>
              </div>
              <div>
                <InvoicesList
                  // invoices={invoices}
                  // invoicesMoney={invoicesMoney}
                  category={category.name}
                  list={list}
                />
              </div>
              <div className={css.addBtn}>
                <BsPlusCircleDotted size={18} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
