import clsx from "clsx";
import ModalWrapper from "../../../Chat/RightSection/ModalWrapper/ModalWrapper.jsx"; 
import css from "./PopUp.module.css";

const PopUp = ({ isOpen, onClose, service, activeService, onSelect, triggerRef, top, left, width, bckgr }) => {
const firstObjectKeys = Object.keys(service[0]); 
const firstKey = firstObjectKeys[0]; // Первый ключ
const secondKey = firstObjectKeys[1]; // Второй ключ


  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
      <div className={css.dataSelector} style={{top: top, left: left, width: width}}>
        {service.map((service) => (
          <div
            className={clsx(css.service, {
              [css.serviceActive]: service[firstKey] === activeService[firstKey],
            })}
                style={{
                     width:  width  ,
    backgroundColor: service[firstKey] === activeService[firstKey] ?  bckgr : "" 
  }}
            key={service[firstKey]}
            onClick={() => {
              onSelect(service); // Передаем выбранную в родительский компонент
              onClose(); 
            }}
          >
            {service[secondKey]}
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default PopUp;