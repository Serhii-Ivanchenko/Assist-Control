import styles from "./EnterpriseInfo.module.css";
import { BsWrench } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";

export default function EnterpriseInfo() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.date}>03.02.2025</p>
      <div className={styles.infoBox}>
        <div className={styles.infoKey}>
          <BsWrench className={styles.icon} size={18} />
          <p className={styles.key}>Механік:</p>
        </div>
        <p className={styles.infoName}>Шевченко А.В.</p>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoKey}>
          <BsPersonLinesFill className={styles.icon} size={18} />
          <p className={styles.key}>Менеджер:</p>
        </div>
        <p className={styles.infoName}>Олег А.В.</p>
      </div>
      <div className={styles.selectBox}>
        <div className={styles.selectWrapper}>
          <select onClick={(e) => e.stopPropagation()}>
            <option>ФОП Блудов</option>
            <option>ФОП Блудов</option>
            <option>ФОП Блудов</option>
          </select>
          <TiArrowSortedDown className={styles.arrowIcon} />
        </div>

        <div className={styles.selectWrapper}>
          <select onClick={(e) => e.stopPropagation()}>
            <option>Каса 1</option>
            <option>Каса 2</option>
            <option>Каса 3</option>
          </select>
          <TiArrowSortedDown className={styles.arrowIcon} />
        </div>
      </div>
    </div>
  );
}
