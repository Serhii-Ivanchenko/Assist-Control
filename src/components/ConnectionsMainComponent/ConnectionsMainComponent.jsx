import ConnectionsCircularPBSection from "../ConnectionsCircularPBSection/ConnectionsCircularPBSection.jsx";
import ConnectionsListSection from "../ConnectionsListSection/ConnectionsListSection.jsx";
import ConnectionsSelectorsSection from "../ConnectionsSelectorsSection/ConnectionsSelectorsSection.jsx";
import HorizontalPBSection from "../HorizontalPBSection/HorizontalPBSection.jsx";
import LastConnectionSection from "../LastConnectionSection/LastConnectionSection.jsx";
import css from "./ConnectionsMainComponent.module.css";

export default function ConnectionsMainComponent() {
  return (
    <div className={css.wrapper}>
      <HorizontalPBSection />
      <ConnectionsSelectorsSection />
      <div className={css.bottomWrapper}>
        <div className={css.leftPart}>
          <ConnectionsCircularPBSection />
          <ConnectionsListSection />
        </div>
        <LastConnectionSection />
      </div>
    </div>
  );
}
