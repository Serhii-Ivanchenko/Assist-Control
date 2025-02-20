import styles from "./RecievedPartsPopup.module.css";
import { useEffect, useRef } from "react";
import ReceivedPartsModal from "../../../../../Accounting/ReceivedPartsModal/ReceivedPartsModal";

export default function RecievedPartsPopup({
  isOpen,
  onClose,
  buttonRef,
  setModalContent,
  setIsModalOpen,
}) {
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
    setIsModalOpen(true);
    setModalContent(
      <ReceivedPartsModal
        onClose={() => setIsModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
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
    </div>
  );
}
