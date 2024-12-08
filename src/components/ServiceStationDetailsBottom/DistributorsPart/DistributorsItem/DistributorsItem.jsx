import SwitchableBtns from "../../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";
import RatingStars from "../../../sharedComponents/RatingStars/RatingStars.jsx";
import OptionList from "./OptionList/OptionsList.jsx";

import styles from "./DistributorsItem.module.css";
import { useState } from "react";
import DistributorsModal from "../DistributorsModal/DistributorsModal.jsx";
import Modal from "../../../Modals/Modal/Modal.jsx";

function DistributorsItem({ item, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 12) return phone;

    const match = cleaned.match(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
    }

    return phone;
  }

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
            {formatPhoneNumber(item.managerPhone)}
          </a>
          <p className={styles.subText}>{item.managerName}</p>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <SwitchableBtns
          isDisabled={item.isDisabled}
          onEdit={() => openModal()}
          onDelete={() => onDelete(item.id)}
          onToggleDisable={() =>
            onEdit(item.id, { isDisabled: !item.isDisabled })
          }
        />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DistributorsModal
            onClose={closeModal}
            distributorData={item}
            onToggleDisable={(newStatus) =>
              onEdit(item.id, { isDisabled: newStatus })
            }
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsItem;
