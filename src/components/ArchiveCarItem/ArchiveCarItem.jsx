import styles from "./ArchiveCarItem.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { renderTimeArchive } from "../../utils/renderTime";
import { BsStopwatch } from "react-icons/bs";
import renderStatusInArchive from "../../utils/renderStatusInArchive";
import { FaChevronDown } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ArchiveCarItem({ data }) {
  const {
    photo_url: photoUrl,
    plate,
    date_e,
    date_s,
    reason_description,
  } = data;
  const carPhoto = photoUrl || absentAutoImg;

  const formatCarNumber = (number) => {
    if (!number) return "";
    return number.replace(/\s+/g, "");
  };

  return (
    <div className={styles.archiveContainer}>
      <div className={styles.leftContsiner}>
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
        <p className={styles.carNumber}>
          {plate ? formatCarNumber(plate) : "хххххх"}
        </p>
        <div className={styles.timeWork}>
          <BsStopwatch size={13} color="#D5ACF3" />
          <p className={styles.time}>{renderTimeArchive(date_e, date_s)}</p>
        </div>
        <div>
          <p className={styles.infoName}>Гість</p>
        </div>
      </div>
      <div className={styles.centerContsiner}>
        <div>{renderStatusInArchive(reason_description, styles)}</div>
        <div className={styles.reason}>
          <FaChevronDown size={13} />
          <p className={styles.reasonText}>Причина запису на автосервіс</p>
        </div>
      </div>
      <div className={styles.reason}>
        <IoIosCloseCircle color="var(--red)"/>
        <FaChevronDown size={13} />
        <p className={styles.reasonText}>Причина додавання в архів</p>
      </div>
      <div><IoEllipsisVertical /></div>
    </div>
  );
}
