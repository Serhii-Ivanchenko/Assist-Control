import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import StatusFilterCars from "../StatusFilterCars/StatusFilterCars";
import css from "./ConnectionsSelectorsSection.module.css";

export default function ConnectionsSelectorsSection() {
  return <div className={css.wrapper}>
    <RangeTimeSelector />
    <CalendarPeriodSelector />
    <StatusFilterCars />
  </div>;
}
