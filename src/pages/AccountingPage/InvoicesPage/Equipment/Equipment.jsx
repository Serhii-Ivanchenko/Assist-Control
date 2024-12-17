import InvoicesPart from "../../../../components/InvoicesPart/InvoicesPart";
import css from "./Equipment.module.css";

export default function Equipment() {
  const categories = [
    { name: "Замовлено" },
    { name: "Погоджено" },
    { name: "Отримано" },
    { name: "Використання" },
    { name: "Продано" },
    { name: "Повернуто" },
    { name: "Переміщено" },
    { name: "Інвентаризація" },
    { name: "Списано" },
  ];
  return (
    <div>
      <InvoicesPart categories={categories} />
    </div>
  );
}
