import styles from "./RecievedPartsPopup.module.css";
import { useEffect, useState } from "react";
import ReceivedPartsModal from "../../../../../Accounting/ReceivedPartsModal/ReceivedPartsModal";
import Modal from "../../../../../Modals/Modal/Modal";

export default function RecievedPartsPopup({
  isOpen,
  onClose,
  buttonRef,
  popupRef,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    console.log("RecievedPartsPopup mounted", isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.wrapper} ref={popupRef}>
      <ul className={styles.popup}>
        <li onClick={() => setIsModalOpen(true)}>Накладна 1</li>
        <li onClick={() => setIsModalOpen(true)}>Накладна 2</li>
        <li onClick={() => setIsModalOpen(true)}>Накладна 3</li>
        <li onClick={() => setIsModalOpen(true)}>Накладна 4</li>
      </ul>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ReceivedPartsModal onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
