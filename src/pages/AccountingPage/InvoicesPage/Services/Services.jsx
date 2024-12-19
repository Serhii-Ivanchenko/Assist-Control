import InvoicesPart from "../../../../components/InvoicesPart/InvoicesPart";
import css from "./Services.module.css";

export default function Services() {
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

  return (
    <div>
      <InvoicesPart categories={categories} />
    </div>
  );
}
