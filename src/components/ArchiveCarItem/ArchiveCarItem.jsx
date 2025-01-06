import { useRef, useEffect, useState } from "react";
import styles from "./ArchiveCarItem.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { BsPencil, BsStopwatch } from "react-icons/bs";
import renderStatusInArchive from "../../utils/renderStatusInArchive";
import { FaChevronDown, FaChevronUp, FaRedoAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { format } from "date-fns";
import DotsPopover from "../sharedComponents/DotsPopover/DotsPopover";

const archiveReasons = [
  "Клієнт не приїхав на обслуговування",
  "Клієнт скасував запис",
  "Автомобіль списаний",
];

const serviceReasons = [
  "Доброго дня хочу записатись на діагностику",
  "Необхідна заміна масла",
  "Дефект ходової частини",
];

export default function ArchiveCarItem({ data }) {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isServicePopoverVisible, setServicePopoverVisible] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setPopoverVisible((prevState) => !prevState);
  };

  const toggleServicePopover = () => {
    setServicePopoverVisible((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setPopoverVisible(false);
      setServicePopoverVisible(false);
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

  const { photo_url: photoUrl, plate, date, reason_description, car_id  } = data;
  const carPhoto = photoUrl || absentAutoImg;

  const formatCarNumber = (number) => {
    if (!number) return "";
    return number.replace(/\s+/g, "");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Немає дати";
    return format(new Date(dateString), "dd.MM.yy | HH:mm");
  };

  const handleEdit = () => {
    console.log('Редагувати контакт');
    // Реалізуйте логіку редагування
  };

  const handleRestore = () => {
    console.log('Відновити з архіву');
    // Реалізуйте логіку відновлення
  };

  const options = [
    {
      icon: <BsPencil size={14} />,
      label: 'Редагувати',
      action: handleEdit,
    },
    {
      icon: <FaRedoAlt size={14} />,
      label: 'Відновити',
      action: handleRestore,
    }
  ];

  const archiveReason = archiveReasons[car_id % archiveReasons.length];
  const serviceReason = serviceReasons[car_id % serviceReasons.length];

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
          onClick={handlePopoverClick}
        >
          <button onClick={togglePopover} className={styles.toggleButton}>
            {isPopoverVisible ? <FaChevronUp size={13} color="#fff" /> : <FaChevronDown size={13} color="#fff" />}
          </button>
          <p className={styles.reasonText}>Причина запису на автосервіс</p>

          {isPopoverVisible && (
            <div className={styles.popover}>
              <p className={styles.reasonText}>{serviceReason}</p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.reasonWhy} ${isServicePopoverVisible ? styles.active : ""}`}
        ref={popoverRef}
        onClick={handlePopoverClick}
      >
        <IoIosCloseCircle color="var(--red)" />
        <button onClick={toggleServicePopover} className={styles.toggleButton}>
          {isServicePopoverVisible ? <FaChevronUp size={13} color="#fff" /> : <FaChevronDown size={13} color="#fff" />}
        </button>
        <p className={styles.reasonText}>Причина додавання в архів</p>

        {isServicePopoverVisible && (
          <div className={styles.popover}>
            <p className={styles.reasonText}>{archiveReason}</p>
          </div>
        )}
      </div>
      <DotsPopover options={options} />
    </div>
  );
}
