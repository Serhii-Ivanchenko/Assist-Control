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
              {item.photo === "" ? (
                ""
              ) : (
                <img
                  src={item.photo}
                  alt="car's image"
                  className={css.carImage}
                />
              )}

              <div
                className={`${css.info} ${
                  item.photo === "" && css.infoWithoutPhoto
                }`}
              >
                <p className={css.invoiceText}>{item.date}</p>
                {category === "Продано" ? (
                  <p
                    className={`${css.invoiceText} ${
                      item.photo === "" && css.first
                    }`}
                  >
                    {item.amount}
                  </p>
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

                <p className={css.invoiceText}>{item.name}</p>
              </div>
            </>
          )}

          {(category === "Замовлено" ||
            category === "Отримано" ||
            category === "Повернуто") && (
            <div className={css.narrowType}>
              <p className={css.invoiceText}>{item.date}</p>
              <p className={css.invoiceText}>{item.distributorName}</p>
              <p className={css.invoiceText}>{item.amount}</p>
            </div>
          )}

          {(category === "Переміщено" ||
            category === "Переоцінка" ||
            category === "Інвентаризація" ||
            category === "Списано") && (
            <div className={css.narrowType}>
              <p className={css.invoiceText}>{item.date}</p>
              <p className={css.invoiceText}>{item.warehouse}</p>
              <div className={css.moneyBox}>
                <p className={css.invoiceText}>
                  <span
                    className={`${css.invoiceText} ${
                      category === "Списано" && css.lowerAmount
                    }`}
                  >
                    {item.amount}
                  </span>{" "}
                  {item.currency}
                </p>
                {category === "Переоцінка" || category === "Інвентаризація" ? (
                  <p className={css.invoiceText}>
                    <span
                      className={`${css.invoiceText} ${
                        Number(item.amount) > Number(item.amount2)
                          ? css.lowerAmount
                          : css.higherAmount
                      }`}
                    >
                      {item.amount2}
                    </span>{" "}
                    {item.currency}
                  </p>
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
