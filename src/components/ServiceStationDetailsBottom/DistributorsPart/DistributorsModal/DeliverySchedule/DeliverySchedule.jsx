// import { forwardRef, useImperativeHandle, useState } from "react";
// import styles from "./DeliverySchedule.module.css";

// const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7:00 - 21:00
// const daysUa = [
//   "Понеділок",
//   "Вівторок",
//   "Середа",
//   "Четвер",
//   "П'ятниця",
//   "Субота",
//   "Неділя",
// ];
// const daysEn = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const DeliverySchedule = forwardRef(({ isEditing, activePeriods }, ref) => {
//   const [gridData, setGridData] = useState(generateGridData());
//   const [isSelecting, setIsSelecting] = useState(false);

//   // Генерація початкових даних для таблиці
//   function generateGridData() {
//     return daysEn.flatMap((day) =>
//       hours.map((hour) => ({
//         day,
//         hour,
//         isActive:
//           Array.isArray(activePeriods) &&
//           activePeriods.some(
//             (period) =>
//               period.day === day &&
//               hour >= period.startTime &&
//               hour < period.endTime
//           ),
//       }))
//     );
//   }

//   // Обробка зміни стану клітинки
//   const toggleCell = (day, hour) => {
//     if (!isEditing) return; // Блокування змін, якщо режим редагування вимкнено
//     setGridData((prevData) =>
//       prevData.map((cell) =>
//         cell.day === day && cell.hour === hour
//           ? { ...cell, isActive: !cell.isActive }
//           : cell
//       )
//     );
//   };

//   // Обробники миші
//   const handleMouseDown = (day, hour) => {
//     setIsSelecting(true);
//     toggleCell(day, hour);
//   };

//   const handleMouseOver = (day, hour) => {
//     if (isSelecting) toggleCell(day, hour);
//   };

//   const handleMouseUp = () => setIsSelecting(false);

//   // Формування даних для бека
//   const generateBackendData = () => {
//     const activeCells = gridData.filter((cell) => cell.isActive);
//     const result = [];

//     activeCells.forEach(({ day, hour }) => {
//       const existingPeriod = result.find(
//         (period) => period.day === day && period.endTime === hour - 1
//       );
//       if (existingPeriod) {
//         existingPeriod.endTime = hour; // Продовжити існуючий період
//       } else {
//         result.push({ day, startTime: hour, endTime: hour, isActive: true });
//       }
//     });

//     console.log("Backend Data:", result);
//     return result;
//   };

//   // Імплементація методу для доступу з батьківського компонента
//   useImperativeHandle(ref, () => ({ generateBackendData }));

//   return (
//     <div className={styles.container}>
//       <div
//         className={styles.workScheduleGrid}
//         onMouseLeave={() => setIsSelecting(false)}
//       >
//         <div className={styles.headercell}>Дні/Години</div>
//         {hours.map((hour, index) => (
//           <div
//             key={hour}
//             className={`${styles.headercell} ${
//               index === hours.length - 1 ? styles.headerlast : ""
//             }`}
//           >
//             {hour}:00
//           </div>
//         ))}

//         {daysUa.map((dayUa, index) => {
//           const dayEn = daysEn[index];
//           const isLastDay = index === daysUa.length - 1;
//           return (
//             <>
//               <div
//                 key={dayEn}
//                 className={`${styles.dayLabel} ${
//                   isLastDay ? styles.lastDayLabel : ""
//                 }`}
//               >
//                 {dayUa}
//               </div>

//               {hours.map((hour) => {
//                 const cell = gridData.find(
//                   (c) => c.day === dayEn && c.hour === hour
//                 );
//                 return (
//                   <div
//                     key={`${dayEn}-${hour}`}
//                     className={`${styles.cell} ${
//                       cell.isActive ? styles.active : styles.inactive
//                     }`}
//                     onMouseDown={() => handleMouseDown(dayEn, hour)}
//                     onMouseOver={() => handleMouseOver(dayEn, hour)}
//                     onMouseUp={handleMouseUp}
//                   ></div>
//                 );
//               })}
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// });

// DeliverySchedule.displayName = "DeliverySchedule";

// export default DeliverySchedule;
