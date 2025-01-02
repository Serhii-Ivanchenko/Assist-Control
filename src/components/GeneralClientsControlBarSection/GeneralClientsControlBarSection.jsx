import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import TimeSortItem from "../sharedComponents/TimeSortItem/TimeSortItem";
import css from "./GeneralClientsControlBarSection.module.css";
import { toggleVisibilityAllClients } from "../../redux/visibility/slice";
import { selectVisibilityAllClients } from "../../redux/visibility/selectors";
import {
  labelNamesAllClients,
  statusesCommunications,
} from "../../utils/dataToRender";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch";
import DownloadPdfButtonGeneralClients from "../sharedComponents/Pdf/DownloadPdfButtonGeneralClients/DownloadPdfButtonGeneralClients";

export default function GeneralClientsControlBarSection() {
  // Порожня функція для тимчасової передачі
  const noop = () => {};
  const isFilter = true;

  const handleStatusChange = (status) => {
    console.log("Selected status:", status);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.leftContainer}>
        <TimeSortItem onSortChange={noop} />
        <RangeTimeSelector />
        <CalendarPeriodSelector renderInModal={true} />
        <StatusFilter
          onStatusChange={handleStatusChange}
          renderStatus={renderStatusCommunication}
          statuses={statusesCommunications}
          isFilter={isFilter}
        />
      </div>
      <div className={css.rightContainer}>
          <CarsSearch />
          <DownloadPdfButtonGeneralClients />
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
