import css from "./ClientsInWorkSorterSection.module.css";
import TimeSortItem from '../sharedComponents/TimeSortItem/TimeSortItem';


export default function ClientsInWorkSorterSection() {

  // Порожня функція для тимчасової передачі
  const noop = () => {};
 
    return (
      <div className={css.wrapper}>
        <TimeSortItem onSortChange={noop}/>
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
    );
};
