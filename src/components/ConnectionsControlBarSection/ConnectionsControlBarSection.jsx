import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector.jsx";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter.jsx";
import css from "./ConnectionsControlBarSection.module.css";
import renderStatusCommunication from "../../utils/renderStatusCommunication .jsx";
import { statusesCommunications } from "../../utils/dataToRender.js";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch.jsx";
import DownloadPdfButtonModalCar from "../sharedComponents/Pdf/DownloadPdfButtonModalCar/DownloadPdfButtonModalCar.jsx";

export default function ConnectionsControlBarSection() {
  const isFilter = true;

  const handleStatusChange = (status) => {
    console.log("Selected status:", status);
  };

  return (
    <div className={css.wrapper}>
      <RangeTimeSelector />
      <CalendarPeriodSelector />
      <StatusFilter
        onStatusChange={handleStatusChange}
        renderStatus={renderStatusCommunication}
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
