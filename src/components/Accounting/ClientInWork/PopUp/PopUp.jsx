import clsx from "clsx";
import ModalWrapper from "../../../Chat/RightSection/ModalWrapper/ModalWrapper.jsx";
import css from "./PopUp.module.css";

const PopUp = ({
  isOpen,
  onClose,
  service,
  activeService,
  onSelect,
  triggerRef,
}) => {
  const firstObjectKeys = Object.keys(service[0]);
  const firstKey = firstObjectKeys[0]; // Первый ключ
  const secondKey = firstObjectKeys[1]; // Второй ключ

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
      <div className={css.dataSelector}>
        {service.map((service) => (
          <div
            className={clsx(css.service, {
              [css.serviceActive]:
                service[firstKey] === activeService[firstKey],
            })}
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
