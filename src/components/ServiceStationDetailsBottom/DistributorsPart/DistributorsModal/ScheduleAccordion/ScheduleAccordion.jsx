import { useState, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { BsCaretDownFill } from "react-icons/bs";
import DeliverySchedule from "../DeliverySchedule/DeliverySchedule";
import styles from "./ScheduleAccordion.module.css";
import ScheduleTable from "../../../../sharedComponents/ScheduleTable/ScheduleTable.jsx";

function ScheduleAccordion({ deliveryData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const detailsRef = useRef();

  const handleChange = (e, expanded) => {
    setIsExpanded(expanded);
    if (expanded) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <Accordion
      className={styles.wrapper}
      expanded={isExpanded}
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
      </AccordionSummary>
      <AccordionDetails
        style={{
          width: "863px",
          padding: "0",
          marginTop: "19px",
        }}
      >
        <ScheduleTable
          ref={detailsRef}
          isEditing={isEditing}
          activePeriods={deliveryData}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default ScheduleAccordion;