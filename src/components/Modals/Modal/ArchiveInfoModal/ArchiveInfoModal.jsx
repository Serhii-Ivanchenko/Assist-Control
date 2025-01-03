import styles from "./ArchiveInfoModal.module.css";

import { MdClose } from "react-icons/md";

import ArchiveList from "../../../ArchiveList/ArchiveList.jsx";
import toast from "react-hot-toast";
import { getAllArchiveData } from "../../../../redux/archive/operations.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectArchiveData } from "../../../../redux/archive/selectors.js";
import { useDispatch } from "react-redux";
import { selectSelectedServiceId } from "../../../../redux/auth/selectors.js";
import CarsSearch from "../../../sharedComponents/CarsSearch/CarsSearch.jsx";
import {
  filterCarsBySearchTerm,
  validateSearchTerm,
} from "../../../../utils/filterCarsBySearchTerm.js";
import StatusFilter from "../../../sharedComponents/StatusFilter/StatusFilter.jsx";
import renderStatusInArchive from "../../../../utils/renderStatusInArchive.jsx";
import {
  labelNamesInArchive,
  statusesArchive,
} from "../../../../utils/dataToRender.js";
import CalendarPeriodSelector from "../../../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";
import DownloadPdfButtonModalCar from "../../../sharedComponents/Pdf/DownloadPdfButtonModalCar/DownloadPdfButtonModalCar.jsx";
import InfoSettingsVisibility from "../../../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility.jsx";
import { selectVisibilityArchive } from "../../../../redux/visibility/selectors.js";
import { toggleVisibilityArchive } from "../../../../redux/visibility/slice.js";

export default function ArchiveInfoModal({ onClose }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const carsDataArchive = useSelector(selectArchiveData);
  const selectedServiceId = useSelector(selectSelectedServiceId);

  const [periodStartData, setPeriodStartData] = useState(null);

  useEffect(() => {
    if (!selectedServiceId) {
      console.warn("Service ID is not available yet. Skipping fetch.");
      return;
    }

    dispatch(getAllArchiveData())
      .unwrap()
      .then((data) => {
        console.log("Data fetched:", data);
      })
      .catch(() => {
        toast.error("Щось пішло не так. Будь ласка, спробуйте ще раз.");
      });
  }, [dispatch, selectedServiceId]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleSearch = (term) => {
    validateSearchTerm(term, setInputError, setSearchTerm);
  };

  const getStatusesForFilter = () => {
    return statusesArchive.map((status) => ({
      status: status.reason_description,
      label: status.label,
    }));
  };

  const filteredCars = () => {
    let filtered = filterCarsBySearchTerm(carsDataArchive, searchTerm);

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (car) => car.reason_description === selectedStatus
      );
    }

    return filtered;
  };

  // Функція обробки зміни початкової дати
  const handleInputChangeBeg = (date) => {
    setPeriodStartData(date);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.closeButton} onClick={onClose}>
        <MdClose className={styles.iconClose} />
      </button>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <CarsSearch
            value={searchTerm}
            onChange={handleSearch}
            error={inputError}
          />
        </div>
        <div className={styles.rightHeader}>
          <StatusFilter
            onStatusChange={handleStatusChange}
            renderStatus={(reason_description) =>
              renderStatusInArchive(reason_description, styles)
            }
            statuses={getStatusesForFilter()}
            dropdownStyle={{ width: "185px", left: "0" }}
          />
          <CalendarPeriodSelector
            periodStartData={periodStartData}
            handleInputChangeBeg={handleInputChangeBeg}
            isSingle={true}
          />
          <DownloadPdfButtonModalCar carsData={filteredCars()} />
          <InfoSettingsVisibility
            selectVisibility={selectVisibilityArchive}
            toggleVisibilityAction={toggleVisibilityArchive}
            labelNames={labelNamesInArchive}
            className={styles.customPosition}
          />
        </div>
      </div>
      <div>
        <ArchiveList carsDataArchive={filteredCars()} />
      </div>
    </div>
  );
}
