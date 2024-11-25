import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from "@mui/material";
import { BsCaretDownFill } from "react-icons/bs";
// import { useState } from "react";
import ServiceStationDetailsTop from "../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx";
import css from "./ServiceStationDetailsAccordion.module.css";

export default function ServiceStationDetailsAccordion({ onToggle }) {
  const handleChange = (e, isExpanded) => {
    onToggle(isExpanded);
  };
  // const activePeriods = [
  //   { day: "Monday", startTime: 9, endTime: 12, isActive: true },
  //   { day: "Monday", startTime: 14, endTime: 16, isActive: true },
  //   { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
  //   { day: "Friday", startTime: 8, endTime: 11, isActive: true },
  // ];
  // const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // const START_HOUR = 7;
  // const END_HOUR = 21;

  // function generateGridData(activePeriods) {
  //   const result = [];

  //   // Обходим каждый день недели
  //   for (const day of DAYS_OF_WEEK) {
  //     // Получаем все активные периоды для текущего дня
  //     const periodsForDay = activePeriods.filter((period) => period.day === day);

  //     // Проходим по каждому часу дня
  //     for (let hour = START_HOUR; hour < END_HOUR; hour++) {
  //       // Проверяем, находится ли текущий час в активном периоде
  //       const isActive = periodsForDay.some(
  //         (period) => hour >= period.startTime && hour < period.endTime
  //       );

  //       // Добавляем ячейку в массив
  //       result.push({
  //         day,
  //         hour,
  //         isActive,
  //       });
  //     }
  //   }

  //   return result;
  // }

  // const initialData = generateGridData(activePeriods);

  // const [data, setData] = useState(initialData);

  return (
    <Accordion
      className={css.accwrapper}
      onChange={handleChange}
      sx={{
        background: "none",
        // color: "inherit",
        WebkitBoxShadow: "none",
        color: "var(--white)",
        fontSize: "20px",
        fontWeight: "600",
        width: "863px",
      }}
    >
      <AccordionSummary
        expandIcon={<BsCaretDownFill style={{ fill: "var(--white)" }} />}
        className={css.acctitle}
        style={{
          backgroundColor: "var(--bg-input)",
          color: "var(--white)",
          border: "1px solid var(--bg-input)",
          fontSize: "20px",
          fontWeight: "600",
          height: "43px",
          width: "863px",
          padding: "10px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          //  borderRadius: "8px",
        }}
      >
        <Typography
          style={{
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Налаштування робочого графіка:
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          width: "863px",
          padding: "0",
          marginTop: "19px",
        }}
      >
        <ServiceStationDetailsTop />
      </AccordionDetails>
    </Accordion>
  );
}
