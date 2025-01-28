import ModalWrapper from "../../ModalWrapper/ModalWrapper.jsx";
import css from "./PhoneModal.module.css";

 const formatPhoneNumber = (number) => {
    return number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
  };

const PhoneModal = ({ isOpen, onClose, phoneNumbers, onPhoneSelect, triggerRef }) => {

 if (!isOpen) return null;


  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
      <div className={css.phoneModal} >
        {phoneNumbers.map((phone, index) => (
          <div
            key={index}
            className={css.phoneItem}
            onClick={() => {
              onPhoneSelect(phone);
              onClose();
            }}
          >
           {formatPhoneNumber(phone)}
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default PhoneModal;