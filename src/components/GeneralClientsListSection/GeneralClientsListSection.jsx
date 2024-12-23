import { useState } from "react";
import css from "./GeneralClientsListSection.module.css";
import car1x from "../../assets/images/car.png";
import RatingStars from "../sharedComponents/RatingStars/RatingStars";
import { BsChatText, BsWrench } from "react-icons/bs";

const data = [
  {
    id: 6,
    parent: 0,
    date: "01.12",
    name: "Олександр Макаренковчук",
    raiting: 4,
    carimg: car1x,
    carimg2: car1x,
    carcount: 4,
    connection: 7,
    repair: 4,
    middlecheck: 16000,
    cash: 64000,
    work: 30000,
    paymmechc: 12000,
    parts: 34000,
    mark: 34000,
    paymmng: 12000,
    paymadm: 12000,
    coeff: 1.7,
    ng: 700,
    income: 6613.83,
    percent: 23,
  },
  {
    id: 6,
    parent: 1,
    date: "01.12",
    name: "Іван Петренко",
    raiting: 4,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 16000,
    cash: 64000,
    work: 30000,
    paymmechc: 12000,
    parts: 34000,
    mark: 34000,
    paymmng: 12000,
    paymadm: 12000,
    coeff: 1.7,
    ng: 700,
    income: 6613.83,
    percent: 23,
  },
  {
    id: 6,
    parent: 1,
    date: "01.12",
    name: "Іван Петренко",
    raiting: 4,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 16000,
    cash: 64000,
    work: 30000,
    paymmechc: 12000,
    parts: 34000,
    mark: 34000,
    paymmng: 12000,
    paymadm: 12000,
    coeff: 1.7,
    ng: 700,
    income: 6613.83,
    percent: 23,
  },
  {
    id: 6,
    parent: 1,
    date: "01.12",
    name: "Іван Петренко",
    raiting: 4,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 16000,
    cash: 64000,
    work: 30000,
    paymmechc: 12000,
    parts: 34000,
    mark: 34000,
    paymmng: 12000,
    paymadm: 12000,
    coeff: 1.7,
    ng: 700,
    income: 6613.83,
    percent: 23,
  },
  {
    id: 6,
    parent: 1,
    date: "01.12",
    name: "Іван Петренко",
    raiting: 4,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 16000,
    cash: 64000,
    work: 30000,
    paymmechc: 12000,
    parts: 34000,
    mark: 34000,
    paymmng: 12000,
    paymadm: 12000,
    coeff: 1.7,
    ng: 700,
    income: 6613.83,
    percent: 23,
  },
  {
    id: 1,
    parent: 0,
    date: "04.12",
    name: "Іван Петренко",
    raiting: 3,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 12000,
    cash: 12000,
    work: 2000,
    paymmechc: 800,
    parts: 10000,
    mark: 4000,
    paymmng: 800,
    paymadm: 150,
    coeff: 1.7,
    ng: 700,
    income: 2100,
    percent: 12,
  },

  {
    id: 2,
    parent: 0,
    date: "04.12",
    name: "Іван Петренко",
    raiting: 3,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 12000,
    cash: 12000,
    work: 2000,
    paymmechc: 800,
    parts: 10000,
    mark: 4000,
    paymmng: 800,
    paymadm: 150,
    coeff: 1.7,
    ng: 700,
    income: 2100,
    percent: 12,
  },

  {
    id: 3,
    parent: 0,
    date: "04.12",
    name: "Іван Петренко",
    raiting: 3,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 12000,
    cash: 12000,
    work: 2000,
    paymmechc: 800,
    parts: 10000,
    mark: 4000,
    paymmng: 800,
    paymadm: 150,
    coeff: 1.7,
    ng: 700,
    income: 2100,
    percent: 12,
  },
  {
    id: 4,
    parent: 0,
    date: "04.12",
    name: "Іван Петренко",
    raiting: 3,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 12000,
    cash: 12000,
    work: 2000,
    paymmechc: 800,
    parts: 10000,
    mark: 4000,
    paymmng: 800,
    paymadm: 150,
    coeff: 1.7,
    ng: 700,
    income: 2100,
    percent: 12,
  },

  {
    id: 5,
    parent: 0,
    date: "03.12",
    name: "Іван Петренко",
    raiting: 4,
    carimg: car1x,
    carimg2: car1x,
    carcount: 2,
    connection: 7,
    repair: 2,
    middlecheck: 10000,
    cash: 34000,
    work: 10000,
    paymmechc: 2000,
    parts: 3000,
    mark: 3000,
    paymmng: 2000,
    paymadm: 100,
    coeff: 1.7,
    ng: 700,
    income: 4613.83,
    percent: 18,
  },
  {
    id: 5,
    parent: 1,
    date: "01.12",
    name: "Іван Петренко",
    raiting: 4,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 10000,
    cash: 34000,
    work: 10000,
    paymmechc: 2000,
    parts: 3000,
    mark: 3000,
    paymmng: 2000,
    paymadm: 100,
    coeff: 1.7,
    ng: 700,
    income: 4613.83,
    percent: 18,
  },
  {
    id: 5,
    parent: 1,
    date: "01.12",
    name: "Іван Петренко",
    raiting: 2,
    carimg: car1x,
    carcount: 1,
    connection: 7,
    repair: 1,
    middlecheck: 10000,
    cash: 34000,
    work: 10000,
    paymmechc: 2000,
    parts: 3000,
    mark: 3000,
    paymmng: 2000,
    paymadm: 100,
    coeff: 1.7,
    ng: 700,
    income: 4613.83,
    percent: 18,
  },
];

function formatNumber(num) {
  // Если число целое, возвращаем без десятичных точек
  if (num % 1 === 0) {
    return num.toLocaleString("en-US").replace(/,/g, " ");
  }
  // Если дробное, форматируем с точкой
  return num
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, " ");
}
const sizestar = "13px";

export default function GeneralClientsListSection() {
  const [expandedRows, setExpandedRows] = useState([]);

  const rootData = data.filter((item) => item.parent === 0);

  const handleRowClick = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        {/* <div className={css.titletext} style={{ width: "80px" }}>
          {" "}
        </div>
        <div className={css.titletext} style={{ width: "120px" }}>
          {" "}
        </div>
        <div className={css.titletext} style={{ width: "75px" }}>
          {" "}
        </div> */}

        <div
          className={css.titletext}
          // style={{ width: "43px"}}
          style={{ marginRight: "16px" }}
        >
          Звернення
        </div>
        <div
          className={css.titletext}
          // style={{ width: "43px" }}
          style={{ marginRight: "37px" }}
        >
          Ремонт
        </div>
        <div
          className={css.titletext}
          // style={{ width: "80px" }}
          style={{ marginRight: "56px" }}
        >
          Ср. чек
        </div>
        <div
          className={css.titletext}
          //  style={{ width: "80px" }}
          style={{ marginRight: "58px" }}
        >
          Каса
        </div>
        <div
          className={css.titletext}
          // style={{ width: "80px" }}
          style={{ marginRight: "37px" }}
        >
          Робота{" "}
        </div>
        <div
          className={css.titletext}
          // style={{ width: "51px" }}
          style={{ marginRight: "14px" }}
        >
          ЗП Механіка
        </div>
        <div
          className={css.titletext}
          // style={{ width: "80px" }}
          style={{ marginRight: "31px" }}
        >
          Запчастини
        </div>
        <div
          className={css.titletext}
          // style={{ width: "80px" }}
          style={{ marginRight: "34px" }}
        >
          Націнка
        </div>
        <div
          className={css.titletext}
          style={{ width: "79px", marginRight: "11px" }}
        >
          ЗП Менеджер
        </div>
        <div
          className={css.titletext}
          style={{ width: "49px", marginRight: "23px" }}
        >
          ЗП Адмін
        </div>
        <div
          className={css.titletext}
          // style={{
          //   width: "30px"
          // }}
          style={{ marginRight: "26px" }}
        >
          Коеф
        </div>
        <div
          className={css.titletext}
          // style={{ width: "30px"}}
          style={{ marginRight: "43px" }}
        >
          НГ
        </div>
        <div
          className={css.titletext}
          // style={{ width: "75px"}}
          style={{ marginRight: "25px" }}
        >
          Прибуток
        </div>
        <div
          className={css.titletext}
          // style={{ width: "30px" }}
          style={{ marginRight: "40px" }}
        >
          %
        </div>
      </div>

      <div className={css.containercolumn}>
        {rootData.map((item) => {
          const isExpanded = expandedRows.includes(item.id);

          return (
            <div key={item.id}>
              {/* Основная строка */}
              <div
                className={css.container}
                onClick={() => handleRowClick(item.id)}
              >
                {item.carcount === 1 ? (
                  <div className={css.date}>{item.date}</div>
                ) : (
                  ""
                )}
                <div className={item.carcount === 1 ? css.shortitem : css.item}>
                  <div className={css.carsbox}>
                    <img
                      className={css.photoavto}
                      src={item.carimg || car1x}
                      alt={item.name}
                    />
                    {item.carcount > 1 && (
                      <div className={css.carImageWrapper}>
                        <img
                          className={css.photoavto}
                          src={item.carimg2 || car1x}
                          alt={item.name}
                        />
                        {item.carcount > 2 && (
                          <div className={css.carCountOverlay}>
                            +{item.carcount - 2}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={css.bigtext}
                    // style={{ width: "120px" }}
                  >
                    {item.name}
                  </div>
                  <RatingStars
                    // style={{ width: "75px" }}
                    rating={item.raiting}
                    ratingGap={css.ratingGap}
                    sizestar="13px"
                  />

                  <div className={css.connection}>
                    <div className={css.chat}>
                      <BsChatText className={css.icon} size={13} />{" "}
                    </div>
                    <div className={css.chattext}> {item.connection} </div>
                  </div>
                  <div className={css.repair}>
                    <div className={css.wrench}>
                      <BsWrench className={css.icon} size={13} />
                    </div>
                    <div className={css.reptext}> {item.repair}</div>
                  </div>
                  <div className={css.smalltext}>
                    {item.repair === 1
                      ? "----------"
                      : `${formatNumber(item.middlecheck)} грн.`}
                  </div>
                  <div className={css.smalltext}>
                    {formatNumber(item.cash)} грн.
                  </div>
                  <div className={css.smalltext}>
                    {formatNumber(item.work)} грн.
                  </div>
                  <div className={css.minttext}>
                    {formatNumber(item.paymmechc)}
                  </div>
                  <div className={css.smalltext}>
                    {formatNumber(item.parts)} грн.
                  </div>
                  <div className={css.smalltext}>
                    {formatNumber(item.mark)} грн.
                  </div>
                  <div className={css.minttext}>
                    {formatNumber(item.paymmng)}
                  </div>
                  <div className={css.minttext}>
                    {formatNumber(item.paymadm)}
                  </div>
                  <div className={css.smalltext} style={{ width: "30px" }}>
                    {item.coeff}
                  </div>
                  <div className={css.graytext} style={{ width: "30px" }}>
                    {item.ng}
                  </div>
                  <div className={css.totalAmount}>
                    ₴{" "}
                    {item.income.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className={css.graytext} style={{ width: "30px" }}>
                    {" "}
                    {item.percent}{" "}
                  </div>
                </div>
              </div>

              {/* Подчиненные строки */}
              {isExpanded && (
                <div className={css.expandedRow}>
                  {data
                    .filter(
                      (subItem) =>
                        subItem.parent === 1 && subItem.id === item.id
                    )
                    .map((subItem, index) => (
                      <div
                        key={subItem.id + "-" + subItem.date + "-" + index}
                        className={css.subRow}
                      >
                        <div className={css.date}>{subItem.date}</div>

                        <div
                          className={
                            subItem.carcount === 1 ? css.shortitem : css.item
                          }
                          // style={{ background: "var(--bg)" }}
                          style={{ background: "transparent" }}
                        >
                          <div className={css.carsbox}>
                            <img
                              className={css.photoavto}
                              src={subItem.carimg || car1x}
                              alt={subItem.name}
                            />
                            {subItem.carcount > 1 && (
                              <div className={css.carImageWrapper}>
                                <img
                                  className={css.photoavto}
                                  src={subItem.carimg2 || car1x}
                                  alt={subItem.name}
                                />
                                {subItem.carcount > 2 && (
                                  <div className={css.carCountOverlay}>
                                    +{subItem.carcount - 2}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div
                            className={css.bigtext}
                            // style={{ width: "120px" }}
                          >
                            {subItem.name}
                          </div>
                          <RatingStars
                            // style={{ width: "75px" }}
                            rating={subItem.raiting}
                            ratingGap={css.ratingGap}
                            sizestar={sizestar}
                          />

                          <div className={css.connection}>
                            <div className={css.chat}>
                              <BsChatText className={css.icon} size={13} />
                            </div>
                            <div className={css.chattext}>
                              {" "}
                              {subItem.connection}{" "}
                            </div>
                          </div>
                          <div className={css.repair}>
                            <div className={css.wrench}>
                              <BsWrench className={css.icon} size={13} />
                            </div>
                            <div className={css.reptext}> {subItem.repair}</div>
                          </div>
                          <div className={css.smalltext}>
                            {subItem.repair === 1
                              ? "----------"
                              : `${formatNumber(subItem.middlecheck)} грн.`}
                          </div>
                          <div className={css.smalltext}>
                            {formatNumber(subItem.cash)} грн.
                          </div>
                          <div className={css.smalltext}>
                            {formatNumber(subItem.work)} грн.
                          </div>
                          <div className={css.minttext}>
                            {formatNumber(subItem.paymmechc)}
                          </div>
                          <div className={css.smalltext}>
                            {formatNumber(subItem.parts)} грн.
                          </div>
                          <div className={css.smalltext}>
                            {formatNumber(subItem.mark)} грн.
                          </div>
                          <div className={css.minttext}>
                            {formatNumber(subItem.paymmng)}
                          </div>
                          <div className={css.minttext}>
                            {formatNumber(subItem.paymadm)}
                          </div>
                          <div
                            className={css.smalltext}
                            style={{ width: "30px" }}
                          >
                            {subItem.coeff}
                          </div>
                          <div
                            className={css.graytext}
                            style={{ width: "30px" }}
                          >
                            {" "}
                            {subItem.ng}
                          </div>
                          <div className={css.totalAmount}>
                            ₴{" "}
                            {subItem.income.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div
                            className={css.graytext}
                            style={{ width: "30px" }}
                          >
                            {subItem.percent}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
