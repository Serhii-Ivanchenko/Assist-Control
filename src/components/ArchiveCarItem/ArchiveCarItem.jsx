import { format } from "date-fns";
import styles from "./ArchiveCarItem.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { BsStopwatch } from "react-icons/bs";
import renderStatusInArchive from "../../utils/renderStatusInArchive";
import { useSelector } from "react-redux";

import { selectVisibilityArchive } from "../../redux/visibility/selectors";
import DotsPopover from "./PopoversInArchive/DotsPopover/DotsPopover";
import ServiceReasonPopover from "./PopoversInArchive/ServiceReasonPopover/ServiceReasonPopover";
import ArchiveReasonPopover from "./PopoversInArchive/ArchiveReasonPopover/ArchiveReasonPopover";
import { selectArchiveData } from "../../redux/archive/selectors";
import { useState } from "react";
import Modal from "../Modals/Modal/Modal";
import SelectStatusModal from "../sharedComponents/SelectStatusModal/SelectStatusModal";

export default function ArchiveCarItem({ id, visiblePopovers, togglePopover }) {
  const carsData = useSelector(selectArchiveData);
  const visibility = useSelector(selectVisibilityArchive);
  const [isDotsPopoverOpen, setisDotsPopoverOpen] = useState(false);

  const openDotsPopoverOpen = () => setisDotsPopoverOpen(true);
  const closeDotsPopoverOpen = () => setisDotsPopoverOpen(false);

  const carData = carsData?.find((car) => car.id === id);

  if (!carData) return null;
  const {
    photo_url: photoUrl,
    plate,
    date,
    reason_description,
    name
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
          <div>{renderStatusInArchive(reason_description, styles)}</div>
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
        onRestore={openDotsPopoverOpen}
      />
      <Modal isOpen={isDotsPopoverOpen} onClose={closeDotsPopoverOpen}>
        <SelectStatusModal onClose={closeDotsPopoverOpen}  id={id}/>
      </Modal>
    </div>
  );
}
