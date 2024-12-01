import { useState , useRef} from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { BsCaretDownFill, BsPencil } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
// import { useState } from "react";
import ServiceStationDetailsTop from "../ServiceStationDetailsTop/ServiceStationDetailsTop.jsx";
import ServiceStationDetailsTopTable from "../ServiceStationDetailsTopTable/ServiceStationDetailsTopTable.jsx";
import css from "./ServiceStationDetailsAccordion.module.css";

export default function ServiceStationDetailsAccordion({ onToggle }) {

   const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
// Реф для доступа к generateBackendData
  const detailsRef = useRef();
  const handleChange = (e, expanded) => {

     setIsExpanded(expanded);
    if (!expanded) {
      setIsEditing(false); // Сбрасываем режим редактирования при закрытии
    }
    onToggle(expanded);
  };

  const handleEditToggle = (event) => {
        event.stopPropagation(); // Останавливаем всплытие события
    if (isEditing) {
      // Вызов функции generateBackendData через реф
      if (detailsRef.current?.generateBackendData) {
        detailsRef.current.generateBackendData();
      }
      console.log("Сохранение завершено.");
    }
    setIsEditing((prev) => !prev);
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

        {isExpanded && (
          <button
            onClick={handleEditToggle}
            style={{ color: "var(--white)", marginLeft: "15px" }}
            className={css.editbtn}    
          >
            {isEditing ?  <RiSave3Fill className={css.mainIcon} size={21} /> :  <BsPencil className={css.mainIcon} />}
          </button>
        )}
      </AccordionSummary>
      <AccordionDetails
        style={{
          width: "863px",
          padding: "0",
          marginTop: "19px",
        }}
      >
          <ServiceStationDetailsTop ref={detailsRef} isEditing={isEditing}/> 
        {/* <ServiceStationDetailsTopTable /> */}
      </AccordionDetails>
    </Accordion>
  );
}
