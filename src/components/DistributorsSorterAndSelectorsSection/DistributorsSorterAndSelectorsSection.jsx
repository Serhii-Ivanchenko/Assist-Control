import { selectVisibilitySuppliers } from "../../redux/visibility/selectors";
import { toggleVisibilitySuppliers } from "../../redux/visibility/slice";
import { labelNamesDistributorSection } from "../../utils/dataToRender";
import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
// import CarInfoSettings from "../sharedComponents/CarInfoSettings/CarInfoSettings";
import DownloadPdfButton from "../sharedComponents/DownloadPdfButton/DownloadPdfButton";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import TimeSortItem from "../sharedComponents/TimeSortItem/TimeSortItem";
import css from "./DistributorsSorterAndSelectorsSection.module.css";

export default function DistributorsSorterAndSelectorsSection() {
  const noop = () => {};

  return (
    <div className={css.wrapper}>
      <TimeSortItem onSortChange={noop} />
      <CalendarPeriodSelector renderInModal={true} />
      <DownloadPdfButton />
      <InfoSettingsVisibility
            selectVisibility={selectVisibilitySuppliers}
            toggleVisibilityAction={toggleVisibilitySuppliers}
            labelNames={labelNamesDistributorSection}
          />
    </div>
  );
}
