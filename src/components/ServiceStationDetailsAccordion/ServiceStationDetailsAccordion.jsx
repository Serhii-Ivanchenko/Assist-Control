import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { BsCaretDownFill, BsPencil, BsXCircle } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import {
  // getWorkSchedule,
  updateWorkSchedule,
} from "../../redux/settings/operations.js";
import { selectSchedule } from "../../redux/settings/selectors.js";
// import { selectSelectedServiceId } from "../../redux/auth/selectors.js";
// import { useState } from "react";
import ScheduleTable from "../sharedComponents/ScheduleTable/ScheduleTable.jsx";
import css from "./ServiceStationDetailsAccordion.module.css";
// import { selectedServiceInSettingsId } from "../../redux/service/selectors.js";

export default function ServiceStationDetailsAccordion({ onToggle }) {
  const dispatch = useDispatch();
  const workScheduleData = useSelector(selectSchedule);
  // const selectedServiceId = useSelector(selectedServiceInSettingsId);

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // Реф для доступа к generateBackendData
  const detailsRef = useRef();
  const handleChange = (e, expanded) => {
    setIsExpanded(expanded);
    // if (!expanded) {
    //   setIsEditing(false); // Сбрасываем режим редактирования при закрытии
    // }
    onToggle(expanded);
  };

  // const handleEditToggle = (event) => {
  //   event.stopPropagation(); // Останавливаем всплытие события
  //   if (isEditing) {
  //     // Вызов функции generateBackendData через реф
  //     if (detailsRef.current?.generateBackendData) {
  //       detailsRef.current.generateBackendData();
  //     }
  //     console.log("Сохранение завершено.");
  //   }
  //   setIsEditing((prev) => !prev);
  // };

  const handleEditToggle = async (event) => {
    event.stopPropagation();

    if (isEditing) {
      // Получаем данные из ScheduleTable через ref
      if (detailsRef.current?.generateBackendData) {
        const backendData = detailsRef.current.generateBackendData();
        console.log("Сформированные данные для бекенда:", backendData);

        // Отправляем данные на бекенд
        await handleDataSave(backendData);
      }
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

  const handleDataSave = async (data) => {
    try {
      setIsSaving(true); // Устанавливаем флаг загрузки

      // Передача данных на бекенд с unwrap
      const response = await dispatch(updateWorkSchedule(data)).unwrap();

      // Лог успешного сохранения
      console.log("Данные успешно сохранены:", response);
      // await dispatch(getWorkSchedule(selectedServiceId)).unwrap();
    } catch (error) {
      // Лог ошибок
      console.error("Ошибка при сохранении данных:", error);
    } finally {
      setIsSaving(false); // Сбрасываем флаг загрузки
    }
  };

  //  useEffect(() => {
  //    const fetchWorkScheduleData = async () => {
  //      if (!selectedServiceId) {
  //        return;
  //      };
  //       setIsLoading(true);
  //       try {
  //       await dispatch(getWorkSchedule()).unwrap();

  //     } catch (error) {
  //       console.error("Ошибка загрузки данных:", error);
  //     } finally {
  //       setIsLoading(false); // Сбрасываем индикатор загрузки
  //     }
  //   };

  //   //     await dispatch(getWorkSchedule());

  //   //  };

  //    fetchWorkScheduleData();
  //  }, [dispatch,  selectedServiceId]);

  // console.log("workScheduleData", workScheduleData);

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

        {isExpanded &&
          (isEditing ? (
            <div className={css.blockflex}>
              <button
                onClick={handleCancelEdit}
                className={css.editbtn}
                style={{ marginRight: "0" }}
              >
                <BsXCircle className={css.mainIcon} size={21} />{" "}
              </button>

              <button
                onClick={handleEditToggle}
                // style={{ color: "var(--white)", marginLeft: "15px" }}
                className={css.editbtn}
                style={{ marginRight: "0" }}
              >
                {" "}
                <RiSave3Fill className={css.mainIcon} size={21} />{" "}
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditToggle}
              // style={{ color: "var(--white)", marginLeft: "15px" }}
              className={css.editbtn}
            >
              {" "}
              <BsPencil className={css.mainIcon} />{" "}
            </button>
          ))}
      </AccordionSummary>
      <AccordionDetails
        style={{
          width: "863px",
          padding: "0",
          marginTop: "19px",
        }}
      >
        {/* {!isLoading &&  workScheduleData.length > 0 && ( */}

        <ScheduleTable
          ref={detailsRef}
          isEditing={isEditing}
          activePeriods={workScheduleData}
          onDataSave={handleDataSave}
        />

        {/* )} */}

        {/* <ScheduleTable ref={detailsRef} isEditing={isEditing}
          //  activePeriods={activePeriods}
           activePeriods={workScheduleData}
          onDataSave={handleDataSave} /> */}
      </AccordionDetails>
    </Accordion>
  );
}
