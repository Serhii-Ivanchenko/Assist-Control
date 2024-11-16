import { useState } from "react";
import  ScheduleSelector  from "react-schedule-selector";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from "@mui/material";
import {BsCaretDownFill,
} from "react-icons/bs";


  const activePeriods = [
  { day: "Monday", startTime: 9, endTime: 12, isActive: true },
  { day: "Monday", startTime: 14, endTime: 16, isActive: true },
  { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
  { day: "Friday", startTime: 8, endTime: 11, isActive: true },
];
const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const START_HOUR = 7;
const END_HOUR = 21;

function generateGridData(activePeriods) {
  const result = [];

  // Обходим каждый день недели
  for (const day of DAYS_OF_WEEK) {
    // Получаем все активные периоды для текущего дня
    const periodsForDay = activePeriods.filter((period) => period.day === day);

    // Проходим по каждому часу дня
    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      // Проверяем, находится ли текущий час в активном периоде
      const isActive = periodsForDay.some(
        (period) => hour >= period.startTime && hour < period.endTime
      );

      // Добавляем ячейку в массив
      result.push({
        day,
        hour,
        isActive,
      });
    }
  }

  return result;
}

const initialData = generateGridData(activePeriods);

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const transformDataToSchedule = (data) => {
  const schedule = [];
  for (let hour = 7; hour <= 20; hour++) {
    const row = daysOfWeek.map((day) => {
      const entry = data.find((item) => item.day === day && item.hour === hour);
      return entry ? entry.isActive : false;
    });
    schedule.push(row);
  }
  return schedule;
};

// const transformScheduleToData = (schedule, originalData) => {
//   return originalData.map((entry) => {
//     const dayIndex = daysOfWeek.indexOf(entry.day);
//     const hourIndex = entry.hour - 7;
//     return {
//       ...entry,
//       isActive: schedule[hourIndex][dayIndex],
//     };
//   });
// };


const ServiceStationDetailsTop = () => {
  const [scheduleData, setScheduleData] = useState(transformDataToSchedule(initialData));

  const handleCellClick = (newSchedule) => {
    setScheduleData(newSchedule);
  };

  // const handleSave = () => {
  //   const updatedData = transformScheduleToData(scheduleData, initialData);
  //   // Отправка данных на бекенд (замените URL на ваш эндпоинт)
  //   fetch("/api/save-schedule", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         alert("Schedule saved successfully!");
  //       } else {
  //         alert("Failed to save schedule.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert("An error occurred while saving.");
  //     });
  // };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<BsCaretDownFill />}
          aria-controls="schedule-content"
          id="schedule-header"
          style={{
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">Weekly Work Schedule</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            Click on cells to toggle availability.
          </Typography>
          <ScheduleSelector
            selection={scheduleData}
            numDays={7}
            minTime={7}
            maxTime={21}
            hourlyChunks={1}
            onChange={handleCellClick}
            timeFormat="24" // формат времени
            dateFormat="ddd" // формат заголовка дней
            renderDateCell={(time, selected) => (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: selected ? "var(--status-gradient-repair)" : "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  cursor: "pointer",
                }}
              />
            )}
          />
        </AccordionDetails>
      </Accordion>
      {/* <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "16px", width: "100%" }}
        onClick={handleSave}
      >
        Save Schedule
      </Button> */}
    </div>
  );
};


export default ServiceStationDetailsTop;
