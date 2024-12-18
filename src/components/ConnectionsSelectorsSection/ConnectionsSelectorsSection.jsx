import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter";
import css from "./ConnectionsSelectorsSection.module.css";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
import { statusesCommunications } from "../../utils/dataToRender.js";

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
    </div>
  );
}
