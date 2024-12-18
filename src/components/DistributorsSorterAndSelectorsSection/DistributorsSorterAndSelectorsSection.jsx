import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import CarInfoSettings from "../sharedComponents/CarInfoSettings/CarInfoSettings";
import DownloadPdfButton from "../sharedComponents/DownloadPdfButton/DownloadPdfButton";
import css from "./DistributorsSorterAndSelectorsSection.module.css";

export default function DistributorsSorterAndSelectorsSection() {
  return (
    <div className={css.wrapper}>
      <CalendarPeriodSelector renderInModal={true} />
      <DownloadPdfButton />
      <CarInfoSettings />
    </div>
  );
}
