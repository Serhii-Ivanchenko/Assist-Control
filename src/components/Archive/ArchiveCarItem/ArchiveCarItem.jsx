import { format } from "date-fns";
import styles from "./ArchiveCarItem.module.css";
import absentAutoImg from "../../../assets/images/absentAutoImg.webp";
import { BsStopwatch } from "react-icons/bs";
import renderStatusInArchive from "../../../utils/renderStatusInArchive";
import { useSelector } from "react-redux";

import { selectVisibilityArchive } from "../../../redux/visibility/selectors";
import ServiceReasonPopover from "../PopoversInArchive/ServiceReasonPopover/ServiceReasonPopover";
import ArchiveReasonPopover from "../PopoversInArchive/ArchiveReasonPopover/ArchiveReasonPopover";
import { selectArchiveData } from "../../../redux/archive/selectors";
import { useEffect, useRef, useState } from "react";
import Modal from "../../Modals/Modal/Modal";
import DotsPopover from "../PopoversInArchive/DotsPopover/DotsPopover";
import { StatusPopover } from "../../sharedComponents/StatusPopover/StatusPopover";
import { statusesArchiveEdit } from "../../../utils/dataToRender";
import { useDispatch } from "react-redux";
import { getAllArchiveData, updateArchiveItem } from "../../../redux/archive/operations";
import SelectStatusModal from "../SelectStatusModal/SelectStatusModal";

export default function ArchiveCarItem({ id, visiblePopovers, togglePopover }) {
  const carsData = useSelector(selectArchiveData);
  const dispatch = useDispatch();
  const statusPopoverRef = useRef(null);
  const visibility = useSelector(selectVisibilityArchive);
  const [isDotsPopoverOpen, setIsDotsPopoverOpen] = useState(false);
  const [isStatusPopoverVisible, setIsStatusPopoverVisible] = useState(false);

  const openDotsPopover = () => setIsDotsPopoverOpen(true);
  const closeDotsPopover = () => setIsDotsPopoverOpen(false);

  const handleClickOutside = (event) => {
    if (statusPopoverRef.current && !statusPopoverRef.current.contains(event.target)) {
      setIsStatusPopoverVisible(false);
    }
  };

  useEffect(() => {
    if (isStatusPopoverVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStatusPopoverVisible]);

  const handleEditClick = () => {
    setIsStatusPopoverVisible(true);
    closeDotsPopover();
  };

  const getStatusesForFilter = () => {
    return statusesArchiveEdit
      .filter((status) => status.reason_description !== reason_description)
      .map((status) => ({
        status: status.reason_description,
        label: status.label,
      }));
  };
  const carData = carsData?.find((car) => car.id === id);

  if (!carData) return null;
  const {
    photo_url: photoUrl,
    plate,
    date,
    reason_description,
    name,
  } = carData;
  const carPhoto = photoUrl || absentAutoImg;

  const formatCarNumber = (number) => {
    if (!number) return "";
    return number.replace(/\s+/g, "");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Немає дати";
    return format(new Date(dateString), "dd.MM.yy | HH:mm");
  };



  const handleStatusChange = async (newStatus) => {
    const foundStatus = statusesArchiveEdit.find(
      (status) => status.reason_description === newStatus
    );
  
    const reasonAddNumber = foundStatus && foundStatus.reason_add ? Number(foundStatus.reason_add) : null;
  
    const data = {
      archive_id: id,
      reason_add: reasonAddNumber,
    };
  
    try {
      await dispatch(updateArchiveItem(data)).unwrap();
      await dispatch(getAllArchiveData()).unwrap();
    } catch (error) {
      console.error("Помилка оновлення статусу:", error);
    } finally {
      setIsStatusPopoverVisible(false);
    }
  };
  
  return (
    <div className={styles.archiveContainer}>
      <div className={styles.leftContainer}>
        {visibility?.photo && (
          <div className={styles.carPhoto}>
            <img
              className={styles.carImg}
              src={carPhoto}
              alt="Car"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = absentAutoImg;
              }}
            />
          </div>
        )}
        {visibility?.carNum && (
          <div className={styles.carWrapper}>
            <p className={styles.carNumber}>
              {plate ? formatCarNumber(plate) : "хххххх"}
            </p>
          </div>
        )}
        {visibility?.time && (
          <div className={styles.timeWork}>
            <BsStopwatch size={13} color="#D5ACF3" />
            <p className={styles.time}>{formatDate(date)}</p>
          </div>
        )}
        {visibility?.name && (
          <div>
            <p className={styles.infoName}>{name || "Гість"}</p>
          </div>
        )}
      </div>
      <div className={styles.centerContainer}>
        {visibility?.status && (
          <div className={styles.statusPopoverContainer} ref={statusPopoverRef}>
            <div>
              {renderStatusInArchive(reason_description, styles)}
            </div>
            {isStatusPopoverVisible && (
              <div className={styles.statusPopoverDropdown}>
                <StatusPopover
                  renderStatus={(reason_description) =>
                    renderStatusInArchive(reason_description, styles)
                  }
                  statuses={getStatusesForFilter()}
                  dropdownStyle={{ width: "185px"}}
                  onStatusSelect={handleStatusChange}                />
              </div>
            )}
          </div>
        )}

        {visibility?.reasonRegistration && (
          <ServiceReasonPopover
            visible={visiblePopovers[`popover1-${id}`]}
            togglePopover={togglePopover}
            id={id}
          />
        )}
      </div>
      {visibility?.reasonArchived && (
        <ArchiveReasonPopover
          visible={visiblePopovers[`popover2-${id}`]}
          togglePopover={togglePopover}
          id={id}
        />
      )}
      <DotsPopover
        isVisible={visiblePopovers[`popover3-${id}`]}
        togglePopover={() => togglePopover("popover3", id)}
        onRestore={openDotsPopover}
        onEdit={handleEditClick}
      />
      <Modal isOpen={isDotsPopoverOpen} onClose={closeDotsPopover}>
        <SelectStatusModal onClose={closeDotsPopover} id={id} />
      </Modal>
    </div>
  );
}
