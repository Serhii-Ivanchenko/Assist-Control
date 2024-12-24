import ConnectionsCircularPBSection from "../ConnectionsCircularPBSection/ConnectionsCircularPBSection.jsx";
import ConnectionsListSection from "../ConnectionsListSection/ConnectionsListSection.jsx";
import ConnectionsSelectorsSection from "../ConnectionsSelectorsSection/ConnectionsSelectorsSection.jsx";
import HorizontalPBSection from "../HorizontalPBSection/HorizontalPBSection.jsx";
import LastConnectionSection from "../LastConnectionSection/LastConnectionSection.jsx";
import css from "./ConnectionsMainComponent.module.css";

export default function ConnectionsMainComponent() {
  return (
    <div className={css.wrapper}>
      <ConnectionsSelectorsSection />

      <div className={css.upperWrapper}>
        <ConnectionsCircularPBSection />
        <HorizontalPBSection />
      </div>

      <div className={css.bottomWrapper}>
        <ConnectionsListSection />
        <LastConnectionSection />
      </div>
    </div>
  );
}
