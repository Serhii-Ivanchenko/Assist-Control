import  { useState } from 'react';
import css from './ServiceStationDetailsTop.module.css';

const hours = Array.from({ length: 15 }, (_, i) => `${i + 7}:00`);
const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export default function ServiceStationDetailsTop() {
  const [schedule, setSchedule] = useState(
    Array.from({ length: 7 }, () => Array(15).fill(false)) // Создаем 7 дней по 15 часов (7:00 - 21:00)
  );

  const toggleHour = (dayIndex, hourIndex) => {
    const newSchedule = schedule.map((day, dIndex) =>
      day.map((hour, hIndex) => 
        dIndex === dayIndex && hIndex === hourIndex ? !hour : hour
      )
    );
    setSchedule(newSchedule);
  };

  return (
      <div className={css.schedulegrid}>
          <div className={css.header}>
              <div className={css.corner}></div>
        {hours.map((hour) => (
            <div key={hour} className={css.headercell}>{hour}</div>
        ))}
      </div>
      {daysOfWeek.map((day, dayIndex) => (
        <div key={day}>
              <div className={css.daylabel}>{day}</div>
          {schedule[dayIndex].map((isActive, hourIndex) => (
            <div
              key={`${day}-${hourIndex}`}
              className={`hour-cell ${isActive ? 'active' : ''}`}
              onClick={() => toggleHour(dayIndex, hourIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

