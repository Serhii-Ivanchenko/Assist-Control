import RecommendationsCardsItem from "../RecommendationsCardsItem/RecommendationsCardsItem.jsx";
import styles from "./RecommendationsCardsList.module.css";

export default function RecommendationsCardsList({ cars, isRecommendation }) {
  return (
    // <div className={styles.carsListContainer}>
    <ul className={styles.crmCarList}>
      {cars.map((car) => (
        <RecommendationsCardsItem
          key={car.id}
          car={car}
          isRecommendation={isRecommendation}
        />
      ))}
    </ul>
    // </div>
  );
}
