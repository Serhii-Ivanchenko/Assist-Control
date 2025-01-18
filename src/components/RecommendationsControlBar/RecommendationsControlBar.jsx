import { useState } from "react";
import CalendarPeriodSelector from "../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector";
import RangeTimeSelector from "../sharedComponents/RangeTimeSelector/RangeTimeSelector";
import css from "./RecommendationsControlBar.module.css";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import { toggleVisibilityRecomendations } from "../../redux/visibility/slice";
import { selectVisibilityRecomendations } from "../../redux/visibility/selectors";
import { labelNamesRecomendations } from "../../utils/dataToRender";

export default function RecommendationsControlBar() {
    const [periodStartData, setPeriodStartData] = useState(new Date());
    const [periodEndData, setPeriodEndData] = useState(new Date());
    
  return (
    <div className={css.wrapper}>
      <div className={css.leftContainer}>
      <RangeTimeSelector/>
      <CalendarPeriodSelector 
      periodStartData={periodStartData}
      periodEndData={periodEndData}
      handleInputChangeBeg={setPeriodStartData}
      handleInputChangeEnd={setPeriodEndData}
      isSingle={false}/>
      </div>
      <InfoSettingsVisibility
            selectVisibility={selectVisibilityRecomendations}
            toggleVisibilityAction={toggleVisibilityRecomendations}
            labelNames={labelNamesRecomendations}
            className={css.settingsContainer}
          />
    </div>
  );
}
