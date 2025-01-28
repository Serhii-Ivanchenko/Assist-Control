import css from "./ScheduleTable.module.css";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

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

const ScheduleTable = forwardRef(
  ({ isEditing, activePeriods, onDataSave }, ref) => {
    const generateGridData = (data) => {
      return data.flatMap(({ day, times }) =>
        Object.entries(times).map(([time, isActive]) => ({
          day,
          hour: parseInt(time.split(":")[0], 10), // Извлекаем час из строки вида "7:00"
          isActive: Boolean(isActive), // Преобразуем числовое значение в логическое
        }))
      );
    };

    const [gridData, setGridData] = useState(generateGridData(activePeriods));
    const [isSelecting, setIsSelecting] = useState(false);

    useEffect(() => {
      // console.log("activePeriods", activePeriods);
      setGridData(generateGridData(activePeriods));
    }, [activePeriods]);

    // Сброс сетки к исходным данным
    const resetGridData = () => {
      setGridData(generateGridData(activePeriods));
    };

    // Обробка зміни стану клітинки
    const toggleCell = (day, hour) => {
      if (!isEditing) return; // Блкуємо зміни, якщо режим редагування вимкнено
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

    // Формування масиву для бекенду
    // const generateBackendData = () => {
    //   const activeCells = gridData.filter((cell) => cell.isActive);
    //   const result = [];

    //   activeCells.forEach(({ day, hour }) => {
    //     const existingPeriod = result.find(
    //       (period) => period.day === day && period.endTime === hour - 1
    //     );
    //     if (existingPeriod) {
    //       existingPeriod.endTime = hour; // Продовжити існуючий період
    //     } else {
    //       result.push({ day, startTime: hour, endTime: hour, isActive: true }); // ССтвор.ємо новий період
    //     }
    //   });

    //   console.log("Backend Data:", result);
    //   return result;
    // };

    const generateBackendData = () => {
      const result = [];

      gridData.forEach(({ day, hour, isActive }) => {
        let dayData = result.find((entry) => entry.day === day);

        // Если данных для дня еще нет, добавляем новый объект для этого дня
        if (!dayData) {
          dayData = { day, times: {} };
          result.push(dayData);
        }

        // Формируем временной объект
        dayData.times[`${hour}:00`] = isActive ? 1 : 0;
      });

      const backendData = { days: result };

      console.log("Backend Data:", backendData);
      return backendData;
    };

    const saveData = () => {
      const backendData = generateBackendData();
      if (onDataSave) {
        onDataSave(backendData);
        // setGridData(generateGridData(backendData.days));
      }
    };

    useImperativeHandle(ref, () => ({
      generateBackendData,
      resetGridData,
      saveData,
    }));
    return (
      <div className={css.container}>
        <div
          className={css.workScheduleGrid}
          onMouseLeave={() => setIsSelecting(false)} // перериваємо при вихожі за межі таблиці>
        >
          {/* Заголовки часов */}
          <div className={css.headercell}>Дні/години</div>
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

          {/* Сетка с днями и часами */}
          {daysUa.map((dayUa, index) => {
            const dayEn = daysEn[index];
            const isLastDay = index === daysUa.length - 1;
            return (
              <>
                <div
                  key={dayEn}
                  className={`${css.dayLabel} ${
                    isLastDay ? css.lastDayLabel : ""
                  }`}
                >
                  {dayUa}
                </div>

                {hours.map((hour) => {
                  const cell = gridData.find(
                    (c) => c.day === dayEn && c.hour === hour
                  );
                  return (
                    <div
                      key={`${dayEn}-${hour}`}
                      className={`${css.cell} ${
                        cell?.isActive ? css.active : css.inactive
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
);

ScheduleTable.displayName = "ScheduleTable";

export default ScheduleTable;
