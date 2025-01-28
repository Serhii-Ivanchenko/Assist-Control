import { useState } from "react";
import { selectVisibilityClientsInWork } from "../../redux/visibility/selectors";
import { toggleVisibilityClientsInWork } from "../../redux/visibility/slice";
import { labelNamesClientsInWork, statusesCar } from "../../utils/dataToRender";
import renderStatusCars from "../../utils/renderStatusCars";
import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import DownloadPdfButtonModalCar from "../sharedComponents/Pdf/DownloadPdfButtonModalCar/DownloadPdfButtonModalCar";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter";
import css from "./ClientsInWorkControlBarSection.module.css";

export default function ClientsInWorkControlBarSection() {
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
      isSingle={false}/>
      <StatusFilter
        onStatusChange={handleStatusChange}
        renderStatus={renderStatusCars}
        statuses={statusesCar}
        isFilter={isFilter}
      />
      <div className={css.rightContainer}>
        <CarsSearch />
        <DownloadPdfButtonModalCar />
        <InfoSettingsVisibility
          selectVisibility={selectVisibilityClientsInWork}
          toggleVisibilityAction={toggleVisibilityClientsInWork}
          labelNames={labelNamesClientsInWork}
          className={css.settingsContainerInCrm}
        />
      </div>
    </div>
  );
}
