/* eslint-disable react/display-name */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import clsx from "clsx";

import { BsExclamationCircle } from "react-icons/bs";
import { BsWrench } from "react-icons/bs";
import { BsEyeFill, BsCheckCircleFill } from "react-icons/bs";
import { BsUiChecksGrid } from "react-icons/bs";

import { getCurrentCars } from "../../redux/cars/operations.js";
import { selectCurrentCars } from "../../redux/cars/selectors.js";
import { selectSelectedServiceId } from "../../redux/auth/selectors.js";
import { getStatusDetails } from "../../utils/getStatusDetails.js";
import { renderTime } from "../../utils/renderTime.jsx";

import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import StatusBtn from "../sharedComponents/StatusBtn/StatusBtn.jsx";
import CarDetailButton from "../sharedComponents/CarDetailButton/CarDetailButton.jsx";
import styles from "./CurrentCarsItem.module.css";

export default function CurrentCarsItem() {
  const [isMonitoring, setisMonitoring] = useState("main");

  const dispatch = useDispatch();
  const currentCars = useSelector(selectCurrentCars);

  const selectedServiceId = useSelector(selectSelectedServiceId);

  useEffect(() => {
    if (!selectedServiceId) {
      // console.warn("Service ID is not available yet. Skipping fetch.");
      return;
    }

    dispatch(getCurrentCars())
      .unwrap()
      .catch((error) => {
        toast.error(
          "Помилка при завантаженні поточних автомобілів",
          error.message
        );
      });
  }, [dispatch, selectedServiceId]);

  const getStatusIcon = useMemo(() => {
    return (status) => {
      switch (status) {
        case "new":
          return (
            <BsExclamationCircle
              stroke="var(--light-gray)"
              fill="var(--light-gray)"
            />
          );
        case "repair":
          return (
            <BsWrench stroke="var(--light-gray)" fill="var(--light-gray)" />
          );
        case "complete":
          return (
            <BsCheckCircleFill
              stroke="var(--light-gray)"
              fill="var(--light-gray)"
            />
          );
        case "diagnostic":
          return (
            <BsUiChecksGrid
              stroke="var(--light-gray)"
              fill="var(--light-gray)"
            />
          );
        case "view_repair":
          return (
            <BsEyeFill stroke="var(--light-gray)" fill="var(--light-gray)" />
          );

        default:
          return null;
      }
    };
  }, []);

  const renderedCars = useMemo(() => {
    return currentCars?.map((car) => {
      const icon = getStatusIcon(car.status);
      const { label, className } = getStatusDetails(styles, car.status, icon);
      return (
        <div className={clsx(styles.wrapper, className)} key={car.car_id}>
          <div className={styles.imgContainer}>
            <img
              className={styles.carImg}
              src={car?.photo_url || absentAutoImg}
              alt="Car image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = absentAutoImg;
              }}
            />
          </div>
          <div className={styles.carInfoContainer}>
            <p className={styles.carBrand}>
              {car.auto || "Марку не визначено"}
            </p>
            <h3 className={styles.carReg}>{car.plate}</h3>
            <h4 className={styles.carTimeStamp}>
              {renderTime(car.complete_d, car.date_s)}
            </h4>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.btnContainer}>
              <StatusBtn car={car} />
              <CarDetailButton
                carId={car.car_id}
                // location={isMonitoring}
                carName={car.auto}
              />
            </div>
            <div className={styles.statusContainer}>
              <p className={clsx(styles.carStatus, className)}>
                {icon} {label}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }, [currentCars, getStatusIcon]);

  return <>{renderedCars}</>;
}
