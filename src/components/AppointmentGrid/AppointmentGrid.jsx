import css from './AppointmentGrid.module.css';

import  { useEffect, useState } from 'react';

const workTypeColors = {
   new: "var(--status-gradient-new)",
  checkRepair: "var(--status-gradient-diag)",
   repair: "var(--status-gradient-repair)",
   viewRepair: "var(--status-gradient-view-repair)",
   completed: "var(--status-gradient-complete)",
   empty: "transparent",
};
 
const workTypeBorder = {
   new: "var(--glow-new)",
  checkRepair: "var(--glow-diag)",
   repair: "var(--glow-repair)",
   viewRepair: "var(--glow-view-repair)",
   completed: "var(--glow-complete)",
 };

const AppointmentGrid = ({ data }) => {

  const [linePosition, setLinePosition] = useState(null);
//    const gridRef = useRef(null);
//   const [gridHeight, setGridHeight] = useState(0);


// useEffect(() => {
//     if (gridRef.current) {
//       // Установить высоту сетки на основании полной высоты элемента
//       setGridHeight(gridRef.current.scrollHeight);
//     }
//   }, [data]);


  useEffect(() => {
    const updateCurrentTimeLine = () => {
      const startHour = 9; // Начало рабочего дня
      const endHour = 18; // Конец рабочего дня
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Проверка, чтобы полоса не отображалась вне рабочего времени
      if (currentHour < startHour || currentHour >= endHour) {
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
  }, []);


  return (
   
    <div className={css.schedulegrid}
    >
 
      {data.posts.map((_, index) => (
        
        <div
          key={`bg-${index}`}
          className={`${css.rowBackground} ${index % 2 === 0 ? css.odd : css.even}`}
          style={{
            gridRow: `${index +2}`,
           
          }}
        ></div>
      ))}  


      {/* Заголовки для дат */}
      {data.dates.map((date, index) => (
          <div key={index} className={css.gridheader}>
          {date}
        </div>
      ))}

      {/* Заголовки для постов */}
      {data.posts.map((post, index) => (
          <div key={index} className={css.gridpost}>
          {post}
        </div>
      ))}

         {/* Полоса текущего времени */}
      {linePosition !== null && (
        <div
            className={css.currenttimeline}
          style={{
              left:
                 `calc(100px - ${linePosition * 1.95}px + ${linePosition}%)` 
                //  `${linePosition}%`
            }}
        /> 
      )}


      {/* Ячейки для работ */}
      {data.workItems.map((item, index) => {
        // const startHour = new Date(item.startTime).getHours();
        // const endHour = new Date(item.endTime).getHours();
        const gridColumn = `${item.stage_start + 1-8} / ${item.stage_end + 2-8}`;
        return (


          <div
            key={index}
                className={css.griditem}
            style={{
              gridColumn: gridColumn,
              gridRow: item.post_id + 1, // Смещаем на 2, чтобы учесть строки заголовков
              background:  workTypeColors[item.workType] || '#333',
            }}
          >
             {item.workType !== 'empty' && <p className={css.plateinfo} style={{ background: 'var(--bg-secondary)', }} >{item.plate}</p>}
             {item.workType !== 'empty' && <p  style={{
              background: workTypeColors[item.workType] || '#333',
              borderLeft: `1px solid ${workTypeBorder[item.workType]}`,
              filter: `drop-shadow(-4px 0px 3px  ${workTypeBorder[item.workType]})`, 
              }}  className={css.mechanicinfo} >{item.mechanic}</p>
           }
          </div>
        );
      })}
    </div>
    
  );
};

export default AppointmentGrid;