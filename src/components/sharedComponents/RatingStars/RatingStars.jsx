import { AiFillStar } from "react-icons/ai";
import styles from "./RatingStars.module.css";

export default function RatingStars({ rating, ratingGap, sizestar }) {
 
  const iconSize = sizestar !== undefined ? sizestar : "14,5px";
  
  const getStarElements = (rating) => {
  
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <div key={i} className={styles.fullStar} style={{width: iconSize, height: iconSize}}>
            <AiFillStar /> 
          </div>
        );
      } else if (rating > i - 1 && rating < i) {
        stars.push(
          <div key={i} className={styles.halfStar} style={{width: iconSize, height: iconSize}}>
            <AiFillStar className={styles.halfFilled} />
            <AiFillStar className={styles.halfEmpty} />
          </div>
        );
      } else {
        stars.push(
          <div key={i} className={styles.emptyStar} style={{width: iconSize, height: iconSize}}>
            <AiFillStar />
          </div>
        );
      }
    }
    return stars;
  };

  const parsedRating =
    rating && rating !== "Немає рейтингу" ? parseFloat(rating) : 5;

  return (
    <div className={`${styles.rating} ${ratingGap}`}>
      {getStarElements(parsedRating)}
    </div>
  );
}
