import { useRef, useEffect, useState } from "react";
import styles from "./ArchiveCarItem.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { BsStopwatch } from "react-icons/bs";
import renderStatusInArchive from "../../utils/renderStatusInArchive";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { format } from "date-fns";

export default function ArchiveCarItem({ data }) {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setPopoverVisible((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handlePopoverClick = (event) => {
    event.stopPropagation();
  };

  const { photo_url: photoUrl, plate, date, reason_description } = data;
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
        <div className={styles.carWrapper}>
          <p className={styles.carNumber}>
            {plate ? formatCarNumber(plate) : "хххххх"}
          </p>
        </div>
        <div className={styles.timeWork}>
          <BsStopwatch size={13} color="#D5ACF3" />
          <p className={styles.time}>{formatDate(date)}</p>
        </div>
        <div>
          <p className={styles.infoName}>Олександр Макаренковчук</p>
        </div>
      </div>
      <div className={styles.centerContainer}>
        <div>{renderStatusInArchive(reason_description, styles)}</div>
        <div
          className={`${styles.reasonWhy} ${isPopoverVisible ? styles.active : ""}`}
          ref={popoverRef}
          onClick={handlePopoverClick} // Зупиняємо поширення події
        >
          <button onClick={togglePopover} className={styles.toggleButton}>
            {isPopoverVisible ? (
              <FaChevronUp size={13} color="#fff" />
            ) : (
              <FaChevronDown size={13} color="#fff" />
            )}
          </button>
          <p className={styles.reasonText}>Причина запису на автосервіс</p>

          {isPopoverVisible && (
            <div className={styles.popover}>
              <p className={styles.reasonText}>
                Доброго дня хочу записатись на діагностику
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.reason}>
        <IoIosCloseCircle color="var(--red)" />
        <FaChevronDown size={13} />
        <p className={styles.reasonText}>Причина додавання в архів</p>
      </div>
      <div className={styles.btn}>
        <IoEllipsisVertical />
      </div>
    </div>
  );
}
