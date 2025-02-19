import styles from "./RecievedPartsPopup.module.css";
import { useState } from "react";
import ReceivedPartsModal from "../../../../../Accounting/ReceivedPartsModal/ReceivedPartsModal";
import Modal from "../../../../../Modals/Modal/Modal";

export default function RecievedPartsPopup({ isOpen, onClose, popupRef }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (popupRef?.current && !popupRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   }

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen, onClose, popupRef]);

  if (!isOpen) return null;

  const handleModalOpen = () => {
    setIsModalOpen(true);
    if (isModalOpen) onClose();
  };

  return (
    <div className={styles.wrapper} ref={popupRef}>
      <ul className={styles.popup}>
        <li onClick={handleModalOpen}>Накладна 1</li>
        <li onClick={handleModalOpen}>Накладна 2</li>
        <li onClick={handleModalOpen}>Накладна 3</li>
        <li onClick={handleModalOpen}>Накладна 4</li>
      </ul>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ReceivedPartsModal onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
