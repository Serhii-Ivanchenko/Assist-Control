import clsx from "clsx";
import css from "./ClientsInWorkSorterSection.module.css";
import TimeSortItem from "../sharedComponents/TimeSortItem/TimeSortItem";
import { useSelector } from "react-redux";
import { selectVisibilityClientsInWork } from "../../redux/visibility/selectors";

export default function ClientsInWorkSorterSection() {
  const visibility = useSelector(selectVisibilityClientsInWork);

  // Порожня функція для тимчасової передачі
  const noop = () => {};

  return (
    <div className={css.wrapper}>
      <div className={css.sorterDate}>
        <TimeSortItem onSortChange={noop} />
      </div>
      <div className={css.info}>
          <div
            className={clsx(css.photoContainer, {
              [css.hidden]: !visibility?.photo,
            })}
          ></div>
          <div
            className={clsx(css.sorterAppeal, {
              [css.hidden]: !visibility?.appeal,
            })}
          >
            <TimeSortItem onSortChange={noop} />
          </div>
          <div
            className={clsx(css.sorterDiagnostics, {
              [css.hidden]: !visibility?.diagnostics,
            })}
          >
            <TimeSortItem onSortChange={noop} />
          </div>
          <div
            className={clsx(css.sorterKP, { [css.hidden]: !visibility?.KP })}
          >
            <TimeSortItem onSortChange={noop} />
        </div>
        <div
          className={clsx(css.sorterPrePayment, {
            [css.hidden]: !visibility?.prePayment,
          })}
        >
          <TimeSortItem onSortChange={noop} />
        </div>
        <div className={css.rightContainer}>
          <div
            className={clsx(css.sorterOrder, {
              [css.hidden]: !visibility?.order,
            })}
          >
            <TimeSortItem onSortChange={noop} />
          </div>
          <div
            className={clsx(css.sorterProvider, {
              [css.hidden]: !visibility?.provider,
            })}
          >
            <TimeSortItem onSortChange={noop} />
          </div>
          <div
            className={clsx(css.sorterRepair, {
              [css.hidden]: !visibility?.repair,
            })}
          >
            <TimeSortItem onSortChange={noop} />
          </div>
        </div>
        <div
          className={clsx(css.sorterTotalAmount, {
            [css.hidden]: !visibility?.totalAmount,
          })}
        >
          <TimeSortItem onSortChange={noop} />
        </div>
        <div
          className={clsx(css.sorterNotification, {
            [css.hidden]: !visibility?.notification,
          })}
        >
          <TimeSortItem onSortChange={noop} />
        </div>
      </div>
    </div>
  );
}