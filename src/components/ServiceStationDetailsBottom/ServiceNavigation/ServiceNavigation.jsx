import css from "./ServiceNavigation.module.css";
import clsx from "clsx";
import { useRef } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
// import { IoStarSharp } from "react-icons/io5";
import RatingStars from "../../sharedComponents/RatingStars/RatingStars";
import { useSelector } from "react-redux";
import {
  selectEmployees,
  selectPosts,
} from "../../../redux/settings/selectors";

// const GoPrevArrow = ({ onClick }) => {
//     return(
//         <span className={css.arrowBtn} onClick={onClick}>
//             <BsChevronLeft className={css.arrow} size={18} />
//         </span>
//     )
// }

// const GoNextArrow = ({ onClick }) => {
//     return (
//         <span className={css.arrowBtn} onClick={onClick}>
//             <BsChevronRight className={css.arrow} size={18} />
//         </span>
//     )
// }

export default function ServiceNavigation({ page, setPage }) {
  const sliderRef = useRef(null);
  const posts = useSelector(selectPosts);
  const employees = useSelector(selectEmployees);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    // nextArrow: <GoPrevArrow/>,
    // prevArrow:  <GoNextArrow/>
  };

  const prevSlide = () => sliderRef.current.slickPrev();
  const nextSlide = () => sliderRef.current.slickNext();

  return (
    <div className={css.navSettings}>
      <button type="button" className={css.arrowBtn} onClick={prevSlide}>
        {" "}
        <BsChevronLeft className={css.arrow} size={18} />{" "}
      </button>

      {/* <div className={css.sliderContainer}>  */}
      <Slider
        {...settings}
        className={`${css.btnBox} slick-slider`}
        ref={sliderRef}
      >
        <button
          type="button"
          onClick={() => setPage("plan")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "plan",
          })}
        >
          <p className={css.title}>ПЛАН</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("station")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "station",
          })}
        >
          <p className={css.title}>ПОСТИ</p>
          <p className={css.value}>{posts.length}</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("staff")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "staff",
          })}
        >
          <p className={css.title}>ПЕРСОНАЛ</p>
          <p className={css.value}>{employees.length}</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("price")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "price",
          })}
        >
          <p className={css.title}>ПРАЙС</p>
          <p className={`${css.value} ${css.valueWords}`}>роботи</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("spares")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "spares",
          })}
        >
          <p className={css.title}>НАЦІНКА</p>
          <p className={`${css.value} ${css.valueWords}`}>запчастини</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("warehouse")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "warehouse",
          })}
        >
          <p className={css.title}>СКЛАД</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("checkout")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "checkout",
          })}
        >
          <p className={css.title}>КАСА</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("distributors")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "distributors",
          })}
        >
          <p className={`${css.title} ${css.titleDist}`}>ПОСТАЧАЛЬНИКИ</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("rating")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "rating",
          })}
        >
          <div className={css.ratingBtn}>
            <p className={`${css.title} ${css.titleDist}`}>РЕЙТИНГ</p>
            <RatingStars rating={5} ratingGap={css.ratingGap} />

            {/* <div className={css.rating}>
              <IoStarSharp color="var(--star-orange)" size={13} />
              <IoStarSharp color="var(--star-orange)" size={13} />
              <IoStarSharp color="var(--star-orange)" size={13} />
              <IoStarSharp color="var(--star-orange)" size={13} />
              <IoStarSharp color="var(--star-orange)" size={13} />
            </div> */}
          </div>
        </button>
        <button
          type="button"
          onClick={() => setPage("migration")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "migration",
          })}
        >
          <p className={`${css.title} ${css.titleDist}`}>МІГРАЦІЯ</p>
        </button>
        <button
          type="button"
          onClick={() => setPage("integration")}
          className={clsx(css.btnService, {
            [css.isActiveBtn]: page === "integration",
          })}
        >
          <p className={`${css.title} ${css.titleDist}`}>ІНТЕГРАЦІЇ</p>
        </button>
      </Slider>
      {/* </div> */}
      <button type="button" className={css.arrowBtn} onClick={nextSlide}>
        {" "}
        <BsChevronRight className={css.arrow} size={18} />{" "}
      </button>
    </div>
  );
}
