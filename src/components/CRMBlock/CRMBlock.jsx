import css from "./CRMBlock.module.css";
import DayCarsListCrm from "../DayCarsListCrm/DayCarsListCrm";
import Column from "../Column/Column.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { changeCarStatus } from "../../redux/cars/operations.js";
import { getRecordsForPeriod } from "../../redux/crm/operations.js";
import {
  selectDates,
  selectPeriodRecords
} from "../../redux/crm/selectors.js";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility.jsx";
import { labelNamesInCrm, statusMapping } from "../../utils/dataToRender.js";
import { borderHeaderInCrm } from "../../utils/borderHeaderInCrm.jsx";
import { selectVisibilityRecords } from "../../redux/visibility/selectors.js";
import { toggleVisibilityRecords } from "../../redux/visibility/slice.js";

export default function CRMBlock() {
  const dispatch = useDispatch();
  const periodRecords = useSelector(selectPeriodRecords);
  const dates = useSelector(selectDates);

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      dispatch(getRecordsForPeriod(dates))
        .unwrap()
        .then((response) => console.log("Fetched records:", response))
        .catch((error) => {
          console.error("Error fetching records:", error);
          toast.error("Помилка отримання даних. Спробуйте знову.");
        });
    }
  }, [dispatch, dates]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    console.log("Drag start with ID:", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const itemId = Number(e.dataTransfer.getData("text/plain"));
    console.log("Dropped item ID:", itemId, "New status:", status);

    const item = periodRecords.find((item) => item.id === itemId);
    console.log("Found item:", item);

    if (item) {
      dispatch(changeCarStatus({ carId: item.id, status }))
        .unwrap()
        .then(() => {
          console.log("Updated status in frontend:", { ...item, status });
          dispatch(getRecordsForPeriod(dates));
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          toast.error("Помилка при оновленні статусу: " + error.message);
        });
    }
  };

  const getItemsForStatus = (status) => {
    if (status === "diagnostic") {
      return periodRecords.filter(
        (item) => item.status === status || item.status === "view_repair"
      );
    }
    return periodRecords.filter((item) => item.status === status);
  };

  // const handleToggle = (field) => {
  //   const newVisibility = { ...visibility, [field]: !visibility[field] };
  //   dispatch(toggleVisibilityRecords(newVisibility));
  // };

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
                {borderHeaderInCrm(index, css.svgIcon)}
                {label}
                <span className={css.carCount}>{recordCount}</span>
              </h3>
            </div>
          );
        })}
        <div className={css.btnSettings}>
          <InfoSettingsVisibility
            selectVisibility={selectVisibilityRecords}
            toggleVisibilityAction={toggleVisibilityRecords}
            labelNames={labelNamesInCrm}
            className={css.settingsContainerInCrm}
          />
        </div>
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
