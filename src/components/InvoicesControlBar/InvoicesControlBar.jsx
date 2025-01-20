import { useState } from "react";
import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import css from "./InvoicesControlBar.module.css";

export default function InvoicesControlBar() {
  const [periodStartData, setPeriodStartData] = useState(new Date());
  const [periodEndData, setPeriodEndData] = useState(new Date());
  return (
    <div className={css.wrapper}>
      <RangeTimeSelector className={css.rangeTime} />
      <CalendarPeriodSelector
        className={css.calendar}
        periodStartData={periodStartData}
        periodEndData={periodEndData}
        handleInputChangeBeg={setPeriodStartData}
        handleInputChangeEnd={setPeriodEndData}
        isSingle={false}
      />
    </div>
  );
}
