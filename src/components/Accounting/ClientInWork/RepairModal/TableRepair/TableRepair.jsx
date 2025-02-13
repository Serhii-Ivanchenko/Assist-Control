import styles from "./TableRepair.module.css";

const TableRepair = ({ data }) => {
  return (
    <table className={styles.customTable}>
      <thead>
        <tr className={styles.headerTop}>
          <th className={styles.columnId}>№</th>
          <th className={styles.columnCode}>Код</th>
          <th className={styles.columnBrand}>Бренд</th>
          <th className={styles.columnNomenclature}>Номенклатура</th>
          <th className={styles.columnQuantity}>К-ть</th>
          <th className={styles.columnPurchasePrice}>Ціна закупки</th>
          <th className={styles.columnSellingPrice}>Ціна продажу</th>
          <th className={styles.columnSoldAmount}>Сума проданого</th>
          <th className={styles.columnAvailability}>Наявність</th>
          <th className={styles.columnPartsPurchase}>Закупка Запчастин</th>
          <th className={styles.columnWorkCost}>Вартість робіт</th>
          <th className={styles.columnFullName} colSpan={3}>Механік</th>
          <th className={styles.columnMargin}>Маржа</th>
        </tr>
        <tr className={styles.headerBottom}>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}></th>
          <th className={styles.emptyCell}>ПІБ</th>
          <th className={styles.emptyCell}>%</th>
          <th className={styles.emptyCell}>ЗП</th>
          <th className={styles.emptyCell}></th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row) => (
            <tr key={row.id}>
              <td className={styles.columnId}>{row.id}</td>
              <td className={styles.columnCode}>{row.code}</td>
              <td className={styles.columnBrand}>{row.brand}</td>
              <td className={styles.columnNomenclature}>{row.nomenclature}</td>
              <td className={styles.columnQuantity}>{row.quantity}</td>
              <td className={styles.columnPurchasePrice}>{row.purchasePrice}</td>
              <td className={styles.columnSellingPrice}>{row.sellingPrice}</td>
              <td className={styles.columnSoldAmount}>{row.soldAmount}</td>
              <td className={styles.columnAvailability}>{row.availability}</td>
              <td className={styles.columnPartsPurchase}>{row.partsPurchase}</td>
              <td className={styles.columnWorkCost}>{row.workCost}</td>
              <td className={styles.columnFullName}>{row.mechanic.fullName}</td>
              <td className={styles.columnPercentage}>{row.mechanic.percentage}%</td>
              <td className={styles.columnSalary}>{row.mechanic.salary}</td>
              <td className={styles.columnMargin}>{row.margin}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={15} className={styles.noData}>
              Дані Відсутні
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableRepair;
