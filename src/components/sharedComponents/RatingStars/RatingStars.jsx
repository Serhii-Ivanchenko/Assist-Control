// import { AiFillStar } from "react-icons/ai";
// import { IoStar, IoStarHalf, IoStarSharp } from "react-icons/io5";
import styles from "./RatingStars.module.css";
import { BsStarFill } from "react-icons/bs";

export default function RatingStars({ rating, ratingGap, sizestar }) {
  const iconSize = sizestar !== undefined ? sizestar : "14,5px";

  const getStarElements = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <div
            key={i}
            className={styles.fullStar}
            style={{ width: iconSize, height: iconSize }}
          >
            <BsStarFill />
          </div>
        );
      } else if (rating > i - 1 && rating < i) {
        stars.push(
          <div
            className={styles.halfStar}
            style={{ width: iconSize, height: iconSize }}
          >
            <BsStarFill className={styles.halfEmpty} />
            <div className={styles.halfFilled}>
              <BsStarFill />
            </div>
          </div>
        );
      } else {
        stars.push(
          <div
            key={i}
            className={styles.emptyStar}
            style={{ width: iconSize, height: iconSize }}
          >
            {<BsStarFill />}
          </div>
        );
      }
    }
    return stars;
  };

  const parsedRating =
    rating === 0 || rating === null
      ? 0
      : rating && rating !== "Немає рейтингу"
      ? parseFloat(rating)
      : 5;
  return (
    <div className={`${styles.rating} ${ratingGap}`}>
      {getStarElements(parsedRating)}
    </div>
  );
}
