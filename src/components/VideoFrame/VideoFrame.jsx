import Slider from "react-slick";
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

function SampleNextArrow({ currentSlide, slideCount, onClick }) {
  if (currentSlide === slideCount - 1) return null;
  return <IoIosArrowForward className={css.arrowNext} onClick={onClick} />;
}

function SamplePrevArrow({ currentSlide, onClick }) {
  if (!currentSlide) return null;
  return <IoIosArrowBack className={css.arrowPrev} onClick={onClick} />;
}

export default function VideoFrame() {
  const [videoImgSrc, setVideoImgSrc] = useState([]);
  console.log(videoImgSrc);
  const camersLink = [
    {
      index: "1",
      cameraLink: "wss://cam.assist.cam/camera1/ws/video_feed",
      alt: "camera1",
    },
    {
      index: "2",
      cameraLink: "wss://cam.assist.cam/camera2/ws/video_feed",
      alt: "camera2",
    },
  ];
  const handleChangeCamers = (src, url) => {
    if (!videoImgSrc.length) setVideoImgSrc([...videoImgSrc, { src, url }]);
    const currenCamera = videoImgSrc.find((item) => item.url === url);

    if (currenCamera) {
      const arr = videoImgSrc.map((item) => {
        if (item.url === url) {
          item.src = src;
        }
        return item;
      });
      setVideoImgSrc(arr);
    } else {
      setVideoImgSrc(videoImgSrc.push({ src, url }));
    }
  };
  useEffect(() => {
    let ws;
    camersLink.map(({ cameraLink }) => {
      ws = new WebSocket(cameraLink);
      ws.binaryType = "arraybuffer"; // Установлюємо тип даних для бінарних файлів
      ws.CONNECTING
      ws.onopen = (e) => {
        console.log("server was started", e);
      };
      ws.onmessage = (event) => {
        const arrayBuffer = event.data;
        const img = new Image();
        const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
        img.src = URL.createObjectURL(blob);
        handleChangeCamers(img.src, event.currentTarget.url);
        setIsZoomed(true);
      };
      ws.onclose = () => {
        ws.close();
        console.log("Server is closed");
      };
      ws.onerror = () => {
        ws.close();
        console.log("Server has error");
      };
    });
    return () => {
      ws.close();
    };
  }, []);

  const image = useRef();
  const parentRef = useRef();
  const smallCamera = useRef();

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
            {videoImgSrc.length ? (
              videoImgSrc.map(({ src }) => (
                <div ref={parentRef} key={src} className={css.camera}>
                  <div className={css.zoomIcon}>
                    <VscZoomIn
                      style={{ width: "100%", height: "100%" }}
                      cursor={"pointer"}
                      onClick={() => smallCamera.current.click()}
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
                      <img ref={smallCamera} src={src} alt={src} />
                    </Zoom>
                  ) : (
                    <img src={src} alt={src} />
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
