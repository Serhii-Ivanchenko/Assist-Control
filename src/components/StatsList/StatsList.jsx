import css from "./StatsList.module.css";
export default function StatsList() {
  return (
    <ul className={css.statsList}>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>0</p>
        <p className={css.statsItemTitle}>Всього</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>0</p>
        <p className={css.statsItemTitle}>Готово</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>0</p>
        <p className={css.statsItemTitle}>У ремонті</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>0</p>
        <p className={css.statsItemTitle}>На діагностиці</p>
      </li>
      <li className={css.statsItem}>
        <p className={css.statsItemValue}>0</p>
        <p className={css.statsItemTitle}>Нерозібрані</p>
      </li>
    </ul>
  );
}
