import css from "./CRMBlock.module.css";
import DayCarsListCrm from "../DayCarsListCrm/DayCarsListCrm";
import Column from "../Column/Column.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import {
  changeCarStatusCRM,
  getRecordsForPeriod,
} from "../../redux/crm/operations.js";
import { selectDates, selectPeriodRecords } from "../../redux/crm/selectors.js";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility.jsx";
import { labelNamesInCrm, statusMapping } from "../../utils/dataToRender.js";
import { borderHeaderInCrm } from "../../utils/borderHeaderInCrm.jsx";
import { selectVisibilityRecords } from "../../redux/visibility/selectors.js";
import { toggleVisibilityRecords } from "../../redux/visibility/slice.js";
import Modal from "../Modals/Modal/Modal.jsx";
import AcceptModal from "../Modals/AcceptModal/AcceptModal.jsx";

export default function CRMBlock() {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [carToUpdate, setCarToUpdate] = useState(null);

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

  const handleArchiveSuccess = () => {
    dispatch(getRecordsForPeriod(dates));
  };

  const handleDragStart = (e, car_id) => {
    e.dataTransfer.setData("text/plain", car_id);
    console.log("Drag start with ID:", car_id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const itemId = Number(e.dataTransfer.getData("text/plain"));
    console.log("Dropped item ID:", itemId, "New status:", status);
  
    const item = periodRecords.find((item) => item.car_id === itemId);
    console.log("Found item:", item);
  
    if (item) {
      if (item.status === status) {
        console.log("Статус не змінився, запит не відправлено.");
        return;
      }
  
      if (item.status === "complete") {
        // Якщо картка вже в статусі complete
        toast.error(
          "Зміна статусу неможлива, зверніться в технічну підтримку."
        );
        return;
      }
  
      if (status === "complete") {
        setCarToUpdate(item);
        setIsAcceptModalOpen(true);
      } else {
        dispatch(changeCarStatusCRM({ carId: item.car_id, status }))
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
    }
  };
  
  const handleConfirmStatusChange = () => {
    if (carToUpdate) {
      dispatch(changeCarStatusCRM({ carId: carToUpdate.car_id, status: "complete" }))
        .unwrap()
        .then(() => {
          console.log("Car status updated to complete:", carToUpdate);
          dispatch(getRecordsForPeriod(dates));
          setIsAcceptModalOpen(false);
        })
        .catch((error) => {
          console.error("Error confirming status change:", error);
          toast.error("Помилка при підтвердженні зміни статусу.");
        });
    }
  };

  const handleCancelStatusChange = () => {
    setIsAcceptModalOpen(false);
  };

  const getItemsForStatus = (status) => {
    if (status === "diagnostic") {
      return periodRecords.filter(
        (item) => item.status === status || item.status === "view_repair"
      );
    }
    return periodRecords.filter((item) => item.status === status);
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
                  onArchiveSuccess={handleArchiveSuccess}
                />
                {isAcceptModalOpen && (
                  <Modal isOpen={isAcceptModalOpen} onClose={handleCancelStatusChange}>
                    <AcceptModal
                      onConfirm={handleConfirmStatusChange}
                      onCancel={handleCancelStatusChange}
                    />
                  </Modal>
                )}
              </Column>
            );
          })}
        </div>
      </div>
    </div>
  );
}
