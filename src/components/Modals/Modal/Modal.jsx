import ReactModal from "react-modal";
import css from "./Modal.module.css";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
}) {
  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <ReactModal
      className={css.modal}
      overlayClassName={css.overlay}
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      onRequestClose={onClose}
      bodyOpenClassName="modal-open"
    >
      <>{children}</>
    </ReactModal>
  );
}
