import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import styles from "./AccordionItem.module.css";

function AccordionItem({ category, items, index }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

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
          {category}{" "}
          {expanded ? (
            <TiArrowSortedUp className={styles.icon} />
          ) : (
            <TiArrowSortedDown className={styles.icon} />
          )}
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
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionItem;
