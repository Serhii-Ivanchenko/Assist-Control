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
import addIdsToData from "../../../../utils/addIdsToData";

function AccordionItem({
  isEdit,
  category,
  items,
  index,
  onUpdate,
  onEnableEditing,
  containerRef,
  resetPrice,
  resetCategory,
  resetService,
  serviceItemEdit,
  setServiceItemEdit,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentServices, setCurrentServices] = useState(items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonRef = useRef(null);
  const innerAccRef = useRef(null);

  const handleChange = () => {
    if (!isEdit) {
      setExpanded((prev) => !prev);
    }
  };

  const handleCategoryPopupToggle = (e) => {
    e.stopPropagation();
    setIsCategoryPopupOpen((prev) => !prev);
  };

  const handleCategoryPopupClose = () => {
    setIsCategoryPopupOpen(false);
  };

  const handleCategoryEdit = (e) => {
    e.stopPropagation();
    onEnableEditing();
    setIsCategoryPopupOpen(false);
  };

  const handleCategoryUpdate = (e) => {
    const newCategory = e.target.value;
    if (newCategory !== currentCategory) {
      setCurrentCategory(newCategory);
      onUpdate({
        category: newCategory,
        items: currentServices,
      });
    }
  };

  const handleAddService = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setIsCategoryPopupOpen(false);
  };

  const handleNewService = (serviceName) => {
    console.log("Adding new service:", serviceName);
    console.log("Current Category:", currentCategory);
    setIsCategoryPopupOpen(false);
    const newService = { id: addIdsToData(), item: serviceName };

    const updatedCategory = {
      category: currentCategory,
      items: [...items, newService],
    };

    console.log("Updated Category:", updatedCategory);
    setCurrentServices(updatedCategory.items);
    onUpdate({
      category: updatedCategory,
      items: updatedCategory.items,
    });

    setIsModalOpen(false);
  };

  const handleServiceUpdate = (updatedService) => {
    const updatedServices = currentServices.map((service) =>
      service.id === updatedService.id ? updatedService : service
    );
    // console.log("updatedService", updatedService);

    setCurrentServices(updatedServices);
    onUpdate({
      category: currentCategory,
      items: updatedServices,
    });
  };

  const handleDeleteItem = (id) => {
    const updatedServices = currentServices.filter(
      (service) => service.id !== id
    );
    setCurrentServices(updatedServices);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (
      JSON.stringify(category) !== JSON.stringify(currentCategory) ||
      JSON.stringify(items) !== JSON.stringify(currentServices)
    ) {
      setCurrentCategory(category);
      setCurrentServices(items);
    }
  }, [category, items, resetCategory, resetService]);

  // Прокрутка до ост. елементу при додаванні
  const prevDataLengthRef = useRef(currentServices.length); // Зберігаємо попередню довжину даних

  useEffect(() => {
    if (
      currentServices.length > prevDataLengthRef.current && // Перевіряємо, чи додано новий елемент
      innerAccRef.current
    ) {
      innerAccRef.current.scrollTo({
        top: innerAccRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    // Оновлюємо попередню довжину після виконання ефекту
    prevDataLengthRef.current = currentServices.length;
  }, [currentServices]);

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
                value={currentCategory}
                onChange={handleCategoryUpdate}
                autoFocus
                className={styles.editInput}
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
                  onClose={handleCategoryPopupClose}
                  onEdit={handleCategoryEdit}
                  onAdd={handleAddService}
                  buttonRef={buttonRef}
                  containerRef={containerRef}
                  innerAccRef={innerAccRef}
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
          <ul className={styles.accordionDesc} ref={innerAccRef}>
            {currentServices.map((service) => (
              <li key={service.id}>
                <ServiceItem
                  id={service.id}
                  serviceData={service}
                  onUpdate={handleServiceUpdate}
                  onDelete={() => handleDeleteItem(service.id)}
                  innerAccRef={innerAccRef}
                  containerRef={containerRef}
                  resetPrice={resetPrice}
                  resetService={resetService}
                  serviceItemEdit={serviceItemEdit}
                  setServiceItemEdit={setServiceItemEdit}
                />
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionItem;
