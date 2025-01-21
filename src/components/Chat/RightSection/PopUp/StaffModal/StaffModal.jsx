import ModalWrapper from "../../ModalWrapper/ModalWrapper.jsx";
import css from "./StaffModal.module.css";

const StaffModal = ({ isOpen, onClose, staffs, onStaffSelect,  triggerRef,offsetLeft = 0 }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
      <div
        className={css.staffModal}
        style={{ left: offsetLeft }} // Используем отступ слева
      >
        {staffs.map((item) => (
          <div
            key={item.id}
            className={css.modalItemStaff}
            onClick={() => {
              onStaffSelect(item); // Выбор сотрудника
              onClose(); // Закрытие модалки
            }}
          >
            <div className={css.iconWrapper}>
              <img
                className={css.managerAvatar}
                src={item.avatar || "/default-avatar.png"}
                alt={item.name}
              />
              <span
                className={css.notificationBubble}
                style={{
                  backgroundColor: item.isActive ? "var(--green)" : "var(--input-text)",
                }}
              ></span>
            </div>
            <div className={css.modalStaffBox}>
              <div className={css.staffName}>{item.name}</div>
              <div className={css.staffEmail}>{item.email}</div>
            </div>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default StaffModal;