import InvoicesPart from "../../../../components/InvoicesPart/InvoicesPart";
import css from "./Funds.module.css";

export default function Funds() {
  const categories = [
    { name: "Замовлено" },
    { name: "Погоджено" },
    { name: "Отримано" },
    { name: "Витрачено" },
    { name: "Повернуто" },
    { name: "Переміщено" },
    { name: "Інвентаризація" },
  ];

  return (
    <div>
      <InvoicesPart categories={categories} />
    </div>
  );
}
