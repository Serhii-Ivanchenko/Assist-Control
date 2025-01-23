import ModalWrapper from "../../ModalWrapper/ModalWrapper.jsx"; // Используем общий компонент ModalWrapper
import css from "./ActionModal.module.css";

const ActionModal = ({ isOpen, onClose, actions, onActionSelect, triggerRef }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
      <div className={css.modal}>
        {actions.map((action) => (
          <div
            className={css.modalitem}
            key={action.id}
            onClick={() => {
              onActionSelect(action.action); // Передаем выбранное действие
              onClose(); // Закрываем модалку
            }}
          >
            {action.fullname}
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default ActionModal;