import css from './AppointmentGrid.module.css';

const AppointmentGrid = ({ data }) => {
  return (
      <div className={css.schedulegrid}>
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
        const startHour = new Date(item.startTime).getHours();
        const endHour = new Date(item.endTime).getHours();
        const gridColumn = `${startHour + 1-9} / ${endHour + 1-9}`;
        return (
          <div
            key={index}
                className={css.griditem}
            style={{
              gridColumn: gridColumn,
              gridRow: item.postIndex + 2, // Смещаем на 2, чтобы учесть строки заголовков
              backgroundColor: item.color,
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentGrid;