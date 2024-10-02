import ReactModal from "react-modal";
import css from "./Modal.module.css";
import { useEffect } from "react";
import clsx from "clsx";

export default function Modal({
  isOpen,
  onClose,
  children,
  isSettingsModalOpen,
}) {
  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <ReactModal
      className={clsx(
        css.modal,
        isSettingsModalOpen && css.isSettingsModalOpen
      )}
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