import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import css from "./InvoicesSelectorsSection.module.css";

export default function InvoicesSelectorsSection() {
  return (
    <div className={css.wrapper}>
      <RangeTimeSelector className={css.rangeTime}/>
      <CalendarPeriodSelector className={css.calendar}/>
    </div>
  );
}
