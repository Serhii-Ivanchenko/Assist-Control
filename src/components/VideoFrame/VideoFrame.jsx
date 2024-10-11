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
import { useEffect, useRef, useState } from "react";

const carArr = [
  {
    img: road,
    alt: "road",
  },
  {
    img: cameraView,
    alt: "camera View",
  },
  {
    img: car,
    alt: "car",
  },
];
function SampleNextArrow({ currentSlide, slideCount, onClick }) {
  if (currentSlide === slideCount - 1) return null;
  return <IoIosArrowForward className={css.arrowNext} onClick={onClick} />;
}

function SamplePrevArrow({ currentSlide, onClick }) {
  if (!currentSlide) return null;
  return <IoIosArrowBack className={css.arrowPrev} onClick={onClick} />;
}

export default function VideoFrame() {
  useEffect(() => {
    const ws = new WebSocket("wss://37.27.221.244:7000/ws/video_feed");
    const secondWs = new WebSocket("wss://37.27.221.244:8000/ws/video_feed");
    ws.binaryType = "arraybuffer"; // Установлюємо тип даних для бінарних файлів
    secondWs.binaryType = "arraybuffer";
    ws.onopen = () => {
      console.log("server was started");
    };
    ws.onmessage = (event) => {
      console.log(event);
    };
    ws.onclose = () => {
      console.log("Server is closed");
    };
    ws.onerror = () => {
      console.log("Server has error");
    };
    secondWs.onopen = () => {
      console.log("server was started");
    };
    secondWs.onmessage = (event) => {
      console.log(event);
    };
    secondWs.onclose = () => {
      console.log("Server is closed");
    };
    secondWs.onerror = () => {
      console.log("Server has error");
    };
    return () => {
      ws.close();
      secondWs.close();
    };
  }, []);

  let image = useRef();
  let parentRef = useRef();
  const [isZoomed, setIsZoomed] = useState(false);
  useEffect(() => {
    if (!isZoomed) {
      setIsZoomed(true);
    }
  }, [isZoomed]);
  const handleZoomChange = (shouldZoom) => {
    setIsZoomed(shouldZoom);
  };
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
  function CameraModal({ img, modalState, someRef, parentRef }) {
    if (modalState === "UNLOADING") {
      handleZoomChange(false);
    }
    const handleClickOutImg = (event) => {
      if (!someRef.current && !parentRef.current.contains(event.target)) {
        handleZoomChange(false);
      }
    };
    useEffect(() => {
      if (modalState === "LOADING") {
        document.addEventListener("mousedown", handleClickOutImg);
      } else {
        document.removeEventListener("mousedown", handleClickOutImg); // Видаляємо слухач події
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutImg); // При розмонтуванні видаляємо слухач
      };
    }, [modalState]);
    return (
      <div className={css.zoomImg}>
        <div ref={someRef} className={css.zoomImgCont}>
          <div className={css.onZoomIcon}>
            <VscZoomOut
              cursor={"pointer"}
              size={40}
              onClick={() => handleZoomChange(false)}
            />
          </div>
          <InnerImageZoom src={img.props.src} zoomType="click" zoomScale={2} />
        </div>
      </div>
    );
  }
  return (
    <div className={css.cameraListCont}>
      <div className={css.cameraList}>
        <div className={css.cameraCont}>
          <Slider {...settings}>
            {carArr.length ? (
              carArr.map(({ img, alt }) => (
                <div ref={parentRef} key={alt} className={css.camera}>
                  <div className={css.zoomIcon}>
                    <VscZoomIn
                      style={{ width: "100%", height: "100%" }}
                      cursor={"pointer"}
                      onClick={() => handleZoomChange(true)}
                    />
                  </div>
                  {isZoomed ? (
                    <Zoom
                      onZoomChange={handleZoomChange}
                      isZoomed={isZoomed}
                      ZoomContent={({ img, modalState }) => (
                        <CameraModal
                          modalState={modalState}
                          img={img}
                          someRef={image}
                          parentRef={parentRef}
                        />
                      )}
                    >
                      <img src={img} alt={alt} />
                    </Zoom>
                  ) : (
                    <img src={img} alt={alt} />
                  )}
                </div>
              ))
            ) : (
              <div className={css.camera}>
                <BsCameraVideoOffFill size={58} />
                <h3>Немає сигналу</h3>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}
