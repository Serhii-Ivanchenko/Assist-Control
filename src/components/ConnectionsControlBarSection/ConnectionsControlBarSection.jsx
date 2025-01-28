import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector.jsx";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter.jsx";
import css from "./ConnectionsControlBarSection.module.css";
import renderStatusCommunication from "../../utils/renderStatusCommunication .jsx";
import { statusesCommunications } from "../../utils/dataToRender.js";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch.jsx";
import DownloadPdfButtonModalCar from "../sharedComponents/Pdf/DownloadPdfButtonModalCar/DownloadPdfButtonModalCar.jsx";
import { useState } from "react";

export default function ConnectionsControlBarSection() {
  const [periodStartData, setPeriodStartData] = useState(new Date());
  const [periodEndData, setPeriodEndData] = useState(new Date());
  const isFilter = true;

  const handleStatusChange = (status) => {
    console.log("Selected status:", status);
  };

  return (
    <div className={css.wrapper}>
      <RangeTimeSelector />
      <CalendarPeriodSelector
        periodStartData={periodStartData}
        periodEndData={periodEndData}
        handleInputChangeBeg={setPeriodStartData}
        handleInputChangeEnd={setPeriodEndData}
        isSingle={false}
      />
      <StatusFilter
        onStatusChange={handleStatusChange}
        renderStatus={(status) => renderStatusCommunication(status, css, isFilter)}
        statuses={statusesCommunications}
        isFilter={isFilter}
      />
      <div className={css.rightContainer}>
        <CarsSearch />
        <DownloadPdfButtonModalCar />
      </div>
    </div>
  );
}
