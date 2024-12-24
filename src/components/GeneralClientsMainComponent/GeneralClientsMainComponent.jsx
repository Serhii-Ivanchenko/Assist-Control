import GeneralClientCircularPBSection from "../GeneralClientCircularPBSection/GeneralClientCircularPBSection.jsx";
import GeneralClientsListSection from "../GeneralClientsListSection/GeneralClientsListSection.jsx";
import GeneralClientsSorterAndSelectorsSection from "../GeneralClientsSorterAndSelectorsSection/GeneralClientsSorterAndSelectorsSection.jsx";
import css from "./GeneralClientsMainComponent.module.css";

export default function GeneralClientsMainComponent() {
  return (
    <div className={css.wrapper}>
      <GeneralClientsSorterAndSelectorsSection />
      <GeneralClientCircularPBSection />
      <GeneralClientsListSection />
    </div>
  );
}
