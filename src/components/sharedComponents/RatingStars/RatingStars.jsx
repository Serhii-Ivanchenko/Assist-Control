import { AiFillStar } from "react-icons/ai";
import styles from "./RatingStars.module.css";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function RatingStars({ rating }) {
  const getStarElements = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <AiFillStar key={i} color="var(--star-orange)" size={14.5} />
        );
      } else if (rating > i - 1 && rating < i) {
        stars.push(
          <FaRegStarHalfStroke key={i} color="var(--star-orange)" size={14.5} />
        );
      } else {
        stars.push(
          <AiFillStar key={i} color="var(--star-white)" size={14.5} />
        );
      }
    }
    return stars;
  };

  const parsedRating =
    rating && rating !== "Немає рейтингу" ? parseFloat(rating) : 0;

  return <div className={styles.rating}>{getStarElements(parsedRating)}</div>;
}
