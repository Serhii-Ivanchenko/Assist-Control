import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import StatusFilterCars from "../sharedComponents/StatusFilterCars/StatusFilterCars";
import css from "./ConnectionsSelectorsSection.module.css";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
import { statusesCommunications } from "../../utils/dataStatuses";

export default function ConnectionsSelectorsSection() {

  const handleStatusChange = (status) => {
    console.log("Selected status:", status);
  };

  return (
    <div className={css.wrapper}>
      <RangeTimeSelector />
      <CalendarPeriodSelector />
      <StatusFilterCars
        onStatusChange={handleStatusChange}
        renderStatus={renderStatusCommunication}
        statuses={statusesCommunications}
      />
    </div>
  );
}
