import clsx from "clsx";
import css from "./ClientsInWorkSorterSection.module.css";
import TimeSortItem from "../sharedComponents/TimeSortItem/TimeSortItem";
import { useSelector } from "react-redux";
import { selectVisibilityClientsInWork } from "../../redux/visibility/selectors";
import { useState } from "react";

export default function ClientsInWorkSorterSection({ clients, setSortedClients }) {
  const visibility = useSelector(selectVisibilityClientsInWork);
  const [isDescending, setIsDescending] = useState(true);

  const handleSortChange = (field, newDescendingState) => {
    setIsDescending(newDescendingState);
  
    const sortField = (field) => {
      return (a, b) => {
        const aField = Number(a[field]); 
        const bField = Number(b[field]); 
  
        if (isNaN(aField)) return 1;
        if (isNaN(bField)) return -1;
  
        if (newDescendingState) {
          return bField - aField;
        }
        return aField - bField;
      };
    };
  
    const sorted = [...clients].sort((a, b) => {
      if (field === "date") {
        if (newDescendingState) {
          return new Date(b.date_e).getTime() - new Date(a.date_e).getTime();
        }
        return new Date(a.date_e).getTime() - new Date(b.date_e).getTime();
      }
  
      if (field === "pre_paid" || field === "post_paid") {
        return sortField(field)(a, b);
      }
  
      return 0;
    });
  
    setSortedClients(sorted);
  };
  const noop = () => {};

  return (
    <div className={css.wrapper}>
      <div className={css.sorterDate}>
        <TimeSortItem onSortChange={(newDescendingState) => handleSortChange("date", newDescendingState)} />
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
          <TimeSortItem onSortChange={(newDescendingState) => handleSortChange("pre_paid", newDescendingState)} />
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
          <TimeSortItem onSortChange={(newDescendingState) => handleSortChange("post_paid", newDescendingState)} />
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
