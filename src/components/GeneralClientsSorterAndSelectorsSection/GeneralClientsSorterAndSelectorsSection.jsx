import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import DownloadPdfButton from "../sharedComponents/DownloadPdfButton/DownloadPdfButton";
import TimeSortItem from "../sharedComponents/TimeSortItem/TimeSortItem";
import css from "./GeneralClientsSorterAndSelectorsSection.module.css";
import { toggleVisibilityAllClients } from "../../redux/visibility/slice";
import { selectVisibilityAllClients } from "../../redux/visibility/selectors";
import { labelNamesAllClients } from "../../utils/dataToRender";

export default function GeneralClientsSorterAndSelectorsSection() {
  // Порожня функція для тимчасової передачі
  const noop = () => {};

  return (
    <div className={css.wrapper}>
      <div className={css.leftContainer}>
        <TimeSortItem onSortChange={noop} />
        <CalendarPeriodSelector renderInModal={true} />
        <DownloadPdfButton />
        <InfoSettingsVisibility
          selectVisibility={selectVisibilityAllClients}
          toggleVisibilityAction={toggleVisibilityAllClients}
          labelNames={labelNamesAllClients}
        />{" "}
      </div>
    </div>
  );
}
