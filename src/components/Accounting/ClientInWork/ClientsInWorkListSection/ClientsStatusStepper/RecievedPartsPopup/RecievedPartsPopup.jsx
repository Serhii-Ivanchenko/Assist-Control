import styles from "./RecievedPartsPopup.module.css";
import { useEffect, useRef, useState } from "react";
import ReceivedPartsModal from "../../../../../Accounting/ReceivedPartsModal/ReceivedPartsModal";
import Modal from "../../../../../Modals/Modal/Modal";

export default function RecievedPartsPopup({
  isOpen,
  onClose,
  buttonRef,
  setModalContent,
  setIsModalOpen,
}) {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const popupRef = useRef(null);

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

  if (!isOpen) return null;

  const handleModalOpen = () => {
    // setIsModalOpen(true);
    // if (isModalOpen) onClose();
    setIsModalOpen(true);
    setModalContent(
      <ReceivedPartsModal onClose={() => setIsModalOpen(false)} />
    );
  };

  return (
    <div className={styles.wrapper} ref={popupRef}>
      <ul className={styles.popup}>
        <li onClick={handleModalOpen}>Накладна 1</li>
        <li onClick={handleModalOpen}>Накладна 2</li>
        <li onClick={handleModalOpen}>Накладна 3</li>
        <li onClick={handleModalOpen}>Накладна 4</li>
      </ul>

      {/* {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ReceivedPartsModal onClose={() => setIsModalOpen(false)} />
        </Modal>
      )} */}
    </div>
  );
}
