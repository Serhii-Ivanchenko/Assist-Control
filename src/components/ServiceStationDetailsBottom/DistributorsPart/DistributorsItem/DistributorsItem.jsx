import { useMemo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSupplierStatus } from "../../../../redux/settings/operations.js";
import SwitchableBtns from "../../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";
import RatingStars from "../../../sharedComponents/RatingStars/RatingStars.jsx";
import OptionList from "./OptionList/OptionsList.jsx";
import DistributorsModal from "../DistributorsModal/DistributorsModal.jsx";
import Modal from "../../../Modals/Modal/Modal.jsx";
import styles from "./DistributorsItem.module.css";
import toast from "react-hot-toast";

function DistributorsItem({ item, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const handleStatusToggle = useCallback((id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    dispatch(updateSupplierStatus({ supplier_id: id, newStatus }))
      .unwrap()
      .then(() => {
        toast.success("Статус успішно змінено :)", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
  });

  // function formatPhoneNumber(phone) {
  //   const cleaned = phone.replace(/\D/g, "");
  //   if (cleaned.length !== 12) return phone;

  //   const match = cleaned.match(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/);
  //   if (match) {
  //     return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
  //   }

  //   return phone;
  // }
  const statusButton = useMemo(
    () => (
      <SwitchableBtns
        isDisabled={item.status}
        onEdit={() => onEdit(item)}
        onDelete={() => onDelete(item)}
        onToggleDisable={() => handleStatusToggle(item.id, item.status)}
      />
    ),
    [handleStatusToggle, item, onDelete, onEdit]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img src={item.logo || null} alt="" />
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
            {/* {formatPhoneNumber(item.managerPhone)} */}
            {item.managerPhone}
          </a>
          <p className={styles.subText}>{item.managerName}</p>
        </div>
      </div>
      <div className={styles.btnsContainer}>{statusButton}</div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
          <DistributorsModal
            onClose={closeModalHandler}
            distributorData={item}
            onToggleDisable={() => handleStatusToggle(item.id, item.status)}
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsItem;
