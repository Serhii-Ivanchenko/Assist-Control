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
import { getAllEmployees } from "../../redux/settings/operations.js";

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

    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(getAllEmployees()).unwrap();
        } catch (error) {
          console.error("Помилка завантаження даних:", error);
        }
      };
      fetchData();
    }, [dispatch]);

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
