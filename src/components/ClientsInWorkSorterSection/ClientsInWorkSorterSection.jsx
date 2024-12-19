import css from "./ClientsInWorkSorterSection.module.css";
import { statusesCommunications } from '../../utils/dataToRender';
import renderStatusCommunication from '../../utils/renderStatusCommunication ';
import CarInfoSettings from '../sharedComponents/CarInfoSettings/CarInfoSettings';
import CarsSearch from '../sharedComponents/CarsSearch/CarsSearch';
import StatusFilter from '../sharedComponents/StatusFilter/StatusFilter';
import TimeSortItem from '../sharedComponents/TimeSortItem/TimeSortItem';


export default function ClientsInWorkSorterSection() {
  const isFilter = true;

  const handleStatusChange = (status) => {
    console.log("Selected status:", status);
  };

  // Порожня функція для тимчасової передачі
  const noop = () => {};
 
    return (
      <div className={css.wrapper}>
        <div className={css.leftContainer}>
        <TimeSortItem onSortChange={noop}/>
        <StatusFilter 
        onStatusChange={handleStatusChange}
        renderStatus={renderStatusCommunication}
        statuses={statusesCommunications}
        isFilter={isFilter}/>
        <CarsSearch />
        <CarInfoSettings />
        <TimeSortItem onSortChange={noop}/>
        </div>
        <div className={css.rightContainer}>
        <TimeSortItem onSortChange={noop}/>
        <TimeSortItem onSortChange={noop}/>
        <TimeSortItem onSortChange={noop}/>
        <TimeSortItem onSortChange={noop}/>
        <TimeSortItem onSortChange={noop}/>
        <TimeSortItem onSortChange={noop}/>
        <TimeSortItem onSortChange={noop}/>
        <TimeSortItem onSortChange={noop}/>
        </div>
      </div>
    );
};
