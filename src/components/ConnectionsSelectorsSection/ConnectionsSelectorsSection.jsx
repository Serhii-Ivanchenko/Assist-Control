import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter";
import css from "./ConnectionsSelectorsSection.module.css";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
import { labelNamesAllClients, statusesCommunications } from "../../utils/dataToRender.js";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch.jsx";
import DownloadPdfButton from "../sharedComponents/DownloadPdfButton/DownloadPdfButton.jsx";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility.jsx";
import { selectVisibilityAllClients } from "../../redux/visibility/selectors.js";
import { toggleVisibilityAllClients } from "../../redux/visibility/slice.js";

export default function ConnectionsSelectorsSection() {
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
          <DownloadPdfButton />
          <InfoSettingsVisibility
            selectVisibility={selectVisibilityAllClients}
            toggleVisibilityAction={toggleVisibilityAllClients}
            labelNames={labelNamesAllClients}
            className={css.settingsContainerInCrm}
            
          />
        </div>
    </div>
  );
}
