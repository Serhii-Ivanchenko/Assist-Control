import Slider from "react-slick";
import css from "./VideoFrame.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BsCameraVideoOffFill } from "react-icons/bs";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";

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
  const cameraLink = [
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

  const handleChangeCamera = (src, url) => {
    setVideoImgSrc((prev) => {
      // Перевіряємо, чи є вже елемент з таким URL
      const currentCamera = prev.find((item) => item.url === url);

      if (currentCamera) {
        // Якщо камера знайдена, оновлюємо її src
        return prev.map((item) => (item.url === url ? { ...item, src } : item));
      } else {
        // Якщо камери з таким URL ще немає, додаємо нову
        return [...prev, { src, url }];
      }
    });
  };

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 3000;
  const reconnectAttempts = useRef({});

  const connectWebSocket = (camera) => {
    const { cameraLink, index } = camera;
    let ws = new WebSocket(cameraLink);
    ws.binaryType = "arraybuffer"; // Приймаємо бінарні дані (зображення)

    ws.onopen = () => {
      console.log(`Connected to camera ${index}`);
      reconnectAttempts.current[cameraLink] = 0; // Скидаємо лічильник спроб
    };

    ws.onmessage = (event) => {
      const arrayBuffer = event.data;
      const img = new Image();
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
      img.src = URL.createObjectURL(blob);
      handleChangeCamera(img.src, cameraLink);
      setIsZoomed(true);
    };

    ws.onclose = (e) => {
      console.warn(`Connection closed for camera ${index}`, e);
      attemptReconnect(camera); // Пробуємо перепідключитися
    };

    ws.onerror = (e) => {
      console.error(`WebSocket error for camera ${index}`, e);
      ws.close(); // Закриваємо з'єднання у разі помилки
    };

    return ws;
  };

  const attemptReconnect = (camera) => {
    const { cameraLink } = camera;
    const attempts = reconnectAttempts.current[cameraLink] || 0;

    if (attempts < MAX_RECONNECT_ATTEMPTS) {
      console.log(
        `Attempting to reconnect to ${cameraLink}... (${attempts + 1})`
      );
      reconnectAttempts.current[cameraLink] = attempts + 1;

      setTimeout(() => {
        connectWebSocket(camera); // Повторюємо підключення
      }, RECONNECT_INTERVAL);
    } else {
      console.error(`Max reconnect attempts reached for ${cameraLink}`);
    }
  };

  useEffect(() => {
    const sockets = cameraLink.map(connectWebSocket);

    return () => {
      sockets.forEach((ws) => ws.close()); // Закриваємо всі WebSocket при розмонтуванні
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

  function CameraModal({ img, modalState, someRef }) {
    if (modalState === "UNLOADING") {
      handleZoomChange(false);
    }
    const handleCloseModal = () => {
      handleZoomChange(false);
    };

    useEffect(() => {
      if (modalState === "LOADING") {
        document.addEventListener("mousedown", handleCloseModal);
      } else {
        document.removeEventListener("mousedown", handleCloseModal); // Видаляємо слухач події
      }
      return () => {
        document.removeEventListener("mousedown", handleCloseModal); // При розмонтуванні видаляємо слухач
      };
    }, [modalState]);

    return (
      <div className={css.zoomImg}>
        <div ref={someRef} className={css.zoomImgCont}>
          <img src={img.props.src} />
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
                <Loader />
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}
