import { useState, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { BsCaretDownFill } from "react-icons/bs";
// import {BsPencil } from "react-icons/bs";
// import { RiSave3Fill } from "react-icons/ri";
import DeliverySchedule from "../DeliverySchedule/DeliverySchedule";
import styles from "./ScheduleAccordion.module.css";

function ScheduleAccordion({ onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [setIsExpanded] = useState(false);

  const detailsRef = useRef();
  const handleChange = (e, expanded) => {
    setIsExpanded(expanded);
    if (!expanded) {
      setIsEditing(false);
    }
    onToggle(expanded);
  };

  //   const handleEditToggle = (event) => {
  //     event.stopPropagation();
  //     if (isEditing) {
  //       if (detailsRef.current?.generateBackendData) {
  //         detailsRef.current.generateBackendData();
  //       }
  //     }
  //     setIsEditing((prev) => !prev);
  //   };
  return (
    <Accordion
      className={styles.wrapper}
      onChange={handleChange}
      disableGutters={true}
      sx={{
        background: "none",
        WebkitBoxShadow: "none",
        color: "var(--white)",
        fontSize: "20px",
        fontWeight: "600",
        width: "863px",
      }}
    >
      <AccordionSummary
        expandIcon={<BsCaretDownFill style={{ fill: "var(--white)" }} />}
        className={styles.acctitle}
        style={{
          backgroundColor: "var(--bg-input)",
          color: "var(--white)",
          fontSize: "20px",
          fontWeight: "600",
          height: "43px",
          width: "863px",
          padding: "10px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Typography
          style={{
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "34px",
          }}
        >
          Графік доставки:
        </Typography>

        {/* {isExpanded && (
          <button onClick={handleEditToggle} className={styles.btn}>
            {isEditing ? (
              <RiSave3Fill className={styles.mainIcon} size={21} />
            ) : (
              <BsPencil className={styles.mainIcon} />
            )}
          </button>
        )} */}
      </AccordionSummary>
      <AccordionDetails
        style={{
          width: "863px",
          padding: "0",
          marginTop: "19px",
        }}
      >
        <DeliverySchedule ref={detailsRef} isEditing={isEditing} />
      </AccordionDetails>
    </Accordion>
  );
}

export default ScheduleAccordion;
