import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import css from "./SortButtonsArrow.module.css";

export default function SortButtonsArrow({ handleFunc, orderKey, func }) {
  return (
    <div className={css.arrowWrapper}>
      <TiArrowSortedUp
        className={css.arrowIcon}
        // onClick={() => {
        //   handleFunc(orderKey, "asc", func);
        // }}
      />
      <TiArrowSortedDown
        className={css.arrowIcon}
        // onClick={() => {
        //   handleFunc(orderKey, "desc", func);
        // }}
      />
    </div>
  );
}
