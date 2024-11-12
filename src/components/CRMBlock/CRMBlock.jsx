import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import DayCarsListCrm from "../DayCarsListCrm/DayCarsListCrm";
import css from "./CRMBlock.module.css";
import clsx from "clsx";
import { selectDate, selectDayCars } from "../../redux/cars/selectors.js";
import toast from "react-hot-toast";
import { changeCarStatus, getCarsByDate } from "../../redux/cars/operations.js";
import { useEffect } from "react";
import Column from "../Column/Column.jsx";

const statusMapping = {
  new: "Нова",
  diagnostic: "Діагностика",
  repair: "Ремонт",
  complete: "Завершено",
};

const getSvgIcon = (index) => {
  const svgData = [
    null,
    { fill: "var(--blue)" },
    { fill: "#994CA5" },
    { fill: "#246D4D" },
  ];

  if (!svgData[index]) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="61"
      viewBox="0 0 12 61"
      fill="none"
      className={css.svgIcon}
    >
      <path
        d="M0 0.253906H3.02041L11.3265 30.5079L3.02041 60.7618H0L8.30612 30.5079L0 0.253906Z"
        fill={svgData[index].fill}
      />
    </svg>
  );
};

// const filterRecordsByStatus = (records, status) => {
//     return records.filter(record => record.status === status);
// };

export default function CRMBlock() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const records = useSelector(selectDayCars);
  console.log("records", records);

  useEffect(() => {
    if (selectedDate) {
      dispatch(getCarsByDate(selectedDate))
        .unwrap()
        .then(() => {})
        .catch(() => {
          toast.error("Щось пішло не так. Будь ласка, спробуйте ще раз.");
        });
    }
  }, [dispatch, selectedDate]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    console.log("id", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const itemId = Number(e.dataTransfer.getData("text/plain"));
    console.log("itemId", itemId);

    const item = records.find((item) => item.id === itemId);
    if (item) {
      dispatch(changeCarStatus({ carId: item.id, status }))
        .then(() => {
          dispatch(getCarsByDate(selectedDate));
        })
        .catch((error) => {
          toast.error(
            "Помилка при оновленні статусу автомобіля",
            error.message
          );
        });
    }
  };

  const getItemsForStatus = (status) => {
    return records.filter((item) => item.status === status);
  };

  return (
    <div className={css.container}>
      <div className={css.headersContainer}>
        {Object.entries(statusMapping).map(([status, label], index) => {
          const filteredRecords = getItemsForStatus(status);
          const recordCount = filteredRecords.length;

          return (
            <div key={status} className={css.headerColumn}>
              <h3
                className={clsx(css.statusHeader, {
                  [css.firstStatus]: index === 0,
                })}
              >
                {getSvgIcon(index)}
                {label}
                <span className={css.carCount}>{recordCount}</span>
              </h3>
            </div>
          );
        })}
      </div>

      <div className={css.columnsContainer}>
          <div className={css.columnsInnerContainer}>
            {Object.entries(statusMapping).map(([status, label]) => {
              const filteredRecords = getItemsForStatus(status);
              return (
                <Column
                  key={status}
                  id={status}
                  title={label}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <DayCarsListCrm
                    records={filteredRecords}
                    onDragStart={handleDragStart}
                  />
                </Column>
              );
            })}
          </div>
        </div>
    </div>
  );
}
