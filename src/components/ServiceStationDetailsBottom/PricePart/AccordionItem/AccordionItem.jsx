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

function AccordionItem({
  item,
  id,
  // onDelete,
  // setLocalChanges,
  containerRef,
  // resetPrice,
  // resetService,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(item.category_name);
  const [currentServices, setCurrentServices] = useState(item.services);
  // const [serviceItemEdit, setServiceItemEdit] = useState(null);

  const buttonRef = useRef(null);
  const innerAccRef = useRef(null);

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  const handleCategoryPopupToggle = (e) => {
    e.stopPropagation();
    setIsCategoryPopupOpen((prev) => !prev);
  };

  const handleNewService = (newServiceName) => {
    const newItem = {
      service_id: currentServices.length + 1,
      service_name: newServiceName,
      min_price: null,
      max_price: null,
      created_at: new Date().toISOString(),
    };

    setCurrentServices((prevServices) => [...prevServices, newItem]);
  };

  // const handleUpdateService = (updatedService) => {
  //   setCurrentServices((prevServices) =>
  //     prevServices.map((service) =>
  //       service.service.id === updatedService.id ? updatedService : service
  //     )
  //   );
  // };

  // useEffect(() => {
  //   const dataToUpdate = {
  //     category_id: id,
  //     category_name: currentCategory,
  //     services: [
  //       {
  //         service_id: "",
  //         service_name: currentServices.service_name,
  //         max_price: "",
  //         min_price: "",
  //       },
  //     ],
  //   };
  //   setLocalChanges(dataToUpdate);
  // }, [currentCategory, currentServices.service_name, id]);

  // // Прокрутка до ост. елементу при додаванні
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
        onChange={handleAccordionChange}
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
          aria-controls={`panel${id}-content`}
          id={`panel${id}-header`}
        >
          <div className={styles.titleContent}>
            {isEdit ? (
              <input
                type="text"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                autoFocus
                className={styles.editInput}
                onBlur={() => setIsEdit(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEdit(false);
                }}
              />
            ) : (
              <p>{currentCategory}</p>
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
                  isOpen={isCategoryPopupOpen}
                  onClose={() => setIsCategoryPopupOpen(false)}
                  onEdit={() => setIsEdit(true)}
                  onAdd={() => setIsModalOpen(true)}
                  buttonRef={buttonRef}
                  containerRef={containerRef}
                  innerAccRef={innerAccRef}
                />
                {isModalOpen && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Modal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      shouldCloseOnOverlayClick={false}
                    >
                      <AddCategoryModal
                        onClose={() => setIsModalOpen(false)}
                        title="Введіть назву послуги"
                        name="newService"
                        addNewCategory={handleNewService}
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
              currentServices.map((service) => (
                <li key={service.service_id}>
                  <ServiceItem
                    id={service.service_id}
                    serviceData={service}
                    // onDelete={onDelete}
                    // setLocalChanges={handleUpdateService}
                    // setServiceItemEdit={setServiceItemEdit}
                    // containerRef={containerRef}
                    // innerAccRef={innerAccRef}
                    // resetPrice={resetPrice}
                    // resetService={resetService}
                  />
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
