import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector.jsx";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter.jsx";
import css from "./ConnectionsControlBarSection.module.css";
import renderStatusCommunication from "../../utils/renderStatusCommunication .jsx";
import { statusesCommunications } from "../../utils/dataToRender.js";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch.jsx";
import DownloadPdfButtonModalCar from "../sharedComponents/Pdf/DownloadPdfButtonModalCar/DownloadPdfButtonModalCar.jsx";
import { useEffect, useState } from "react";

export default function ConnectionsControlBarSection({ onStatusChange, onStartDateChange, onEndDateChange }) {
  const [periodStartData, setPeriodStartData] = useState(new Date());
  const [periodEndData, setPeriodEndData] = useState(new Date());
  const isFilter = true;

  useEffect(() => {
    const normalizedStartDate = new Date(periodStartData);
    normalizedStartDate.setHours(0, 0, 0, 0);
  
    const normalizedEndDate = new Date(periodEndData);
    normalizedEndDate.setHours(23, 59, 59, 999);
  
    onStartDateChange(normalizedStartDate);
    onEndDateChange(normalizedEndDate);
  }, [periodStartData, periodEndData, onEndDateChange, onStartDateChange]);
  

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
        onStatusChange={onStatusChange}
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
