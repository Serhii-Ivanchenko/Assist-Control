import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectSelectedServiceId } from "../../../redux/auth/selectors.js";
// import { getRatings } from "../../../redux/settings/operations.js";
// import { selectRatings } from "../../../redux/settings/selectors.js"
import { BsPower, BsFillCaretDownFill } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import css from "./RatingPart.module.css";

const action = [
  { id: 1, name: "Немає події" },
  { id: 2, name: "1 день після оплати за ремонт" },
  { id: 3, name: "2 дні після оплати за ремонт" },
  { id: 4, name: "5 днів після оплати за ремонт" },
  { id: 5, name: "відразу після оплати за ремонт" },
  { id: 6, name: "відразу після ЗАВЕРШЕНО" },
  { id: 7, name: "2 дні після отримання товару" },
];

const acc = [
  { id: 1, name: "Немає" },
  { id: 2, name: "Клієнт" },
  { id: 3, name: "Менеджер" },
  { id: 4, name: "Механік" },
  { id: 5, name: "Формула" },
];

const period = [
  { id: 1, name: "Кожного разу" },
  { id: 2, name: "Раз на тиждень" },
];

const dictionaries = { action, acc, period };

const data = [
  {
    recId: 1,
    parent: 0,
    name: "Автосервіс",
    action: 4,
    acc: 2,
    period: 2,
    activity: true,
  },
  { recId: 2, parent: 1, name: "Співробітників", activity: true },
  {
    recId: 3,
    parent: 2,
    name: "Керівник",
    action: 4,
    acc: 2,
    period: 1,
    activity: true,
  },
  {
    recId: 4,
    parent: 2,
    name: "Менеджер",
    action: 4,
    acc: 2,
    period: 1,
    activity: true,
  },
  {
    recId: 5,
    parent: 2,
    name: "Адміністратор",
    action: 4,
    acc: 2,
    period: 1,
    activity: true,
  },
  {
    recId: 6,
    parent: 2,
    name: "Механік",
    action: 4,
    acc: 2,
    period: 1,
    activity: true,
  },
  {
    recId: 7,
    parent: 0,
    name: "Кліента",
    action: 4,
    acc: 2,
    period: 1,
    activity: true,
  },
  {
    recId: 8,
    parent: 0,
    name: "Постачальникі",
    action: 4,
    acc: 4,
    period: 1,
    activity: true,
  },
  {
    recId: 9,
    parent: 0,
    name: "Запчастин",
    action: 4,
    acc: 4,
    period: 1,
    activity: true,
  },
];

const RatingPart = () => {

// const dispatch = useDispatch();
//   const ratingsData = useSelector(selectRatings);
//   const selectedServiceId = useSelector(selectSelectedServiceId);

  const [openAccordions, setOpenAccordions] = useState({}); // Состояние для аккордеонов
  const [editedData, setEditedData] = useState(data); // Состояние таблицы с редактируемыми данными


//  useEffect(() => {
//      const fetchRatingsData = async () => {
//        if (!selectedServiceId) {
//          return;
//        };
//         await dispatch(getRatings());
       
//      };

//      fetchRatingsData();
//    }, [dispatch,  selectedServiceId]); 

//   console.log(ratingsData);


  const toggleAccordion = (recId) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [recId]: !prev[recId],
    }));
  };

  const toggleActivity = (recId) => {
    setEditedData((prev) =>
      prev.map((row) =>
        row.recId === recId ? { ...row, activity: !row.activity } : row
      )
    );
  };

  const handleSelectChange = (recId, field, value) => {
    setEditedData((prev) =>
      prev.map((row) =>
        row.recId === recId ? { ...row, [field]: value } : row
      )
    );
  };

  // const renderSelect = (recId, field, value, dictionary) => (
  //   <select className={css.dictionitem}
  //     value={value}
  //     onChange={(e) => handleSelectChange(recId, field, e.target.value)}
  //   >
  //     {dictionary.map((item) => (
  //       <option key={item.id} value={item.id} className={css.dictionitem}>
  //         {item.name}
  //       </option>
  //     ))}
  //   </select>
  // );

  const renderSelect = (recId, field, value, dictionary) => (
    <div className={css.customSelectWrapper}>
      <select
        className={`${css.customSelect}`}
        value={value}
        onChange={(e) => handleSelectChange(recId, field, e.target.value)}
      >
        {dictionary.map((item) => (
          <option key={item.id} value={item.id} className={css.dictionoption}>
            {item.name}
          </option>
        ))}
      </select>
      <BsFillCaretDownFill className={css.customSelectIcon} />
    </div>
  );

  return (
    <div className={css.container}>
      <div className={css.divForScroll}>
        {/* Заголовок */}
        <div className={css.title}>
          <div style={{ flex: "0 0 20%" }}></div>
          <div className={css.titleitem} style={{ flex: "0 0 20%" }}>
            Відповідальний
          </div>
          <div className={css.titleitem} style={{ flex: "0 0 25%" }}>
            Подія
          </div>
          <div className={css.titleitem} style={{ flex: "0 0 20%" }}>
            Частота
          </div>
          <div style={{ flex: "0 0 3%" }}></div>
        </div>

        {/* Рендер строк */}
        {editedData.map((item) => {
          const isChild = item.parent === 2;
          const isAccordion = item.parent === 1;

          return (
            <React.Fragment key={item.recId}>
              {/* Основные строки parent = 0 */}
              {item.parent === 0 && (
                <div className={css.flexitem}>
                  <div style={{ flex: "0 0 20%" }}>{item.name}</div>
                  <div style={{ flex: "0 0 20%" }}>
                    {renderSelect(
                      item.recId,
                      "acc",
                      item.acc,
                      dictionaries.acc
                    )}
                  </div>
                  <div style={{ flex: "0 0 25%" }}>
                    {renderSelect(
                      item.recId,
                      "action",
                      item.action,
                      dictionaries.action
                    )}
                  </div>
                  <div style={{ flex: "0 0 20%" }}>
                    {renderSelect(
                      item.recId,
                      "period",
                      item.period,
                      dictionaries.period
                    )}
                  </div>
                  <div style={{ flex: "0 0 3%" }}>
                    <BsPower
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем закрытие аккордеона
                        toggleActivity(item.recId);
                      }}
                      className={css.iconbtn}
                      style={{
                        fill: item.activity
                          ? "var(--green-btn-normal)"
                          : "var(--red)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Аккордеоны parent = 1 */}
              {isAccordion && (
                <div
                  className={css.flexitem}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleAccordion(item.recId)}
                >
                  <div
                    style={{ flex: "0 0 20%" }}
                    className={css.dictionitemflex}
                  >
                    {item.name}
                    <BsFillCaretDownFill
                      className={`${css.iconbtn} ${
                        openAccordions[item.recId] ? css.rotated : ""
                      }`}
                    />
                  </div>
                  {/* <div style={{ flex: "1 0 20%" }}>
                  {renderSelect(item.recId, "action", item.action, dictionaries.action)}
                </div>
                <div style={{ flex: "1 0 20%" }}>
                  {renderSelect(item.recId, "acc", item.acc, dictionaries.acc)}
                </div>
                <div style={{ flex: "1 0 20%" }}>
                  {renderSelect(item.recId, "period", item.period, dictionaries.period)}
                </div> */}
                  {/* <div style={{ flex: "0 0 3%" }}>
                  {openAccordions[item.recId] ? "▲" : "▼"}
                </div > */}
                  <div style={{ flex: "0 0 3%" }}>
                    <BsPower
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем закрытие аккордеона
                        toggleActivity(item.recId);
                      }}
                      className={css.iconbtn}
                      style={{
                        fill: item.activity
                          ? "var(--green-btn-normal)"
                          : " var(--red)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Вложенные строки parent = 2 */}
              {isChild && openAccordions[item.parent] && (
                <div className={css.flexitem}>
                  <div style={{ flex: "0 0 20%", marginLeft: "20px" }}>
                    {item.name}
                  </div>
                  <div style={{ flex: "0 0 20%", marginLeft: "-20px" }}>
                    {renderSelect(
                      item.recId,
                      "acc",
                      item.acc,
                      dictionaries.acc
                    )}
                  </div>
                  <div style={{ flex: "0 0 25%" }}>
                    {renderSelect(
                      item.recId,
                      "action",
                      item.action,
                      dictionaries.action
                    )}
                  </div>
                  <div style={{ flex: "0 0 20%" }}>
                    {renderSelect(
                      item.recId,
                      "period",
                      item.period,
                      dictionaries.period
                    )}
                  </div>
                  <div style={{ flex: "0 0 3%" }}>
                    <BsPower
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем закрытие аккордеона
                        toggleActivity(item.recId);
                      }}
                      className={css.iconbtn}
                      style={{
                        fill: item.activity
                          ? "var(--green-btn-normal)"
                          : " var(--red)",
                      }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className={css.blockbtn}>
        <button
          className={css.btncancel}
          type="button"
          onClick={() => setEditedData(data)}
        >
          Відмінити
        </button>
        <button
          className={css.btnsave}
          type="button"
          // onClick={() => }
        >
          <RiSave3Fill className={css.iconsave} />
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default RatingPart;
