import SwitchableBtns from "../../../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";
import RatingStars from "../../../../sharedComponents/RatingStars/RatingStars";
import OptionList from "../OptionsList";

import styles from "./DistributorsItem.module.css";

function DistributorsItem({ item, onEdit, onDelete }) {
  const handleToggleDisable = () => {
    onEdit(item.id, { isDisabled: !item.isDisabled });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img src={item.logo} alt={item.name} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.nameContainer}>
          <h3 className={styles.mainText}>{item.name}</h3>
          <p className={styles.subText}>{item.country}</p>
        </div>
        <OptionList />
      </div>
      <div className={styles.ratingContainer}>
        <RatingStars rating={item.rating} className={styles.rating} />
        <div className={styles.contactsContainer}>
          <a className={styles.phone} href={`tel:${item.managerPhone}`}>
            {item.managerPhone}
          </a>
          <p className={styles.subText}>{item.managerName}</p>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <SwitchableBtns
          isDisabled={item.isDisabled}
          onEdit={() => console.log("Редагування модалки")}
          onDelete={() => onDelete(item.id)}
          onToggleDisable={handleToggleDisable}
        />
      </div>
    </div>
  );
}

export default DistributorsItem;
