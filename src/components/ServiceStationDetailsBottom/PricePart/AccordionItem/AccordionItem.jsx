import { useRef, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../../../sharedComponents/PopupMenu/PopupMenu";
import styles from "./AccordionItem.module.css";
import ServiceItem from "./ServiceItem/ServiceItem";
import Modal from "../../../Modals/Modal/Modal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
// import addIdsToData from "../../../../utils/addIdsToData";

function AccordionItem({ item, index }) {
  const [isEdit, setIsEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  // const [currentCategory, setCurrentCategory] = useState(item.category);
  // const [currentServices, setCurrentServices] = useState(item);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   console.log("отримую в AccordionItem", item);
  // }, [item]);

  const buttonRef = useRef(null);
  // const innerAccRef = useRef(null);

  const handleChange = () => {
    console.log("handleChange");
    setExpanded((prev) => !prev);
  };

  const handleCategoryPopupToggle = (e) => {
    e.stopPropagation();
    console.log("handleCategoryPopupToggle");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Прокрутка до ост. елементу при додаванні
  // const prevDataLengthRef = useRef(currentServices.length); // Зберігаємо попередню довжину даних

  // useEffect(() => {
  //   if (
  //     currentServices.length > prevDataLengthRef.current && // Перевіряємо, чи додано новий елемент
  //     innerAccRef.current
  //   ) {
  //     innerAccRef.current.scrollTo({
  //       top: innerAccRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  //   // Оновлюємо попередню довжину після виконання ефекту
  //   prevDataLengthRef.current = currentServices.length;
  // }, [currentServices]);

  return (
    <div className={styles.wrapper}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--white)",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          sx={{ background: "var(--bg-input)" }}
          className={styles.accordionTitle}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <div className={styles.titleContent}>
            {isEdit ? (
              <input
                type="text"
                value={item.category_name}
                // onChange={handleCategoryUpdate}
                autoFocus
                className={styles.editInput}
              />
            ) : (
              <p>{item.category_name}</p>
            )}
            {expanded ? (
              <TiArrowSortedUp className={styles.icon} />
            ) : (
              <TiArrowSortedDown className={styles.icon} />
            )}
            <div
              ref={buttonRef}
              className={styles.btn}
              onClick={handleCategoryPopupToggle}
            >
              <BsThreeDotsVertical className={styles.dotsIcon} />
              <div className={styles.popupContainer}>
                <PopupMenu
                // isOpen={isCategoryPopupOpen}
                // onClose={handleCategoryPopupClose}
                // onEdit={handleCategoryEdit}
                // onAdd={handleAddService}
                // buttonRef={buttonRef}
                // containerRef={containerRef}
                // innerAccRef={innerAccRef}
                />
                {isModalOpen && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Modal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      shouldCloseOnOverlayClick={false}
                    >
                      <AddCategoryModal
                        onClose={closeModal}
                        title="Введіть назву послуги"
                        name="newService"
                        // addNewCategory={handleNewService}
                      />
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 12px 0 12px" }}>
          <ul className={styles.accordionDesc}>
            {Array.isArray(item.services) ? (
              item.services.map((service, index) => (
                <li key={index}>
                  <ServiceItem id={service.id} serviceData={service} />
                </li>
              ))
            ) : (
              <p>Немає послуг</p>
            )}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionItem;
