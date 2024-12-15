import Slider from "react-slick";
import css from "./VideoFrame.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import {
  BsFillCameraVideoOffFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";

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
  useEffect(() => {
    const numrebOfCamers = 3;
    for (let i = 1; i <= numrebOfCamers; i++) {
      const objWithIndex = { index: i };
      setVideoImgSrc((prev) => [...prev, objWithIndex]);
    }
    return () => setVideoImgSrc([]);
  }, []);
  const cameraLink = [
    {
      index: "1",
      url: "wss://cam.assist.cam/camera1/ws/video_feed",
      alt: "camera1",
    },
    {
      index: "2",
      url: "wss://cam.assist.cam/camera2/ws/video_feed",
      alt: "camera2",
    },
  ];

  const handleChangeCamera = (src, url, index, err) => {
    setVideoImgSrc((prev) => {
      // Перевіряємо, чи є вже елемент з таким index
      const currentCamera = prev.find(
        (item) => Number(item.index) === Number(index)
      );
      if (err) {
        return prev.map((item) => {
          return item.index === currentCamera.index
            ? { ...currentCamera, url, err }
            : item;
        });
      }

      if (currentCamera.src) {
        return prev.map((item) =>
          item.index === currentCamera.index ? { ...item, src } : item
        );
      } else {
        return prev.map((item) =>
          item.index === currentCamera.index
            ? { ...currentCamera, src, url }
            : item
        );
      }
    });
  };

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 3000;
  const reconnectAttempts = useRef({});

  const connectWebSocket = (camera) => {
    const { url, index } = camera;
    let ws = new WebSocket(url);
    ws.binaryType = "arraybuffer"; // Приймаємо бінарні дані (зображення)

    ws.onopen = () => {
      console.log(`Connected to camera ${index}`);
      reconnectAttempts.current[url] = 0; // Скидаємо лічильник спроб
    };

    ws.onmessage = (event) => {
      const arrayBuffer = event.data;
      const img = new Image();
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
      img.src = URL.createObjectURL(blob);
      handleChangeCamera(img.src, url, index);
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
    const { url, index } = camera;
    const attempts = reconnectAttempts.current[url] || 0;
    if (attempts < MAX_RECONNECT_ATTEMPTS) {
      console.log(`Attempting to reconnect to ${url}... (${attempts + 1})`);
      reconnectAttempts.current[url] = attempts + 1;

      setTimeout(() => {
        connectWebSocket(camera); // Повторюємо підключення
      }, RECONNECT_INTERVAL);
    } else {
      console.error(`Max reconnect attempts reached for ${url}`);
      handleChangeCamera(false, url, index, true);
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
      <Slider {...settings}>
        {videoImgSrc.map(({ src, url, index, err }) =>
          src ? (
            <div ref={parentRef} key={index} className={css.camera}>
              {isZoomed ? (
                <Zoom
                  className={css.zoom}
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
                  <img
                    ref={smallCamera}
                    className={css.smallCameraImg}
                    src={src}
                    alt={src}
                  />
                </Zoom>
              ) : (
                <img src={src} alt={src} />
              )}
            </div>
          ) : err ? (
            <div key={index} className={`${css.camera} ${css.centeredContent}`}>
              <BsFillCameraVideoOffFill size={60} />
              <p>Something was wrong please refresh camera</p>
              <button
                className={css.refreshBtn}
                onClick={() => {
                  setVideoImgSrc((prev) =>
                    prev.map((item) => {
                      if (item.index === Number(index)) {
                        return { index };
                      } else {
                        return item;
                      }
                    })
                  );
                  connectWebSocket({ url, index });
                }}
              >
                <BsArrowCounterclockwise /> Refresh
              </button>
            </div>
          ) : (
            <div key={index} className={`${css.camera} ${css.centeredContent}`}>
              <Loader />
            </div>
          )
        )}
      </Slider>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
