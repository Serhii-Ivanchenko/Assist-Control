import  { useEffect, useRef } from "react";
// import css from "./ModalWrapper.module.css";

const ModalWrapper = ({ isOpen, onClose, children , triggerRef}) => {
  const wrapperRef = useRef(null);

  // const handleClickOutside = (event) => {
  //   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //     onClose(); // Закрытие модалки
  //   }
  // };

   const handleClickOutside = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      (!triggerRef || !triggerRef.current.contains(event.target))
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

  return (
    <div >
      <div ref={wrapperRef} >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;