// import Advertising from "../Advertising/Advertising";
import LastCall from "../LastCall/LastCall";
import css from "./LastConnectionSection.module.css";

export default function LastConnectionSection() {
  return (
    <div className={css.wrapper}>
      <LastCall />
      {/* <Advertising /> */}
    </div>
  );
}
