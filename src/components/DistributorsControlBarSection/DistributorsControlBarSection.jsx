// import { selectVisibilitySuppliers } from "../../redux/visibility/selectors";
// import { toggleVisibilitySuppliers } from "../../redux/visibility/slice";
// import { labelNamesDistributorSection } from "../../utils/dataToRender";
import { useState } from "react";
import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import CarsSearch from "../sharedComponents/CarsSearch/CarsSearch";
// import CarInfoSettings from "../sharedComponents/CarInfoSettings/CarInfoSettings";
// import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import DownloadPdfDistributors from "../sharedComponents/Pdf/DownloadPdfDistributors/DownloadPdfDistributors";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import TimeSortItem from "../sharedComponents/TimeSortItem/TimeSortItem";
import css from "./DistributorsControlBarSection.module.css";

export default function DistributorsControlBarSection() {
  const [periodStartData, setPeriodStartData] = useState(new Date());
    const [periodEndData, setPeriodEndData] = useState(new Date());
  const noop = () => {};

  return (
    <div className={css.wrapper}>
      <TimeSortItem onSortChange={noop} />
      <RangeTimeSelector className={css.rangeTime} />
      <CalendarPeriodSelector
        renderInModal={true}
        periodStartData={periodStartData}
        periodEndData={periodEndData}
        handleInputChangeBeg={setPeriodStartData}
        handleInputChangeEnd={setPeriodEndData}
        isSingle={false}
      />
      <div className={css.rightContainer}>
        <CarsSearch />
        <DownloadPdfDistributors />
        {/* <InfoSettingsVisibility
          selectVisibility={selectVisibilitySuppliers}
          toggleVisibilityAction={toggleVisibilitySuppliers}
          labelNames={labelNamesDistributorSection}
          className={css.settingsContainerInCrm}
        /> */}
      </div>
    </div>
  );
}
