import css from "./InvoicesList.module.css";
import flag from "../../../assets/images/flagUa.webp";

export default function InvoicesList({ category, list }) {
  // const categoryMap = {
  //   "Діагностика": invoices,
  //   "Замовлено": invoicesMoney,
  // };

  // const list = categoryMap[type] || invoices;
  return (
    <ul className={css.invoicesList}>
      {list.map((item, index) => (
        <li key={index} className={css.invoiceItem}>
          {(category === "Діагностика" ||
            category === "Погоджено" ||
            category === "Продано") && (
            <>
              <img
                src={item.photo}
                alt="car's image"
                className={css.carImage}
              />
              <div className={css.info}>
                <p className={css.invoiceDate}>{item.date}</p>
                {category === "Продано" ? (
                  <p>{item.amount}</p>
                ) : (
                  <div className={css.carRegContainer}>
                    <div className={css.carRegCountry}>
                      <img
                        className={css.carRegFlag}
                        src={flag}
                        alt="Car registration country flag"
                      />
                      <p className={css.carRegCountry}>ua</p>
                    </div>
                    <p className={css.carRegNumber}>{item.plate}</p>
                  </div>
                )}

                <p className={css.invoiceName}>{item.name}</p>
              </div>
            </>
          )}

          {(category === "Замовлено" ||
            category === "Отримано" ||
            category === "Повернуто") && (
            <div>
              <p>{item.date}</p>
              <p>{item.distributorName}</p>
              <p>{item.amount}</p>
            </div>
          )}

          {(category === "Переміщено" ||
            category === "Переоцінка" ||
            category === "Інвентаризація" ||
            category === "Списано") && (
            <div>
              <p>{item.date}</p>
              <p>{item.warehouse}</p>
              <div>
                <p>{item.amount}</p>
                {category === "Переоцінка" || category === "Інвентаризація" ? (
                  <p>{item.amount2}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
