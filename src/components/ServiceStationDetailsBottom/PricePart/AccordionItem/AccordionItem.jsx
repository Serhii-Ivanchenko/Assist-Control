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
import { useDispatch } from "react-redux";
import {
  createService,
  getPrices,
} from "../../../../redux/settings/operations";
import { setEditedCategory } from "../../../../redux/settings/slice";
import { useSelector } from "react-redux";
import { selectEditedServices } from "../../../../redux/settings/selectors.js";

function AccordionItem({ item, id, containerRef, onCategoryEditing }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(item.category_name);

  const [currentServices, setCurrentServices] = useState(item.services);
  const editedServices = useSelector(selectEditedServices);
  const editedCategory = editedServices.find(
    (c) => c.category_id === item.category_id
  );

  const displayedCategoryName = editedCategory
    ? editedCategory.new_name
    : item.category_name;

  const buttonRef = useRef(null);
  const innerAccRef = useRef(null);
  const prevDataLengthRef = useRef(currentServices.length);
  const lastServiceRef = useRef(null);

  useEffect(() => {
    setCurrentServices(item.services);
    setIsEdit(false);
  }, [item.services]);

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  const handleCategoryPopupToggle = (e) => {
    e.stopPropagation();
    setIsCategoryPopupOpen((prev) => !prev);
  };

  const handleSaveCategory = () => {
    const trimmedName = currentCategory.trim();
    if (trimmedName === item.category_name) {
      setIsEdit(false);
      onCategoryEditing(false);

      return;
    }

    dispatch(
      setEditedCategory({
        category_id: item.category_id,
        new_name: trimmedName,
      })
    );
    onCategoryEditing(false);
    setIsEdit(false);
  };

  const handleNewService = (newServiceName) => {
    if (!newServiceName.trim()) return;

    const newService = {
      service_name: newServiceName,
      category_id: item.category_id,
      min_price: 0.0,
      max_price: 0.0,
    };

    dispatch(createService(newService))
      .unwrap()
      .then(() => dispatch(getPrices()))
      .catch((err) => console.error("Error creating service:", err));
  };

  useEffect(() => {
    if (
      currentServices.length > prevDataLengthRef.current &&
      lastServiceRef.current
    ) {
      lastServiceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    prevDataLengthRef.current = currentServices.length;
  }, [currentServices]);

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
                onFocus={() => onCategoryEditing(true)}
                onBlur={() => {
                  handleSaveCategory();
                  // () => onCategoryEditing(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveCategory();
                    // () => onCategoryEditing(false);
                  }
                }}
              />
            ) : (
              <p>{displayedCategoryName}</p>
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
          <ul ref={innerAccRef} className={styles.accordionDesc}>
            {Array.isArray(item.services) ? (
              currentServices.map((service, index) => {
                const isLast = index === currentServices.length - 1;
                return (
                  <li
                    key={service.service_id}
                    ref={isLast ? lastServiceRef : null}
                  >
                    <ServiceItem
                      id={service.service_id}
                      serviceData={service}
                      containerRef={containerRef}
                      innerAccRef={innerAccRef}
                      isLast={isLast}
                      isEdit={isEdit}
                    />
                  </li>
                );
              })
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
