import css from './AppointmentGrid.module.css';

const workTypeColors = {
   new: "var(--status-gradient-new)",
  checkRepair: "var(--status-gradient-diag)",
   repair: "var(--status-gradient-repair)",
   viewRepair: "var(--status-gradient-view-repair)",
   completed: "var(--status-gradient-complete)",
};
 
const workTypeBorder = {
   new: "var(--glow-new)",
  checkRepair: "var(--glow-diag)",
   repair: "var(--glow-repair)",
   viewRepair: "var(--glow-view-repair)",
   completed: "var(--glow-complete)",
 };

const AppointmentGrid = ({ data }) => {
  return (
    <div className={css.schedulegrid} >
{/* 
       {data.posts.map((_, index) => (
        <div
          key={`bg-${index}`}
          className={`${css.rowBackground} ${index % 2 === 0 ? css.even : css.odd}`}
          style={{
            gridRow: index +1,
            gridColumn: '2 ',
          }}
        ></div>
      ))}  */}

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

      {/* Ячейки для работ */}
      {data.workItems.map((item, index) => {
        // const startHour = new Date(item.startTime).getHours();
        // const endHour = new Date(item.endTime).getHours();
        const gridColumn = `${item.start_time + 1-8} / ${item.end_time + 1-8}`;
        return (
          <div
            key={index}
                className={css.griditem}
            style={{
              gridColumn: gridColumn,
              gridRow: item.postIndex + 1, // Смещаем на 2, чтобы учесть строки заголовков
              background:  workTypeColors[item.workType] || '#333',
            }}
          >
            <p className={css.plateinfo} style={{background:'var(--bg-secondary)',}} >{item.plate}</p>
            <p className={css.mechanicinfo} style={{
              background: workTypeColors[item.workType] || '#333',
              borderLeft: `1px solid ${workTypeBorder[item.workType] }`,
 }}>{item.mechanic}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentGrid;