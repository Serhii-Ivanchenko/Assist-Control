import Slider from "react-slick";
import cameraView from "../../assets/images/cameraView.png";
import car from "../../assets/images/car.png";
import road from "../../assets/images/pexels-photo-1563355.jpeg";
import css from "./VideoFrame.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { VscZoomIn } from "react-icons/vsc";
import { VscZoomOut } from "react-icons/vsc";
import { BsCameraVideoOffFill } from "react-icons/bs";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useEffect, useState } from "react";

function SampleNextArrow(props) {
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
  const [isZoomed, setIsZoomed] = useState(false);
  const handleOpenModal = () => setIsZoomed(true);
  const changeZoom = () => setIsZoomed(!isZoomed);
  console.log(isZoomed);

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
  function CameraModal({ changeZoom, modalState }) {
    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          changeZoom();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [changeZoom]);

    if (modalState === "UNLOADING") {
      changeZoom();
    }
    return (
      <div className={css.zoomImgCont}>
        <div className={css.zoomImg}>
          <div className={css.onZoomIcon}>
            <VscZoomOut
              cursor={"pointer"}
              size={40}
              onClick={() => setIsZoomed(false)}
            />
          </div>
          <InnerImageZoom src={road} zoomType="click" zoomScale={3} />
        </div>
      </div>
    );
  }
  return (
    <div className={css.cameraListCont}>
      <div className={css.cameraList}>
        <div className={css.zoomIcon}>
          <VscZoomIn
            cursor={"pointer"}
            size={20}
            onClick={() => handleOpenModal()}
          />
        </div>
        <Slider {...settings}>
          <div className={css.camera}>
            {isZoomed ? (
              <Zoom
                isZoomed={isZoomed}
                onZoomChange={changeZoom}
                zoomImg={<InnerImageZoom src={road} zoomType="click" />}
                ZoomContent={({ img, buttonUnzoom, modalState }) => (
                  <CameraModal
                    changeZoom={changeZoom}
                    img={img}
                    buttonUnzoom={buttonUnzoom}
                    modalState={modalState}
                  />
                )}
              >
                <img src={road} alt="" width={{ width: 100 }} />
              </Zoom>
            ) : (
              <img src={road} alt="" width={{ width: 100 }} />
            )}
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
    </div>
  );
}
