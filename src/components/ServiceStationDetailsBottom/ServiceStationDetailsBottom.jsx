import { useEffect, useState } from "react";
import ServiceNavigation from "./ServiceNavigation/ServiceNavigation";
import css from "./ServiceStationDetailsBottom.module.css";
import StationPart from "./StationPart/StationPart";
import StaffPart from "./StaffPart/StaffPart";
import PricePart from "./PricePart/PricePart";
import SparesPart from "./SparesPart/SparesPart";
import WarehousePart from "./WarehousePart/WarehousePart";
import DistributorsPart from "./DistributorsPart/DistributorsPart";
import RatingPart from "./RatingPart/RatingPart";
import CheckoutPart from "./CheckoutPart/CheckoutPart";
import PlanPart from "./PlanPart/PlanPart";
import { useDispatch } from "react-redux";
import { getAllEmployees, getPosts } from "../../redux/settings/operations.js";
import { useSelector } from "react-redux";
import { selectedServiceInSettingsId } from "../../redux/service/selectors.js";

const pageComponents = {
  plan: <PlanPart />,
  station: <StationPart />,
  staff: <StaffPart />,
  price: <PricePart />,
  spares: <SparesPart />,
  warehouse: <WarehousePart />,
  checkout: <CheckoutPart />,
  distributors: <DistributorsPart />,
  migration: "",
  rating: <RatingPart />,
  integration: "",
};

export default function ServiceStationDetailsBottom({ isAccordionExpanded }) {
  const [page, setPage] = useState("station");
  // const selectedServiceInSettings = useSelector(selectedServiceInSettingsId);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!selectedServiceInSettings) {
  //     console.log("Waiting for selectedServiceInSettings to be available...");
  //     return;
  //   }

  //   const fetchData = async () => {
  //     try {
  //       console.log("Fetching data with ID:", selectedServiceInSettings);
  //       await dispatch(getAllEmployees(selectedServiceInSettings)).unwrap();
  //       await dispatch(getPosts(selectedServiceInSettings)).unwrap();
  //     } catch (error) {
  //       console.error("Помилка завантаження даних:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, selectedServiceInSettings]);

  const getChangeablePartClass = () => {
    return page === "warehouse" ? css.noBackground : css.changeablePart;
  };

  return (
    <div
      className={`${css.bottomPartBox} ${
        isAccordionExpanded ? css.reducedHeight : css.fullHeight
      }`}
    >
      <ServiceNavigation page={page} setPage={setPage} />

      {/* Рендеринг вибраної частини сторінки */}
      <div
        className={`${getChangeablePartClass()} ${
          isAccordionExpanded
            ? css.reducedChangeableHeight
            : css.fullChangeableHeight
        }`}
      >
        {pageComponents[page]}
      </div>
    </div>
  );
}
