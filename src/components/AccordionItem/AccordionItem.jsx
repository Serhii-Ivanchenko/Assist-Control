import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import styles from "./AccordionItem.module.css";

function AccordionItem({ category, items, index }) {
  return (
    <div className={styles.wrapper}>
      <Accordion
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
          {category}
        </AccordionSummary>
        <AccordionDetails>
          <ul className={styles.accordionDesc}>
            {items.map((itemData, idx) => (
              <li key={idx}>
                <p className={styles.text}>{itemData.item}</p>
                <div className={styles.inputContainer}>
                  <label>
                    Мін
                    <input className={styles.input} type="number" />
                  </label>
                  <label>
                    Макс
                    <input className={styles.input} type="number" />
                  </label>
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
