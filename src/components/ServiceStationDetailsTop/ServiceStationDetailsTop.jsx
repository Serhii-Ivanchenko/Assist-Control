import css from "./ServiceStationDetailsTop.module.css";
import { useState } from "react";

const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7:00 - 21:00
const daysUa = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
  "Неділя",
];
const daysEn = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ServiceStationDetailsTop() {
  const activePeriods = [
    { day: "Monday", startTime: 9, endTime: 12, isActive: true },
    { day: "Monday", startTime: 14, endTime: 16, isActive: true },
    { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
    { day: "Friday", startTime: 8, endTime: 11, isActive: true },
  ];

  // Генерация начального состояния таблицы
  const generateGridData = (activePeriods) => {
    const grid = [];
    for (const day of daysEn) {
      for (let hour = 7; hour <= 21; hour++) {
        const isActive = activePeriods.some(
          (period) =>
            period.day === day &&
            hour >= period.startTime &&
            hour < period.endTime
        );
        grid.push({ day, hour, isActive });
      }
    }
    return grid;
  };

  const [gridData, setGridData] = useState(generateGridData(activePeriods));
  const [isSelecting, setIsSelecting] = useState(false);

  // Обработчики событий
  const toggleCell = (day, hour) => {
    setGridData((prevData) =>
      prevData.map((cell) =>
        cell.day === day && cell.hour === hour
          ? { ...cell, isActive: !cell.isActive }
          : cell
      )
    );
  };

  const handleMouseDown = (day, hour) => {
    setIsSelecting(true);
    toggleCell(day, hour);
  };

  const handleMouseOver = (day, hour) => {
    if (isSelecting) {
      toggleCell(day, hour);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  // Формирование выходного массива для бэкенда
  const generateBackendData = () => {
    const activeCells = gridData.filter((cell) => cell.isActive);
    const result = [];

    activeCells.forEach(({ day, hour }) => {
      const existingPeriod = result.find(
        (period) => period.day === day && period.endTime === hour - 1
      );
      if (existingPeriod) {
        existingPeriod.endTime = hour; // Продлить существующий период
      } else {
        result.push({ day, startTime: hour, endTime: hour, isActive: true }); // Создать новый период
      }
    });

    console.log("Backend Data:", result);
    return result;
  };

  return (
    <div className={css.container}>
      <div
        className={css.workScheduleGrid}
        onMouseLeave={() => setIsSelecting(false)} // Прекращаем выделение при выходе мыши из таблицы>
      >
        {/* Заголовки часов */}
        {/* <div className={css.headerrow}> */}
        <div className={css.headercell}>дні/години</div>
        {hours.map((hour, index) => (
          <div
            key={hour}
            className={`${css.headercell} ${
              index === hours.length - 1 ? css.headerlast : ""
            }`}
          >
            {hour}:00
          </div>
        ))}
        {/* </div> */}

        {/* Дни недели и ячейки */}
        {/* {daysUa.map((dayUa, index) => {
        const dayEn = daysEn[index];
         return (
           <div key={dayEn} className={css.dayRow}>
            <div className={css.daycell}>{dayUa}</div>
            {hours.map((hour) => {
              const cell = gridData.find(
                (c) => c.day === dayEn && c.hour === hour
              );
              return (
                <div
                  key={`${dayEn}-${hour}`}
                  className={`${css.hourCell} ${
                    cell.isActive ? css.active : css.inactive
                  }`}
                  onMouseDown={() => handleMouseDown(dayEn, hour)}
                  onMouseOver={() => handleMouseOver(dayEn, hour)}
                  onMouseUp={handleMouseUp}
                ></div>
              );
            })}
            </div>  */}

        {/* Сетка с днями и часами */}
        {daysUa.map((dayUa, index) => {
          const dayEn = daysEn[index];
          const isLastDay = index === daysUa.length - 1;
          return (
            <>
              {/* Заголовок строки */}
              <div
                className={`${css.dayLabel} ${
                  isLastDay ? css.lastDayLabel : ""
                }`}
              >
                {dayUa}
              </div>

              {/* Часовые ячейки */}
              {hours.map((hour) => {
                const cell = gridData.find(
                  (c) => c.day === dayEn && c.hour === hour
                );
                return (
                  <div
                    key={`${dayEn}-${hour}`}
                    className={`${css.cell} ${
                      cell.isActive ? css.active : css.inactive
                    }`}
                    onMouseDown={() => handleMouseDown(dayEn, hour)}
                    onMouseOver={() => handleMouseOver(dayEn, hour)}
                    onMouseUp={handleMouseUp}
                  ></div>
                );
              })}
            </>
          );
        })}
      </div>
       {/* <button className={css.generateButton} onClick={() => generateBackendData()}>
        Зберегти
      </button> */}
    </div>
  );
}
