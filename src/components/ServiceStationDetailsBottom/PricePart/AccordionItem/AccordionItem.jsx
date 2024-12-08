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
  isEdit,
  category,
  items,
  index,
  onUpdate,
  onEnableEditing,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentServices, setCurrentServices] = useState(items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(null);

  const handleChange = () => {
    console.log("currentServices,", currentServices);

    if (!isEdit) {
      setExpanded((prev) => !prev);
    }
  };

  const handleCategoryPopupToggle = (e) => {
    e.stopPropagation();
    setIsCategoryPopupOpen((prev) => !prev);
  };

  const handleCategoryEdit = (e) => {
    e.stopPropagation();
    onEnableEditing();
    setIsCategoryPopupOpen(false);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(`.${styles.popupContainer}`) &&
      inputRef.current &&
      !inputRef.current.contains(e.target)
    ) {
      setIsCategoryPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleCategoryChange = (newName) => {
    setCurrentCategory(newName);
    onUpdate({ category: newName, items: currentServices });
  };

  const handleAddService = () => {
    setIsModalOpen(true);
  };

  const handleNewService = (serviceName) => {
    setIsCategoryPopupOpen(false);
    const newService = { id: Date.now(), item: serviceName };
    setCurrentServices((prevServices) => [...prevServices, newService]);
    onUpdate({
      category: currentCategory,
      items: [...currentServices, newService],
    });
    setIsModalOpen(false);
  };

  const handleServiceUpdate = (updatedService) => {
    const updatedServices = currentServices.map((service) =>
      service.id === updatedService.id ? updatedService : service
    );
    setCurrentServices(updatedServices);
    onUpdate({
      category: currentCategory,
      items: updatedServices,
    });
  };

  const handleDeleteItem = (idx) => {
    const updatedServices = currentServices.filter((_, index) => index !== idx);
    setCurrentServices(updatedServices);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          sx={{ background: "#2D3138" }}
          className={styles.accordionTitle}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <div className={styles.titleContent}>
            {isEdit ? (
              <input
                type="text"
                value={currentCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
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
            <button className={styles.btn} onClick={handleCategoryPopupToggle}>
              <BsThreeDotsVertical className={styles.dotsIcon} />
              {isCategoryPopupOpen && (
                <div className={styles.popupContainer}>
                  <PopupMenu
                    isOpen={isCategoryPopupOpen}
                    onClose={handleCategoryPopupToggle}
                    onEdit={handleCategoryEdit}
                    onAdd={handleAddService}
                  />
                  {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                      <AddCategoryModal
                        onClose={closeModal}
                        title="Введіть назву послуги"
                        name="newService"
                        addNewCategory={handleNewService}
                      />
                    </Modal>
                  )}
                </div>
              )}
            </button>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 12px 0 12px" }}>
          <ul className={styles.accordionDesc}>
            {currentServices.map((service, idx) => (
              <li key={service.id}>
                <ServiceItem
                  id={service.id}
                  serviceData={service}
                  onUpdate={handleServiceUpdate}
                  onDelete={() => handleDeleteItem(idx)}
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
