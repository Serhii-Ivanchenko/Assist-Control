import { useState } from "react";
import css from "./GeneralClientsListSection.module.css";
import car1x from "../../assets/images/car.png";
import RatingStars from "../sharedComponents/RatingStars/RatingStars";
import { BsChatText, BsWrench, BsCaretDownFill } from "react-icons/bs";
import SortButtonsArrow from "../sharedComponents/SortButtonsArrow/SortButtonsArrow";
import { useTransition, animated } from "react-spring";
import { useSelector } from "react-redux";
import { selectVisibilityAllClients } from "../../redux/visibility/selectors";

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
    coeff: 1.6,
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
    coeff: 1.4,
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
  const visibility = useSelector(selectVisibilityAllClients);
  const [expandedRows, setExpandedRows] = useState([]);
  //  const [isExpanded , setIsExpanded]= useState(true);

  const [displayedData, setDisplayedData] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc");

  const sort = (array, key, order) => {
    return array.sort((a, b) => {
      if (Number.parseFloat(a[key]) < Number.parseFloat(b[key])) {
        return order === "asc" ? -1 : 1;
      }
      if (Number.parseFloat(a[key]) > Number.parseFloat(b[key])) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key) => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    const sortedData = sort([...data], key, sortOrder);
    setDisplayedData(sortedData);
  };

  const rootData = displayedData.filter((item) => item.parent === 0);

  const transitionsMap = rootData.map((item) => expandedRows.includes(item.id));

  const transitions = transitionsMap.map((isExpanded) =>
    useTransition(isExpanded, {
      from: { maxHeight: 0, opacity: 0, transform: "translateY(-20px)" },
      enter: { maxHeight: 300, opacity: 1, transform: "translateY(0)" },
      leave: { maxHeight: 0, opacity: 0, transform: "translateY(-20px)" },
      config: { mass: 1, tension: 170, friction: 20 },
    })
  );

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
        <div className={css.hederPhoto}></div>
        <div className={css.hederName}></div>
        {visibility?.rating && <div className={css.hederRight}></div>}

        {visibility?.appeal && (
          <div
            className={css.titletext}
            style={{ marginRight: "6px" }}
            onClick={() => handleSort("connection")}
          >
            Звернення
            <SortButtonsArrow
            // orderKey="connection"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.repair && (
          <div
            className={css.titletext}
            // style={{ width: "43px" }}
            style={{ marginRight: "18px" }}
            onClick={() => handleSort("repair")}
          >
            Ремонт
            <SortButtonsArrow
            // orderKey="repair"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.averageCheck && (
          <div
            className={css.titletext}
            // style={{ width: "80px" }}
            style={{ marginRight: "54px" }}
            onClick={() => handleSort("middlecheck")}
          >
            Ср. чек
            <SortButtonsArrow
            // orderKey="middlecheck"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.paydesk && (
          <div
            className={css.titletext}
            //  style={{ width: "80px" }}
            style={{ marginRight: "50px" }}
            onClick={() => handleSort("cash")}
          >
            Каса
            <SortButtonsArrow
            // orderKey="cash"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.workPayment && (
          <div
            className={css.titletext}
            // style={{ width: "80px" }}
            style={{ marginRight: "32px" }}
            onClick={() => handleSort("work")}
          >
            Робота{" "}
            <SortButtonsArrow
            // orderKey="work"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.salaryMechanics && (
          <div
            className={css.titletext}
            // style={{ width: "51px" }}
            style={{ width: "49px", marginRight: "24px" }}
            onClick={() => handleSort("paymmechc")}
          >
            ЗП Механіка
            <SortButtonsArrow
            // orderKey="paymmechc"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.spareParts && (
          <div
            className={css.titletext}
            // style={{ width: "80px" }}
            style={{ marginRight: "25px" }}
            onClick={() => handleSort("parts")}
          >
            Запчастини
            <SortButtonsArrow
            // orderKey="part"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.markUp && (
          <div
            className={css.titletext}
            // style={{ width: "80px" }}
            style={{ marginRight: "20px" }}
            onClick={() => handleSort("mark")}
          >
            Націнка
            <SortButtonsArrow
            // orderKey="mark"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.salaryManager && (
          <div
            className={css.titletext}
            style={{ width: "79px", marginRight: "11px" }}
            onClick={() => handleSort("paymmng")}
          >
            ЗП Менеджер
            <SortButtonsArrow
            // orderKey="paymmng"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.salaryAdmin && (
          <div
            className={css.titletext}
            style={{ width: "49px", marginRight: "15px" }}
            onClick={() => handleSort("paymadm")}
          >
            ЗП Адмін
            <SortButtonsArrow
            // orderKey="paymadm"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.coefficient && (
          <div
            className={css.titletext}
            // style={{
            //   width: "30px"
            // }}
            style={{ marginRight: "15px" }}
            onClick={() => handleSort("coeff")}
          >
            Коеф
            <SortButtonsArrow
            // orderKey="coeff"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.NG && (
          <div
            className={css.titletext}
            // style={{ width: "30px"}}
            style={{ marginRight: "24px" }}
            onClick={() => handleSort("ng")}
          >
            НГ
            <SortButtonsArrow
            // orderKey="ng"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.profit && (
          <div
            className={css.titletext}
            // style={{ width: "75px"}}
            style={{ marginRight: "9px" }}
            onClick={() => handleSort("income")}
          >
            Прибуток
            <SortButtonsArrow
            // orderKey="income"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
        {visibility?.percent && (
          <div
            className={css.titletext}
            // style={{ width: "30px" }}
            style={{ marginRight: "18px" }}
            onClick={() => handleSort("percent")}
          >
            %
            <SortButtonsArrow
            // orderKey="percent"
            // func={sort}
            // handleFunc={handleSort}
            />
          </div>
        )}
      </div>

      <div className={css.containercolumn}>
        {rootData.map((item, index) => {
          // const isExpanded = expandedRows.includes(item.id);
          // setIsExpanded(expandedRows.includes(item.id));
          // const isExpanded = expandedRows.includes(item.id);
          const transition = transitions[index];

          return (
            <div key={item.id}>
              {/* Основная строка */}
              <div
                className={css.container}
                // onClick={() => handleRowClick(item.id)}
              >
                {item.carcount === 1 ? (
                  <div className={css.date}>{item.date}</div>
                ) : (
                  ""
                )}
                <div className={item.carcount === 1 ? css.shortitem : css.item}>
                  {item.repair > 1 && (
                    <BsCaretDownFill
                      className={`${css.downfill} ${
                        expandedRows.includes(item.id) ? css.rotated : ""
                      }`}
                      onClick={() => handleRowClick(item.id)}
                    />
                  )}

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

                  <div className={css.ratingWrapper}>
                    {visibility?.rating && (
                      <RatingStars
                        rating={item.raiting}
                        ratingGap={css.ratingGap}
                      />
                    )}
                  </div>

                  {visibility?.appeal && (
                    <div className={css.connection}>
                      <div className={css.chat}>
                        <BsChatText className={css.icon} size={13} />
                      </div>
                      <div className={css.chattext}>{item.connection}</div>
                    </div>
                  )}
                  {visibility?.repair && (
                    <div className={css.repair}>
                      <div className={css.wrench}>
                        <BsWrench className={css.icon} size={13} />
                      </div>
                      <div className={css.reptext}> {item.repair}</div>
                    </div>
                  )}
                  {visibility?.averageCheck && (
                    <div className={css.smalltext}>
                      {item.repair === 1
                        ? "----------"
                        : `${formatNumber(item.middlecheck)} грн.`}
                    </div>
                  )}
                  {visibility?.paydesk && (
                    <div className={css.smalltext}>
                      {formatNumber(item.cash)} грн.
                    </div>
                  )}
                  {visibility?.workPayment && (
                    <div className={css.smalltext}>
                      {formatNumber(item.work)} грн.
                    </div>
                  )}
                  {visibility?.salaryMechanics && (
                    <div className={css.minttext}>
                      {formatNumber(item.paymmechc)}
                    </div>
                  )}
                  {visibility?.spareParts && (
                    <div className={css.smalltext}>
                      {formatNumber(item.parts)} грн.
                    </div>
                  )}
                  {visibility?.markUp && (
                    <div className={css.smalltext}>
                      {formatNumber(item.mark)} грн.
                    </div>
                  )}
                  {visibility?.salaryManager && (
                    <div className={css.minttext}>
                      {formatNumber(item.paymmng)}
                    </div>
                  )}
                  {visibility?.salaryAdmin && (
                    <div className={css.minttext}>
                      {formatNumber(item.paymadm)}
                    </div>
                  )}
                  {visibility?.coefficient && (
                    <div className={css.smalltext} style={{ width: "30px" }}>
                      {item.coeff}
                    </div>
                  )}
                  {visibility?.NG && (
                    <div className={css.graytext} style={{ width: "30px" }}>
                      {item.ng}
                    </div>
                  )}
                  {visibility?.profit && (
                    <div className={css.totalAmount}>
                      ₴{" "}
                      {item.income.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  )}
                  {visibility?.percent && (
                    <div className={css.graytext} style={{ width: "30px" }}>
                      {" "}
                      {item.percent}{" "}
                    </div>
                  )}
                </div>
              </div>

              {/* Подчиненные строки */}
              {/* {isExpanded && (
               <animated.div  style={animationProps}>
                <div
            className={css.expandedRow} >
                   */}

              {transition((style, visible) =>
                visible ? (
                  <animated.div style={style} className={css.expandedRow}>
                    {data
                      .filter(
                        (subItem) =>
                          subItem.parent === 1 && subItem.id === item.id
                      )
                      .map((subItem, subindex) => (
                        <div
                          key={subItem.id + "-" + subItem.date + "-" + subindex}
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
                            {visibility?.rating && (
                              <RatingStars
                                // style={{ width: "75px" }}
                                rating={subItem.raiting}
                                ratingGap={css.ratingGap}
                                sizestar={sizestar}
                              />
                            )}

                            {visibility?.appeal && (
                              <div className={css.connection}>
                                <div className={css.chat}>
                                  <BsChatText className={css.icon} size={13} />
                                </div>
                                <div className={css.chattext}>
                                  {" "}
                                  {subItem.connection}{" "}
                                </div>
                              </div>
                            )}
                            {visibility?.repair && (
                              <div className={css.repair}>
                                <div className={css.wrench}>
                                  <BsWrench className={css.icon} size={13} />
                                </div>
                                <div className={css.reptext}>
                                  {" "}
                                  {subItem.repair}
                                </div>
                              </div>
                            )}
                            {visibility?.averageCheck && (
                              <div className={css.smalltext}>
                                {subItem.repair === 1
                                  ? "----------"
                                  : `${formatNumber(subItem.middlecheck)} грн.`}
                              </div>
                            )}
                            {visibility?.paydesk && (
                              <div className={css.smalltext}>
                                {formatNumber(subItem.cash)} грн.
                              </div>
                            )}
                            {visibility?.workPayment && (
                              <div className={css.smalltext}>
                                {formatNumber(subItem.work)} грн.
                              </div>
                            )}
                            {visibility?.salaryMechanics && (
                              <div className={css.minttext}>
                                {formatNumber(subItem.paymmechc)}
                              </div>
                            )}
                            {visibility?.spareParts && (
                              <div className={css.smalltext}>
                                {formatNumber(subItem.parts)} грн.
                              </div>
                            )}
                            {visibility?.markUp && (
                              <div className={css.smalltext}>
                                {formatNumber(subItem.mark)} грн.
                              </div>
                            )}
                            {visibility?.salaryManager && (
                              <div className={css.minttext}>
                                {formatNumber(subItem.paymmng)}
                              </div>
                            )}
                            {visibility?.salaryAdmin && (
                              <div className={css.minttext}>
                                {formatNumber(subItem.paymadm)}
                              </div>
                            )}
                            {visibility?.coefficient && (
                              <div
                                className={css.smalltext}
                                style={{ width: "30px" }}
                              >
                                {subItem.coeff}
                              </div>
                            )}
                            {visibility?.NG && (
                              <div
                                className={css.graytext}
                                style={{ width: "30px" }}
                              >
                                {" "}
                                {subItem.ng}
                              </div>
                            )}
                            {visibility?.profit && (
                              <div className={css.totalAmount}>
                                ₴{" "}
                                {subItem.income.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </div>
                            )}
                            {visibility?.percent && (
                              <div
                                className={css.graytext}
                                style={{ width: "30px" }}
                              >
                                {subItem.percent}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </animated.div>
                ) : null
              )}

              {/* </div>
             
              // )}
            // </div>
          );
        })}
      </div>
    </div>
  );
} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
