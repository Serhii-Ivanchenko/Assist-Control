import BillingItem from "../BillingItem/BillingItem";
import styles from "./BillingTable.module.css";

function BillingTable({ supplier }) {
  return (
    <div className={styles.billingTable}>
      <div className={styles.billingHeader}>
        <p>Дата приходу</p>
        <p>Кількість</p>
        <p>Артикул</p>
        <p>Бренд</p>
        <p>Номенклатура</p>
        <p>Ціна закупки</p>
        <p>Сума закупки</p>
      </div>
      <div className={styles.billingRow}>
        <p>7 шт</p>
      </div>
      <div className={styles.scrollContainer}>
        {supplier.parts.map((part) => (
          <BillingItem
            key={part.id}
            date={part.date}
            quantity={part.availability}
            code={part.code}
            brand={part.brand}
            name={part.part_name}
            price={part.price}
            total={part.price * part.availability}
          />
        ))}
      </div>
    </div>
  );
}

export default BillingTable;
