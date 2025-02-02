import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ServiceStationItem from "../ServiceStationItem/ServiceStationItemItem";
import { BsPlusCircleDotted } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import styles from "./ServiceStationList.module.css";
import AddAutoServiceModal from "../Modals/AddAutoServiceModal/AddAutoServiceModal";
import Modal from "../Modals/Modal/Modal";
import { useSelector } from "react-redux";
import { selectAllServices } from "../../redux/service/selectors";
import { useDispatch } from "react-redux";
import { setSelectedServiceInSettingsId } from "../../redux/service/slice";

function ServiceStationList({ activeStationId, setActiveStationId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stations = useSelector(selectAllServices);
  const dispatch = useDispatch();

  const handleAddBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const containerRef = useRef(null); // Ссилка на контейнер
  const [isScrolled, setIsScrolled] = useState(false); // Стан для перевірки наявності скролу

  useLayoutEffect(() => {
    const handleResizeOrScroll = () => {
      // Перевірка наявності вертикального скролу
      if (containerRef.current) {
        const hasVerticalScroll =
          containerRef.current.scrollHeight > containerRef.current.clientHeight;
        setIsScrolled(hasVerticalScroll);
      }
    };

    // Викликаємо при завантаженні, зміні розміру чи скролі
    handleResizeOrScroll();
    const observer = new ResizeObserver(handleResizeOrScroll);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
    // window.addEventListener("resize", handleResizeOrScroll);
    // if (containerRef.current) {
    //   containerRef.current.addEventListener("scroll", handleResizeOrScroll);
    // }

    // // Очищення ефекту
    // return () => {
    //   window.removeEventListener("resize", handleResizeOrScroll);
    //   if (containerRef.current) {
    //     containerRef.current.removeEventListener(
    //       "scroll",
    //       handleResizeOrScroll
    //     );
    //   }
    // };
  }, []);

  // const stations = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       name: "AvtoAtmosfera Cherkasy",
  //     },
  //     {
  //       id: 2,
  //       name: "GCAR Kyiv",
  //     },
  //   ],
  //   []
  // );

  useEffect(() => {
    if (stations.length > 0 && activeStationId === null) {
      setActiveStationId(stations[0].id);
    }
  }, [stations, activeStationId, setActiveStationId]);

  const handleToggle = (id) => {
    setActiveStationId((prevId) => (prevId === id ? null : id));
    dispatch(setSelectedServiceInSettingsId(id));
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.wrapper} ref={containerRef}>
        <div
          className={`${styles.leftContainer} ${
            isScrolled && styles.leftContainerScrolled
          }`}
        >
          {stations.map((station) => (
            <div key={station.id} className={styles.serviceStationWrapper}>
              <ServiceStationItem
                // id={station.id}
                // name={station.name}
                station={station}
                isOpen={activeStationId === station.id}
                onToggle={() => handleToggle(station.id)}
                isActive={activeStationId === station.id}
              />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.addBtn} onClick={handleAddBtnClick}>
        <BsPlusCircleDotted className={styles.icon} />
        <BsHouseFill className={styles.icon} />
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <AddAutoServiceModal
            onClose={handleCloseModal}
            createAutoService={true}
          />
        </Modal>
      )}
    </div>
  );
}

export default ServiceStationList;
