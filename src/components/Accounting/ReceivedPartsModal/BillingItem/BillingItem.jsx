import styles from "./BillingItem.module.css";

function BillingItem({ date, quantity, code, brand, name, price, total }) {
  return (
    <div className={styles.billingRow}>
      <p className={styles.date}>{date}</p>
      <p className={styles.amount}>{quantity} шт</p>
      <p className={styles.partNumber}>{code}</p>
      <p className={styles.brand}>{brand}</p>
      <p className={styles.item}>{name}</p>
      <p className={styles.itemPrice}>{price} грн</p>
      <p className={styles.itemsSum}>{total} грн</p>
      <p className={styles.approveCheckbox}>
        <input type="checkbox" />
      </p>
    </div>
  );
}

export default BillingItem;
