import { useRef } from "react";
import styles from "./ArchiveCarItem.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { BsPencil, BsStopwatch } from "react-icons/bs";
import renderStatusInArchive from "../../utils/renderStatusInArchive";
import { FaChevronDown, FaChevronUp, FaRedoAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { format } from "date-fns";
import DotsPopover from "../sharedComponents/DotsPopover/DotsPopover";
import { useSelector } from "react-redux";
import { selectVisibilityArchive } from "../../redux/visibility/selectors";

const archiveReasons = [
  "Клієнт не приїхав на обслуговування",
  "Клієнт скасував запис",
  "Автомобіль списаний",
  "Автомобіль викрадений",
  "Клієнт переніс запис",
  "Клієнт не приїхав вчасно",
  "Клієнт створив новий запис",
  "Клієнт змінив плани",
  "Не встигли прийти запчастини",
  "Замовили нові запчаснити",
];

const serviceReasons = [
  "Доброго дня хочу записатись на діагностику",
  "Доброго дня хочу записатись на ремонт",
  "Доброго дня хочу записатись на огляд після ремонту",
  "Необхідна заміна масла",
  "Необхідно перевірити електроніку",
  "Дефект ходової частини",
  "Заміна шин на зимові",
  "Заміна шин на літні",
  "Перевірка ГБО",
  "Ремонт ГБО",
];

export default function ArchiveCarItem({
  data,
  visiblePopovers,
  togglePopover,
}) {
  const visibility = useSelector(selectVisibilityArchive);
  const popoverRef = useRef(null);
  const { photo_url: photoUrl, plate, date, reason_description, id } = data;
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
    console.log("Редагувати контакт");
  };

  const handleRestore = () => {
    console.log("Відновити з архіву");
  };

  const options = [
    {
      icon: <BsPencil size={14} />,
      label: "Редагувати",
      action: handleEdit,
    },
    {
      icon: <FaRedoAlt size={14} />,
      label: "Відновити",
      action: handleRestore,
    },
  ];

  const archiveReason = archiveReasons[id % archiveReasons.length];
  const serviceReason = serviceReasons[id % serviceReasons.length];

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
            <p className={styles.infoName}>Олександр Макаренковчук</p>
          </div>
        )}
      </div>
      <div className={styles.centerContainer}>
        {visibility?.status && (<div>{renderStatusInArchive(reason_description, styles)}</div>)}
        {visibility?.reasonRegistration && (<div
          className={`${styles.reasonWhy} ${
            visiblePopovers[`popover1-${id}`] ? styles.active : ""
          }`}
        >
          <button
            onClick={() => togglePopover("popover1", id)}
            className={styles.toggleButton}
          >
            {visiblePopovers[`popover1-${id}`] ? (
              <FaChevronUp size={13} color="#fff" />
            ) : (
              <FaChevronDown size={13} color="#fff" />
            )}
          </button>
          <p className={styles.reasonText}>Причина запису на автосервіс</p>

          {visiblePopovers[`popover1-${id}`] && (
            <div ref={popoverRef} className={styles.popover}>
              <p className={styles.reasonText}>{serviceReason}</p>
            </div>
          )}
        </div>)}
      </div>
      {visibility?.reasonArchived &&(<div
        className={`${styles.reasonWhy} ${
          visiblePopovers[`popover2-${id}`] ? styles.active : ""
        }`}
      >
        <IoIosCloseCircle color="var(--red)" />
        <button
          onClick={() => togglePopover("popover2", id)}
          className={styles.toggleButton}
        >
          {visiblePopovers[`popover2-${id}`] ? (
            <FaChevronUp size={13} color="#fff" />
          ) : (
            <FaChevronDown size={13} color="#fff" />
          )}
        </button>
        <p className={styles.reasonText}>Причина додавання в архів</p>

        {visiblePopovers[`popover2-${id}`] && (
          <div ref={popoverRef} className={styles.popover}>
            <p className={styles.reasonText}>{archiveReason}</p>
          </div>
        )}
      </div>)}
      <DotsPopover
        options={options}
        isVisible={visiblePopovers[`popover3-${id}`]}
        togglePopover={() => togglePopover("popover3", id)}
      />
    </div>
  );
}
