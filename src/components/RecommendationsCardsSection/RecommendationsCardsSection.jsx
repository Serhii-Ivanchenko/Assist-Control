import { carsInRecomendations } from '../../utils/dataToRender';
import RecommendationsCardsList from './RecommendationsCardsList/RecommendationsCardsList';
import css from './RecommendationsCardsSection.module.css';

export default function RecommendationsCardsSection() {
  // Отримуємо 4 унікальні дати
  const uniqueDates = [
    ...new Set(carsInRecomendations.map(car => car.date.split('T')[0]))
  ].slice(0, 4);

  // Групуємо машини за датами
  const carsByDate = uniqueDates.map(date => {
    return {
      date,
      cars: carsInRecomendations.filter(car => car.date.startsWith(date))
    };
  });

  return (
    <div className={css.wrapper}>
      {carsByDate.map(({ date, cars }) => (
        <div key={date} className={css.column}>
          <h3 className={css.columnTitle}>{date}</h3>
          <RecommendationsCardsList cars={cars} />
        </div>
      ))}
    </div>
  );
}
