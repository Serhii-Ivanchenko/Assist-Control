import { useState } from "react";
import ServiceNavigation from "./ServiceNavigation/ServiceNavigation";
import css from "./ServiceStationDetailsBottom.module.css";
import StationPart from "./StationPart/StationPart";
import StaffPart from "./StaffPart/StaffPart";
import PricePart from "./PricePart/PricePart";
import SparesPart from "./SparesPart/SparesPart";
import WarehousePart from "./WarehousePart/WarehousePart";

export default function ServiceStationDetailsBottom() {
  const [page, setPage] = useState("station");
  return (
    <div className={css.bottomPartBox}>
      <ServiceNavigation page={page} setPage={setPage} />

      <div className={css.changeablePart}>
        {page === "station" && <StationPart />}
        {page === "staff" && <StaffPart />}
        {page === "price" && <PricePart />}
        {page === "spares" && <SparesPart />}
        {page === "warehouse" && <WarehousePart />}
        {page === "checkout" && ""}
        {page === "distributors" && ""}
      </div>
    </div>
  );
}
