import css from "./ClientsInWorkSorterSection.module.css";
import { labelNamesClientsInWork, statusesCar} from '../../utils/dataToRender';
import CarsSearch from '../sharedComponents/CarsSearch/CarsSearch';
import StatusFilter from '../sharedComponents/StatusFilter/StatusFilter';
import TimeSortItem from '../sharedComponents/TimeSortItem/TimeSortItem';
import renderStatusCars from "../../utils/renderStatusCars";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import { selectVisibilityClientsInWork} from "../../redux/visibility/selectors";
import { toggleVisibilityClientsInWork} from "../../redux/visibility/slice";


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
        <div className={css.statusContainer}>
        <StatusFilter 
        onStatusChange={handleStatusChange}
        renderStatus={renderStatusCars}
        statuses={statusesCar}
        isFilter={isFilter}/>
        </div>
        <CarsSearch />
        <InfoSettingsVisibility
            selectVisibility={selectVisibilityClientsInWork}
            toggleVisibilityAction={toggleVisibilityClientsInWork}
            labelNames={labelNamesClientsInWork}
          />
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
        <TimeSortItem onSortChange={noop}/>
        </div>
      </div>
    );
};
