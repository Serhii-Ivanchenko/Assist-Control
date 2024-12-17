
import CalendarPeriodSelector from '../sharedComponents/CalendarPeriodSelector/CalendarPeriodSelector';
import CarInfoSettings from '../sharedComponents/CarInfoSettings/CarInfoSettings';
import DownloadPdfButton from '../sharedComponents/DownloadPdfButton/DownloadPdfButton';
import TimeSortItem from '../sharedComponents/TimeSortItem/TimeSortItem';
import css from './GeneralClientsSorterAndSelectorsSection.module.css';


export default function GeneralClientsSorterAndSelectorsSection() {
 
  // Порожня функція для тимчасової передачі
  const noop = () => {};
 
    return (
      <div className={css.wrapper}>
        <div className={css.leftContainer}>
        <TimeSortItem onSortChange={noop}/>
        <CalendarPeriodSelector renderInModal={true}/>
        <DownloadPdfButton />
        <CarInfoSettings />
        </div>
      </div>
    );
};
