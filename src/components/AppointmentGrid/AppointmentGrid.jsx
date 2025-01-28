import css from "./AppointmentGrid.module.css";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectDate } from "../../redux/cars/selectors.js";
import ServiceBookingModal from "../Modals/ServiceBookingModal/ServiceBookingModal.jsx";
import Modal from "../Modals/Modal/Modal.jsx";

const workTypeColors = {
  new: "var(--status-gradient-new)",
  diagnostic: "var(--status-gradient-diag)",
  repair: "var(--status-gradient-repair)",
  view_repair: "var(--status-gradient-view-repair)",
  completed: "var(--status-gradient-complete)",
  empty: "transparent",
  "Невідома послуга": "var(--status-gradient-new)",
};

const workTypeBorder = {
  new: "var(--glow-new)",
  diagnostic: "var(--glow-diag)",
  repair: "var(--glow-repair)",
  view_repair: "var(--glow-view-repair)",
  completed: "var(--glow-complete)",
  "Невідома послуга": "var(--glow-new)",
};

const AppointmentGrid = ({ data }) => {
  const carSelectDate = useSelector(selectDate);
  const [linePosition, setLinePosition] = useState(null);
  const gridRef = useRef(null);
  const [gridHeight, setGridHeight] = useState(0);
  const [startHour, setStartHour] = useState(null); // Начало рабочего дня
  const [endHour, setEndHour] = useState(null); // Конец рабочего дня
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const currentDate = new Date().toISOString().substring(0, 10);

  console.log(modalData);
  // const handleWorkItemClick = (recordId, postId) => {
  //   setModalData({ recordId, postId });
  //   setIsModalOpen(true);
  // };

  const handleWorkItemClick = (recordId, postId, itemEndTime) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    if (
      (carSelectDate === currentDate && currentTime > (itemEndTime + 1) * 60) ||
      carSelectDate < currentDate
    ) {
      console.log("Ячейка недоступна для выбора.");
      return;
    }

    setModalData({ recordId, postId });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (gridRef.current) {
      // Установить высоту сетки на основании полной высоты элемента
      setGridHeight(gridRef.current.scrollHeight);
    }
  }, [data]);

  useEffect(() => {
    if (data.dates && data.dates.length > 0) {
      setStartHour(parseInt(data.dates[1])); // Начало рабочего дня
      setEndHour(parseInt(data.dates[data.dates.length - 1])); // Конец рабочего дня
    }
  }, [data.dates]);

  let rowCount = data.posts.length;
  let columnCount = data.dates.length;

  let startIndexColumn = parseInt(data.dates[1]);
  // console.log('sic', startIndexColumn);
  const gridStyle = {
    "--column-count": columnCount - 1,
  };

  const koeffWidth = (100 + (1057 - 100) / columnCount - 1) / 100;

  useEffect(() => {
    if (startHour === null || endHour === null) return;

    const updateCurrentTimeLine = () => {
      // startHour =  parseInt(data.dates[1]); // Начало рабочего дня
      //  endHour = parseInt(data.dates[data.dates.length - 1]); // Конец рабочего дня
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Проверка, чтобы полоса не отображалась вне рабочего времени
      if (
        currentHour < startHour ||
        currentHour >= endHour ||
        carSelectDate !== currentDate
      ) {
        setLinePosition(null);
        return;
      }

      // Рассчитываем позицию полосы в процентах
      const totalMinutes = (endHour - startHour) * 60;
      const minutesSinceStart = (currentHour - startHour) * 60 + currentMinute;
      const positionPercentage = (minutesSinceStart / totalMinutes) * 100;

      setLinePosition(positionPercentage);
    };

    updateCurrentTimeLine();
    const intervalId = setInterval(updateCurrentTimeLine, 60000); // Обновляем каждую минуту

    return () => clearInterval(intervalId); // Очищаем интервал при размонтировании
  }, [startHour, endHour, carSelectDate, currentDate]);

  return (
    <div className={css.schedulegrid} style={gridStyle} ref={gridRef}>
      {/* Заголовки для дат */}
      {data.dates.map((date, index) => (
        <div
          key={index}
          className={css.gridheader}
          style={{
            borderRight: index === data.dates.length - 1 ? "none" : undefined,
          }}
        >
          <span>{date}</span>
        </div>
      ))}

      {data.posts.map((_, index) => (
        <div
          key={`bg-${index}`}
          className={`${css.rowBackground} ${
            index % 2 === 0 ? css.odd : css.even
          }`}
          style={{
            gridRow: `${index + 2}`,
            //  "--gap-width": `${columnGapWidth}px` // Применение динамического значения
          }}
        ></div>
      ))}

      {/* Слой сетки с ячейками и пунктирными линиями */}
      <div
        className={css.overlayGrid}
        style={{ height: `${(rowCount + 1) * 65}px` }}
      >
        {Array.from({ length: rowCount }).map((_, rowIndex) =>
          Array.from({ length: columnCount }).map((_, colIndex) => (
            <div
              key={`overlay-${rowIndex}-${colIndex}`}
              className={`${css.overlayCell} ${
                colIndex === columnCount - 1 ? css.noBorder : ""
              }`}
              style={{
                gridRow: `${rowIndex + 2}`,
                gridColumn: `${colIndex + 2}`,
                //  "--gap-width": `${columnGapWidth}px` // Применение динамического значения
              }}
            ></div>
          ))
        )}
      </div>

      {/* Заголовки для постов */}
      {data.posts.map((post) => (
        <div key={post.id_post} className={css.gridpost}>
          {post.name_post}
        </div>
      ))}

      {/* Полоса текущего времени */}
      {linePosition !== null && (
        <div
          className={css.currenttimeline}
          style={{
            height: `${gridHeight}px`,
            left: `calc(100px - ${
              linePosition * koeffWidth
            }px + ${linePosition}%)`,
            //  `${linePosition}%`
          }}
        />
      )}

      {/* Ячейки для работ */}
      {data.workItems.map((item, index) => {
        // const startHour = new Date(item.startTime).getHours();
        // const endHour = new Date(item.endTime).getHours();

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Текущее время в минутах
        const itemEndTime = (item.stage_end + 1) * 60; // Конец рабочего времени в минутах

        const isDisabled =
          (carSelectDate === currentDate && currentTime > itemEndTime) ||
          carSelectDate < currentDate;
        // console.log('col', item.stage_start + 1 - startIndexColumn + 1)
        // console.log('colend',item.stage_end + 2 - startIndexColumn + 1)
        const gridColumn = `${item.stage_start + 1 - startIndexColumn + 1} / ${
          item.stage_end + 2 - startIndexColumn + 1
        }`;
        // Находим индекс строки в массиве постов, где id совпадает с post_id в работе
        const postRowIndex = data.posts.findIndex(
          (post) => post.id_post === item.post_id
        );

        // Проверяем, что нашли нужную строку
        if (postRowIndex === -1) {
          console.warn(`Post with id ${item.post_id} not found in posts list`);
          return null;
        }

        return (
          <div
            key={index}
            className={`${css.griditem} ${isDisabled ? css.disabled : ""}`}
            style={{
              gridColumn: gridColumn,
              gridRow: postRowIndex + 2, // Смещаем на 2, чтобы учесть строки заголовков
              background: workTypeColors[item.service_name] || "#333",
            }}
            onClick={
              !isDisabled
                ? () =>
                    handleWorkItemClick(
                      item.car_id,
                      item.post_id,
                      item.stage_end
                    )
                : undefined
            }
          >
            {item.service_name !== "empty" && (
              <p
                className={css.plateinfo}
                style={{ background: "var(--bg-secondary)" }}
              >
                {item.plate}
              </p>
            )}
            {item.service_name !== "empty" && (
              <p
                style={{
                  background: workTypeColors[item.service_name] || "#333",
                  borderLeft: `1px solid ${workTypeBorder[item.service_name]}`,
                  filter: `drop-shadow(-4px 0px 3px  ${
                    workTypeBorder[item.service_name]
                  })`,
                }}
                className={css.mechanicinfo}
              >
                {item.mechanic.split(" ")[0]}
              </p>
            )}
          </div>
        );
      })}

      {isModalOpen && modalData && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ServiceBookingModal
            recordId={modalData.recordId}
            postId={modalData.postId}
            onClose={handleCloseModal}
            carSelectDate={carSelectDate}
          />
        </Modal>
      )}
    </div>
  );
};

export default AppointmentGrid;
