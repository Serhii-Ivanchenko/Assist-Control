import { AiFillStar } from "react-icons/ai";
import styles from "./RatingStars.module.css";

export default function RatingStars({ rating }) {
  const getStarElements = (rating) => {
    const stars = [];
   for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <div key={i} className={styles.fullStar}>
            <AiFillStar />
          </div>
        );
      } else if (rating > i - 1 && rating < i) {
        stars.push(
          <div key={i} className={styles.halfStar}>
            <AiFillStar className={styles.halfFilled} />
            <AiFillStar className={styles.halfEmpty} />
          </div>
        );
      } else {
        stars.push(
          <div key={i} className={styles.emptyStar}>
            <AiFillStar />
          </div>
        );
      }
    }
    return stars;
  };

  const parsedRating =
    rating && rating !== "Немає рейтингу" ? parseFloat(rating) : 2.5;

  return <div className={styles.rating}>{getStarElements(parsedRating)}</div>;
}
