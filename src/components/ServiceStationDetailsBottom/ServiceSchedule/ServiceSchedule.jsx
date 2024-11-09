import css from './ServiceSchedule.module.css'

export default function ServiceSchedule({ stationId }) {
  return (
    <div className={css.scheduleWrapper}>
      Налаштування робочого графіка:{stationId}
    </div>
  );
};
