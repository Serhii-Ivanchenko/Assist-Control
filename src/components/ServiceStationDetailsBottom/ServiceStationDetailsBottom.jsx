import { useState } from "react";
import ServiceNavigation from "./ServiceNavigation/ServiceNavigation";
import css from "./ServiceStationDetailsBottom.module.css"
import StationPart from "./StationPart/StationPart";
import StaffPart from "./StaffPart/StaffPart";

export default function ServiceStationDetailsBottom() {
    const [page, setPage] = useState("station")
    return (
        <div className={css.bottomPartBox}>
            <ServiceNavigation page={page} setPage={setPage} />
            
            <div className={css.changeablePart}>
                {page === "station" && <StationPart/>}
                {page === "staff" && <StaffPart/>}
                {page === "done" && ""}
                {page === "spares" && ""}
            </div>

        </div>

    )
}