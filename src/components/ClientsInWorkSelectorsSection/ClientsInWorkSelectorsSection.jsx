import CalendarPeriodSelector from '../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector';
import RangeTimeSelector from '../sharedComponents/RangeTimeSelector/RangeTimeSelector';
import css from './ClientsInWorkSelectorsSection.module.css'

export default function ClientsInWorkSelectorsSection() {
      return (
        <div className={css.wrapper}>
          <RangeTimeSelector />
          <CalendarPeriodSelector />
        </div>
      );

};
