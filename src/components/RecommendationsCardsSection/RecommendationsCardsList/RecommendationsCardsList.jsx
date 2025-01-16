import RecommendationsCardsItem from "../RecommendationsCardsItem/RecommendationsCardsItem.jsx";
import styles from "./RecommendationsCardsList.module.css";

export default function RecommendationsCardsList({ cars }) {
  return (
    <div className={styles.crmBlockDayCarsListContainer}>
      <ul className={styles.crmCarList}>
        {cars.map((car) => (
          <RecommendationsCardsItem key={car.id} car={car} />
        ))}
      </ul>
    </div>
  );
}
