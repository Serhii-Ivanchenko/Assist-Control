import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector.jsx";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector.jsx";
import StatusFilter from "../sharedComponents/StatusFilter/StatusFilter.jsx";
import css from "./ConnectionsControlBarSection.module.css";
import renderStatusCommunication from "../../utils/renderStatusCommunication .jsx";
import { statusesCommunications } from "../../utils/dataToRender.js";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch.jsx";
import { useEffect } from "react";
import DownloadPdfButtonConnections from "../sharedComponents/Pdf/DownloadPdfButtonConnections/DownloadPdfButtonConnections.jsx";

export default function ConnectionsControlBarSection({
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onSelectTimeRange,
  periodStartData,
  periodEndData,
  setPeriodStartData,
  setPeriodEndData,
  onSearch,
  searchTerm,
  filteredConnections
}) {
  const isFilter = true;

  useEffect(() => {
    onStartDateChange(periodStartData);
    onEndDateChange(periodEndData);
  }, [periodStartData, periodEndData, onEndDateChange, onStartDateChange]);

  return (
    <div className={css.wrapper}>
      <RangeTimeSelector onSelectTimeRange={onSelectTimeRange} />
      <CalendarPeriodSelector
        periodStartData={periodStartData}
        periodEndData={periodEndData}
        handleInputChangeBeg={setPeriodStartData}
        handleInputChangeEnd={setPeriodEndData}
        isSingle={false}
      />
      <StatusFilter
        onStatusChange={onStatusChange}
        renderStatus={(status) =>
          renderStatusCommunication(status, css, isFilter)
        }
        statuses={statusesCommunications}
        isFilter={isFilter}
      />
      <div className={css.rightContainer}>
        <CarsSearch
          value={searchTerm}
          onChange={onSearch}
          placeholderText="Пошук по авто та імені"
          isHeader={true}
        />
        <DownloadPdfButtonConnections carsData={filteredConnections} />
      </div>
    </div>
  );
}
