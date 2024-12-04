import { useState, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
// import PopupMenu from "../../DistributorsPart/DistributorsCard/PopupMenu";
import styles from "./AccordionItem.module.css";

function AccordionItem({ category, items, index }) {
  const [expanded, setExpanded] = useState(false);
  const [setIsPopupOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  const handlePopupOpen = (e) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  // const handlePopupClose = () => {
  //   setIsPopupOpen(true);
  // };

  return (
    <div className={styles.wrapper}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
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
            {category}{" "}
            {expanded ? (
              <TiArrowSortedUp className={styles.icon} />
            ) : (
              <TiArrowSortedDown className={styles.icon} />
            )}
            <button className={styles.btn} ref={buttonRef}>
              <BsThreeDotsVertical
                className={styles.dotsIcon}
                onClick={handlePopupOpen}
              />
            </button>
            {/* {isPopupOpen && (
              <div className={styles.popupContainer}>
                <PopupMenu
                  className={styles.popupItem}
                  isOpen={handlePopupOpen}
                  onClose={handlePopupClose}
                  popupRef={buttonRef}
                />
              </div>
            )} */}
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 12px 0 12px" }}>
          <ul className={styles.accordionDesc}>
            {items.map((itemData, idx) => (
              <li key={idx}>
                <p className={styles.text}>{itemData.item}</p>
                <div className={styles.inputsContainer}>
                  <div className={styles.inputBox}>
                    <label className={styles.inputLabel}>Мін</label>
                    <input placeholder="250" className={styles.input} />
                  </div>

                  <div className={styles.inputBox}>
                    <label className={styles.inputLabel}>Макс</label>
                    <input placeholder="400" className={styles.input} />
                  </div>
                </div>
                <button className={styles.btnInput} ref={buttonRef}>
                  <BsThreeDotsVertical
                    className={styles.dotsIcon}
                    onClick={handlePopupOpen}
                  />
                </button>
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionItem;
