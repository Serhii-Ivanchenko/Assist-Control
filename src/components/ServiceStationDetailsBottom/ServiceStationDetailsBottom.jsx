import { useState } from "react";
import ServiceNavigation from "./ServiceNavigation/ServiceNavigation";
import css from "./ServiceStationDetailsBottom.module.css";
import StationPart from "./StationPart/StationPart";
import StaffPart from "./StaffPart/StaffPart";
import PricePart from "./PricePart/PricePart";
import SparesPart from "./SparesPart/SparesPart";
import WarehousePart from "./WarehousePart/WarehousePart";
import DistributorsPart from "./DistributorsPart/DistributorsPart";

const pageComponents = {
  station: <StationPart />,
  staff: <StaffPart />,
  price: <PricePart />,
  spares: <SparesPart />,
  warehouse: <WarehousePart />,
  distributors: <DistributorsPart />,
};

export default function ServiceStationDetailsBottom() {
  const [page, setPage] = useState("station");

  const getChangeablePartClass = () => {
    if (page === "distributors") {
      return css.noBackground;
    }
    return css.changeablePart;
  };

  return (
    <div className={css.bottomPartBox}>
      <ServiceNavigation page={page} setPage={setPage} />

      <div className={getChangeablePartClass()}>{pageComponents[page]}</div>
    </div>
  );
}
