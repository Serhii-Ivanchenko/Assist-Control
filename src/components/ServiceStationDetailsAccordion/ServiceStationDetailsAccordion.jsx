import { useState, useRef ,  useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { BsCaretDownFill, BsPencil, BsXCircle } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import { getWorkSchedule } from "../../redux/settings/operations.js";
import { selectSchedule } from "../../redux/settings/selectors.js"
import { selectSelectedServiceId } from "../../redux/auth/selectors.js";
// import { useState } from "react";
import ScheduleTable from "../sharedComponents/ScheduleTable/ScheduleTable.jsx";
import css from "./ServiceStationDetailsAccordion.module.css";

export default function ServiceStationDetailsAccordion({ onToggle }) {
  const dispatch = useDispatch();
  const workSсheduleData = useSelector(selectSchedule);
  const selectedServiceId = useSelector(selectSelectedServiceId);

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // Реф для доступа к generateBackendData
  const detailsRef = useRef();
  const handleChange = (e, expanded) => {
    setIsExpanded(expanded);
    // if (!expanded) {
    //   setIsEditing(false); // Сбрасываем режим редактирования при закрытии
    // }
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


const handleCancelEdit = (event) => {
  event.stopPropagation(); 
  setIsEditing(false);

  // Сбрасываем данные через реф
  if (detailsRef.current?.resetGridData) {
    detailsRef.current.resetGridData();
  }
};

   useEffect(() => {
     const fetchWorkSсheduleData = async () => {
       if (!selectedServiceId) {
         return;
       };
        await dispatch(getWorkSchedule());
       
     };

     fetchWorkSсheduleData();
   }, [dispatch,  selectedServiceId]); 

  console.log(workSсheduleData);
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

  const activePeriods = [
    { day: "Monday", startTime: 9, endTime: 12, isActive: true },
    { day: "Monday", startTime: 14, endTime: 16, isActive: true },
    { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
    { day: "Friday", startTime: 8, endTime: 11, isActive: true },
  ];

  return (
    <Accordion
      className={css.accwrapper}
      onChange={handleChange}
      disableGutters={true}
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
          // border: "1px solid var(--bg-input)",
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
            lineHeight: "34px",
          }}
        >
          Налаштування робочого графіка:
        </Typography>

        {isExpanded && (
          isEditing ? (
              <div className={css.blockflex}> 
                
              <button onClick={handleCancelEdit} className={css.editbtn} style={{marginRight: "0"}} >
                <BsXCircle className={css.mainIcon} size={21} /> </button> 
      
      <button
            onClick={handleEditToggle}
            // style={{ color: "var(--white)", marginLeft: "15px" }}
            className={css.editbtn} style={{marginRight: "0"}}
          > <RiSave3Fill className={css.mainIcon} size={21} /> </button> 
          </div>
            ) : (
      <button
            onClick={handleEditToggle}
            // style={{ color: "var(--white)", marginLeft: "15px" }}
            className={css.editbtn}
          > <BsPencil className={css.mainIcon} /> </button> 
              
            )
        
          // <button
          //   onClick={handleEditToggle}
          //   // style={{ color: "var(--white)", marginLeft: "15px" }}
          //   className={css.editbtn}
          // >
          //   {isEditing ? (
          //   //  <div className={css.blockflex}> <BsXCircle className={css.mainIcon} size={21}  />
          //       <RiSave3Fill className={css.mainIcon} size={21} />
          //     // </div>
          //   ) : (
          //     <BsPencil className={css.mainIcon} />
          //   )}
          // </button>
        )}
      </AccordionSummary>
      <AccordionDetails
        style={{
          width: "863px",
          padding: "0",
          marginTop: "19px",
        }}
      >
        <ScheduleTable ref={detailsRef} isEditing={isEditing} activePeriods={activePeriods} />
      </AccordionDetails>
    </Accordion>
  );
}
