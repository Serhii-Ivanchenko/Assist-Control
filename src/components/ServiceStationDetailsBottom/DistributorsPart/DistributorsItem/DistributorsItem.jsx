import { useEffect, useState } from "react";
import SwitchableBtns from "../../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";
import RatingStars from "../../../sharedComponents/RatingStars/RatingStars.jsx";
import OptionList from "./OptionList/OptionsList.jsx";
import DistributorsModal from "../DistributorsModal/DistributorsModal.jsx";
import Modal from "../../../Modals/Modal/Modal.jsx";
import defLogo from "../../../../assets/images/distrImg.png";
import styles from "./DistributorsItem.module.css";
import { useDispatch } from "react-redux";
import {
  deleteSupplier,
  updateSupplierStatus,
} from "../../../../redux/settings/operations.js";
import { getSupplierData } from "../../../../redux/settings/operations.js";

function DistributorsItem({ item, onDelete, updateDistributors }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [status, setStatus] = useState(item.status);
  const [currentDistributor, setCurrentDistributor] = useState(null);

  useEffect(() => {
    const getCurrentSupplier = async () => {
      try {
        const response = await dispatch(getSupplierData(item.id));
        console.log("current distributor:", response.payload.data);
        setCurrentDistributor(response.payload.data);
      } catch (error) {
        console.error("error fetching current distributor", error);
      }
    };
    getCurrentSupplier();
  }, [dispatch, item.id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (updatedDistributor) => {
    setIsModalOpen(false);
    if (updatedDistributor) {
      updateDistributors(updatedDistributor);
    }
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteSupplier(item.id));
      onDelete(item.id);
    } catch (err) {
      console.log("error:", err);
    }
  };

  const handleToggleStatus = async () => {
    try {
      const newStatus = !status;
      await dispatch(
        updateSupplierStatus({
          supplierId: item.id,
          isDisabled: newStatus,
        })
      );
      setStatus(newStatus);
    } catch (err) {
      console.log("error:", err);
    }
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
        <img
          src={imgError || !item.logo ? defLogo : item.logo}
          alt="logo"
          onError={handleImageError}
        />
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
          isDisabled={status}
          onEdit={() => openModal()}
          onDelete={handleDelete}
          onToggleDisable={handleToggleStatus}
        />
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => closeModal(currentDistributor)}
        >
          <DistributorsModal
            onClose={() => closeModal(currentDistributor)}
            distributorData={currentDistributor}
            onToggleDisable={handleToggleStatus}
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsItem;
