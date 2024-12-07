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
  const [isSummaryPopupOpen, setIsSummaryPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentServices, setCurrentServices] = useState(items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(null);

  const handleChange = () => {
    if (!isEdit) {
      setExpanded((prev) => !prev);
    }
  };

  const handleSummaryPopupToggle = (e) => {
    e.stopPropagation();
    setIsSummaryPopupOpen((prev) => !prev);
  };

  const handleCategoryEdit = () => {
    onEnableEditing();
    setIsSummaryPopupOpen(false);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(`.${styles.popupContainer}`) &&
      inputRef.current &&
      !inputRef.current.contains(e.target)
    ) {
      setIsSummaryPopupOpen(false);
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

  const handleServiceUpdate = (updatedService, idx) => {
    const updatedServices = [...currentServices];
    updatedServices[idx] = updatedService;
    setCurrentServices(updatedServices);
    onUpdate({ category: currentCategory, items: updatedServices });
  };

  const handleDeleteItem = (idx) => {
    const updatedServices = currentServices.filter((_, index) => index !== idx);
    setCurrentServices(updatedServices);
  };

  const handleAddService = () => {
    setIsModalOpen(true);
  };

  const handleNewService = (serviceName) => {
    setIsSummaryPopupOpen(false);
    const newService = { item: serviceName };
    setCurrentServices((prevServices) => [...prevServices, newService]);
    onUpdate({
      category: currentCategory,
      items: [...currentServices, newService],
    });
    setIsModalOpen(false);
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
            <button className={styles.btn} onClick={handleSummaryPopupToggle}>
              <BsThreeDotsVertical className={styles.dotsIcon} />
            </button>
            {isSummaryPopupOpen && (
              <div className={styles.popupContainer}>
                <PopupMenu
                  isOpen={isSummaryPopupOpen}
                  onClose={handleSummaryPopupToggle}
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
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 12px 0 12px" }}>
          <ul className={styles.accordionDesc}>
            {currentServices.map((service, idx) => (
              <ServiceItem
                isEdit={isEdit}
                key={idx}
                serviceData={service}
                onUpdate={(updatedService) =>
                  handleServiceUpdate(updatedService, idx)
                }
                onDelete={() => handleDeleteItem(idx)}
                onEnableEditing={(e) => onEnableEditing(idx, e)}
              />
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionItem;
