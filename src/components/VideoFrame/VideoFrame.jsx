import Slider from "react-slick";
import cameraView from "../../assets/images/cameraView.png";
import car from "../../assets/images/car.png";
import css from "./VideoFrame.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { VscZoomIn } from "react-icons/vsc";
import { BsCameraVideoOffFill } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  console.log(props);
  const { currentSlide, slideCount, onClick } = props;
  if (currentSlide === slideCount - 1) return null;
  return <IoIosArrowForward className={css.arrowNext} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { currentSlide, onClick } = props;
  if (!currentSlide) return null;
  return <IoIosArrowBack className={css.arrowPrev} onClick={onClick} />;
}
export default function VideoFrame() {
  const settings = {
    dots: true,
    dotsClass: "dots",
    infinite: false,
    arrows: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={css.cameraList}>
      <div className={css.zoomIcon}>
        <VscZoomIn size={20} />
      </div>
      <Slider {...settings}>
        <div className={css.camera}>
          <img src={cameraView} alt="" />
        </div>
        <div className={css.camera}>
          <img src={cameraView} alt="" />
        </div>
        <div className={css.camera}>
          <img src={car} alt="" />
        </div>
        <div className={css.camera}>
          <BsCameraVideoOffFill size={58} />
          <h3>Немає сигналу</h3>
        </div>
      </Slider>
    </div>
  );
}
