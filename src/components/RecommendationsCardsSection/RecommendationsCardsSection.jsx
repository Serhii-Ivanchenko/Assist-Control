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

  // Функція для визначення кольору контейнера з числом
  const getButtonColor = (carsCount) => {
    if (carsCount >= 3) return '#DB4C20';
    if (carsCount === 2) return '#DB8120';
    if (carsCount === 1) return '#A97742';
    return '#4A4A4A';
  };

  return (
    <div className={css.wrapper}>
      {carsByDate.map(({ date, cars }) => {
        const day = date.split('-')[2];
        const carsCount = cars.length;
        return (
          <div key={date} className={css.column}>
            <div 
              className={css.date} 
              style={{ backgroundColor: getButtonColor(carsCount) }}
            >
              {day}
            </div>
            <RecommendationsCardsList cars={cars} />
          </div>
        );
      })}
    </div>
  );
}
