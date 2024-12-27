import GeneralClientCircularPBSection from "../GeneralClientCircularPBSection/GeneralClientCircularPBSection.jsx";
import GeneralClientsListSection from "../GeneralClientsListSection/GeneralClientsListSection.jsx";
import GeneralClientsControlBarSection from "../GeneralClientsControlBarSection/GeneralClientsControlBarSection.jsx";
import css from "./GeneralClientsMainComponent.module.css";

export default function GeneralClientsMainComponent() {
  return (
    <div className={css.wrapper}>
      <GeneralClientsControlBarSection />
      <GeneralClientCircularPBSection />
      <GeneralClientsListSection />
    </div>
  );
}
